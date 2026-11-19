// lib/cms/crud-route.ts
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getEntityConfig, type EntityConfig, type FieldConfig } from "@/lib/cms/entity-config";
import { supabase } from "@/lib/supabase";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

type Row = Record<string, unknown>;

function isPlainObject(value: unknown): value is Row {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function responseError(message: string, status: number) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

function responseData(data: unknown) {
  return NextResponse.json({ ok: true, data });
}

function maxLength(field: FieldConfig): number {
  if (field.type === "textarea") return 20000;
  if (field.type === "image") return 3_000_000;
  return 1000;
}

function isValidUrl(value: string): boolean {
  if (/^\/[^/]/.test(value) || value === "/" || value.startsWith("#")) return true;
  if (/^(https?:\/\/|mailto:|tel:)/i.test(value)) return true;
  if (/^data:image\/(png|jpeg|jpg|gif|webp|svg\+xml);base64,/i.test(value)) return true;
  return false;
}

function validateField(field: FieldConfig, raw: unknown, required: boolean): { value?: unknown; error?: string } {
  if (raw === undefined || raw === null || raw === "") {
    if (required) return { error: `${field.label} is required` };
    return { value: field.type === "boolean" ? false : "" };
  }

  if (field.type === "boolean") {
    if (typeof raw === "boolean") return { value: raw };
    if (raw === "true" || raw === 1 || raw === "1") return { value: true };
    if (raw === "false" || raw === 0 || raw === "0") return { value: false };
    return { error: `${field.label} must be true or false` };
  }

  if (field.type === "number") {
    const value = typeof raw === "number" ? raw : Number(raw);
    if (!Number.isFinite(value) || !Number.isInteger(value)) {
      return { error: `${field.label} must be a whole number` };
    }
    return { value };
  }

  if (typeof raw !== "string") {
    return { error: `${field.label} must be text` };
  }

  const value = field.type === "textarea" ? raw.trim() : raw.trim();
  if (value.length > maxLength(field)) {
    return { error: `${field.label} is too long` };
  }

  if (required && value.length === 0) {
    return { error: `${field.label} is required` };
  }

  if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return { error: `${field.label} must be a valid email address` };
  }

  if ((field.type === "url" || field.type === "image") && value && !isValidUrl(value)) {
    return { error: `${field.label} must be a valid link or image URL` };
  }

  if (field.options && value && !field.options.includes(value)) {
    return { error: `${field.label} must be one of: ${field.options.join(", ")}` };
  }

  return { value };
}

function buildPayload(config: EntityConfig, body: Row, partial: boolean): { payload?: Row; error?: string } {
  const payload: Row = {};
  for (const field of config.fields) {
    const isRequired = !partial && Boolean(field.required);
    if (!(field.name in body)) {
      if (isRequired) return { error: `${field.label} is required` };
      continue;
    }
    const result = validateField(field, body[field.name], isRequired);
    if (result.error) return { error: result.error };
    if (result.value !== undefined) payload[field.name] = result.value;
  }
  return { payload };
}

async function ensureAdmin(): Promise<Response | null> {
  if (!(await isAdminAuthenticated())) {
    return responseError("Unauthorized", 401);
  }
  return null;
}

function getDb() {
  try {
    return { db: getSupabaseAdmin(), error: null };
  } catch (cause) {
    return {
      db: null,
      error: cause instanceof Error ? cause.message : "Admin database is not configured",
    };
  }
}

function revalidate() {
  revalidateTag("site-content", { expire: 0 });
  revalidateTag("cms-entities", { expire: 0 });
}

export function createEntityHandlers(entityKey: string) {
  const config = getEntityConfig(entityKey);

  const GET = async (request: Request): Promise<Response> => {
    if (!config) return responseError("Unknown entity", 404);

    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const wantsAll = url.searchParams.get("all") === "1" && (await isAdminAuthenticated());
    let query = supabase.from(config.table).select("*");

    if (id) query = query.eq("id", id);
    else if (
      !wantsAll &&
      config.kind === "list" &&
      config.fields.some((item) => item.name === "published")
    ) {
      query = query.eq("published", true);
    }

    query = query.order(config.orderBy, { ascending: true });
    const { data, error } = await query;

    if (error) return responseError(error.message, 500);
    if (config.kind === "singleton") return responseData((data ?? [])[0] ?? null);
    if (id) return responseData((data ?? [])[0] ?? null);
    return responseData(data ?? []);
  };

  const POST = async (request: Request): Promise<Response> => {
    if (!config) return responseError("Unknown entity", 404);
    const denied = await ensureAdmin();
    if (denied) return denied;

    const body = await request.json().catch(() => null);
    if (!isPlainObject(body)) return responseError("Invalid JSON payload", 400);
    const { payload, error } = buildPayload(config, body, false);
    if (error || !payload) return responseError(error ?? "Invalid payload", 400);

    const { db, error: dbError } = getDb();
    if (!db) return responseError(dbError ?? "Admin database is not configured", 500);

    const values = config.kind === "singleton" ? { ...payload, id: "default", updated_at: new Date().toISOString() } : { ...payload, updated_at: new Date().toISOString() };
    const { data, error: queryError } = await db.from(config.table).upsert(values).select().single();

    if (queryError) return responseError(queryError.message, 500);
    revalidate();
    return responseData(data);
  };

  const PUT = async (request: Request): Promise<Response> => {
    if (!config) return responseError("Unknown entity", 404);
    const denied = await ensureAdmin();
    if (denied) return denied;

    const body = await request.json().catch(() => null);
    if (!isPlainObject(body)) return responseError("Invalid JSON payload", 400);
    const { payload, error } = buildPayload(config, body, false);
    if (error || !payload) return responseError(error ?? "Invalid payload", 400);

    const { db, error: dbError } = getDb();
    if (!db) return responseError(dbError ?? "Admin database is not configured", 500);

    const rowId = config.kind === "singleton" ? "default" : body.id;
    if (typeof rowId !== "string" || rowId.length === 0) {
      return responseError("An id is required", 400);
    }

    const { data, error: queryError } = await db
      .from(config.table)
      .update({ ...payload, updated_at: new Date().toISOString() })
      .eq("id", rowId)
      .select()
      .single();

    if (queryError) return responseError(queryError.message, 500);
    revalidate();
    return responseData(data);
  };

  const PATCH = async (request: Request): Promise<Response> => {
    if (!config) return responseError("Unknown entity", 404);
    const denied = await ensureAdmin();
    if (denied) return denied;

    const body = await request.json().catch(() => null);
    if (!isPlainObject(body)) return responseError("Invalid JSON payload", 400);
    const { payload, error } = buildPayload(config, body, true);
    if (error || !payload || Object.keys(payload).length === 0) {
      return responseError(error ?? "No valid fields supplied", 400);
    }

    const { db, error: dbError } = getDb();
    if (!db) return responseError(dbError ?? "Admin database is not configured", 500);

    const rowId = config.kind === "singleton" ? "default" : body.id;
    if (typeof rowId !== "string" || rowId.length === 0) {
      return responseError("An id is required", 400);
    }

    const { data, error: queryError } = await db
      .from(config.table)
      .update({ ...payload, updated_at: new Date().toISOString() })
      .eq("id", rowId)
      .select()
      .single();

    if (queryError) return responseError(queryError.message, 500);
    revalidate();
    return responseData(data);
  };

  const DELETE = async (request: Request): Promise<Response> => {
    if (!config) return responseError("Unknown entity", 404);
    const denied = await ensureAdmin();
    if (denied) return denied;
    if (config.kind === "singleton") return responseError("This entity cannot be deleted", 405);

    const url = new URL(request.url);
    const rowId = url.searchParams.get("id");
    if (!rowId) return responseError("An id is required", 400);

    const { db, error: dbError } = getDb();
    if (!db) return responseError(dbError ?? "Admin database is not configured", 500);

    const { error: queryError } = await db.from(config.table).delete().eq("id", rowId);
    if (queryError) return responseError(queryError.message, 500);
    revalidate();
    return responseData({ id: rowId });
  };

  return { GET, POST, PUT, PATCH, DELETE };
}
