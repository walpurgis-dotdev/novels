import { Card } from "@/components/primitives/ui/card";

export function FestivalItem({ item }) {
  return (
    <Card
      className="aspect-[16/9] border-none shadow-none bg-transparent"
      style={{
        backgroundImage: `url(${item.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}
