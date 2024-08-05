import { CardContent, CardDescription, CardTitle } from "@/components/primitives/ui/card";
import { NovelBooks } from "@/components/visuals/novel-books";
import capitalizeFirstLetter from "@/utils/cap-first-letter";
import { IMAGE_NOVEL_DEFAULT } from "@/utils/constants";

export function ItemNovels({ item }) {
  return (
    <CardContent className="flex p-0 space-x-2">
      <NovelBooks src={item.covers ? item.covers["300"] : IMAGE_NOVEL_DEFAULT} size="sm" />
      <div className="flex flex-col py-2">
        <div className="flex flex-col flex-grow space-y-1">
          <CardTitle className="text-base line-clamp-1">{capitalizeFirstLetter(item.title)}</CardTitle>
          <CardDescription className="text-sm text-foreground/60 line-clamp-2">
            {item.description || "Không có mô tả"}
          </CardDescription>
        </div>
        <CardDescription className="text-sm text-foreground/80">{item.author.name}</CardDescription>
      </div>
    </CardContent>
  );
}
