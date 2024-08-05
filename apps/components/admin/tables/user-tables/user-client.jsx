"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";
import { Button } from "@/components/primitives/ui/button";
import { Separator } from "@/components/primitives/ui/separator";

import { DataTable } from "../data-table";
import { columns } from "./columns";

export function UserClient({ data }) {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{`Người dùng (${data.length})`}</h2>
          <p className="text-sm text-muted-foreground">Quản lý người dùng (Chức năng bảng phía khách hàng.)</p>
        </div>
        <Button className="text-xs md:text-sm" onClick={() => router.push(`/dashboard/user/new`)}>
          <Icons.plus className="mr-2 h-4 w-4" /> Thêm người dùng
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
}
