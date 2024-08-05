"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/primitives/ui/button";
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/primitives/ui/dialog";
import { Input } from "@/components/primitives/ui/input";
import { uploadNovelCover } from "@/services/novel.service";
import { useTokenStore } from "@/stores/use-user-store";
import capitalizeFirstLetter from "@/utils/cap-first-letter";
import { imageValidation } from "@/validations/upload";
import { UploadIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function DialogCover({ novel, setIsOpen }) {
	const inputRef = useRef(null);
	const [cover, setCover] = useState(null);
	const [previewUrl, setPreviewUrl] = useState(null);
	const { accessToken } = useTokenStore();

	const handleUploadImage = async (e) => {
		const file = e.target.files[0];
		const result = await imageValidation(file);
		if (!result.ok) {
			toast.error(result.message);
			return;
		}
		setCover(file);
		setPreviewUrl(URL.createObjectURL(file));
	};

	const mutation = useMutation({
		mutationFn: ({ coverImage }) => {
			return uploadNovelCover({
				cover: coverImage,
				novelId: novel.id,
				accessToken,
			});
		},
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data.message);
			setIsOpen(false);
		},
	});

	return (
		<DialogContent className="">
			<DialogHeader>
				<DialogTitle>
					{capitalizeFirstLetter(novel.title) || "không xác định"}
				</DialogTitle>
				<DialogDescription>
					Ấn vào hình ảnh để chọn ảnh mới
				</DialogDescription>
			</DialogHeader>
			<div className="flex items-center justify-center">
				{previewUrl ? (
					<Image
						src={previewUrl}
						alt={novel.title}
						onClick={() => {
							inputRef.current.click();
						}}
						width={300}
						height={400}
						className="rounded-md cursor-pointer"
					/>
				) : (
					<Image
						src={
							novel.covers?.[600]
								? novel.covers[600]
								: "/assets/images/default_cover.webp"
						}
						alt={novel.title}
						width={300}
						height={400}
						className="rounded-md cursor-pointer"
						onClick={() => {
							inputRef.current.click();
						}}
					/>
				)}
			</div>
			<span className="text-sm text-muted-foreground">
				*kích thước tối ưu 600x800 pixels
			</span>
			<Button onClick={() => inputRef.current.click()} variant="outline">
				<UploadIcon className="w-5 h-5 mr-2" />
				Tải hình ảnh lên
			</Button>
			<Input
				type="file"
				accept="image/*"
				ref={inputRef}
				onChange={(e) => {
					handleUploadImage(e);
				}}
				className="hidden"
			/>
			<DialogFooter>
				<Button variant="outline" disabled={mutation.isPending}>Hủy bỏ</Button>
				<Button
					disabled={!previewUrl || mutation.isPending}
					onClick={() => {
						mutation.mutate({ coverImage: cover });
					}}
				>
					{mutation.isPending && (
						<Icons.loaderCircle className="w-4 h-4 mr-2 animate-spin" />
					)}
					Lưu thay đổi
				</Button>
			</DialogFooter>
		</DialogContent>
	);
}
