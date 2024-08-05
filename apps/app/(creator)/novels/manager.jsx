"use client";

import { Icons } from "@/components/icons";
import { Badge } from "@/components/primitives/ui/badge";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/primitives/ui/breadcrumb";
import { Button } from "@/components/primitives/ui/button";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/primitives/ui/card";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/primitives/ui/popover";
import { Separator } from "@/components/primitives/ui/separator";
import { Spinner } from "@/components/primitives/ui/spinner";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/primitives/ui/table";
import { NovelBooks } from "@/components/visuals/novel-books";
import { getNovelAnalytics } from "@/services/analytic.service";
import { getChapterByNovelId } from "@/services/chapter.service";
import { useActionStore } from "@/stores/use-action-store";
import { useTokenStore } from "@/stores/use-user-store";
import { labelVariants } from "@/themes/twv";
import capitalizeFirstLetter from "@/utils/cap-first-letter";
import { cls } from "@/utils/cn-classes";
import { IMAGE_NOVEL_DEFAULT } from "@/utils/constants";
import { formatDate } from "@/utils/format-date";
import { getNovelStatusLabel } from "@/utils/get-novel-status-label";
import { typeProps } from "@/utils/type-props";
import { useQuery } from "@tanstack/react-query";
import { SlashIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";

const renderNovelAnalytics = (analyticData) => (
	<div className="flex space-x-3">
		<CardDescription className="text-xs font-medium">
			Tổng{" "}
			<span
				className={cls(
					"font-semibold text-foreground/80",
					labelVariants({ size: "lg" }),
				)}
			>
				{analyticData?.chapterCount}
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
				{analyticData?.viewsCount}
			</span>{" "}
			Lượt xem
		</CardDescription>
		<CardDescription className="text-xs font-medium">
			<span
				className={cls(
					"font-semibold text-foreground/80",
					labelVariants({ size: "lg" }),
				)}
			>
				{analyticData?.sumWords}
			</span>{" "}
			Từ
		</CardDescription>
		<CardDescription className="text-xs font-medium">
			<span
				className={cls(
					"font-semibold text-foreground/80",
					labelVariants({ size: "lg" }),
				)}
			>
				{analyticData?.voteCount}
			</span>{" "}
			Lượt bình chọn
		</CardDescription>
		<CardDescription className="text-xs font-medium">
			<span
				className={cls(
					"font-semibold text-foreground/80",
					labelVariants({ size: "lg" }),
				)}
			>
				{analyticData?.favoriteCount}
			</span>{" "}
			Người yêu thích
		</CardDescription>
		<CardDescription className="text-xs font-medium">
			<span
				className={cls(
					"font-semibold text-foreground/80",
					labelVariants({ size: "lg" }),
				)}
			>
				{analyticData?.commentsCount}
			</span>{" "}
			Lượt bình luận
		</CardDescription>
	</div>
);

const renderNovelTags = (tags) =>
	tags.length > 0
		? tags.map((tag) => (
				<Badge
					key={tag.id}
					variant="outline"
					className="py-1 font-light select-none"
				>
					{tag.name}
				</Badge>
			))
		: "Null";

const addressBar = (
	selectedNovel,
	setAction,
	setSelectedNovel,
	isLoadingData,
) => {
	return (
		<Breadcrumb className="p-2">
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink
						className="cursor-pointer"
						onClick={() => {
							setSelectedNovel(null);
							setAction(null);
						}}
					>
						Quản lý
					</BreadcrumbLink>
				</BreadcrumbItem>
				<Icons.chevronRight className="w-4 h-4 -mx-2" />
				<BreadcrumbItem>
					<BreadcrumbPage>
						{isLoadingData
							? "Đang truy xuất dữ liệu"
							: capitalizeFirstLetter(selectedNovel?.title) || "Không xác định"}
					</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export default function Manager() {
	const { selectedNovel, setAction, setSelectedNovel } = useActionStore();
	const { accessToken } = useTokenStore();

	// Query to get novel analytics
	const {
		data: analyticData,
		isPending: isPendingAnalytics,
		isLoading: isLoadingAnalytics,
	} = useQuery({
		queryKey: ["analytics", { novelId: selectedNovel?.id }],
		queryFn: async ({ queryKey }) => {
			const [, { novelId }] = queryKey;
			const { data } = await getNovelAnalytics({ novelId, accessToken });
			return data;
		},
		enabled: !!selectedNovel,
		refetchOnWindowFocus: false,
	});

	// Query to get all chapters
	const {
		data: chaptersData,
		isPending: isPendingChapters,
		isLoading: isLoadingChapters,
	} = useQuery({
		queryKey: ["chapters", { novelId: selectedNovel?.id }],
		queryFn: async ({ queryKey }) => {
			const [, { novelId }] = queryKey;
			const data = await getChapterByNovelId(novelId);
			return data;
		},
		enabled: !!selectedNovel,
		refetchOnWindowFocus: false,
	});

	const isLoadingData =
		isPendingAnalytics ||
		isPendingChapters ||
		isLoadingAnalytics ||
		isLoadingChapters;

	if (!selectedNovel)
		return (
			<div className="flex flex-col items-center justify-between mt-auto">
				<h1 className="text-2xl font-semibold">Không thể tải dữ liệu...</h1>
				<Button
					className="px-4 py-2 text-white bg-blue-500 rounded-md"
					onClick={() => setAction(null)}
				>
					Quay lại
				</Button>
			</div>
		);

	return (
		<>
			<div className="flex items-center justify-between">
				{addressBar(selectedNovel, setAction, setSelectedNovel, isLoadingData)}
				<Button asChild>
					<Link href={`/novels/${selectedNovel.id}/create`}>Thêm mới</Link>
				</Button>
			</div>
			{/* // detail card */}
			<Card className="border-none shadow-none rounded-xl dark:ring-1 dark:ring-border">
				<CardHeader className="flex-row space-y-0">
					<NovelBooks
						src={
							selectedNovel.covers
								? selectedNovel.covers["600"]
								: IMAGE_NOVEL_DEFAULT
						}
						alt={selectedNovel.title}
						size="xl"
					/>
					<div className="p-4 space-y-1.5 grow">
						{/* Title - Tên truyện */}
						<CardTitle
							className={cls("truncate", labelVariants({ size: "xl" }))}
						>
							{capitalizeFirstLetter(selectedNovel?.title)}
						</CardTitle>
						<CardDescription>
							<b className="text-foreground/90">Tác giả:</b>{" "}
							<span className="text-foreground/90">
								{selectedNovel?.Author?.name || "Không xác định"}
							</span>
						</CardDescription>
						<CardDescription>
							<b className="mr-1 text-foreground/90">Trạng thái:</b>
							<span className="text-foreground/90">
								{getNovelStatusLabel(selectedNovel)}
							</span>
						</CardDescription>

						{/* Tags - Thẻ */}
						<CardDescription className="flex flex-wrap items-center gap-2">
							{renderNovelTags(selectedNovel?.tags)}
						</CardDescription>
						<CardDescription className="text-foreground/90">
							<b>Phân loại:</b>{" "}
							{typeProps.find((prop) => prop.value === selectedNovel?.props)
								?.label || "Không xác định"}
						</CardDescription>
						<CardDescription className="text-foreground/90 line-clamp-2">
							<b>Mô tả:</b> {selectedNovel?.description || "Không có mô tả"}
						</CardDescription>
						<CardDescription className="text-foreground/60">
							Cập nhật lần cuối: {formatDate(selectedNovel.updatedAt)}
						</CardDescription>
						{/* Nums - Số lượng */}
						{isLoadingData ? <Spinner /> : renderNovelAnalytics(analyticData)}
					</div>
				</CardHeader>
			</Card>
			{/* // table */}
			<Card className="mt-4 border-none shadow-none rounded-xl dark:ring-1 dark:ring-border">
				<ChapterTable data={chaptersData} />
			</Card>
		</>
	);
}

const ChapterTable = ({ data }) => {
	const [isReversed, setIsReversed] = React.useState(false);

	const sortedData = isReversed ? [...data].reverse() : data;

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[200px]">Số chương</TableHead>
					<TableHead>
						<span className="flex items-center space-x-1">
							Tiêu đề chương
							<Button
								variant="link"
								size="icon"
								className="w-6 h-6 rounded-full hover:bg-border"
								onClick={() => {
									setIsReversed((prev) => !prev);
								}}
							>
								{isReversed ? (
									<Icons.arrowDownNarrowWide size={16} />
								) : (
									<Icons.arrowUpWideNarrow size={16} />
								)}
							</Button>
						</span>
					</TableHead>
					<TableHead className="text-right">Ngày cập nhật</TableHead>
					<TableHead className="text-center">Hành động</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{sortedData?.length === 0 && (
					<TableRow>
						<TableCell colSpan={3}>
							<div className="flex items-center justify-center p-4 text-foreground/60">
								Không có dữ liệu
							</div>
						</TableCell>
					</TableRow>
				)}
				{sortedData?.map((row) => (
					<TableRow key={row.id}>
						<TableCell>
							<CardDescription className="text-sm font-medium">
								【{row.chapterNo}】
							</CardDescription>
						</TableCell>
						<TableCell>
							<CardDescription className="text-sm font-medium">
								{row.title}
							</CardDescription>
						</TableCell>
						<TableCell>
							<CardDescription className="text-sm font-medium text-right">
								{formatDate(row.createdAt)}
							</CardDescription>
						</TableCell>
						<TableCell className="text-center">
							<Popover>
								<PopoverTrigger>
									<Icons.penTool size={16} />
								</PopoverTrigger>
								<PopoverContent>
									<Button
										size="sm"
										variant="outline"
										onClick={() => {
											console.log("Edit chapter");
										}}
										className="justify-start w-full space-x-2 bg-transparent border-none rounded-lg hover:bg-accent"
									>
										<Icons.sparkles
											size={14}
											className="text-muted-foreground"
										/>
										<span>Xoá chương</span>
									</Button>
								</PopoverContent>
							</Popover>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
