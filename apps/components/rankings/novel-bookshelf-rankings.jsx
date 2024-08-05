import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/primitives/ui/tabs";

import { Icons } from "../icons";
import { TopType } from "./ranking-tops/top-type";

export function NovelBookshelfRankings({ data }) {
  // const sorted_by_nominations = data?.sort((a, b) => b._count.favorites - a._count.favorites);
  // const sorted_by_newly_released = data?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  // const sorted_by_number_of_words = data?.sort((a, b) => b._count.chapters - a._count.chapters);
  // const sorted_by_access = data?.sort((a, b) => b._count.comments - a._count.comments);
  return (
    <Tabs defaultValue="novels">
      <TabsList className="w-full text-center">
        <TabsTrigger className="uppercase font-semibold" value="novels">
          Xếp hạng lý tưởng của toàn bộ sách
        </TabsTrigger>
        <TabsTrigger className="uppercase font-sem" valufont-semibolde="coming-soon">
          Đang phát triển <Icons.sparkles size={18} className="ml-1" />
        </TabsTrigger>
      </TabsList>
      <TabsContent value="novels" className="flex justify-between mt-6">
        <TopType data={data} type={"nominations"} />
        <TopType data={data} type={"newly-released"} />
        <TopType data={data} type={"number-of-words"} />
        <TopType data={data} type={"access"} />
      </TabsContent>
      <TabsContent value="coming-soon" className="flex justify-center">
        <Icons.loaderCircle size={32} className="animate-spin" />
      </TabsContent>
    </Tabs>
  );
}
