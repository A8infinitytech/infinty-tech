// app/api/cms/social-links/route.ts
import { createEntityHandlers } from "@/lib/cms/crud-route";

export const { GET, POST, PUT, PATCH, DELETE } = createEntityHandlers("social-links");
