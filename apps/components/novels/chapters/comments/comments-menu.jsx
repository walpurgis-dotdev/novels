import { Icons } from "@/components/icons";
import { Button } from "@/components/primitives/ui/button";
import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger,
} from "@/components/primitives/ui/popover";
export function CommentsMenu({ item, handle }) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					size="icon"
					variant="link"
					className="w-5 h-5 rounded-full hover:bg-border"
				>
					<Icons.ellipsis size={10} />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				align="end"
				className="px-3 py-2 border-none shadow rounded-xl w-60"
			>
				<PopoverClose asChild>
					<Button
						size="sm"
						variant="outline"
						onClick={() => {
							handle(item?.id);
						}}
						className="justify-start w-full space-x-2 bg-transparent border-none rounded-lg hover:bg-accent"
					>
						<Icons.sparkles size={14} className="text-muted-foreground" />
						<span>Xoá bình luận</span>
					</Button>
				</PopoverClose>
			</PopoverContent>
		</Popover>
	);
}
