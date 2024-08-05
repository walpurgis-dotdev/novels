import { FriendsList } from "@/components/profiles/friends-list";
import { VemPagePeople } from "@/components/profiles/vem-page-people";
import { VemPeople } from "@/components/profiles/vem-people";
import { Shell } from "@/components/wrappers/shell-variants";
import { getNovels } from "@/services/novel.service";
import { getUserById } from "@/services/user.service";

export default async function Page({ params, searchParams }) {
  const user = await getUserById(params.userId);
  const g_novel = await getNovels({});
  const novels = g_novel.data;
  const filtered_novels = novels.filter((novel) => novel.converterId === user.id);

  return (
    <>
      <VemPeople user={user} />
      <Shell as="div" variant="none" className="w-full max-w-[1200px] mx-auto">
        <section className="flex items-start w-[inherit] gap-x-4">
          <div className="flex-grow">
            <VemPagePeople data={filtered_novels} searchParams={searchParams} />
          </div>
          <div className="space-y-4 w-72 shrink-0">
            <FriendsList />
          </div>
        </section>
      </Shell>
    </>
  );
}
