"use client";

import Image from "next/image";
import { UserAvatar } from "@/components/account/user-avatar";
import { Link } from "@/components/primitives/link-button";
import { Button } from "@/components/primitives/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/primitives/ui/hover-card";
import { handleLogOut } from "@/services/auth.service";
import { useUserStore } from "@/stores/use-user-store";
import { labelVariants } from "@/themes/twv";
import { cls } from "@/utils/cn-classes";
import { toast } from "sonner";

export function UserMenu({ signInNow = "Đăng nhập", signIn = "Đột nhập" }) {
  const { userInfo, isLoading } = useUserStore();
  const avatarUrls = userInfo?.avatar;

  const logOut = async () => {
    const isLoggedOut = await handleLogOut();
    if (isLoggedOut) {
      window.location.href = "/login";
    } else {
      toast.error("Đăng xuất thất bại!", {
        description: "Hãy thử xoá cache trình duyệt và thử lại.",
      });
    }
  };

  if (isLoading) {
    return <Image src="/loading.svg" alt="Loading" width={28} height={28} />;
  }

  if (userInfo) {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="flex items-center h-full group">
            <Link href={`/user/${userInfo.id}`} className={cls("leading-[4rem]", labelVariants())}>
              <UserAvatar
                src={avatarUrls?.[60]}
                alt={userInfo?.name}
                className="border-2 border-white/80 rounded-xl"
                fallback={userInfo?.name[0]}
              />
            </Link>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="inline-block w-56 px-2 space-y-4">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userInfo?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{userInfo?.email}</p>
          </div>
          <div className="flex flex-col space-y-1">
            <Button onClick={logOut}>Đăng xuất</Button>
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  }

  return (
    <Link href="/login" className="h-full rounded-xl">
      <span className="hidden lg:inline-flex">{signInNow}</span>
      <span className="inline-flex lg:hidden">{signIn}</span>
    </Link>
  );
}
