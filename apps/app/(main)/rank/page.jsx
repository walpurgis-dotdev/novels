"use client";

import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { GenresFilter } from "@/components/genres-filter";
import { Icons } from "@/components/icons";
import { Card, CardHeader, CardTitle } from "@/components/primitives/ui/card";
import { Tabs, TabsContent } from "@/components/primitives/ui/tabs";
import { PropStatusFilter } from "@/components/props-status-filter";
import { TabListButton } from "@/components/rankings/_comps/tab-list-button";
import {
  Access,
  NovelEnded,
  NovelUpdate,
  Popular,
  Propose,
  ViewDay,
  ViewMonth,
  ViewWeek,
} from "@/components/rankings/ranking-lists";
import { SkeletonRankings } from "@/components/skeletons/skeleton-rankings";
import { TagsFilter } from "@/components/tags-filter";
import { Shell } from "@/components/wrappers/shell-variants";
import { getNovels } from "@/services/novel.service";
import { rankTabs } from "@/utils/common";
import { IMAGE_TYPE } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const tabContent = {
  popular: (data) => <Popular data={data} type={IMAGE_TYPE.popular} />,
  view_day: (data) => <ViewDay data={data} type={IMAGE_TYPE.view_day} />,
  view_week: (data) => <ViewWeek data={data} type={IMAGE_TYPE.view_week} />,
  view_month: (data) => <ViewMonth data={data} type={IMAGE_TYPE.view_month} />,
  review: (data) => <Access data={data} type={IMAGE_TYPE.review} />,
  recommend: (data) => <Propose data={data} type={IMAGE_TYPE.recommend} />,
  favorite: (data) => <NovelEnded data={data} type={IMAGE_TYPE.favorite} />,
  new_chap_at: (data) => <NovelUpdate data={data} type={IMAGE_TYPE.new_chap_at} />,
  created_at: (data) => <NovelUpdate data={data} type={IMAGE_TYPE.created_at} />,
  comment: (data) => <NovelUpdate data={data} type={IMAGE_TYPE.comment} />,
  chapter_count: (data) => <NovelUpdate data={data} type={IMAGE_TYPE.chapter_count} />,
};

export default function Page({ searchParams }) {
  const genres = useSearchParams().getAll("genres");
  const keyword = useSearchParams().get("keyword");
  const tags = useSearchParams().getAll("tags");
  const status = useSearchParams().getAll("status");
  const props = useSearchParams().getAll("props");
  const tabs = rankTabs.novelTabs;
  const [activeTab, setActiveTab] = useState(tabs.find((tab) => tab.value === searchParams?.tab)?.value || "popular");

  const currentTabData = useMemo(() => tabs.find((tab) => tab.value === activeTab), [activeTab, tabs]);

  const { data, isPending, isLoading, isError, error } = useQuery({
    queryKey: [
      "getNovelsSearch",
      {
        page: 1,
        sortBy: currentTabData?.sortBy,
        genres,
        keyword,
        tags,
        status,
        props,
      },
    ],
    queryFn: async ({ queryKey }) => {
      const [, { page, sortBy, genres, tags, status, props }] = queryKey;
      const params = {
        page,
        sortBy,
        limit: 20,
        ...(genres.length > 0 && { genres: genres.join(",") }),
        ...(keyword && { keyword }),
        ...(tags.length > 0 && { tags: tags.join(",") }),
        ...(status.length && { status: status }),
        ...(props.length && { props }),
      };
      const result = await getNovels(params);
      return result?.data;
    },
    refetchOnWindowFocus: false,
  });

  if (isError) {
    toast.error("Có lỗi xảy ra khi tải dữ liệu", {
      description: error?.message,
    });
  }

  const isRankingsLoading = isPending || isLoading;
  return (
    <Shell as="div" variant="none" className="relative w-full max-w-[1200px] gap-4 mx-auto">
      {keyword && (
        <div className="absolute top-0 flex items-center space-x-1">
          <Icons.search size={14} />
          <CardTitle className="text-sm font-medium">"{keyword}" Từ khóa tìm kiếm</CardTitle>
        </div>
      )}
      <Tabs defaultValue={activeTab} className="flex items-start w-[inherit] gap-x-4" onValueChange={setActiveTab}>
        <div className="space-y-4">
          {/* Tabs list button */}
          <Card className="border-none shadow-none rounded-xl dark:ring-1 dark:ring-border">
            <CardHeader>
              <TabListButton searchParams={searchParams} tabs={tabs} />
            </CardHeader>
          </Card>
          {/* Filter novels by genres */}
          <PropStatusFilter />
          <GenresFilter />
          <TagsFilter />
        </div>
        <div className="flex-grow w-full">
          {tabs
            .filter((tab) => tab.isEnabled !== false)
            .map((tab) => (
              <TabsContent key={tab.id} value={tab.value}>
                {isRankingsLoading ? <SkeletonRankings /> : tabContent[tab.value](data)}
              </TabsContent>
            ))}
        </div>
      </Tabs>
    </Shell>
  );
}
