import Image from "next/image";
const homeBg = "/image/home-bg.jpg";
const homeImg1 = "/image/home-img-1.png";
const homeImg2 = "/image/home-img-2.png";
const homeImg3 = "/image/home-img-3.png";

export function HomeSection() {
  return (
    <section
      id="home"
      className="min-h-screen pt-25 bg-center bg-cover"
      style={{ backgroundImage: `url(${homeBg})` }}
    >
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex-1 basis-[42rem] lg:pl-35 xs:pl-10 xs:pt-0">
          <h3 className="md:text-[4.5rem] 2xs:text-[2.5rem] uppercase text-main">fresh coffee in <br/> the morning</h3>
          <a
            href="#"
            className="inline-block mt-4 px-6 py-3 border-2
             border-main text-main uppercase tracking-wider 
             hover:bg-main-dark transition rounded-full hover:border-dashed"
          >
            buy one now
          </a>
        </div>

        <div className="hidden sm:block flex-1 basis-[20rem] pt-30">
          <Image
            src={homeImg1}
            alt="coffee"
            width={260}
            height={260}
            className="animate-float"
          />
        </div>
      </div>

      <div className="text-center py-12 hidden sm:block">
        {[homeImg1, homeImg2, homeImg3].map((img, i) => (
          <Image
            key={i}
            src={img}
            alt={`slide-${i + 1}`}
            width={100}
            height={100}
            className="inline-block mx-2 pt-35 cursor-pointer hover:-translate-y-2 transition-transform"
          />
        ))}
      </div>
    </section>
  );
}
