import { Icons } from "@/components/icons";
import { Button } from "@/components/primitives/ui/button";

export function PageNavigationButtons({ onFirst, onPrevious, onNext, onLast, children }) {
  return (
    <div className="inline-flex items-center justify-center space-x-3">
      <Button variant="outline" size="icon" className="w-8 h-8" onClick={onFirst}>
        <Icons.doubleChevronLeft size={16} />
      </Button>
      <Button variant="outline" size="icon" className="w-8 h-8" onClick={onPrevious}>
        <Icons.chevronLeft size={16} />
      </Button>
      {children}
      <Button variant="outline" size="icon" className="w-8 h-8" onClick={onNext}>
        <Icons.chevronRight size={16} />
      </Button>
      <Button variant="outline" size="icon" className="w-8 h-8" onClick={onLast}>
        <Icons.doubleChevronRight size={16} />
      </Button>
    </div>
  );
}
