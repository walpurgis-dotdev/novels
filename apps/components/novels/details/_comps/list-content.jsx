import Link from "next/link";
import { Icons } from "@/components/icons";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/primitives/ui/accordion";
import { Badge } from "@/components/primitives/ui/badge";

export function ListContent({ data, slug }) {
  return (
    <Accordion type="single" collapsible defaultValue="free" className="w-full space-y-4">
      <AccordionItem value="free" className="border-none">
        <AccordionTrigger className="rounded-xl bg-accent py-3 px-4">
          <div className="inline-flex items-center space-x-2">
            <span>Khối lượng văn bản · Tổng cộng có {data.slice(0, 102).length} chương</span>
            <Icons.sparkles size={16} />
            <Badge variant="success">Miễn phí</Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <section className="grid grid-cols-3 gap-2 mt-2 w-full">
            {data &&
              data.slice(0, 102).map((i) => (
                <Link
                  key={i.id}
                  href={`/novel/${slug}/chapter-${i.chapterNo}-${i.id}`}
                  className="flex items-center rounded-md hover:bg-foreground/20 h-8 px-4"
                  title={`Chương ${i.chapterNo}. ${i.title}`}
                >
                  <p className="font-medium truncate">
                    Chương {i.chapterNo}. {i.title}
                  </p>
                </Link>
              ))}
          </section>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="vip-1" className="border-none">
        <AccordionTrigger className="rounded-xl bg-accent py-3 px-4">
          <div className="inline-flex items-center space-x-2">
            <span>Khối lượng văn bản · Tổng cộng có {data.slice(201).length} chương</span>
            <Icons.sparkles size={16} />
            <Badge variant="success">Miễn phí</Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <section className="grid grid-cols-3 gap-2 mt-2 w-full">
            {data &&
              data.slice(102).map((i) => (
                <Link
                  key={i.id}
                  href={`/novel/${slug}/chapter-${i.chapterNo}-${i.id}`}
                  className="flex items-center rounded-md hover:bg-foreground/20 h-8 px-4"
                  title={`Chương ${i.chapterNo}. ${i.title}`}
                >
                  <p className="font-medium truncate">
                    Chương {i.chapterNo}. {i.title}
                  </p>
                </Link>
              ))}
          </section>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
