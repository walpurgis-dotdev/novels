"use client";

import { Icons } from "@/components/icons";
import { Link } from "@/components/primitives/link-button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardTitle,
} from "@/components/primitives/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/primitives/ui/carousel";
import { NovelBooks } from "@/components/visuals/novel-books";
import { useCarousel } from "@/hooks/use-carousel";
import capitalizeFirstLetter from "@/utils/cap-first-letter";
import { cls } from "@/utils/cn-classes";
import { HREF_NOVELS_DETAILS, IMAGE_NOVEL_DEFAULT } from "@/utils/constants";

export function ListCarousel({ data }) {
	const { setApi, options, plugins, selectedIndex, handleSelect } = useCarousel(
		{ delay: 10000 },
	);

	return (
		<>
			<Carousel
				setApi={setApi}
				opts={options}
				plugins={plugins}
				className="w-full max-w-full"
			>
				<CarouselContent>
					{data.map((item, idx) => (
						<CarouselItem
							key={item.id}
							onClick={() => handleSelect(idx)}
							className="basis-1/3s"
						>
							<div
								className={cls(
									"transform transition-transform duration-500",
									idx === selectedIndex ? "order-1" : "translate-y-3",
								)}
							>
								<NovelBooks
									src={item.covers ? item.covers["300"] : IMAGE_NOVEL_DEFAULT}
								/>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
			<Card className="mt-4 space-y-4 bg-transparent border-none shadow-none">
				<CardContent className="flex flex-col flex-grow px-0 pb-0 space-y-2">
					<Link href="/">
						<CardTitle className="text-lg hover:text-destructive line-clamp-2">
							{capitalizeFirstLetter(data[selectedIndex]?.title)}
						</CardTitle>
					</Link>
					<Link href="/">
						<CardDescription className="text-sm font-medium hover:text-destructive text-foreground/80">
							Tác giả: {data[selectedIndex]?.author.name}
						</CardDescription>
					</Link>
					<CardDescription className="text-sm text-center line-clamp-2">
						{data[selectedIndex]?.description ||
							"Chưa có mô tả cho cuốn sách này"}
					</CardDescription>
				</CardContent>
				<CardFooter className="flex justify-center">
					<Link
						href={HREF_NOVELS_DETAILS(data[selectedIndex]?.slug)}
						size="lg"
						variant="destructive"
					>
						<Icons.sparkles size={16} className="mr-2" />
						<span>Khám phá ngay</span>
					</Link>
				</CardFooter>
			</Card>
		</>
	);
}
