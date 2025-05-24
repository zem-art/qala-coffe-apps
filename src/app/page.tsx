import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { Header } from "./_components/header";
import { HomeSection } from "./_components/home";
import { AboutSection } from "./_components/about";
import { MenuSection } from "./_components/menu_components";
import { ReviewSection } from "./_components/review_section";
import { BookingForm } from "./_components/booking_form";
import { Footer } from "./_components/footer";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <Header />
      <HomeSection/>
      <AboutSection/>
      <MenuSection/>
      <ReviewSection/>
      <BookingForm/>
      <Footer/>
    </HydrateClient>
  );
}
