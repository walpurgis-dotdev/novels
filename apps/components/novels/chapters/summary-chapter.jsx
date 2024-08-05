import * as React from "react";

import { Button } from "@/components/primitives/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/primitives/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/primitives/ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useMutation } from "@tanstack/react-query";
import { BookMarkedIcon } from "lucide-react";
import { toast } from "sonner";

export function SummaryChapter({ isOpenSummary, setIsOpenSummary, chapter }) {
	const [content, setContent] = React.useState("");
	const abortControllerRef = React.useRef(null);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	const { mutate, isPending } = useMutation({
		mutationFn: () => {
			abortControllerRef.current = new AbortController();
			if (content) return content;
			return fetchSummary(
				{ id: chapter?.novel?.id, content: chapter.content },
				(newContent) => {
					setContent((prev) => prev + newContent);
				},
				abortControllerRef.current.signal,
			);
		},
		retry: false,
		mutationKey: "summary",
		onError: (error) => {
			if (error.name === "AbortError") {
				toast.info("Đã dừng tóm tắt chương");
			} else {
				toast.error("Lỗi khi tóm tắt chương");
			}
		},
	});

	const handleCancel = () => {
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
			setContent("");
		}
	};

	if (isDesktop) {
		return (
			<Dialog open={isOpenSummary} onOpenChange={setIsOpenSummary}>
				<DialogTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						className="bg-white dark:bg-transparent"
						onClick={() => mutate()}
					>
						<BookMarkedIcon size={16} />
					</Button>
				</DialogTrigger>
				<DialogContent className="max-w-3xl">
					<DialogHeader>
						<DialogTitle>
							{chapter
								? `Chương ${chapter.chapterNo}: ${chapter?.title}`
								: "Lỗi không xác định"}
							{isPending && " (Đang tóm tắt...)"}
						</DialogTitle>
						<DialogDescription>{chapter?.createdAt}</DialogDescription>
					</DialogHeader>
					{content}
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => {
								setIsOpenSummary(false);
								handleCancel();
							}}
						>
							Đóng
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={isOpenSummary} onOpenChange={setIsOpenSummary}>
			<DrawerTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="bg-white dark:bg-transparent"
					onClick={() => mutate()}
				>
					<BookMarkedIcon size={16} />
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>
						{chapter
							? `Chương ${chapter.chapterNo}: ${chapter?.title}`
							: "Lỗi không xác định"}
						{isPending && " (Đang tóm tắt...)"}
					</DrawerTitle>
					<DrawerDescription>{chapter?.createdAt}</DrawerDescription>
				</DrawerHeader>
				{content}
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button
							variant="outline"
							onClick={() => {
								setIsOpenSummary(false);
								handleCancel();
							}}
						>
							Đóng
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

async function fetchSummary(data, onChunk, signal) {
	const res = await fetch("/api/bot/summary", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
		signal,
	});

	if (!res.ok) {
		toast.error("Lỗi khi tóm tắt chương");
	}

	const reader = res.body.getReader();
	const textDecoder = new TextDecoder();
	let buffer = "";

	while (true) {
		const { done, value } = await reader.read();
		if (done) break;

		buffer += textDecoder.decode(value, { stream: true });
		const lines = buffer.split("\n");

		for (let i = 0; i < lines.length - 1; i++) {
			const line = lines[i].trim();
			if (line) {
				const chunkObj = JSON.parse(line);

				if (chunkObj.done) {
					return;
				}
				onChunk(chunkObj.content);
			}
		}

		buffer = lines[lines.length - 1];
	}
}
