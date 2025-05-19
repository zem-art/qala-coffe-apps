import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <div className="bg-primary text-white font-sans p-6 rounded-xl shadow">
        Halo T3 dengan Tailwind v4!
      </div>
      <div className="bg-primary text-white p-4 rounded">
        Harusnya ini warna #0F172A
      </div>
    </HydrateClient>
  );
}
