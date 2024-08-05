"use client";

import { Link } from "@/components/primitives/link-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives/ui/card";
import { useGenreStore } from "@/stores/use-genre-store";
import { labelVariants } from "@/themes/twv";

// Đề xuất tương tự theo genre của truyện.
export function SimilarRecommendations({ data, novels }) {
  const { genres } = useGenreStore();
  // Kiểm tra genre của truyện và trả về genre tương ứng.
  const genre = genres.find((genre) => genre.id === novels.genre.id);

  return (
    <Card className="border-none shadow-none dark:ring-1 dark:ring-border">
      <CardHeader className="flex flex-row items-center justify-between space-x-2 space-y-0">
        <CardTitle className="shrink-0">Đề xuất tương tự</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {/* {similar_novels && similar_novels.length > 0 ? (
          similar_novels.map((item) => (
            <Link key={item.id} variant="outline" href={`/novel/${item.slug}`} size="sm" className={labelVariants()}>
              {item.genre.name}
            </Link>
          ))
        ) : (
          <div className="text-sm text-gray-500 dark:text-gray-400">Không có truyện nào tương tự</div>
        )} */}
        {genre ? (
          <Link variant="outline" href={`/novels?genre=${genre.id}`} size="sm" className={labelVariants()}>
            {genre.name}
          </Link>
        ) : (
          <div className="text-sm text-gray-500 dark:text-gray-400">Không có truyện nào tương tự</div>
        )}
      </CardContent>
    </Card>
  );
}
