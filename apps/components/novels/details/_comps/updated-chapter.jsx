import { Icons } from "@/components/icons";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/primitives/ui/card";
import { formatDate } from "@/utils/format-date";
import Link from "next/link";

export function UpdatedChapter({ data, slug }) {
	return (
		<Link href={`/novel/${slug}/chapter-${data.chapterNo}-${data.id}`}>
			<Card className="flex justify-between mb-4 cursor-pointer group rounded-xl">
				<CardHeader className="flex-row py-3 pl-4 space-x-3 space-y-0">
					<CardTitle className="text-base shrink-0">Đã cập nhật lên</CardTitle>
					<CardDescription className="text-base font-semibold hover:text-destructive line-clamp-1">
						{data?.chapterNo && `Chương ${data.chapterNo}`}
						{data?.title && `: ${data.title}`}
					</CardDescription>
				</CardHeader>
				<CardFooter className="flex-shrink-0 py-4 pr-4">
					<CardDescription className="hidden text-xs font-semibold group-hover:block group-hover:text-destructive">
						Đọc ngay bây giờ
					</CardDescription>
					<CardDescription className="block text-xs font-semibold group-hover:hidden">
						{formatDate(data?.createdAt)}
					</CardDescription>
					<Icons.chevronRight
						size={16}
						className="transform group-hover:animate-jumpR"
					/>
				</CardFooter>
			</Card>
		</Link>
	);
}
