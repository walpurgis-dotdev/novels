"use client";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/primitives/ui/form";
import { Textarea } from "@/components/primitives/ui/textarea";
import { createComment } from "@/services/comment.service";
import { useChapterStore } from "@/stores/use-chapter-store";
import { useTokenStore } from "@/stores/use-user-store";
import { createCommentSchema } from "@/validations/comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Icons } from "../icons";
import { Button } from "../primitives/ui/button";

export function CommentForm() {
	const { accessToken } = useTokenStore();
	const { chapter } = useChapterStore();
	const queryClient = useQueryClient();

	const form = useForm({
		resolver: zodResolver(createCommentSchema),
		defaultValues: {
			content: "",
		},
	});

	const { mutateAsync } = useMutation({
		mutationFn: ({ data, accessToken }) => {
			return createComment({
				data,
				accessToken,
			});
		},
		onSuccess: () => {
			form.reset();
			toast.success("Bình luận của bạn đã được gửi");
			queryClient.invalidateQueries({
				queryKey: ["getComments", { novelId: chapter.novelId }],
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
			const comment = {
				content: data.content,
				chapterId: chapter.chapterId,
				novelId: chapter.novelId,
			};
			await mutateAsync({ data: comment, accessToken });
		} catch (error) {
			toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau", {
				description: error.message,
			});
		}
	}

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="relative w-full"
				>
					<div className="absolute left-3 -bottom-7">
						<FormMessage className="text-xs">
							{form.formState.errors.content?.message}
						</FormMessage>
					</div>
					<Button
						type="submit"
						size="icon"
						variant="link"
						className="absolute w-0 h-0 right-6 bottom-4"
						disabled={form.formState.isSubmitting || !accessToken}
					>
						<Icons.sendHorizontal
							size={16}
							className="shrink-0 text-foreground hover:text-sky-500"
						/>
					</Button>
					<FormField
						control={form.control}
						name="content"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Textarea
										placeholder={
											accessToken
												? "Viết ý kiến của bạn..."
												: "Đăng nhập để bình luận"
										}
										className="resize-none rounded-xl"
										disabled={form.formState.isSubmitting || !accessToken}
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
								</FormControl>
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</>
	);
}
