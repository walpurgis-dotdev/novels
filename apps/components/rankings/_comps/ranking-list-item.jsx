import { Link } from "@/components/primitives/link-button";
import { Button } from "@/components/primitives/ui/button";
import {
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/primitives/ui/card";
import { IconImage } from "@/components/visuals/icon/icon-image";
import { IconNumber } from "@/components/visuals/icon/icon-number";
import { NovelBooks } from "@/components/visuals/novel-books";
import capitalizeFirstLetter from "@/utils/cap-first-letter";
import { IMAGE_NOVEL_DEFAULT } from "@/utils/constants";
import { getRankingLabel } from "@/utils/get-ranking-label";

export function RankingListItem({ item, num }) {
	return (
		<CardContent
			key={item.id}
			className="flex items-center px-8 py-0 space-x-6"
		>
			{num < 4 ? (
				<IconImage
					src={getRankingLabel(num)}
					alt={`Top ${num}`}
					width={40}
					height={40}
				/>
			) : (
				<IconNumber
					number={num < 10 ? `0${num}` : num}
					size={18}
					width={40}
					height={40}
				/>
			)}

			<div key={item.id} className="flex flex-1 space-x-4 group">
				<Link href={`novel/${item.slug}`} className="w-auto h-auto">
					<NovelBooks
						src={item.covers ? item.covers[300] : IMAGE_NOVEL_DEFAULT}
						size="sm"
					/>
				</Link>
				<div className="flex flex-col py-2">
					<div className="flex flex-col flex-grow space-y-1">
						<CardTitle className="text-base leading-6 line-clamp-1">
							{capitalizeFirstLetter(item.title)}
						</CardTitle>
						<CardDescription className="text-xs">
							<span className="hover:text-destructive">
								Tác giả: {item.author.name ?? "Tác giả không rõ"}
							</span>
							&nbsp;&sdot;&nbsp;
							<span className="hover:text-destructive">{item.genre.name}</span>
							&nbsp;&sdot;&nbsp;
							<span className="hover:text-destructive">Được đăng nhiều kỳ</span>
						</CardDescription>
						<CardDescription className="font-medium line-clamp-2">
							{item.description ??
								"Một cuốn sách hay, một cuốn sách đáng đọc, một cuốn sách đáng mua, một cuốn sách đáng sở hữu."}
						</CardDescription>
					</div>
					<CardDescription className="text-xs">
						Chương mới nhất:&nbsp;&quot;Chương 734:&quot;&nbsp;Siêu cấp cơ giáp
					</CardDescription>
				</div>
			</div>
			<div className="inline-flex flex-col items-center">
				<CardDescription className="text-xs text-muted-foreground">
					<span className="text-base font-semibold text-destructive">
						32752
					</span>{" "}
					Truy cập
				</CardDescription>
				<Link
					href={`novel/${item.slug}`}
					size="lg"
					className="bg-destructive/10 text-destructive"
				>
					Chi tiết sách
				</Link>
				<Button
					variant="link"
					size="sm"
					className="text-xs font-normal text-muted-foreground hover:text-destructive hover:no-underline"
				>
					Thêm vào giá sách
				</Button>
			</div>
		</CardContent>
	);
}
