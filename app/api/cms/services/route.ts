// app/api/cms/services/route.ts
import { createEntityHandlers } from "@/lib/cms/crud-route";

export const { GET, POST, PUT, PATCH, DELETE } = createEntityHandlers("services");
