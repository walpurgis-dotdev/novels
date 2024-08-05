"use client";

import Link from "next/link";
import { Icons } from "@/components/icons";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/primitives/ui/card";
import { IconImage } from "@/components/visuals/icon/icon-image";
import { IconNumber } from "@/components/visuals/icon/icon-number";
import { NovelBooks } from "@/components/visuals/novel-books";
import { useHovered } from "@/hooks/use-hovered";
import capitalizeFirstLetter from "@/utils/cap-first-letter";
import { IMAGE_NOVEL_DEFAULT } from "@/utils/constants";
import { getRankingLabel } from "@/utils/get-ranking-label";
import { getTypingLabel } from "@/utils/get-typing-label";

export function TopType({ data, type }) {
  const { hovered, handleHover } = useHovered();

  return (
    <Card
      className="pt-20 border-none shadow-none cursor-pointer shrink-0 w-72"
      style={{
        backgroundImage: `url('/assets/ranks/i564x240/${type}.png')`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
      }}
    >
      <section className="min-h-[200px] space-y-2 pb-4">
        {data.length &&
          data.slice(0, 10).map((item, idx) => (
            // item-ranking.jsxs
            <Link key={item.id} href={`/novel/${item.slug}`} className="flex flex-col">
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
                    <CardDescription className="text-xs">{item.chapters}</CardDescription>
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
                          {item.chapters} {getTypingLabel(type)}
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
      <CardFooter className="justify-end">
        <Link href="/rank" className="group flex items-center space-x-0.5 text-xs font-normal text-muted-foreground">
          <span>Nhiều hơn</span>
          <Icons.chevronRight size={14} className="group-hover:animate-jumpR" />
        </Link>
      </CardFooter>
    </Card>
  );
}
