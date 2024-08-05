import { Avatar, AvatarFallback, AvatarImage } from "@/components/primitives/ui/avatar";
import { cls } from "@/utils/cn-classes";

export function UserAvatar({ alt = "", src, fallback, className }) {
  return (
    <Avatar className={cls("h-9 w-9", className)}>
      <AvatarImage src={src} alt={alt} className="rounded-full object-cover object-center" />
      <AvatarFallback className="font-semibold">{fallback}</AvatarFallback>
    </Avatar>
  );
}
