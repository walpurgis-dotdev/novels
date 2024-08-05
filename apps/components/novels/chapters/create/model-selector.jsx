"use client";

import { Button } from "@/components/primitives/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/primitives/ui/command";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/primitives/ui/hover-card";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/primitives/ui/popover";
import { useMutationObserver } from "@/hooks/use-mutation-observer";
import { cls } from "@/utils/cn-classes";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import * as React from "react";

export function ModelSelector({
	models,
	types,
	selectedModel,
	setSelectedModel,
	...props
}) {
	const [open, setOpen] = React.useState(false);
	const [peekedModel, setPeekedModel] = React.useState(models[0]);

	return (
		<div className="grid gap-2">
			<Popover open={open} onOpenChange={setOpen} {...props}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						aria-label="Select a model"
						className="justify-between w-full"
					>
						{selectedModel ? selectedModel.name : "Select a model..."}
						<CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
					</Button>
				</PopoverTrigger>
				<PopoverContent align="end" className="w-[250px] p-0">
					<HoverCard>
						<HoverCardContent
							side="left"
							align="start"
							forceMount
							className="min-h-[280px]"
						>
							<div className="grid gap-2">
								<h4 className="font-medium leading-none">{peekedModel.name}</h4>
								<div className="text-sm text-muted-foreground">
									{peekedModel.description}
								</div>
							</div>
						</HoverCardContent>
						<Command loop>
							<CommandList className="h-[var(--cmdk-list-height)] max-h-[400px]">
								<CommandInput placeholder="Search Models..." />
								<CommandEmpty>No Models found.</CommandEmpty>
								<HoverCardTrigger />
								{types.map((type) => (
									<CommandGroup key={type} heading={type}>
										{models
											.filter((model) => model.type === type)
											.map((model) => (
												<ModelItem
													key={model.id}
													model={model}
													isSelected={selectedModel?.id === model.id}
													onPeek={(model) => setPeekedModel(model)}
													onSelect={() => {
														setSelectedModel(model);
														setOpen(false);
													}}
												/>
											))}
									</CommandGroup>
								))}
							</CommandList>
						</Command>
					</HoverCard>
				</PopoverContent>
			</Popover>
		</div>
	);
}

function ModelItem({ model, isSelected, onSelect, onPeek }) {
	const ref = React.useRef(null);

	useMutationObserver(ref, (mutations) => {
		for (const mutation of mutations) {
			if (mutation.type === "attributes") {
				if (mutation.attributeName === "aria-selected") {
					onPeek(model);
				}
			}
		}
	});

	return (
		<CommandItem
			key={model.id}
			onSelect={onSelect}
			ref={ref}
			className="aria-selected:bg-primary aria-selected:text-primary-foreground"
		>
			{model.name}
			<CheckIcon
				className={cls(
					"ml-auto h-4 w-4",
					isSelected ? "opacity-100" : "opacity-0",
				)}
			/>
		</CommandItem>
	);
}
