import { UserAvatar } from "@/components/account/user-avatar";
import { ReplyForm } from "@/components/forms/reply-form";
import { useUserStore } from "@/stores/use-user-store";

export function ReplyComment() {
  const { userInfo } = useUserStore();
  const avatarUrls = userInfo?.avatar;

  return (
    <div className="w-full flex flex-grow space-x-2">
      <UserAvatar src={avatarUrls?.[60]} fallback={userInfo?.name[0]} className="w-6 h-6 text-xs" />
      <ReplyForm />
    </div>
  );
}
