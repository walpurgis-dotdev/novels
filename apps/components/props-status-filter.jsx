"use client";

import { Card, CardHeader, CardTitle } from "@/components/primitives/ui/card";
import { useSearchParams } from "next/navigation";
import { Badge } from "./primitives/ui/badge";

const statuses = [
	{ id: 1, value: "ONGOING", label: "Đang ra" },
	{ id: 2, value: "COMPLETED", label: "Hoàn thành" },
	{ id: 3, value: "PAUSED", label: "Tạm dừng" },
];

const propses = [
	{ id: 1, value: "CHONLOC", label: "Chọn lọc" },
	{ id: 2, value: "CHATLUONGCAO", label: "Chất lượng cao" },
];

export function PropStatusFilter() {
	const currentSearchParams = useSearchParams();

	const selectedStatus = currentSearchParams.getAll("status");
	const selectedProps = currentSearchParams.getAll("props");

	const handleAddStatus = (value) => {
		const newSearchParams = new URLSearchParams(currentSearchParams.toString());

		if (newSearchParams.get("status") === value) {
			newSearchParams.delete("status");
		} else {
			newSearchParams.set("status", value);
		}

		window.history.pushState(null, "", `?${newSearchParams.toString()}`);
	};

	const handleAddProps = (value) => {
		const newSearchParams = new URLSearchParams(currentSearchParams.toString());
		if (newSearchParams.get("props") === value) {
			newSearchParams.delete("props");
		} else {
			newSearchParams.set("props", value);
		}

		window.history.pushState(null, "", `?${newSearchParams.toString()}`);
	};
	return (
		<>
			<Card className="border-none shadow-none w-72 shrink-0 dark:ring-1 dark:ring-border rounded-xl">
				<CardHeader>
					<CardTitle className="text-base">Trạng thái</CardTitle>
					<div className="flex flex-wrap gap-2">
						{statuses.map((stt) => (
							<Badge
								key={stt.id}
								className="px-2 font-light cursor-pointer"
								variant={selectedStatus.includes(stt.value) ? "" : "primary"}
								onClick={() => {
									handleAddStatus(stt.value);
								}}
							>
								{stt.label}
							</Badge>
						))}
					</div>
				</CardHeader>
			</Card>
			<Card className="border-none shadow-none w-72 shrink-0 dark:ring-1 dark:ring-border rounded-xl">
				<CardHeader>
					<CardTitle className="text-base">Thuộc tính</CardTitle>
					<div className="flex flex-wrap gap-2">
						{propses.map((prop) => (
							<Badge
								key={prop.id}
								className="px-2 font-light cursor-pointer"
								variant={selectedProps.includes(prop.value) ? "" : "primary"}
								onClick={() => {
									handleAddProps(prop.value);
								}}
							>
								{prop.label}
							</Badge>
						))}
					</div>
				</CardHeader>
			</Card>
		</>
	);
}
