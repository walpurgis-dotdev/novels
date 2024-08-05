"use client";

import * as React from "react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/primitives/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/primitives/ui/card";
import { SkeletonCommentary } from "@/components/skeletons/skeleton-commentary";
import { useOptionalControlStore } from "@/stores/use-optional-control-store";
import { cls } from "@/utils/cn-classes";

import { CommentsInput } from "../comments/comments-input";
import { CommentsItem } from "../comments/comments-item";

export function SubComment({ comments, setIsOpen, isLoading }) {
  const { options } = useOptionalControlStore();

  return (
    <div className="relative w-96">
      <Card className={cls("fixed top-0 bottom-0 border-none shadow-none w-96", options.themeColorSchema.accentColor)}>
        <CardHeader className="relative inset-x-0 top-0 flex-row items-center justify-between space-y-0">
          <CardTitle className="flex items-center text-base space-x-2">
            <span>Ý kiến</span>
            <span className="flex items-center space-x-1 text-xs text-muted-foreground">
              {isLoading ? <Icons.loaderCircle size={10} className="animate-spin" /> : <span>{comments?.length}</span>}
              <span>Bài viết</span>
            </span>
          </CardTitle>
          <Button
            size="icon"
            variant="outline"
            onClick={() => {
              setIsOpen(false);
            }}
            className="w-6 h-6 rounded-full"
          >
            <Icons.close size={16} />
          </Button>
        </CardHeader>
        <CardContent
          className="flex flex-col overflow-y-auto space-y-6 h-full pb-52"
          style={{
            scrollbarColor: "#9f9f9f transparent",
            "&:hover": {
              scrollbarColor: "#d1d1d1 transparent",
            },
          }}
        >
          {isLoading ? (
            <SkeletonCommentary />
          ) : comments?.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <CardTitle className="text-sm">Chưa có bình luận nào</CardTitle>
            </div>
          ) : (
            comments?.map((cmt) => <CommentsItem key={cmt.id} item={cmt} />)
          )}
        </CardContent>

        <CardFooter className={cls("absolute inset-x-0 bottom-0 pt-4 pb-8", options.themeColorSchema.accentColor)}>
          <CommentsInput />
        </CardFooter>
      </Card>
    </div>
  );
}
