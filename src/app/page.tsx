import Link from "next/link";
import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { Header } from "./_components/qala/header";
import { HomeSection } from "./_components/qala/components/home";
import { AboutSection } from "./_components/qala/components/about";
import { MenuSection } from "./_components/qala/components/menu";
import { ReviewSection } from "./_components/qala/components/review";
import { BookingForm } from "./_components/qala/components/booking";
import { Footer } from "./_components/qala/footer";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  // const session = await auth();

  // if (session?.user) {
  //   void api.post.getLatest.prefetch();
  // }

  // console.log("Session: =>", session);

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
