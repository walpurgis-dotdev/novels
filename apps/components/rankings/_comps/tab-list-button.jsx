import { Icons } from "@/components/icons";
import { CardTitle } from "@/components/primitives/ui/card";
import { Separator } from "@/components/primitives/ui/separator";
import { TabsList, TabsTrigger } from "@/components/primitives/ui/tabs";
import Link from "next/link";

export function TabListButton({ searchParams, tabs }) {
	return (
		<TabsList className="flex-col space-y-4 w-60 shrink-0">
			<TabsTrigger
				value={tabs[0].value}
				className="w-full justify-start text-sm font-medium rounded-md px-0 py-2 data-[state=active]:text-destructive data-[state=active]:bg-transparent"
			>
				<Link
					href={{
						query: { ...searchParams, tab: "default" },
					}}
					className="flex items-center space-x-2"
				>
					<Icons.flame size={20} />
					<span>{tabs[0].label}</span>
				</Link>
			</TabsTrigger>
			<Separator className="w-full" />
			<section className="w-full">
				<CardTitle className="text-lg font-medium">
					Danh sách tác phẩm
				</CardTitle>
				{tabs
					.slice(1)
					.filter((tab) => tab.isEnabled !== false)
					.map((tab) => (
						<TabsTrigger
							key={tab.id}
							value={tab.value}
							className="w-full justify-start text-sm font-medium rounded-md px-6 py-2 data-[state=active]:text-destructive data-[state=active]:bg-destructive/10"
						>
							<Link
								href={{
									query: { ...searchParams, tab: tab.value },
								}}
							>
								<span>{tab.label}</span>
							</Link>
						</TabsTrigger>
					))}
			</section>
			<Separator className="w-full" />
		</TabsList>
	);
}
