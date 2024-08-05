"use client";

import * as React from "react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/primitives/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/primitives/ui/carousel";
import { useCarousel } from "@/hooks/use-carousel";

import { FestivalItem } from "./_comps/festival-item";

const data = [
  {
    id: 73254713,
    name: "Thanh trư ẩn cư",
    image: "https://static.zongheng.com/upload/recommend/75/36/7536bcb9f60f08730ad15d913c41ccaf.jpeg",
  },
  {
    id: 46836486,
    name: "Chư thiên vạn giới",
    image: "https://static.zongheng.com/upload/recommend/04/dd/04dd487bc2c7029ca7c21daa0c2442c9.jpeg",
  },
  {
    id: 2123214,
    name: "Thanh đồng đại lục",
    image: "https://static.zongheng.com/upload/recommend/b0/f3/b0f36ea45b22703ba1f8a59d6b03beb2.jpeg",
  },
  {
    id: 346437,
    name: "Vô địch đan dược sư",
    image: "https://static.zongheng.com/upload/recommend/75/36/7536bcb9f60f08730ad15d913c41ccaf.jpeg",
  },
  {
    id: 1982464,
    name: "Thiên hạ đệ nhất sư",
    image: "https://static.zongheng.com/upload/recommend/b0/f3/b0f36ea45b22703ba1f8a59d6b03beb2.jpeg",
  },
  {
    id: 32343423,
    name: "Đại chiến thần giới",
    image: "https://static.zongheng.com/upload/recommend/75/36/7536bcb9f60f08730ad15d913c41ccaf.jpeg",
  },
  {
    id: 7667975646,
    name: "Thể biến dị kỳ",
    image: "https://static.zongheng.com/upload/recommend/04/dd/04dd487bc2c7029ca7c21daa0c2442c9.jpeg",
  },
  {
    id: 1246479000,
    name: "Huyền quang đại lục",
    image: "https://static.zongheng.com/upload/recommend/b0/f3/b0f36ea45b22703ba1f8a59d6b03beb2.jpeg",
  },
];

export function FestivalCarousel() {
  const { setApi, options, plugins, selectedIndex, handleSelect } = useCarousel({
    delay: 5000,
    opts: { slidesToScroll: 1 },
  });

  return (
    <Carousel
      setApi={setApi}
      opts={options}
      plugins={plugins}
      className="relative w-full max-w-full mt-12 rounded-xl overflow-hidden"
    >
      <CarouselContent>
        {data.map((item) => (
          <CarouselItem key={item.id}>
            <FestivalItem item={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute bottom-0 left-0 right-0 pt-8 bg-gradient-to-t from-black via-black/60 to-transparent">
        <div className="flex items-start justify-between px-6 py-4">
          <div className="space-y-3">
            <span className="text-base font-medium text-white line-clamp-1">{data[selectedIndex]?.name}</span>
            <span className="flex items-center space-x-1.5">
              {data.map((_, idx) => (
                <Button key={idx} size onClick={() => handleSelect(idx)} className="bg-transparent">
                  {selectedIndex === idx ? (
                    <Icons.sparkles size={16} className="text-white" />
                  ) : (
                    <span className="w-2 h-2 bg-white/60 rounded-full" />
                  )}
                </Button>
              ))}
            </span>
          </div>
          <div className="absolute bottom-0 right-0 flex-none w-10 h-full mx-10">
            <CarouselPrevious className="bg-white dark:bg-border" />
            <CarouselNext className="bg-white dark:bg-border" />
          </div>
        </div>
      </div>
    </Carousel>
  );
}
