// app/admin/page.tsx
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import EntityDashboard from "@/components/admin/EntityDashboard";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import AdminLoading from "./loading";

export default function AdminPage() {
  return (
    <Suspense fallback={<AdminLoading />}>
      <AdminPageContent />
    </Suspense>
  );
}

async function AdminPageContent() {
  await connection();
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  return <EntityDashboard />;
}
