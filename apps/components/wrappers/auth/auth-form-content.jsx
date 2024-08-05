import Image from "next/image";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { Shell } from "@/components/wrappers/shell-variants";
import { cls } from "@/utils/cn-classes";

export function AuthFormContent({
  imageUrl,
  className,
  type = "login",
  title = type === "login" ? "Đăng nhập để sử dụng" : "Tạo tài khoản mới",
  children,
}) {
  return (
    <Shell
      className={cls(
        "relative flex items-center justify-center self-center min-h-screen sm:max-w-xl lg:max-w-none lg:grid-cols-2 md:py-0 md:px-0",
        className,
      )}
    >
      {/* Section for the logo and additional information */}
      <div className="relative hidden flex-col p-10 text-white lg:flex dark:border-r h-[calc(100dvh-4rem)] w-96 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 z-20 bg-background/20" />
        <Image src={imageUrl} alt="" fill className="absolute inset-0 object-cover w-full h-full" />
        <div className="relative z-20 flex items-center justify-between text-lg font-medium">
          {/* <NavbarBrand src={"/icon.svg"} className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] invert" /> */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Icons.arrowBigLeftDash size={18} className="text-white" />
            <span className="flex items-center space-x-2 text-sm text-white/80 group-hover:underline">Quay lại</span>
          </Link>
        </div>
      </div>
      {/* Section for the authentication form */}
      <div className="relative flex flex-col items-center justify-center w-full h-screen p-10 overflow-hidden lg:w-2/3">
        <div className="mx-auto h-full flex flex-shrink-0 w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            {type === "login" ? (
              <p className="text-muted-foreground">
                hoặc{" "}
                <Link href="/register" className="underline transition-colors duration-100 hover:text-foreground">
                  Tạo tài khoản mới
                </Link>
              </p>
            ) : type === "register" ? (
              <p className="text-muted-foreground">
                Bạn đã có tài khoản?{" "}
                <Link href="/login" className="underline transition-colors duration-100 hover:text-foreground">
                  Đăng nhập ngay
                </Link>
              </p>
            ) : null}
          </div>
          {children}
          <p className="px-8 text-sm text-center text-muted-foreground">
            Bằng cách tiếp tục, bạn đồng ý với{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Điều khoản dịch vụ
            </Link>{" "}
            và{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Chính sách bảo mật
            </Link>
            .
          </p>
        </div>
      </div>
    </Shell>
  );
}
