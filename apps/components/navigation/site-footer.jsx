import Image from "next/image";
import { Icons } from "@/components/icons";
import { Link } from "@/components/primitives/link-button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/primitives/ui/card";
import { Separator } from "@/components/primitives/ui/separator";
import { Shell } from "@/components/wrappers/shell-variants";

const siteLinks = [
  { title: "Đóng góp của tác giả", href: "/contribute" },
  { title: "Hợp tác kinh doanh", href: "/business" },
  { title: "Về VibeVerse", href: "/about" },
  { title: "Liên kết bạn bè", href: "/friends" },
  { title: "Liên hệ chúng tôi", href: "/contact" },
  { title: "Cẩn thận với lừa đảo", href: "/scam" },
  { title: "Tuyển dụng tài năng", href: "/career" },
  { title: "Tuyên bố pháp lý", href: "/legal" },
  { title: "Trung tâm trợ giúp", href: "/help" },
  { title: "Chính sách bảo mật", href: "/privacy" },
  { title: "Quy định cộng đồng", href: "/community" },
  { title: "Lịch sử phát triển", href: "/history" },
  { title: "Hướng dẫn khiếu nại", href: "/complaint" },
];

export function SiteFooter() {
  return (
    <Shell>
      <Card className="border-none shadow-none bg-transparent space-y-4">
        <CardHeader className="space-y-0 p-0">
          <section className="shrink-0 space-y-3">
            <Image src="/logo.svg" alt="logo" width={160} height={32} className="dark:invert" />
            <CardDescription className="text-xs">
              © 2024 Wxs Dev. All rights reserved.{" "}
              <Link href="/terms" className="text-xs hover:text-destructive">
                Điều khoản sử dụng
              </Link>
            </CardDescription>
          </section>
        </CardHeader>
        <Separator />
        <CardHeader className="flex-row space-y-0 p-0">
          <section className="flex-1 space-y-3">
            <CardTitle className="text-sm">Cộng tác xuất bản liên hệ</CardTitle>
            <section className="space-y-1">
              <CardDescription className="text-xs">
                Hợp tác bản quyền: Wxs Dev{" "}
                <Link href="mailto:wxsdev@devmail.com" className="text-xs hover:text-destructive">
                  wxsdev@devmail.com
                </Link>
              </CardDescription>
              <CardDescription className="text-xs">
                Hợp tác quảng cáo: Hoang Thai Ninh{" "}
                <Link href="mailto:hoangthaininh@devmail.com" className="text-xs hover:text-destructive">
                  hoangthaininh@devmail.com
                </Link>
              </CardDescription>
            </section>
          </section>
          <section className="shrink-0 w-1/4 space-y-3">
            <CardTitle className="text-sm">Khách hàng</CardTitle>
            <section className="space-y-1">
              <CardDescription className="text-xs">
                Telegram: 09375823658 <span className="text-muted-foreground/60">(08:00-17:00 mở cửa)</span>
              </CardDescription>
              <CardDescription className="text-xs">
                Thư điện tử:{" "}
                <Link href="mailto:vibeverse@devmail.com" className="text-xs hover:text-destructive">
                  vibeverse@devmail.com
                </Link>
              </CardDescription>
            </section>
          </section>
          <section className="shrink-0 w-1/4 text-end space-y-3">
            <CardTitle className="text-sm">Báo cáo thông tin sai lệch</CardTitle>
            <section className="space-y-1">
              <CardDescription className="text-xs">Điện thoại: 09375823658</CardDescription>
              <CardDescription className="text-xs">
                Thư điện tử:{" "}
                <Link href="mailto:master@devmail.com" className="text-xs hover:text-destructive">
                  master@devmail.com
                </Link>
              </CardDescription>
            </section>
          </section>
        </CardHeader>
        <CardHeader className="space-y-0 px-0 pb-0">
          <section className="flex flex-wrap gap-x-6 gap-y-2">
            {siteLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-xs hover:text-destructive">
                {link.title}
              </Link>
            ))}
            <Icons.sparkles size={14} className="text-muted-foreground" />
          </section>
        </CardHeader>
      </Card>
    </Shell>
  );
}
