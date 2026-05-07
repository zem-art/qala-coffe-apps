import Image from "next/image";
const homeBg = "/image/home-bg.jpg";
const homeImg1 = "/image/home-img-1.png";
const homeImg2 = "/image/home-img-2.png";
const homeImg3 = "/image/home-img-3.png";

export function HomeSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center bg-center bg-cover"
      style={{ backgroundImage: `url(${homeBg})` }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="relative z-10 flex flex-wrap items-center gap-6 px-6 lg:px-[9%]">
        <div className="flex-1 basis-[42rem] text-center md:text-left">
          <h3 className="text-4xl md:text-6xl lg:text-[4.5rem] font-bold uppercase text-white leading-tight mb-6">kopi segar di <br className="hidden md:block"/> pagi hari</h3>
          <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-xl mx-auto md:mx-0">Awali hari Anda dengan secangkir kopi pilihan yang diseduh dengan sempurna. Nikmati sensasi rasanya.</p>
          <a
            href="#menu"
            className="inline-block px-8 py-3.5 bg-main text-white font-semibold uppercase tracking-wider 
             hover:bg-[#82481f] transition-all rounded-full shadow-lg hover:shadow-xl active:scale-95"
          >
            pesan sekarang
          </a>
        </div>

        <div className="hidden sm:block flex-1 basis-[20rem] pt-10 md:pt-0">
          <Image
            src={homeImg1}
            alt="coffee"
            width={300}
            height={300}
            className="animate-float mx-auto object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      <div className="relative z-10 text-center py-12 hidden sm:block mt-auto">
        {[homeImg1, homeImg2, homeImg3].map((img, i) => (
          <Image
            key={i}
            src={img}
            alt={`slide-${i + 1}`}
            width={80}
            height={80}
            className="inline-block mx-4 cursor-pointer hover:-translate-y-3 transition-transform drop-shadow-lg"
          />
        ))}
      </div>
    </section>
  );
}
