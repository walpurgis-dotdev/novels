import { Link } from "@/components/primitives/link-button";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/primitives/ui/hover-card";
import { labelVariants } from "@/themes/twv";
import { cls } from "@/utils/cn-classes";

import { ListItem } from "../_comps/list-item";

export function ExtendNav({ items }) {
	return (
		<div className="items-center justify-between hidden h-full space-x-4 md:flex md:justify-end">
			{items
				?.filter((navitem) => !navitem.external)
				.map((navItem) => (
					<HoverCard key={navItem.href}>
						<HoverCardTrigger asChild>
							<div className="flex items-center h-full group">
								<Link
									href={navItem.href}
									className={cls("leading-[4rem]", labelVariants())}
								>
									<div
										className={cls("flex flex-col items-center space-y-0.5")}
									>
										<span className="group-hover:animate-jump text-[0.9rem]">
											{navItem.icon}
										</span>
										<span className={cls("text-xs")}>{navItem.label}</span>
									</div>
								</Link>
							</div>
						</HoverCardTrigger>
						{!!navItem.items?.length && (
							<HoverCardContent className="inline-block w-auto">
								<div className="grid grid-cols-2 gap-4">
									{navItem.items.map((item) => (
										<ListItem
											key={item.href}
											href={item.href}
											label={item.label}
										>
											{item.description}
										</ListItem>
									))}
								</div>
							</HoverCardContent>
						)}
					</HoverCard>
				))}
		</div>
	);
}
