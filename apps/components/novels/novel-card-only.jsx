import Link from "next/link";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/primitives/ui/card";
import capitalizeFirstLetter from "@/utils/cap-first-letter";
import { cls } from "@/utils/cn-classes";
import { HREF_NOVELS_DETAILS, IMAGE_NOVEL_DEFAULT } from "@/utils/constants";

import { NovelBooks } from "../visuals/novel-books";

export function NovelCardOnly({ data }) {
  return (
    <Card
      className={cls(
        "relative shrink-0 cursor-pointer border-none shadow-none w-72 mt-32",
        "bg-[url('https://revo.zongheng.com/www/2024/images/c4d794c.png')] bg-top bg-cover bg-no-repeat",
        "dark:bg-none dark:ring-1 dark:ring-border",
      )}
    >
      <div className="absolute left-0 w-full h-6 -top-32 text-nowrap">
        <span className="text-lg font-bold text-foreground">Được tổng biên tập khuyến nghị mạnh mẽ</span>
      </div>
      {data?.map((item) => (
        <Link key={item.id} href={HREF_NOVELS_DETAILS(item.slug)}>
          <div className="text-center pt-44">
            <NovelBooks
              src={item.covers ? item.covers["600"] : IMAGE_NOVEL_DEFAULT}
              size="lg"
              className="absolute transform -translate-x-1/2 -top-20 left-1/2"
            />
            <CardContent className="space-y-3">
              <CardTitle className="text-base line-clamp-1">{capitalizeFirstLetter(item.title)}</CardTitle>
              <CardDescription className="text-sm font-medium text-foreground/80">
                Tác giả: {item.author.name}
              </CardDescription>
              <CardDescription className="text-sm line-clamp-2">
                {item.description || "Chưa có mô tả cho cuốn sách này"}
              </CardDescription>
            </CardContent>
          </div>
        </Link>
      ))}
    </Card>
  );
}
