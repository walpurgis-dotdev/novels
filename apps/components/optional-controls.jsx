"use client";
import { Settings } from "@/components/controls/settings";
import { Icons } from "@/components/icons";
import { Button } from "@/components/primitives/ui/button";
import { controls } from "@/utils/constants";
import { useState } from "react";
import { SummaryChapter } from "./novels/chapters/summary-chapter";

export function OptionalControls({ chapter }) {
	const [isOpenSummary, setIsOpenSummary] = useState(false);
	return (
		<>
			{/* <aside className="absolute top-32 -left-6">
				<div className="fixed">
					<div className="flex flex-col space-y-3">
						<Button
							variant="outline"
							size="sm"
							className="text-xs rotate-180 py-3 px-0.5 bg-white dark:bg-transparent transform [writing-mode:vertical-lr] [text-orientation:mixed]"
						>
							Huyền Thoại
						</Button>
						<Button
							variant="outline"
							size="sm"
							className="text-xs rotate-180 py-3 px-0.5 bg-white dark:bg-transparent transform [writing-mode:vertical-lr] [text-orientation:mixed]"
						>
							Hoang Thai Ninh - Wxs Dev - 2024
						</Button>
					</div>
				</div>
			</aside> */}
			<aside className="absolute ml-2 top-20 left-full">
				<div className="fixed ml-2">
					<div className="flex flex-col space-y-2">
						{controls.settingsEnabled && (
							<Settings>
								<Button
									variant="outline"
									size="icon"
									className="bg-white dark:bg-transparent"
								>
									<Icons.penTool size={16} />
								</Button>
							</Settings>
						)}

						<SummaryChapter
							isOpenSummary={isOpenSummary}
							setIsOpenSummary={setIsOpenSummary}
							chapter={chapter}
						/>
					</div>
				</div>
			</aside>
		</>
	);
}
