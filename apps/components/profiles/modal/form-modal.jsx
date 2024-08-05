import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/primitives/ui/dialog";

export function FormModal({ isOpen, onChange, field, title = "", description = "", children }) {
  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{field === "avatar" ? "Thay đổi ảnh đại diện" : title}</DialogTitle>
          <DialogDescription>
            {field === "avatar" ? "Chọn ảnh mới để cập nhật ảnh đại diện" : description}
          </DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
