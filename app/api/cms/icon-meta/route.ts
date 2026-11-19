// app/api/cms/icon-meta/route.ts
import { createEntityHandlers } from "@/lib/cms/crud-route";

export const { GET, POST, PUT, PATCH, DELETE } = createEntityHandlers("icon-meta");
