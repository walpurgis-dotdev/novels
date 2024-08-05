"use client";

import { Button } from "@/components/primitives/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/primitives/ui/dropdown-menu";
import { updateNovel } from "@/services/novel.service";
import { useActionStore } from "@/stores/use-action-store";
import { useKeywordStore } from "@/stores/use-keyword-store";
import { useDelNovelStore } from "@/stores/use-novel-store";
import { usePaginationStore } from "@/stores/use-pagination-store";
import { useTokenStore } from "@/stores/use-user-store";
import capitalizeFirstLetter from "@/utils/cap-first-letter";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog } from "../primitives/ui/dialog";
import DialogCover from "./dialog/dialog-cover";
import DialogUpdateNovel from "./dialog/dialog-update-novel";

const statuses = [
	{
		label: "Đang ra",
		value: "ONGOING",
	},
	{
		label: "Hoàn thành",
		value: "COMPLETED",
	},
	{
		label: "Tạm ngưng",
		value: "PAUSED",
	},
];

export function DataTableRowActions({ row }) {
	const [isOpenUpdCover, setIsOpenUpdCover] = useState(false);
	const [isOpenUpdNovel, setIsOpenUpdNovel] = useState(false);
	const queryClient = useQueryClient();
	const { open, setNovel } = useDelNovelStore();
	const { accessToken } = useTokenStore();
	const { keyword } = useKeywordStore();
	const { pageIndex, pageSize } = usePaginationStore();
	const { setAction, setSelectedNovel } = useActionStore();
	const novel = row.original;
	const handleDeleteNovel = () => {
		setNovel(novel);
		open();
	};

	const mutation = useMutation({
		mutationKey: "updateNovelStatus",
		mutationFn: async (status) => {
			return await updateNovel({
				novelId: novel.id,
				data: { status },
				accessToken: accessToken,
			});
		},
		onSuccess: (data) => {
			const updatedNovel = data?.data;
			toast.success("Cập nhật trạng thái thành công", {
				description: `${capitalizeFirstLetter(
					novel.title,
				)} đã được cập nhật thành ${
					statuses.find((item) => item.value === updatedNovel.status).label
				}`,
			});
			// cập nhật lại trạng thái của novel trong cache
			queryClient.setQueryData(
				[
					"getNovelsCv",
					{ accessToken, limit: pageSize, page: pageIndex + 1, keyword },
				],
				(oldData) => {
					const newData = oldData.map((item) => {
						if (item.id === novel.id) {
							return { ...item, status: updatedNovel.status };
						}
						return item;
					});
					return newData;
				},
			);
		},
		onError: (error) => {
			toast.error("Cập nhật trạng thái thất bại", {
				description: error.message,
			});
		},
	});
	return (
		<Dialog
			open={isOpenUpdCover || isOpenUpdNovel}
			onOpenChange={isOpenUpdCover ? setIsOpenUpdCover : setIsOpenUpdNovel}
		>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
					>
						<DotsHorizontalIcon className="w-4 h-4" />
						<span className="sr-only">Mở tuỳ chọn</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-[160px]">
					<Link
						href={`/novel/${novel.slug}`}
						className="cursor-pointer hover:cursor"
					>
						<DropdownMenuItem className="cursor-pointer hover:cursor">
							Xem
						</DropdownMenuItem>
					</Link>
					<DropdownMenuItem onClick={() => setIsOpenUpdNovel(true)}>
						Chỉnh sửa
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setIsOpenUpdCover(true)}>
						Ảnh bìa
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => {
							setSelectedNovel(novel);
							setAction("MANAGER");
						}}
					>
						Quản lý chương
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>Trạng thái</DropdownMenuSubTrigger>
						<DropdownMenuSubContent>
							<DropdownMenuRadioGroup
								value={novel.status}
								onValueChange={mutation.mutate}
							>
								{statuses.map((status) => (
									<DropdownMenuRadioItem
										key={status.value}
										value={status.value}
									>
										{status.label}
									</DropdownMenuRadioItem>
								))}
							</DropdownMenuRadioGroup>
						</DropdownMenuSubContent>
					</DropdownMenuSub>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() => {
							handleDeleteNovel();
						}}
					>
						Xoá
						<DropdownMenuShortcut>⌫</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			{isOpenUpdCover ? (
				<DialogCover novel={novel} setIsOpen={setIsOpenUpdCover} />
			) : (
				<DialogUpdateNovel novel={novel} setIsOpen={setIsOpenUpdNovel} />
			)}
		</Dialog>
	);
}
