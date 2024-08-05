import * as React from "react";
import { Badge } from "@/components/primitives/ui/badge";
import { Button } from "@/components/primitives/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/primitives/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/primitives/ui/popover";
import { Separator } from "@/components/primitives/ui/separator";
import { cn } from "@/utils/cn-classes";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";

export function MultipleOptions({ title, options, value, onChange, isLoading }) {
  const selectedValuesArray = Array.from(value || []);
  const handleSelect = (optionValue) => {
    const newSelectedValues = new Set(selectedValuesArray);
    if (newSelectedValues.has(optionValue)) {
      newSelectedValues.delete(optionValue);
    } else {
      newSelectedValues.add(optionValue);
    }
    // Gọi onChange với mảng mới của các giá trị được chọn
    onChange(Array.from(newSelectedValues));
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={isLoading}
          size="sm"
          className="flex items-center justify-start h-8 border-dashed min-w-48"
        >
          <PlusCircledIcon className="w-4 h-4 mr-2 " />
          {title}
          {selectedValuesArray?.length > 0 && (
            <>
              <Separator orientation="vertical" className="h-4 mx-2" />
              <Badge variant="secondary" className="px-1 font-normal rounded-sm lg:hidden">
                {selectedValuesArray.length}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValuesArray.length > 2 ? (
                  <Badge variant="secondary" className="px-1 font-normal rounded-sm">
                    {selectedValuesArray.length} đã được chọn
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValuesArray.includes(option.id))
                    .map((option) => (
                      <Badge variant="secondary" key={option.id} className="px-1 font-normal rounded-sm">
                        {option.name}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>Không có kết quả.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValuesArray.includes(option.id);
                return (
                  <CommandItem key={option.id} onSelect={() => handleSelect(option.id)}>
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    {option.icon && <option.icon className="w-4 h-4 mr-2 text-muted-foreground" />}
                    <span>{option.name}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
