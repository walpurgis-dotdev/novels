"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/primitives/ui/form";
import { Textarea } from "@/components/primitives/ui/textarea";
import { cls } from "@/utils/cn-classes";
import { useForm } from "react-hook-form";

import { Icons } from "../icons";
import { Button } from "../primitives/ui/button";
import { Card } from "../primitives/ui/card";

export function ReplyForm() {
  // const { accessToken } = useTokenStore();
  // const { chapter } = useChapterStore();

  const form = useForm({
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(data) {
    // try {
    //   const comment = {
    //     content: data.content,
    //     chapterId: chapter.chapterId,
    //     novelId: chapter.novelId,
    //   };
    //   const result = await createComment({
    //     data: comment,
    //     accessToken,
    //   });
    //   if (result.ok) {
    //     form.reset();
    //   } else {
    //     toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau", {
    //       description: result.message,
    //     });
    //   }
    // } catch (error) {
    //   toast.error("*Đã có lỗi xảy ra, vui lòng thử lại sau", {
    //     description: error.message,
    //   });
    // }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Card className="bg-accent">
                  <Textarea
                    placeholder="Phản hồi ý kiến của bạn..."
                    className={cls(
                      "w-full min-h-[40px] resize-none placeholder:text-xs text-xs",
                      "border-none bg-transparent focus-visible:outline-none focus-visible:ring-offset-0 focus-visible:ring-offset-transparent focus-visible:ring-0",
                    )}
                    disabled={form.formState.isSubmitting}
                    {...field}
                    style={{
                      msOverflowStyle: "none",
                      scrollbarWidth: "none",
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        form.handleSubmit(onSubmit)();
                      }
                    }}
                  />
                  <div className="flex items-center justify-between py-1 px-3">
                    <Button type="submit" size="icon" variant="link" className="ml-auto w-auto h-auto">
                      <Icons.sendHorizontal size={14} className="shrink-0 text-foreground hover:text-sky-500" />
                    </Button>
                  </div>
                </Card>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
