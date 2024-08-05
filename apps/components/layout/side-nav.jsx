"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import { cls } from "@/utils/cn-classes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { Icons } from "../icons";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../primitives/ui/accordion";

export function SideNav({ items }) {
	const path = usePathname();
	const { isOpen } = useSidebar();

	return (
		<nav className="grid items-start gap-2">
			{items.map((item, idx) => {
				const Icon = Icons[item.icon || "arrowRight"];
				const isDisabled = item.disabled;
				const isActive = path === item.href;

				return (
					item.href && (
						<Link key={idx} href={isDisabled ? "/" : item.href}>
							<span
								className={cls(
									"flex items-center rounded-md px-3 h-10 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
									isActive && "bg-accent",
									isDisabled && "cursor-not-allowed opacity-80",
									!isOpen && "justify-center",
								)}
							>
								<Icon className={cls("h-4 w-4", isOpen && "mr-2")} />
								<span
									className={cls(
										"transition-all duration-300",
										!isOpen && "hidden",
									)}
								>
									{item.title}
								</span>
								{isOpen && (
									<>
										{item.isExternal && (
											<Icons.link size={16} className="ml-auto" />
										)}
									</>
								)}
							</span>
						</Link>
					)
				);
			})}
			{items
				.filter((i) => i.href === undefined)
				.map((item, idx) => {
					const Icon = Icons[item.icon || "arrowRight"];

					return (
						<Accordion key={idx} type="single" collapsible>
							<AccordionItem value="item-1" className="border-none">
								<AccordionTrigger
									isIcon={false}
									className={cls(
										"flex items-center rounded-md px-3 h-10 hover:bg-accent hover:text-accent-foreground",
										!isOpen && "justify-center",
									)}
								>
									<span
										className={cls(
											"flex items-center text-sm font-medium",
											!isOpen && "justify-center",
										)}
									>
										<Icon className={cls("h-4 w-4", isOpen && "mr-2")} />
										<span
											className={cls(
												"transition-all duration-300",
												!isOpen && "hidden",
											)}
										>
											{item.title}
										</span>
									</span>
									<Icons.chevronDown
										className={cls("h-4 w-4", isOpen ? "ml-auto" : "hidden")}
									/>
								</AccordionTrigger>
								<AccordionContent>
									{!!item.items?.length && (
										<span>
											{item.items.map((child, idx) => {
												const ChildIcon = Icons[child.icon || "arrowRight"];
												return (
													<Link key={idx} href={child.href}>
														<span
															className={cls(
																"flex items-center rounded-md h-10 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
																!isOpen ? "justify-center px-4" : "px-8",
															)}
														>
															<ChildIcon
																className={cls("h-4 w-4", isOpen && "mr-2")}
															/>
															<span
																className={
																	!isOpen ? "hidden" : "hover:text-destructive"
																}
															>
																{child.title}
															</span>
														</span>
													</Link>
												);
											})}
										</span>
									)}
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					);
				})}
		</nav>
	);
}
