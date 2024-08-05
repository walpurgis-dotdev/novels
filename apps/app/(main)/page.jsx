import Link from "next/link";
import { ChiefCategories } from "@/components/categories/chief-categories";
import { ElCategories } from "@/components/categories/el-categories";
import { Icons } from "@/components/icons";
import { ChiefCarousel } from "@/components/navigation/carousels/chief-carousel";
import { FestivalCarousel } from "@/components/navigation/carousels/festival-carousel";
import { NovelCardCarousel } from "@/components/novels/novel-card-carousel";
import { NovelCardOnly } from "@/components/novels/novel-card-only";
import { NovelList } from "@/components/novels/novel-list";
import { Card, CardTitle } from "@/components/primitives/ui/card";
import { NovelBookshelfRankings } from "@/components/rankings/novel-bookshelf-rankings";
import { TopRating } from "@/components/rankings/ranking-tops/top-rating";
import { Ads } from "@/components/visuals/ads";
import { Banner } from "@/components/visuals/banner";
import { Shell } from "@/components/wrappers/shell-variants";
import { getNovels } from "@/services/novel.service";
import { adsFestival } from "@/utils/common";

export default async function Home() {
  // get novels sorted by different criteria
  const sorted_novels_by_new_chapter = (await getNovels({ limit: 10, sortBy: "newChapAt" }))?.data;
  const sorted_novels_by_new_novel = (await getNovels({ limit: 10, sortBy: "createdAt" }))?.data;
  const sorted_novels_by_favorite = (await getNovels({ limit: 10, sortBy: "favoriteCount" }))?.data;
  const sorted_novels_by_review = (await getNovels({ limit: 10, sortBy: "reviewCount" }))?.data;
  const sorted_novels_by_recommend = (await getNovels({ limit: 10, sortBy: "flowerCount" }))?.data;
  const sorted_novels_by_view_all = (await getNovels({ limit: 10, sortBy: "viewAll" }))?.data;

  // get novels by slug

  // filter novels
  const sorted_novels_by_finished = sorted_novels_by_view_all?.filter((novel) => novel.status === "COMPLETED");
  const sorted_novels_by_props = sorted_novels_by_view_all?.filter((novel) => novel.props?.includes("CHONLOC"));

  return (
    <>
      <Banner />
      <Shell as="div" className="w-full space-y-3 px-3 xl:px-0 py-0 md:py-0">
        <section className="relative -top-4 -mb-6">
          <ElCategories />
        </section>

        {/* festival */}
        <section className="flex gap-x-4">
          <ChiefCategories />
          <div className="space-y-4 grow">
            <FestivalCarousel />
            <div className="flex gap-x-4">
              {adsFestival.map((ads) => (
                <Link key={ads.id} href={ads.href} className="flex-grow">
                  <Ads key={ads} size={30} src={ads.image} />
                </Link>
              ))}
            </div>
          </div>
          <TopRating data={sorted_novels_by_new_novel} type="notices">
            <div className="absolute flex items-center h-6 -top-12 left-3">
              <Icons.bell size={16} />
              <div className="inline-block whitespace-nowrap overflow-hidden ml-2">
                <CardTitle className="text-sm font-medium animate-marquee">
                  Bộ truyện đang hot thời gian gần đây
                </CardTitle>
              </div>
            </div>
          </TopRating>
        </section>

        {/* editor recommendations */}
        <section className="flex gap-x-4">
          <NovelCardOnly data={sorted_novels_by_recommend?.slice(0, 1)} />
          <NovelList data={sorted_novels_by_recommend?.slice(1, 7)} />
          <TopRating data={sorted_novels_by_favorite} type="vote" />
        </section>

        {/* chief editor recommendations */}
        <section className="relative flex flex-col gap-x-4">
          <CardTitle className="absolute text-lg font-semibold">Khuyến nghị của biên tập viên</CardTitle>
          <ChiefCarousel data={sorted_novels_by_view_all} /> {/* sorted_novels_by_props */}
        </section>

        {/* classic finished books */}
        <section className="flex gap-x-4">
          <NovelCardCarousel data={sorted_novels_by_finished} />
          <div className="relative">
            <CardTitle className="absolute text-lg font-semibold">Thưởng thức sách</CardTitle>
            <NovelList data={sorted_novels_by_view_all?.slice(0, 6)} />
          </div>
          <TopRating data={sorted_novels_by_review} type="month" />
        </section>

        {/* bookshelf rankings */}
        <div className="w-[inherit] h-[inherit] gap-x-4">
          <NovelBookshelfRankings data={sorted_novels_by_view_all} />
        </div>
      </Shell>
    </>
  );
}
