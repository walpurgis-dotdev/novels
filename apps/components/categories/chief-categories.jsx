"use client";

import { Icons } from "@/components/icons";
import { Link } from "@/components/primitives/link-button";
import { Card, CardFooter } from "@/components/primitives/ui/card";
import { useGenreStore } from "@/stores/use-genre-store";
import { cls } from "@/utils/cn-classes";

export function ChiefCategories() {
  const { genres } = useGenreStore();

  return (
    <Card
      className={cls(
        "relative hidden lg:flex flex-col border-none shadow-none w-72 mt-12",
        "bg-[url('https://revo.zongheng.com/www/2024/images/c4d794c.png')] bg-top bg-cover bg-no-repeat",
        "dark:bg-none dark:ring-1 dark:ring-border",
      )}
    >
      <div className="absolute left-0 w-full h-6 -top-12">
        <span className="text-lg font-semibold text-foreground">Danh mục</span>
      </div>

      <section className="grow px-6 py-4">
        <div className="flex flex-wrap gap-2">
          {genres.slice(0, 20).map((genre) => (
            <Link
              key={genre.name}
              size="sm"
              href={genre.id.toString()}
              className="bg-accent hover:bg-border space-x-0.5"
            >
              <Icons.sparkles size={16} />
              <span>{genre.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <CardFooter className="justify-end pb-4">
        <Link href="/rankings" size="sm" className="group space-x-0.5 text-xs font-normal text-muted-foreground">
          <span>Nhiều hơn</span>
          <Icons.chevronRight size={14} className="group-hover:animate-jumpR" />
        </Link>
      </CardFooter>
    </Card>
  );
}
