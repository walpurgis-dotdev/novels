import { SiteFooter } from "@/components/navigation/site-footer";
import { SiteHeader } from "@/components/navigation/site-header";
import { GeneralShell } from "@/components/wrappers/general-shell";

export default function MainLayout({ children }) {
  return (
    <>
      <SiteHeader />
      <GeneralShell>{children}</GeneralShell>
      <SiteFooter />
    </>
  );
}
