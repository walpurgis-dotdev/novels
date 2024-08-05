import Image from "next/image";
import { Icons } from "@/components/icons";
import { Link } from "@/components/primitives/link-button";
import { Button } from "@/components/primitives/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/primitives/ui/card";
import { Separator } from "@/components/primitives/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/primitives/ui/tooltip";
import { cls } from "@/utils/cn-classes";

export function WorksHonor({ honor }) {
  return (
    <Card className="border-none shadow-none dark:ring-1 dark:ring-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Danh hiệu</CardTitle>
        <Link href="/profile/d.wxs" className="group">
          <CardDescription className="text-xs">Khám phá</CardDescription>
          <Icons.chevronRight size={16} className="group-hover:animate-jumpR" />
        </Link>
      </CardHeader>
      <CardContent>
        <Separator />
        <CardDescription className="py-4 line-clamp-2">
          Accumulated three hundred thousand collections on February 21, 2024
        </CardDescription>
        <Separator />
      </CardContent>
      <CardFooter className="overflow-hidden mx-6 [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
        <section className="animate-marquee hover:[animation-play-state:paused] flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <Image src={`/assets/tops/num/num_${i + 1}.svg`} alt="honor" width={40} height={40} />
              </TooltipTrigger>
              <TooltipContent>hellowp</TooltipContent>
            </Tooltip>
          ))}
          {Array.from({ length: 3 }).map((_, i) => (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <Image src={`/assets/tops/num/num_${i + 1}.svg`} alt="honor" width={40} height={40} />
              </TooltipTrigger>
              <TooltipContent>hellowp</TooltipContent>
            </Tooltip>
          ))}
        </section>
      </CardFooter>
    </Card>
  );
}
