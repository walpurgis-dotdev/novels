"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/primitives/ui/card";
import { IconImage } from "@/components/visuals/icon/icon-image";
import { IconNumber } from "@/components/visuals/icon/icon-number";
import { NovelBooks } from "@/components/visuals/novel-books";
import { useHovered } from "@/hooks/use-hovered";
import capitalizeFirstLetter from "@/utils/cap-first-letter";
import { cls } from "@/utils/cn-classes";
import { HREF_NOVELS_DETAILS, IMAGE_NOVEL_DEFAULT } from "@/utils/constants";
import { getRankingLabel } from "@/utils/get-ranking-label";
import { getTypingLabel } from "@/utils/get-typing-label";

export function TopRating({ data, type, children }) {
  const { hovered, handleHover } = useHovered();

  return (
    <Card
      className={cls(
        "relative shrink-0 cursor-pointer border-none shadow-none w-72 mt-12",
        "bg-[url('https://revo.zongheng.com/www/2024/images/c4d794c.png')] bg-top bg-cover bg-no-repeat",
        "dark:bg-none dark:ring-1 dark:ring-border",
      )}
    >
      {children}
      {type !== "notices" && (
        <div
          className="absolute w-full h-6 -top-12 left-3"
          style={{
            backgroundImage: `url('/assets/tops/${type}.png')`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}
      <section className="h-full min-h-[200px] space-y-2 py-4">
        {data?.slice(0, 10).map((item, idx) => (
          <Link key={item.id} href={HREF_NOVELS_DETAILS(item.slug)} className="flex flex-col">
            <CardContent className="flex py-0" onMouseEnter={() => handleHover(item.id)}>
              {idx < 3 ? (
                <IconImage src={getRankingLabel(idx + 1)} alt={`Top ${idx + 1}`} />
              ) : (
                <IconNumber number={idx < 9 ? `0${idx + 1}` : idx + 1} />
              )}

              {hovered !== item.id && (idx !== 0 || hovered !== null) && (
                <div className="flex items-center justify-between flex-1 space-x-3">
                  <CardTitle className="text-sm font-normal leading-8 line-clamp-1">
                    {capitalizeFirstLetter(item.title)}
                  </CardTitle>
                  <CardDescription className="text-xs">{item._count.chapters}</CardDescription>
                </div>
              )}
              {(hovered === item.id || (idx === 0 && hovered === null)) && (
                <div className="flex items-start justify-between flex-1">
                  <div className="flex flex-col space-y-1">
                    <CardTitle className="text-sm font-normal leading-8 line-clamp-1">
                      {capitalizeFirstLetter(item.title)}
                    </CardTitle>
                    <div className="flex flex-col space-y-0.5">
                      <CardDescription className="text-xs hover:text-destructive">{item.genre.name}</CardDescription>
                      <CardDescription className="text-xs">
                        {item._count.chapters} {getTypingLabel(type)}
                      </CardDescription>
                    </div>
                  </div>
                  <NovelBooks src={item.covers ? item.covers["150"] : IMAGE_NOVEL_DEFAULT} size="zs" />
                </div>
              )}
            </CardContent>
          </Link>
        ))}
      </section>
    </Card>
  );
}
