// app/api/cms/hero-ask/route.ts
import { createEntityHandlers } from "@/lib/cms/crud-route";

export const { GET, POST, PUT, PATCH, DELETE } = createEntityHandlers("hero-ask");
