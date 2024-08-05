"use client";

import { useState } from "react";
import { deleteNovel } from "@/services/novel.service";
import { useDelNovelStore } from "@/stores/use-novel-store";
import { useTokenStore } from "@/stores/use-user-store";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "../primitives/ui/button";
import { Modal } from "../primitives/ui/modal";

export function DeleteConfirm() {
  const { isOpen, close, novel } = useDelNovelStore();
  const [isDelete, setDelete] = useState(false);
  const { accessToken } = useTokenStore();

  const { isLoading, isError, error } = useQuery({
    queryKey: ["deleteNovel", { novelId: novel?.id }],
    queryFn: async ({ queryKey }) => {
      const [, { novelId }] = queryKey;
      const result = await deleteNovel({ novelId, accessToken });
      await new Promise((resolve) => setTimeout(resolve, 5000));
      if (result.ok) {
        toast.success("Xoá tác phẩm thành công");
        setDelete(false);
        close();
      }
      return result;
    },
    enabled: !!accessToken && !!novel && isDelete,
  });

  if (isError) {
    toast.error("Có lỗi xảy ra khi xoá tác phẩm", {
      description: error.message || "Lỗi không xác định.",
    });
  }

  return (
    <Modal
      title="Bạn có chắc chắn muốn xoá không?"
      description={`Nếu tiếp tục bạn sẽ xoá tác phẩm ${novel?.title}
      Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xoá không?`}
      isOpen={isOpen}
      onClose={() => {
        close();
        setDelete(false);
      }}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button
          disabled={isLoading}
          variant="outline"
          onClick={() => {
            close();
          }}
        >
          Ta ấn nhầm
        </Button>
        <Button
          disabled={isLoading}
          variant="destructive"
          onClick={() => {
            setDelete(true);
          }}
        >
          {isLoading ? "Đang xoá..." : "Xoá"}
        </Button>
      </div>
    </Modal>
  );
}
