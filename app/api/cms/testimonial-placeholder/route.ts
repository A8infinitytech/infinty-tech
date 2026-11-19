// app/api/cms/testimonial-placeholder/route.ts
import { createEntityHandlers } from "@/lib/cms/crud-route";

export const { GET, POST, PUT, PATCH, DELETE } = createEntityHandlers("testimonial-placeholder");
