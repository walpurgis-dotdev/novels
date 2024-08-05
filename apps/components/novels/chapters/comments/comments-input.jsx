import { UserAvatar } from "@/components/account/user-avatar";
import { CommentForm } from "@/components/forms/comment-form";
import { useUserStore } from "@/stores/use-user-store";

export function CommentsInput() {
  const { userInfo } = useUserStore();
  const avatarUrls = userInfo?.avatar;

  return (
    <div className="flex flex-grow space-x-2">
      <UserAvatar src={avatarUrls?.[60]} fallback={userInfo?.name[0]} />
      <CommentForm />
    </div>
  );
}
