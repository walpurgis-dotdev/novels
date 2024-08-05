import { Icons } from "../icons";
import { Link } from "../primitives/link-button";

export function CreateNovel({ content = "Tạo truyện mới" }) {
	return (
		<Link
			href="/novels/create"
			size="default"
			className="space-x-2 border bg-background rounded-xl hover:opacity-80"
		>
			<Icons.penTool size={16} className="text-foreground/80" />
			<span className="hidden lg:inline-flex text-foreground/80">
				{content}
			</span>
		</Link>
	);
}
