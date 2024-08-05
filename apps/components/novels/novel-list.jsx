import Link from "next/link";
import { HREF_NOVELS_DETAILS } from "@/utils/constants";

import { Card } from "../primitives/ui/card";
import { ItemNovels } from "./_comps/item-novels";

export function NovelList({ data }) {
  return (
    <Card className="relative mt-12 bg-transparent border-none shadow-none cursor-pointer">
      <div className="grid grid-cols-2 gap-x-3 gap-y-10">
        {data?.map((item) => (
          <Link key={item.id} href={HREF_NOVELS_DETAILS(item.slug)}>
            <ItemNovels item={item} />
          </Link>
        ))}
      </div>
    </Card>
  );
}
