import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/primitives/ui/card";
import capitalizeFirstLetter from "@/utils/cap-first-letter";
import { cls } from "@/utils/cn-classes";
import { siteConfig } from "@/utils/common";
import { IMAGE_NOVEL_DEFAULT } from "@/utils/constants";
import Image from "next/image";

export function NovelInf({ item }) {
	return (
		<Card className="text-center bg-transparent shadow-none">
			<CardHeader>
				<div className="relative flex items-center justify-center h-auto mx-auto mb-4 overflow-hidden rounded-lg group w-28">
					<Image
						src={
							item.novel.covers ? item.novel.covers["600"] : IMAGE_NOVEL_DEFAULT
						}
						alt=""
						width={208}
						height={288}
						style={{ width: "auto", height: "auto" }}
						className={cls("object-cover object-center", "")}
					/>
				</div>
				<CardTitle className="text-foreground/80">
					{capitalizeFirstLetter(item.novel.title)}
				</CardTitle>
				<CardDescription>{item.author.name}</CardDescription>
			</CardHeader>
			<CardContent>
				<CardDescription className="text-base">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint
					consequatur similique est architecto natus quis nesciunt incidunt
					voluptate? Optio unde quod modi, perspiciatis hic soluta laudantium
					culpa rerum quasi fuga?
				</CardDescription>
			</CardContent>
			<CardFooter className="flex-col space-y-3">
				<Image
					src="/logo.svg"
					alt="logo"
					width={80}
					height={32}
					className="dark:invert"
				/>
				<div className="flex flex-col items-center justify-center space-y-2">
					<CardTitle className="text-sm font-normal">
						Tác phẩm này được sản xuất và phân phối bởi tác giả{" "}
						{item.author.name}.
					</CardTitle>
					<CardDescription className="text-xs">
						© 2024 {siteConfig.name}. Được biên dịch bởi Kim La.{" "}
					</CardDescription>
				</div>
			</CardFooter>
		</Card>
	);
}
