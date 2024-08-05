import { BugPlay } from "lucide-react";

export function MobileNav({ items }) {
	return (
		<div className="md:hidden flex">
			<BugPlay size={20} className="text-white" />
		</div>
	);
}
