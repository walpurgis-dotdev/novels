"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/primitives/ui/button";
import { Input } from "@/components/primitives/ui/input";
import { Label } from "@/components/primitives/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/primitives/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/primitives/ui/select";
import { useOptionalControlStore } from "@/stores/use-optional-control-store";
import { cls } from "@/utils/cn-classes";
import { optionalControls } from "@/utils/constants";

export function Settings({ children }) {
  const { options, setOptions, increaseFs, decreaseFs } = useOptionalControlStore();

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align="end" className="w-96">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Cài đặt</h4>
            <p className="text-sm text-muted-foreground">Thay đổi tuỳ theo ý bạn</p>
          </div>
          <div className="grid gap-3">
            {/* THEME-COLOR */}
            <div className="grid items-center grid-cols-3 gap-4">
              <Label htmlFor="width">Màu sắc</Label>
              <div className="flex items-center col-span-2 gap-x-2">
                {optionalControls.themeColorSchema.map((item) => (
                  <Button
                    key={item.label}
                    variant="outline"
                    size="chip"
                    className={cls("shrink-0 rounded-full", item.backgroundColor)}
                    onClick={() => setOptions("themeColorSchema", item)}
                  />
                ))}
                {/* <ThemesGeneralSwitcher /> */}
              </div>
            </div>
            {/* FONT-FAMILY */}
            <div className="grid items-center grid-cols-3 gap-4">
              <Label htmlFor="width">Kiểu chữ</Label>
              <div className="flex items-center col-span-2 gap-x-2">
                {optionalControls.fontFamilySchema.map((item) => (
                  <Button
                    key={item.label}
                    variant="outline"
                    className="w-full h-8 px-2 rounded-lg"
                    onClick={() => setOptions("fontFamilySchema", item)}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>
            {/* FONT-SIZE */}
            <div className="grid items-center grid-cols-3 gap-4">
              <Label htmlFor="fontSize">Cỡ chữ</Label>
              <div className="flex items-center col-span-2 gap-x-2">
                <Button
                  variant="outline"
                  size="chip"
                  className="shrink-0"
                  onClick={increaseFs}
                  disabled={options.fontSizeSchema.label === "24"}
                >
                  <Icons.plus size={16} />
                </Button>
                <Input id="fontSize" value={options.fontSizeSchema.label} className="h-8 text-center" disabled />
                <Button
                  variant="outline"
                  size="chip"
                  className="shrink-0"
                  onClick={decreaseFs}
                  disabled={options.fontSizeSchema.label === "12"}
                >
                  <Icons.minus size={16} />
                </Button>
              </div>
            </div>
            {/* LINE-HEIGHT */}
            <div className="grid items-center grid-cols-3 gap-4">
              <Label htmlFor="fontSize">Khoảng cách dòng</Label>
              <div className="flex items-center col-span-2 gap-x-2">
                <Select
                  value={options.lineHeightSchema.lineHeight}
                  onValueChange={(value) =>
                    setOptions(
                      "lineHeightSchema",
                      optionalControls.lineHeightSchema.find((item) => item.lineHeight === value),
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder={options.lineHeightSchema.label} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Khoảng cách dòng chữ</SelectLabel>
                      {optionalControls.lineHeightSchema.map((item) => (
                        <SelectItem key={item.label} value={item.lineHeight}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* MAX WIDTH */}
            <div className="grid items-center grid-cols-3 gap-4">
              <Label htmlFor="height">Chiều rộng</Label>
              <div className="flex items-center col-span-2 gap-x-2">
                {optionalControls.maxWidthSchema.map((item) => (
                  <Button
                    key={item.label}
                    variant="outline"
                    className="w-full h-8 px-2 rounded-lg"
                    onClick={() => setOptions("maxWidthSchema", item)}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid items-center grid-cols-3 gap-4">
              <Label>Kiểu đọc</Label>
              <div className="flex items-center col-span-2 gap-x-2">
                <Input defaultValue="Chương" className="h-8" />
                <Input defaultValue="Dải dài" className="h-8" />
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
