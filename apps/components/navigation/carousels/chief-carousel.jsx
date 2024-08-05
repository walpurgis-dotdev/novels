"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardTitle } from "@/components/primitives/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/primitives/ui/carousel";
import { NovelBooks } from "@/components/visuals/novel-books";
import { useCarousel } from "@/hooks/use-carousel";
import capitalizeFirstLetter from "@/utils/cap-first-letter";
import { cls } from "@/utils/cn-classes";
import { IMAGE_NOVEL_DEFAULT } from "@/utils/constants";

export function ChiefCarousel({ data }) {
  const { setApi, options, plugins, selectedIndex } = useCarousel({ delay: 10000 });

  return (
    <Card className="relative border-none overflow-hidden shadow-none mt-12">
      <Image
        src={data[selectedIndex].covers ? data[selectedIndex].covers["600"] : IMAGE_NOVEL_DEFAULT}
        className="absolute object-cover filter blur-[30px]"
        fill
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      <Carousel setApi={setApi} opts={options} plugins={plugins} className="group w-full max-w-[1200px] mx-auto py-14">
        <CarouselContent>
          {data?.map((item, idx) => (
            <Link key={item.id} href={`/novel/${item.slug}`}>
              <CarouselItem key={idx} className="basis-1/6">
                <NovelBooks
                  src={item.covers ? item.covers["300"] : IMAGE_NOVEL_DEFAULT}
                  size="lg"
                  className={cls(
                    "transform transition-transform duration-500",
                    idx === selectedIndex ? "order-1" : "scale-75",
                  )}
                />
                <CardTitle
                  className={cls(
                    "text-center text-base font-medium mt-4 transform transition-transform duration-500",
                    idx === selectedIndex ? "order-1" : "-translate-y-6",
                  )}
                >
                  {capitalizeFirstLetter(item.title)}
                </CardTitle>
              </CarouselItem>
            </Link>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden group-hover:flex justify-center left-1" />
        <CarouselNext className="hidden group-hover:flex justify-center right-1" />
      </Carousel>
    </Card>
  );
}
