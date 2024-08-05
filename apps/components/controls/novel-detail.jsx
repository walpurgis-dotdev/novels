import { Icons } from "../icons";
import { Link } from "../primitives/link-button";

export function NovelDetail() {
  return (
    <Link href="/book/734752745" variant="outline" size="icon">
      <Icons.bell size={16} />
    </Link>
  );
}
