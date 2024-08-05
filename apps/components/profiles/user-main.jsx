import Image from "next/image";
import { UserAvatar } from "@/components/account/user-avatar";
import { Icons } from "@/components/icons";
import { Button } from "@/components/primitives/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/primitives/ui/card";
import { cls } from "@/utils/cn-classes";
import { siteConfig } from "@/utils/common";
import { convertISOToDate } from "@/utils/convert-iso-to-date";

export function UserMain({ item }) {
  return (
    <Card
      className={cls("flex overflow-hidden border-none shadow-none bg-transparent", "md:h-[212px] h-[150px] p-6")}
      style={{
        backgroundImage: "url('https://revo.zongheng.com/home/2024/shen_bg.a3e33d75.jpg')",
        backgroundSize: "100% 100%",
      }}
    >
      <UserAvatar src={item.avatar["300"]} alt="Wxs Dev" fallback="N" className="w-24 h-24" />
      <CardHeader className="flex-grow justify-start py-0 space-y-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl">{item.name}</CardTitle>
          <CardDescription className="opacity-80">
            Tham gia {siteConfig.name}.com vào ngày {convertISOToDate(item.createdAt)}
          </CardDescription>
        </div>
        {/* Honor // Danh hiệu */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {Array.from({ length: 3 }).map((_, idx) => (
              <span
                key={idx}
                className="flex items-center h-[22px] rounded-full space-x-1 pl-2 pr-2"
                style={{ background: "rgba(28, 28, 28, 0.05)" }}
              >
                <em className="p-0.5 rounded-full bg-background">
                  <Icons.crown size={12} />
                </em>
                <CardDescription className="text-xs  font-medium">Kí giả vương</CardDescription>
              </span>
            ))}
          </div>
          <Button size="sm" className="flex items-center rounded-full">
            <Icons.userRoundPlus size={16} className="mr-1" />
            Theo dõi
          </Button>
        </div>
        {/* ???? */}
        <div className="flex flex-grow">???????</div>
        {/* Bio // Giới thiệu */}
        <div className="flex items-center space-x-2">
          <CardTitle className="shrink-0 text-sm ">Giới thiệu</CardTitle>
          <CardDescription className=" line-clamp-1">{item.bio || "Chưa có giới thiệu"}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}
