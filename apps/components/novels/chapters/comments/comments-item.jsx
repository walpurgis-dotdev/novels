"use client";

import * as React from "react";
import { UserAvatar } from "@/components/account/user-avatar";
import { Icons } from "@/components/icons";
import { Button } from "@/components/primitives/ui/button";
import { CardDescription, CardTitle } from "@/components/primitives/ui/card";
import { deleteComment } from "@/services/comment.service";
import { useTokenStore, useUserStore } from "@/stores/use-user-store";
import { formatDate } from "@/utils/format-date";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { CommentsMenu } from "./comments-menu";
import { ReplyComment } from "./reply-comment";

export function CommentsItem({ item }) {
  const { accessToken } = useTokenStore();
  const [reply, setReply] = React.useState(false);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (commentId) => {
      return deleteComment({ commentId, accessToken });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getComments", { novelId: item.novelId }],
      });
      toast.success("Xoá bình luận thành công", {
        duration: 2000,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="flex flex-row items-start space-x-2 group">
      <UserAvatar src={item.user.avatar?.["60"]} fallback={item.user.name[0]} className="w-6 h-6 text-xs" />
      <div className="space-y-1 grow">
        {/* // Header */}
        <div className="flex items-center justify-between">
          <CardDescription className="text-xs leading-6 line-clamp-1">{item.user.name}</CardDescription>
          <div className="flex items-center space-x-2">
            <span className="items-center hidden space-x-1 group-hover:inline-flex">
              <Icons.sparkles size={12} className="text-muted-foreground" />
              <CardDescription className="text-xs">Báo cáo</CardDescription>
            </span>
            <CommentsMenu item={item} handle={mutate} />
          </div>
        </div>
        <CardTitle className="text-sm font-normal">{item.content}</CardTitle>
        {/* // Footer */}
        <div className="flex items-center justify-between">
          <span className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setReply(!reply)}
              className="w-auto h-auto font-medium hover:bg-transparent"
            >
              <CardDescription className="text-xs font-normal hover:text-foreground/80 line-clamp-1">
                Phản hồi
              </CardDescription>
            </Button>
            <CardDescription className="text-xs ine-clamp-1">{formatDate(item.updatedAt)}</CardDescription>
          </span>
          {/* reactions */}
          <span className="flex items-center space-x-2">
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <span
              className="items-center hidden space-x-1 cursor-pointer group-hover:inline-flex text-destructive"
              onClick={() => console.log("dislike")}
            >
              <Icons.thumbsDown
                size={12}
                className={item.isLiked === true ? "text-destructive" : "text-muted-foreground"}
              />
            </span>
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <span className="inline-flex items-center space-x-1 cursor-pointer" onClick={() => console.log("like")}>
              <Icons.thumbsUp size={12} className="text-muted-foreground" />
              <CardDescription className="text-xs">{item._count.likes}</CardDescription>
            </span>
          </span>
        </div>
        {/* Reply comment */}
        <div className="flex flex-col items-start space-y-1">
          {item._count.childrens > 0 && (
            <Button variant="ghost" size="sm" className="h-auto px-0 hover:bg-transparent">
              <Icons.cornerDownRight size={14} className="text-muted-foreground" />
              <CardDescription className="text-xs hover:text-foreground">
                Xem tất cả {item._count.childrens} phản hồi
              </CardDescription>
            </Button>
          )}
          {reply && <ReplyComment />}
        </div>
      </div>
    </div>
  );
}
