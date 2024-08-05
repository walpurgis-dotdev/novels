import { Label } from "@/components/primitives/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/primitives/ui/select";
import { buttonVariants } from "@/themes/twv";
import { ITEMS_PER_PAGE_OPTIONS } from "@/utils/constants";

export function ItemsPerPageSelect({ itemsPerPage, onItemsPerPageChange }) {
  return (
    <div className="inline-flex items-center space-x-2">
      <Label htmlFor="items-per-page" className="shrink-0 text-xs">
        Số lượng
      </Label>
      <Select value={`${itemsPerPage}`} onValueChange={onItemsPerPageChange}>
        <SelectTrigger className={buttonVariants({ size: "lg" })}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent side="top">
          {ITEMS_PER_PAGE_OPTIONS.map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize} / trang
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
