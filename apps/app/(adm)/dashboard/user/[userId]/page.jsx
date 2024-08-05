import { AddressBar } from "@/components/admin/address-bar";
import { ScrollArea } from "@/components/primitives/ui/scroll-area";

export default function Page({ params }) {
  const addressBarItems = [
    { title: "User", link: "/dashboard/user" },
    { title: "Chỉnh sửa", link: "/dashboard/user/edit" },
  ];
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <AddressBar items={addressBarItems} />
        {params.userId}
        {/* ... */}
      </div>
    </ScrollArea>
  );
}
