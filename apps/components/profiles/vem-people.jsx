"use client";

import * as React from "react";
import Link from "next/link";
import { UserAvatar } from "@/components/account/user-avatar";
import { Icons } from "@/components/icons";
import { Button } from "@/components/primitives/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/primitives/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/primitives/ui/popover";
import { Shell } from "@/components/wrappers/shell-variants";
import { siteConfig } from "@/utils/common";
import { convertISOToDate } from "@/utils/convert-iso-to-date";

import { AvatarForm } from "../forms/avatar-form";
import { ProfileForm } from "../forms/profile-form";
import { FormModal } from "./modal/form-modal";

export function VemPeople({ user }) {
  const [field, setField] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <FormModal
        title="Thay đổi thông tin cá nhân"
        description="Cập nhật thông tin cá nhân của bạn"
        field={field}
        isOpen={isOpen}
        onChange={() => setIsOpen(!isOpen)}
      >
        {field === "avatar" && <AvatarForm field={field} setIsOpen={setIsOpen} />}
        {field !== "avatar" && <ProfileForm field={field} setIsOpen={setIsOpen} />}
      </FormModal>
      <Card
        className="border-none rounded-none shadow-none md:h-[212px] h-[150px] p-6"
        style={{
          backgroundImage:
            "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cb16875d-c1a3-4ada-aea3-91fd19d997ef/dfvym4f-a26b7208-74b6-4e73-8f02-70ca76ecbdad.png/v1/fill/w_1192,h_670,q_70,strp/_wg12__kitsune_mask_and_the_enigmatic_by_namakxin_dfvym4f-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4MCIsInBhdGgiOiJcL2ZcL2NiMTY4NzVkLWMxYTMtNGFkYS1hZWEzLTkxZmQxOWQ5OTdlZlwvZGZ2eW00Zi1hMjZiNzIwOC03NGI2LTRlNzMtOGYwMi03MGNhNzZlY2JkYWQucG5nIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.H9rqH9EeqJ3Kbc6x14On36GTFAKWTcsLGyMdNoLlzzo')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Shell as="div" className="h-full flex py-0 md:py-0">
          <div className="group relative">
            <UserAvatar
              src={user.avatar ? user.avatar["300"] : null}
              alt="Wxs Dev"
              fallback={user.name[0]}
              className="w-32 h-32 text-3xl"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute bottom-0 right-0 w-8 h-8 bg-background rounded-full"
              onClick={() => {
                setField("avatar");
                setIsOpen(true);
              }}
            >
              <Icons.camera size={16} />
            </Button>
          </div>
        </Shell>
      </Card>
      <Shell as="div" className="w-full py-0 md:py-0 mt-6">
        <Card className="border-none shadow-none dark:ring-1 dark:ring-border">
          <CardHeader className="flex-row flex-grow space-x-3 space-y-0">
            {/* Left side */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <CardTitle className="text-lg">{user.name}</CardTitle>
                <Button
                  size="icon"
                  variant="link"
                  className="w-8 h-8 hover:no-underline hover:text-destructive text-muted-foreground"
                  onClick={() => {
                    setField("name");
                    setIsOpen(true);
                  }}
                >
                  <Icons.pen size={14} />
                </Button>
                <Popover>
                  <PopoverTrigger>
                    <Icons.chevronDown size={16} className="p-0.5 text-primary rounded-full hover:bg-accent" />
                  </PopoverTrigger>
                  <PopoverContent align="start">
                    <div className="flex items-center space-x-2">
                      <CardDescription className="text-xs font-medium">
                        Cấp độ:{" "}
                        {user.level.name ? (
                          <span className="text-primary">
                            {user.level.name} {user.level.name === "Phàm Nhân" ? "" : "Cảnh Giới"}
                          </span>
                        ) : (
                          <span className="text-primary">Chưa xác định</span>
                        )}
                      </CardDescription>
                      <CardDescription className="text-xs font-medium">
                        Điểm danh vọng: <span className="text-primary">{user.level.points}</span>
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CardDescription className="text-xs font-medium">
                        Nguyên thạch: <span className="text-primary">{user.currency || 0}</span>
                      </CardDescription>
                      <CardDescription className="text-xs font-medium">
                        Xu: <span className="text-primary">{user.money}</span>
                      </CardDescription>
                    </div>
                  </PopoverContent>
                </Popover>
                {user.isVerified && (
                  <span className="flex items-center space-x-1">
                    <Icons.badgeCheck size={12} />
                    <CardDescription className="text-xs font-medium">Đã xác thực</CardDescription>
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <CardDescription>Tổng</CardDescription>
                  <CardTitle className="text-sm">{user.count.convertedNovels}</CardTitle>
                  <CardDescription>Đã được biên dịch</CardDescription>
                </div>
                <div className="flex items-center space-x-1">
                  <CardTitle className="text-sm">{user.count.votes}</CardTitle>
                  <CardDescription>Đề cử</CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="group flex items-start space-x-1 h-8 mt-6">
                  <CardTitle className="shrink-0 text-sm">Giới thiệu: </CardTitle>
                  <CardDescription className="line-clamp-2">{user.bio || "Chưa có giới thiệu"}</CardDescription>
                  <Button
                    size="icon"
                    variant="link"
                    className="hidden group-hover:block w-auto h-auto hover:no-underline hover:text-destructive text-muted-foreground"
                    onClick={() => {
                      setField("bio");
                      setIsOpen(true);
                    }}
                  >
                    <Icons.pen size={14} />
                  </Button>
                </div>
              </div>
            </div>
            {/* // Right side */}
            <div className="flex flex-col items-end justify-between">
              <div className="flex flex-col items-end space-y-1">
                <div className="flex items-center space-x-1">
                  <CardTitle className="text-sm">Sinh nhật: </CardTitle>
                  <CardDescription className="opacity-80">Ngày {convertISOToDate(user.birthday)}</CardDescription>
                </div>
                {user.flowers > 0 && (
                  <div className="flex items-center space-x-1">
                    <CardTitle className="text-sm">{user.flowers}</CardTitle>
                    <CardDescription>Hoa</CardDescription>
                  </div>
                )}
                <CardDescription className="opacity-80">
                  Vào ngày {convertISOToDate(user.createdAt)}, {user.name} đã tham gia {siteConfig.name}.com
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Link href={`/user/${user.id}/settings`} className="hover:text-destructive text-muted-foreground">
                  <Icons.settings size={16} />
                </Link>
                <Button size="sm" className="flex items-center rounded-full">
                  <Icons.userRoundPlus size={16} className="mr-1" />
                  Quan tâm
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      </Shell>
    </>
  );
}
