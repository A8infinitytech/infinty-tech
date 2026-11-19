// app/api/cms/footer-config/route.ts
import { createEntityHandlers } from "@/lib/cms/crud-route";

export const { GET, POST, PUT, PATCH, DELETE } = createEntityHandlers("footer-config");
