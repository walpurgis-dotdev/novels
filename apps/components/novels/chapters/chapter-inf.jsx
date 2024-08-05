import { Icons } from "@/components/icons";
import {
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/primitives/ui/card";
import capitalizeFirstLetter from "@/utils/cap-first-letter";
import { cls } from "@/utils/cn-classes";
import { formatDate } from "@/utils/format-date";

export function ChapterInf({ item }) {
	return (
		<CardHeader className="pb-4">
			<CardTitle className={cls("text-foreground/80 line-clamp-1")}>
				Chương {item.chapterNo}: {item.title}
			</CardTitle>
			<div className="flex flex-wrap gap-3">
				<span className="flex items-center space-x-1">
					<Icons.notebook size={12} className="text-muted-foreground" />
					<CardDescription>
						{capitalizeFirstLetter(item.novel.title)}
					</CardDescription>
				</span>
				<span className="flex items-center space-x-1">
					<Icons.penTool size={12} className="text-muted-foreground" />
					<CardDescription>{item.author.name}</CardDescription>
				</span>
				<span className="flex items-center space-x-1">
					<Icons.clock size={12} className="text-muted-foreground" />
					<CardDescription>{formatDate(item.createdAt)}</CardDescription>
				</span>
			</div>
		</CardHeader>
	);
}
