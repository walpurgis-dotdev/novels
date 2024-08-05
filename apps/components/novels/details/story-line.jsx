import { Link } from "@/components/primitives/link-button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/primitives/ui/card";

export function StoryLine({ detail }) {
  return (
    <Card className="border-none shadow-none dark:ring-1 dark:ring-border">
      <CardHeader className="flex flex-row items-center justify-between space-x-2 space-y-0">
        <CardTitle className="shrink-0">Giới thiệu về cốt truyện</CardTitle>
        <div className="border-b border-dashed border-border w-full" />
      </CardHeader>
      <CardContent>
        <CardDescription className="font-medium leading-6">
          {detail.description || "Chưa có thông tin về cốt truyện"}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-start gap-2">
        Thể loại tiểu thuyết mạng:
        {detail.genre && (
          <Link href="/" size="sm" className="bg-border rounded-full">
            {detail.genre.name}
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
