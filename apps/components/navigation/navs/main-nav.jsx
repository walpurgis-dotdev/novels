import { Link } from "@/components/primitives/link-button";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/primitives/ui/hover-card";
import { labelVariants } from "@/themes/twv";
import { cls } from "@/utils/cn-classes";
import * as React from "react";

import { ListItem } from "../_comps/list-item";

export function MainNav({ items, isSticky }) {
	return (
		<div className="flex items-center justify-between h-full space-x-2 md:justify-end">
			{items
				?.filter((navitem) => !navitem.external)
				.map((navItem) => (
					<HoverCard key={navItem.href}>
						<HoverCardTrigger asChild>
							<div className="items-center flex-shrink-0 hidden h-full group md:flex">
								<Link
									href={navItem.href}
									className={cls(
										"leading-[4rem] group-hover:animate-jump",
										labelVariants(),
									)}
								>
									<span>{navItem.label}</span>
								</Link>
							</div>
						</HoverCardTrigger>
						{!!navItem.items?.length && (
							<HoverCardContent className="inline-block w-auto">
								<div className="grid grid-cols-2 gap-4 p-4">
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
