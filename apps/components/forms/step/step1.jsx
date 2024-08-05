"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/primitives/ui/form";
import { Input } from "@/components/primitives/ui/input";

export default function Step1({ isLoading, nextStep, setIsLoading, submitForm }) {
  return (
    <>
      <div className="pb-4">
        <h2 className="font-bold ">Kiểm tra tác phẩm</h2>
        <p className="text-sm font-light text-muted-foreground">
          Chắc chắn rằng tác phẩm bạn muốn thêm vào hệ thống chưa tồn tại trước khi thêm mới.
        </p>
      </div>
      <FormField
        control={submitForm.control}
        name="originalName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tên tác phẩm gốc</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="赤心巡天"
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
        name="originalLink"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Link tác phẩm gốc</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="https://www.qidian.com/book/1016530091"
                autoCorrect="off"
                autoComplete="off"
                disabled={isLoading}
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
