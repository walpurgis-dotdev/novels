import {
	CheckCircledIcon,
	ChevronUpIcon,
	CounterClockwiseClockIcon,
	CrossCircledIcon,
	DoubleArrowUpIcon,
	QuestionMarkCircledIcon,
	RocketIcon,
	StopwatchIcon,
} from "@radix-ui/react-icons";
import { PersonStandingIcon } from "lucide-react";
import { UserRoundIcon } from "lucide-react";
import { SparkleIcon } from "lucide-react";
import { EarthIcon } from "lucide-react";
import { CircleDollarSignIcon } from "lucide-react";

export const statuses = [
	{
		value: "REFUSED",
		label: "Từ chối",
		icon: QuestionMarkCircledIcon,
	},
	{
		value: "PENDING",
		label: "Chờ xử lý",
		icon: CounterClockwiseClockIcon,
	},
	{
		value: "ONGOING",
		label: "Đang ra",
		icon: StopwatchIcon,
	},
	{
		value: "COMPLETED",
		label: "Hoàn thành",
		icon: CheckCircledIcon,
	},
	{
		value: "PAUSED",
		label: "Tạm dừng",
		icon: CrossCircledIcon,
	},
];

export const propses = [
	{
		value: "MIENPHI",
		label: "Miễn phí",
		icon: ChevronUpIcon,
	},
	{
		value: "CHONLOC",
		label: "Chọn lọc",
		icon: DoubleArrowUpIcon,
	},
	{
		value: "CHATLUONGCAO",
		label: "Chất lượng cao",
		icon: RocketIcon,
	},
	{
		value: "THUPHI",
		label: "Thu phí",
		icon: CircleDollarSignIcon,
	},
];

export const tagTypes = [
	{
		value: "WORLD",
		icon: EarthIcon,
	},
	{
		value: "FACTION",
		icon: SparkleIcon,
	},
	{
		value: "CHARACTER",
		icon: PersonStandingIcon,
	},
	{
		value: "SIGHT",
		icon: UserRoundIcon,
	},
];
