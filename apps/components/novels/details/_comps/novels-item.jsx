import { Icons } from "@/components/icons";
import { Button } from "@/components/primitives/ui/button";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/primitives/ui/card";
import { NovelBooks } from "@/components/visuals/novel-books";
import capitalizeFirstLetter from "@/utils/cap-first-letter";
import { IMAGE_NOVEL_DEFAULT } from "@/utils/constants";

export function NovelsItem({ item }) {
	return (
		<Card className="border-none shadow-none group">
			<CardHeader className="flex-row p-2 space-x-2 space-y-0">
				<NovelBooks
					src={item.covers ? item.covers["150"] : IMAGE_NOVEL_DEFAULT}
					size="zs"
				/>
				<div className="space-y-1 overflow-hidden grow">
					<CardTitle className="text-base line-clamp-1">
						{capitalizeFirstLetter(item?.title)}
					</CardTitle>
					<CardDescription className="line-clamp-2">
						{item?.description || "Chưa có thông tin"}
					</CardDescription>
				</div>
			</CardHeader>
		</Card>
	);
}
