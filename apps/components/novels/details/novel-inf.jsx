"use client";
import { Icons } from "@/components/icons";
import { Link } from "@/components/primitives/link-button";
import { Button } from "@/components/primitives/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/primitives/ui/card";
import { NovelBooks } from "@/components/visuals/novel-books";
import { labelVariants } from "@/themes/twv";
import capitalizeFirstLetter from "@/utils/cap-first-letter";
import { cls } from "@/utils/cn-classes";
import { IMAGE_NOVEL_DEFAULT } from "@/utils/constants";
import { formatDate } from "@/utils/format-date";

export function NovelInf({ detail, first_chapter, latest_chapter }) {
	const status =
		detail.status === "ONGOING"
			? "Đang ra"
			: detail.status === "PAUSED"
				? "Tạm dừng"
				: "Hoàn thành";
	const props = detail.props ? `(${detail.props})` : "";

	return (
		<Card className="flex items-center flex-grow bg-transparent border-none shadow-none">
			<CardHeader className="pl-0">
				<NovelBooks
					src={detail.covers ? detail.covers["600"] : IMAGE_NOVEL_DEFAULT}
					alt={detail.title}
					size="xl"
				/>
			</CardHeader>
			<CardContent className="content-center h-full px-0 pt-6 space-y-3 grow">
				{/* Title - Tên truyện */}
				<CardTitle className={cls("truncate", labelVariants({ size: "xl" }))}>
					{capitalizeFirstLetter(detail.title)}
					<span className="text-sm text-foreground/60"> {props}</span>
				</CardTitle>
				{/* Author & Updated - Tác giả & Được chỉnh sửa */}
				<div className="flex space-x-3">
					<CardDescription>
						<span className="text-foreground/90">Tác giả:</span>{" "}
						<Link href="#" className="text-foreground/90">
							{detail.author.name}
						</Link>
					</CardDescription>
					<CardDescription>
						<span className="mr-1 text-foreground/90">Trạng thái:</span>
						<span>{status}</span>
					</CardDescription>
					<CardDescription className="text-foreground/60">
						Được chỉnh sửa: {formatDate(detail.updatedAt)}
					</CardDescription>
				</div>
				{/* Tags - Thẻ */}
				<CardDescription className="flex flex-wrap items-center gap-2">
					{detail.tags.length > 0 ? (
						detail.tags.map((tag) => (
							<Link
								key={tag.id}
								href="/"
								size="sm"
								variant="outline"
								className="rounded-xl"
							>
								{tag.name}
							</Link>
						))
					) : (
						<Link href="#" size="sm" variant="outline" className="rounded-xl">
							Null
						</Link>
					)}
				</CardDescription>
				{/* Nums - Số lượng */}
				<div className="flex space-x-3">
					<CardDescription className="text-xs font-medium">
						Tổng{" "}
						<span
							className={cls(
								"font-semibold text-foreground/80",
								labelVariants({ size: "lg" }),
							)}
						>
							{detail._count.chapters}
						</span>{" "}
						Chương
					</CardDescription>
					<CardDescription className="text-xs font-medium">
						<span
							className={cls(
								"font-semibold text-foreground/80",
								labelVariants({ size: "lg" }),
							)}
						>
							{detail._count.reviews}
						</span>{" "}
						Lượt truy cập
					</CardDescription>
					<CardDescription className="text-xs font-medium">
						<span
							className={cls(
								"font-semibold text-foreground/80",
								labelVariants({ size: "lg" }),
							)}
						>
							{detail._count.words}
						</span>{" "}
						Từ
					</CardDescription>
				</div>
				{/* Chapter - Chương */}
				<CardDescription className="line-clamp-2 text-foreground/80">
					<span className="mr-1 text-foreground">Chương mới nhất:</span>
					{latest_chapter.no > 0 ? (
						<span>
							Chương {latest_chapter.no}: {latest_chapter.title}
						</span>
					) : (
						<span>Chưa có chương nào</span>
					)}
				</CardDescription>
				{/* Button */}
				<CardDescription className="flex flex-wrap items-center gap-2 pt-6">
					{first_chapter.no > 0 && (
						<Link
							href={`/novel/${detail.slug}/chapter-${first_chapter.no}-${first_chapter.id}`}
							size="lg"
							className="bg-gradient-to-l from-[#f95738] to-[#ee964b] text-white rounded-2xl"
						>
							Đọc ngay
						</Link>
					)}
					{latest_chapter.no > 0 && (
						<Link
							href={`/novel/${detail.slug}/chapter-${latest_chapter.no}-${latest_chapter.id}`}
							size="lg"
							className="bg-gradient-to-l from-[#415a77] to-[#778da9] text-white rounded-2xl"
						>
							Đọc chương mới nhất
						</Link>
					)}
					<Button size="lg" variant="outline" className="rounded-2xl">
						Thêm vào thư viện
					</Button>
				</CardDescription>
			</CardContent>
		</Card>
	);
}
