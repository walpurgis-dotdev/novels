import { AdminHeader } from "@/components/admin/navigation/admin-header";
import { Sidebar } from "@/components/admin/navigation/sidebar";
import { GeneralShell } from "@/components/wrappers/general-shell";

export default function AdminLayout({ children }) {
  return (
    <section>
      <AdminHeader />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <GeneralShell>{children}</GeneralShell>
      </div>
    </section>
  );
}
