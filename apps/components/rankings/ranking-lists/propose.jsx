"use client";

import { Card } from "@/components/primitives/ui/card";

import { RankingListItem } from "../_comps/ranking-list-item";

export function Propose({ data, type }) {
  return (
    <Card
      className="cursor-pointer border-none shadow-none shrink-0 dark:ring-1 dark:ring-border w-full pt-32 pb-20"
      style={{
        backgroundImage: `url('/assets/ranks/i1896x310/${type}.png')`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
      }}
    >
      <section className="space-y-8">
        {data.map((item, idx) => {
          const num = idx + 1;
          return <RankingListItem key={item.id} item={item} num={num} />;
        })}
      </section>
    </Card>
  );
}
