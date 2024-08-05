"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/primitives/ui/button";
import { Form } from "@/components/primitives/ui/form";
import { useMultiplestepForm } from "@/hooks/use-multiplestep-form";
import { checkExistNovel, createNovel } from "@/services/novel.service";
import { useGenreStore } from "@/stores/use-genre-store";
import { useTagStore } from "@/stores/use-tag-store";
import { useTokenStore } from "@/stores/use-user-store";
import { checkExistNovelSchema, createNovelSchema } from "@/validations/novel";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	CheckCircledIcon,
	CrossCircledIcon,
	QuestionMarkCircledIcon,
	StopwatchIcon,
} from "@radix-ui/react-icons";
import { AnimatePresence } from "framer-motion";
import { CircleIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import Step1 from "./step/step1";
import Step2 from "./step/step2";
import Step3 from "./step/step3";
import Success from "./step/sussess";

export const statuses = [
	{
		value: "backlog",
		label: "Backlog",
		icon: QuestionMarkCircledIcon,
	},
	{
		value: "todo",
		label: "Todo",
		icon: CircleIcon,
	},
	{
		value: "in progress",
		label: "In Progress",
		icon: StopwatchIcon,
	},
	{
		value: "done",
		label: "Done",
		icon: CheckCircledIcon,
	},
	{
		value: "canceled",
		label: "Canceled",
		icon: CrossCircledIcon,
	},
];
export default function CreateNovelForm() {
	const { accessToken } = useTokenStore();
	const { genres } = useGenreStore();
	const { tags } = useTagStore();
	const [isLoading, setIsLoading] = useState(false);
	const [isSusscess, setIsSusscess] = useState(false); // thêm truyện mới thành công
	const {
		currentStepIndex,
		isFirstStep,
		isLastStep,
		nextStep,
		previousStep,
		totalSteps,
	} = useMultiplestepForm(3);

	const submitForm = useForm({
		resolver: zodResolver(createNovelSchema),
		defaultValues: {
			originalName: "",
			originalLink: "",
			title: "",
			description: "",
			genreId: "",
			worldTagIds: [],
			charTagIds: [],
			sightTagIds: "",
			facTagIds: [],
			authorName: "",
			authorOriginalName: "",
		},
	});

	async function handleCheckExit() {
		// lấy dữ liệu từ form
		const originalName = submitForm.getValues().originalName;
		const originalLink = submitForm.getValues().originalLink;
		const data = {
			originalName,
			originalLink,
		};
		const { success } = checkExistNovelSchema.safeParse(data);

		if (!success) {
			toast.warning("Dữ liệu không hợp lệ, vui lòng kiểm tra lại thông tin.");
			return;
		}
		try {
			setIsLoading(true);
			const response = await checkExistNovel({ data, accessToken });
			if (response.ok) {
				nextStep();
			} else {
				toast.error(response.message || "Tác phẩm đã tồn tại trong hệ thống.");
			}
		} catch (error) {
			toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau.", {
				description:
					error.message ||
					"Nếu vấn đề vẫn tiếp tục, vui lòng liên hệ với quản trị viên.",
			});
		} finally {
			setIsLoading(false);
		}
	}

	async function handleAddNovel(data) {
		try {
			setIsLoading(true);

			const result = await createNovel({
				data,
				accessToken,
			});
			if (result.ok) {
				setIsSusscess(true);
			} else {
				toast.error("Đã có lỗi xảy ra!", {
					description: result.message || "Hãy chờ một chút và thử lại sau.",
				});
			}
		} catch (error) {
			toast.error("Đã có lỗi xảy ra!", {
				description: error.message || "Hãy chờ một chút và thử lại sau.",
			});
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<>
			{isSusscess ? (
				<Success />
			) : (
				<>
					<p className="text-right">
						{currentStepIndex + 1}/{totalSteps}
					</p>
					<Form {...submitForm}>
						<form
							onSubmit={submitForm.handleSubmit(handleAddNovel)}
							className="grid gap-2"
						>
							{currentStepIndex === 0 && (
								<Step1
									isLoading={isLoading}
									setIsLoading={setIsLoading}
									nextStep={nextStep}
									submitForm={submitForm}
								/>
							)}
							{currentStepIndex === 1 && (
								<Step2 isLoading={isLoading} submitForm={submitForm} />
							)}
							{currentStepIndex === 2 && (
								<Step3
									isLoading={isLoading}
									submitForm={submitForm}
									genres={genres}
									tags={tags}
								/>
							)}
							<div className="flex justify-between pt-4">
								<AnimatePresence>
									{!isFirstStep && (
										<Button
											variant="outline"
											onClick={previousStep}
											whilehover={{ scale: 1.05 }}
											whiletap={{ scale: 0.95 }}
											disabled={isLoading}
										>
											Quay lại
										</Button>
									)}
								</AnimatePresence>
								<AnimatePresence>
									{!isFirstStep && !isLastStep && (
										<Button
											disabled={isLoading}
											className="ml-auto"
											onClick={nextStep}
											whilehover={{ scale: 1.05 }}
											whiletap={{ scale: 0.95 }}
										>
											{isLoading && (
												<Icons.loaderCircle className="w-4 h-4 mr-2 animate-spin" />
											)}
											Tiếp theo
										</Button>
									)}

									{isFirstStep && (
										<Button
											className="ml-auto"
											disabled={isLoading}
											onClick={handleCheckExit}
											whilehover={{ scale: 1.05 }}
											whiletap={{ scale: 0.95 }}
										>
											{isLoading && (
												<Icons.loaderCircle className="w-4 h-4 mr-2 animate-spin" />
											)}
											Kiểm tra
										</Button>
									)}
								</AnimatePresence>
								<AnimatePresence>
									{isLastStep && (
										<Button
											className="ml-auto"
											whilehover={{ scale: 1.05 }}
											whiletap={{ scale: 0.95 }}
											type="submit"
											disabled={isLoading}
										>
											{isLoading && (
												<Icons.loaderCircle className="w-4 h-4 mr-2 animate-spin" />
											)}
											Hoàn tất
										</Button>
									)}
								</AnimatePresence>
							</div>
						</form>
					</Form>
				</>
			)}
		</>
	);
}
