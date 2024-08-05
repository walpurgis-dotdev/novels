import { Card, CardDescription, CardHeader, CardTitle } from "@/components/primitives/ui/card";

import { Separator } from "../primitives/ui/separator";

export function FriendsList() {
  return (
    <Card className="border-none shadow-none dark:ring-1 dark:ring-border">
      <CardHeader className="space-y-2">
        <CardTitle className="text-base">Bạn bè</CardTitle>
        <Separator />
        <CardDescription className="text-xs">Không có bạn bè</CardDescription>
      </CardHeader>
    </Card>
  );
}
