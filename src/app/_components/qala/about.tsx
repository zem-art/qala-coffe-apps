import Image from "next/image";
const aboutImg = "/image/about-img.webp";
const aboutIcon1 = "/image/about-icon-1.png";
const aboutIcon2 = "/image/about-icon-2.png";
const aboutIcon3 = "/image/about-icon-3.png";

export function AboutSection() {
    return (
        <section id="about" className="py-16 px-4 sm:px-8 lg:px-16">
            <h1 className="text-6xl font-bold text-center text-main uppercase mb-2">
                about us <span className="block text-lg font-normal text-main">why choose us</span>
            </h1>

            <div className="flex flex-col lg:flex-row items-center gap-10 mt-12">
                <div className="w-full lg:w-1/2">
                    <Image
                        width={500}
                        height={500}
                        src={aboutImg}
                        alt="About Us"
                        className="w-full rounded-full transition-all duration-700 hover:scale-105 hover:rounded-full animate-float"
                    />
                </div>

                <div className="w-full lg:w-1/2">
                    <h3 className="text-3xl font-semibold text-brown-700 mb-4">
                        what's make our coffee special!
                    </h3>
                    <p className="text-brown-600 text-lg leading-relaxed mb-6">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel rerum laboriosam reprehenderit
                        ipsa id repellat odio illum, voluptas, necessitatibus assumenda adipisci. Hic, maiores iste?
                        Excepturi illo dolore mollitia qui quia.
                    </p>
                    <a
                        href="#"
                        className="inline-block text-main border-main px-6 py-2 border-2 rounded-2xl hover:bg-brown-800 transition hover:border-dashed"
                    >
                        read more
                    </a>

                    <div className="flex flex-wrap gap-6 mt-10">
                        {[aboutIcon1, aboutIcon2, aboutIcon3].map((icon, i) => (
                            <div key={i} className="flex-1 min-w-[150px] border border-main rounded-lg p-6 text-center hover:border-dashed hover:cursor-pointer">
                                <Image
                                    src={icon}
                                    alt={`icon-${i + 1}`}
                                    width={70}
                                    height={100}
                                    className="mx-auto h-16"
                                />
                                <h3 className="mt-4 text-xl font-medium text-brown-700">
                                    {i === 0 ? "quality coffee" : i === 1 ? "our branches" : "free delivery"}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}