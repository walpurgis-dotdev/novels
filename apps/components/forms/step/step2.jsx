"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/primitives/ui/form";
import { Input } from "@/components/primitives/ui/input";
import { Textarea } from "@/components/primitives/ui/textarea";

export default function Step2({ isLoading, submitForm }) {
  return (
    <>
      <div className="pb-4">
        <h2 className="font-bold ">Thông tin tác phẩm</h2>
        <p className="text-sm font-light text-muted-foreground">
          Vui lòng cung cấp tên, mô tả và thể loại cho tác phẩm để thêm vào hệ thống.
        </p>
      </div>
      <FormField
        control={submitForm.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tên tác phẩm</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Xích Tâm Tuần Thiên"
                autoCorrect="off"
                autoCapitalize="off"
                autoComplete="off"
                autoFocus={true}
                disabled={isLoading}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={submitForm.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mô tả</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Thượng cổ thời đại, yêu tộc tuyệt tích. Cận cổ thời đại, long tộc biến mất. Thần đạo đang thịnh thời đại đã như khói, phi kiếm tuyệt đỉnh thời đại cuối cùng trầm luân...

                          Cái thế giới này xảy ra chuyện gì?"
                autoCorrect="off"
                autoComplete="off"
                disabled={isLoading}
                className="resize-none"
                rows={8}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
