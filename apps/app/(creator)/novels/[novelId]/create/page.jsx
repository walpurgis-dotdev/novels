"use client";
import { ModelSelector } from "@/components/novels/chapters/create/model-selector";
import { Button } from "@/components/primitives/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/primitives/ui/form";
import {
	HoverCard,
	HoverCardContent,
} from "@/components/primitives/ui/hover-card";
import { Input } from "@/components/primitives/ui/input";
import { ScrollArea } from "@/components/primitives/ui/scroll-area";
import { Separator } from "@/components/primitives/ui/separator";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/primitives/ui/tabs";
import { Textarea } from "@/components/primitives/ui/textarea";
import {
	addChapter,
	translateChapterDichNhanh,
} from "@/services/chapter.service";
import { getConvert } from "@/services/novel.service";
import { useTokenStore } from "@/stores/use-user-store";
import { createChapter } from "@/validations/chapter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
const types = ["Convert"];

const models = [
	{
		id: "dichnhanh",
		name: "Dịch nhanh",
		description: "Sử dụng API của dichnhanh.com",
		type: "Convert",
	},
	{
		id: "vietphrase",
		name: "VietPhrase",
		description: "Sử dụng API của vietphrase.com",
		type: "Convert",
	},
	{
		id: "Bot",
		name: "Bot",
		description: "Dịch chậm, với tệp dữ liệu và AI.",
		type: "Convert",
	},
];

export default function Page() {
	const [selectedAPI, setSelectedAPI] = useState(models[0]);
	const novelId = useParams().novelId;
	const { accessToken } = useTokenStore();

	const form = useForm({
		resolver: zodResolver(createChapter),
		defaultValues: {
			title: "",
			content: "",
			chapterNo: 1,
			textTranslate: "",
		},
	});
	const { isPending, isLoading, data, error, isError } = useQuery({
		queryKey: ["novels", novelId],
		queryFn: async () => {
			const result = await getConvert({ novelId, accessToken });
			const chapter = result?.data?.chapters;
			form.setValue(
				"chapterNo",
				chapter[0]?.chapterNo ? chapter[0].chapterNo + 1 : 1,
			);
			return result?.data || {};
		},
		refetchOnWindowFocus: false,
		enabled: !!novelId && !!accessToken,
	});
	const isFirstLoading = isLoading && isPending;
	if (isError) {
		toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau");
	}
	const chapterApi = useMutation({
		mutationFn: async (data) => {
			const result = await addChapter({
				...data,
				novelId,
				accessToken,
			});
			return result;
		},
		onSuccess: () => {
			toast.success("Tạo chương thành công");
			form.reset();
		},
		onError: (error) => {
			toast.error("Tạo chương thất bại, vui lòng thử lại");
		},
	});

	async function onSubmit(data) {
		const { title, content, chapterNo } = data;
		await chapterApi.mutateAsync({ title, content, chapterNo });
	}
	const handleTranslate = async () => {
		const textTranslate = form.getValues("textTranslate");
		if (!textTranslate || textTranslate === "") {
			toast.warning("Vui lòng nhập nội dung tiếng Trung cần dịch.");
			return;
		}
		const result = await translateChapterDichNhanh(textTranslate);
		if (result) {
			form.setValue("content", result);
		} else {
			toast.error("Dịch thất bại, vui lòng thử lại.");
		}
	};

	return isFirstLoading ? (
		<div className="container flex items-center justify-center h-full">
			<div className="spinner" />
			<p>Đang truy xuất dữ liệu</p>
		</div>
	) : (
		<ScrollArea className="flex-col hidden h-full md:flex">
			<Tabs defaultValue="write" className="flex-1">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="container flex flex-col items-start justify-between py-4 space-y-2 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
							<div className="flex items-center space-x-2">
								<h2 className="text-lg font-semibold shrink-0">Chương </h2>
								<Input
									{...form.register("chapterNo")}
									className="w-16"
									type="number"
								/>
								<span>: </span>
								<FormField
									control={form.control}
									className="flex-1"
									name="title"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													placeholder="Tiêu đề chương"
													autoCorrect="off"
													autoCapitalize="off"
													autoComplete="off"
													disabled={isLoading}
													className="w-full min-w-96"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="flex w-full ml-auto space-x-2 sm:justify-end">
								<ModelSelector
									types={types}
									models={models}
									selectedModel={selectedAPI}
									setSelectedModel={setSelectedAPI}
								/>
								<Button
									variant="secondary"
									onClick={() => {
										handleTranslate();
									}}
								>
									Dịch
								</Button>
							</div>
						</div>
						<Separator />
						<div className="container h-full py-6">
							<div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
								<div className="flex-col hidden space-y-4 sm:flex md:order-2">
									<div className="grid gap-2">
										<HoverCard openDelay={200}>
											<HoverCardContent
												className="w-[320px] text-sm"
												side="left"
											>
												hihi
											</HoverCardContent>
										</HoverCard>
										<TabsList className="flex flex-col items-center justify-center">
											<div>
												<TabsTrigger value="write">
													<span className="sr-only">write</span>
													{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 20 20"
														fill="none"
														className="w-5 h-5"
													>
														<rect
															x="4"
															y="3"
															width="12"
															height="2"
															rx="1"
															fill="currentColor"
														/>
														<rect
															x="4"
															y="7"
															width="12"
															height="2"
															rx="1"
															fill="currentColor"
														/>
														<rect
															x="4"
															y="11"
															width="3"
															height="2"
															rx="1"
															fill="currentColor"
														/>
														<rect
															x="4"
															y="15"
															width="3"
															height="2"
															rx="1"
															fill="currentColor"
														/>
														<rect
															x="8.5"
															y="11"
															width="3"
															height="2"
															rx="1"
															fill="currentColor"
														/>
														<rect
															x="8.5"
															y="15"
															width="3"
															height="2"
															rx="1"
															fill="currentColor"
														/>
														<rect
															x="13"
															y="11"
															width="3"
															height="2"
															rx="1"
															fill="currentColor"
														/>
													</svg>
												</TabsTrigger>

												<TabsTrigger value="translate">
													<span className="sr-only">Edit</span>
													{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 20 20"
														fill="none"
														className="w-5 h-5"
													>
														<rect
															x="4"
															y="3"
															width="12"
															height="2"
															rx="1"
															fill="currentColor"
														/>
														<rect
															x="4"
															y="7"
															width="12"
															height="2"
															rx="1"
															fill="currentColor"
														/>
														<rect
															x="4"
															y="11"
															width="3"
															height="2"
															rx="1"
															fill="currentColor"
														/>
														<rect
															x="4"
															y="15"
															width="4"
															height="2"
															rx="1"
															fill="currentColor"
														/>
														<rect
															x="8.5"
															y="11"
															width="3"
															height="2"
															rx="1"
															fill="currentColor"
														/>
														<path
															d="M17.154 11.346a1.182 1.182 0 0 0-1.671 0L11 15.829V17.5h1.671l4.483-4.483a1.182 1.182 0 0 0 0-1.671Z"
															fill="currentColor"
														/>
													</svg>
												</TabsTrigger>
											</div>
											<Button type="submit">Xuất bản</Button>
										</TabsList>
									</div>
								</div>
								<div className="md:order-1">
									<TabsContent value="write" className="p-0 mt-0 border-0">
										<div className="flex flex-col h-full space-y-4">
											<FormField
												control={form.control}
												name="content"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Nội dung chương</FormLabel>
														<FormControl>
															<Textarea
																placeholder="Nhập nội dung chương tại đây..."
																autoCorrect="off"
																autoComplete="off"
																disabled={isLoading}
																className="min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]"
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</TabsContent>
									<TabsContent value="translate" className="p-0 mt-0 border-0">
										<div className="flex flex-col space-y-4">
											<div className="grid h-full gap-6 lg:grid-cols-2">
												<FormField
													control={form.control}
													name="textTranslate"
													render={({ field }) => (
														<FormItem>
															<FormControl>
																<Textarea
																	placeholder="Nhập nội dung tiếng Trung tại đây..."
																	autoCorrect="off"
																	autoComplete="off"
																	disabled={isLoading}
																	className="min-h-[400px] flex-1 md:min-h-[700px] lg:min-h-[700px] resize-none"
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name="content"
													render={({ field }) => (
														<FormItem>
															<FormControl>
																<Textarea
																	placeholder="Nhập nội dung chương tại đây..."
																	autoCorrect="off"
																	autoComplete="off"
																	disabled={isLoading}
																	className="min-h-[400px] flex-1 md:min-h-[700px] lg:min-h-[700px] resize-none"
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
										</div>
									</TabsContent>
								</div>
							</div>
						</div>
					</form>
				</Form>
			</Tabs>
		</ScrollArea>
	);
}
