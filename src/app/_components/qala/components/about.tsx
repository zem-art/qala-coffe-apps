import Image from "next/image";
const aboutImg = "/image/about-img.webp";
const aboutIcon1 = "/image/about-icon-1.png";
const aboutIcon2 = "/image/about-icon-2.png";
const aboutIcon3 = "/image/about-icon-3.png";

export function AboutSection() {
    return (
        <section id="about" className="py-20 bg-gray-50">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold text-main uppercase tracking-tight mb-2">
                    tentang kami
                </h1>
                <span className="block text-lg md:text-xl font-medium text-gray-500">mengapa memilih kami</span>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="w-full lg:w-1/2 relative">
                    {/* Add a decorative background circle */}
                    <div className="absolute inset-0 bg-main/10 rounded-full blur-3xl transform scale-90"></div>
                    <Image
                        width={500}
                        height={500}
                        src={aboutImg}
                        alt="About Us"
                        className="relative z-10 w-full max-w-[500px] mx-auto rounded-[2rem] shadow-2xl transition-all duration-700 hover:scale-[1.02]"
                    />
                </div>

                <div className="w-full lg:w-1/2">
                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                        apa yang membuat kopi kami spesial!
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                        Kami menyajikan kopi terbaik yang diseduh dengan penuh dedikasi. Setiap cangkir kopi kami dibuat dari biji kopi pilihan untuk memastikan kualitas dan cita rasa yang tak terlupakan. Nikmati momen Anda bersama racikan spesial kami.
                    </p>
                    <a
                        href="#menu"
                        className="inline-block px-8 py-3 bg-main text-white font-medium rounded-xl hover:bg-[#82481f] transition-all shadow-md hover:shadow-lg active:scale-95"
                    >
                        baca selengkapnya
                    </a>

                    <div className="flex flex-wrap gap-6 mt-12">
                        {[aboutIcon1, aboutIcon2, aboutIcon3].map((icon, i) => (
                            <div key={i} className="flex-1 min-w-[140px] bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer group">
                                <Image
                                    src={icon}
                                    alt={`icon-${i + 1}`}
                                    width={70}
                                    height={100}
                                    className="mx-auto h-16 w-auto object-contain transition-transform group-hover:scale-110"
                                />
                                <h3 className="mt-5 text-lg font-semibold text-gray-800 group-hover:text-main transition-colors">
                                    {i === 0 ? "kopi berkualitas" : i === 1 ? "cabang kami" : "gratis ongkir"}
                                </h3>
                            </div>
                        ))}
                    </div>
          </div>
        </div>
      </div>
        </section>
    )
}