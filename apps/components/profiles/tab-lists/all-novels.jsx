import { Link } from "@/components/primitives/link-button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/primitives/ui/card";
import { NovelBooks } from "@/components/visuals/novel-books";
import capitalizeFirstLetter from "@/utils/cap-first-letter";
import { IMAGE_NOVEL_DEFAULT } from "@/utils/constants";
import { formatDate } from "@/utils/format-date";

export function AllNovels({ item }) {
  const status = item.status === "ONGOING" ? "Đang tiến hành" : "Kết thúc";
  return (
    <Card className="flex items-center bg-transparent border-none shadow-none">
      <NovelBooks src={item.covers ? item.covers["300"] : IMAGE_NOVEL_DEFAULT} size="sm" />
      <CardHeader className="space-y-2 py-0">
        <div className="flex flex-col">
          <CardTitle className="text-base line-clamp-1">{capitalizeFirstLetter(item.title)}</CardTitle>
          <CardDescription className="text-xs">
            {status} | {item.genre.name}{" "}
          </CardDescription>
        </div>
        {/* Description */}
        <CardDescription className="flex-grow line-clamp-2">{item.description || "Không có mô tả"}</CardDescription>
        {/* Chapter */}
        <div className="flex items-center justify-between">
          <CardDescription className="text-xs font-medium line-clamp-1">
            <span>Chương mới nhất: </span>
            <span className="text-foreground">Chương {item._count.chapters}</span>
          </CardDescription>
          <CardDescription className="text-xs shrink-0">{formatDate(item.createdAt)}</CardDescription>
        </div>
      </CardHeader>
      <Link
        href={`/novel/${item.slug}`}
        size="sm"
        variant="outline"
        className="flex-shrink-0 border-destructive hover:bg-destructive/10 rounded-lg ml-auto"
      >
        <CardDescription className=" text-destructive">Đọc ngay bây giờ</CardDescription>
      </Link>
    </Card>
  );
}
