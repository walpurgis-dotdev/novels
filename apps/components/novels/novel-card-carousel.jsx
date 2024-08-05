import { Card } from "@/components/primitives/ui/card";
import { cls } from "@/utils/cn-classes";

import { ListCarousel } from "./_comps/list-carousel";

export function NovelCardCarousel({ data }) {
  return (
    <Card
      className={cls(
        "relative shrink-0 border-none shadow-none w-72 mt-12",
        "bg-[url('https://revo.zongheng.com/www/2024/images/c4d794c.png')] bg-top bg-cover bg-no-repeat",
        "dark:bg-none dark:ring-1 dark:ring-border",
      )}
    >
      <div className="absolute left-0 w-full h-6 -top-12">
        <span className="text-lg font-semibold text-foreground">Bộ sách đã kết thúc</span>
      </div>
      <div className="py-6 mx-4">
        <ListCarousel data={data} />
      </div>
    </Card>
  );
}
