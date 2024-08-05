"use client";

import { Button } from "@/components/primitives/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/primitives/ui/form";
import { Textarea } from "@/components/primitives/ui/textarea";
import { updateUser } from "@/services/user.service";
import { useTokenStore, useUserStore } from "@/stores/use-user-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function ProfileForm({ field, setIsOpen }) {
  const { accessToken } = useTokenStore();
  const { userInfo: user } = useUserStore();
  const queryClient = useQueryClient();
  const fieldName = field;

  const form = useForm({
    defaultValues: {
      [fieldName]: user[fieldName] || null,
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: ({ data, accessToken }) => {
      return updateUser({
        data,
        accessToken,
      });
    },
    onSuccess: () => {
      toast.success("Bạn đã cập nhật hồ sơ thành công");
      queryClient.invalidateQueries({
        queryKey: ["getUserById", { id: user.id }],
      });
    },
    onError: (error) => {
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau", {
        description: error.message,
      });
    },
  });

  async function onSubmit(data) {
    try {
      const profile = {
        [fieldName]: data[fieldName],
      };

      await mutateAsync({
        data: { ...profile, id: user.id },
        accessToken,
      });
    } catch (error) {
      // Handle any submission errors (e.g., network issues, server errors)
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau", {
        description: error.message,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name={fieldName}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  onKeyDown={(e) => {
                    if (form.formState.isDirty && e.key === "Enter") {
                      form.handleSubmit(onSubmit)();
                      setIsOpen(false);
                    }
                  }}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          onClick={() => {
            setIsOpen(false);
          }}
          disabled={form.formState.isSubmitting || !form.formState.isDirty}
        >
          Cập nhật
        </Button>
      </form>
    </Form>
  );
}
