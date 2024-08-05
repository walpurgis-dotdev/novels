import { MainHeader } from "@/components/layout/main-header";
import { Sidebar } from "@/components/layout/sidebar";
import { GeneralShell } from "@/components/wrappers/general-shell";

export default function NovelLayout({ children }) {
	return (
		<section className="flex flex-col">
			<MainHeader />
			<div className="flex">
				<Sidebar />
				<GeneralShell className="overflow-y-auto">{children}</GeneralShell>
			</div>
		</section>
	);
}
