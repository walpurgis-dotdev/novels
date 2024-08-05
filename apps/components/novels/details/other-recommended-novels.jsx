import Link from "next/link";
import { Icons } from "@/components/icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/primitives/ui/card";
import { Separator } from "@/components/primitives/ui/separator";

import { NovelsItem } from "./_comps/novels-item";

export function OtherRecommendedNovels({ data }) {
  return (
    <Card className="border-none shadow-none dark:ring-1 dark:ring-border">
      <CardHeader>
        <div className="flex items-center justify-between space-x-2">
          <CardTitle className="text-base line-clamp-1">Khuyến khích bởi</CardTitle>
          <Link href="/profile/d.wxs" className="group flex flex-shrink-0 items-center space-x-1">
            <CardDescription className="text-xs">Khám phá</CardDescription>
            <Icons.chevronRight size={16} className="group-hover:animate-jumpR" />
          </Link>
        </div>
        <CardDescription className="text-xs">Các tác phẩm được khuyến khích mạnh bởi biên tập viên.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Separator />
        {data.map((item) => (
          <Link key={item.id} href={{ pathname: `/novel/${item.slug}`, query: { id: item.id } }}>
            <NovelsItem item={item} />
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
