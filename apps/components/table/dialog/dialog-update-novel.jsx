"use client"
import { Icons } from "@/components/icons";
import { MultipleOptions } from "@/components/multiple-options";
import { Button } from "@/components/primitives/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/primitives/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/primitives/ui/form";
import { Input } from "@/components/primitives/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/primitives/ui/select";
import { Textarea } from "@/components/primitives/ui/textarea";
import { updateNovel } from "@/services/novel.service";
import { useGenreStore } from "@/stores/use-genre-store";
import { useTagStore } from "@/stores/use-tag-store";
import { useTokenStore } from "@/stores/use-user-store";
import capitalizeFirstLetter from "@/utils/cap-first-letter";
import { updateNovelSchema } from "@/validations/novel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function dirtyValues(dirtyFields, allValues) {
  if (dirtyFields === true || Array.isArray(dirtyFields))
    return allValues;
  return Object.fromEntries(Object.keys(dirtyFields).map(key => [key, dirtyValues(dirtyFields[key], allValues[key])]));
}

export default function DialogUpdateNovel({ novel, setIsOpen }) {
  const { genres } = useGenreStore();
  const { tags } = useTagStore();
  const { accessToken } = useTokenStore();

  const submitForm = useForm({
    resolver: zodResolver(updateNovelSchema),
    defaultValues: {
      title: novel?.title || "",
      description: novel?.description || "",
      genreId: novel?.genreId?.toString() || "",
      authorName: novel?.Author?.name || "",
      tagIds: novel?.tags.map((tag) => tag.id) || [],
    },
  });
  const fieldChanged = submitForm.formState.isDirty;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => {
      if (!fieldChanged) {
        toast.error("Không có thay đổi nào được thực hiện")
        return;
      }
      const dirtyData = dirtyValues(submitForm.formState.dirtyFields, data);
      return updateNovel({ novelId: novel.id, data: dirtyData, accessToken });
    },
    onError: (error) => {
      toast.error("Đã có lỗi xảy ra!!", {
        description: error.message,
      });
    },
    onSuccess: () => {
      if (fieldChanged) {
        toast.success("Cập nhật tác phẩm thành công");
        setIsOpen(false);
      }
    }
  })
  return (
    <DialogContent className="min-w-lg">
      <DialogHeader>
        <DialogTitle className="line-clamp-1">{capitalizeFirstLetter(novel.title) || "không xác định"}</DialogTitle>
        <DialogDescription>
          Thay đổi thông tin bên dưới và ấn lưu khi hoàn thành
        </DialogDescription>
      </DialogHeader>
      <Form {...submitForm}>
        <form
          onSubmit={submitForm.handleSubmit(mutateAsync)}
          className="grid gap-2"
          onError={(errors) => console.log(errors)}

        >
          <FormField control={submitForm.control}
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
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField control={submitForm.control}
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
                    disabled={isPending}
                    className="resize-none"
                    rows={8}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField control={submitForm.control}
            name="genreId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thể loại</FormLabel>

                <Select onValueChange={field.onChange} value={field.value} disabled={isPending}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn thể loại cho tác phẩm" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {genres.map((genre) => (
                      <SelectItem key={genre.id} value={genre.id.toString()}>
                        {genre.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField control={submitForm.control}
            name="authorName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên tác giả</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Thiên Hạ Đệ Nhất Kiếm Sư"
                    autoCorrect="off"
                    autoCapitalize="off"
                    autoComplete="off"
                    autoFocus={true}
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="mt-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {" "}
            Gắn tag cho tác phẩm{" "}
          </p>
          <FormField control={submitForm.control}
            name="tagIds"
            render={({ field }) => (
              <FormItem>
                <MultipleOptions
                  title="Chọn tag"
                  options={tags}
                  value={field.value}
                  onChange={field.onChange}
                  isLoading={isPending}
                />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button variant="outline" disabled={isPending} onClick={() => {
              setIsOpen(false)
            }}>Hủy bỏ</Button>
            <Button
              disabled={isPending}
              type="submit"
            >
              {isPending && (
                <Icons.loaderCircle className="w-4 h-4 mr-2 animate-spin" />
              )}
              Cập nhật
            </Button>
          </DialogFooter>
        </form>

      </Form>

    </DialogContent>
  )
}
