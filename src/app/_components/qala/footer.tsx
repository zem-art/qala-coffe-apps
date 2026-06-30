import { IconRenderer } from "../IconRenderer";

export const Footer = () => {
  const OurBranch = [
    { name: "Qala Coffee", link: "#" },
  ];

  const QuickLinks = [
    { name: "beranda", link: "home" },
    { name: "tentang kami", link: "about" },
    { name: "menu", link: "menu" },
    { name: "ulasan", link: "review" },
    { name: "reservasi", link: "book" },
  ];

  const SocialLink = [
    { icon: "FaFacebook", label: "facebook" },
    { icon: "FaTwitter", label: "twitter" },
    { icon: "FaInstagram", label: "instagram" },
    { icon: "FaLinkedin", label: "linkedin" },
  ];

  return (
    <section className="bg-stone-50 py-20 text-gray-700 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {/* Our Branches */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Cabang Kami</h3>
            <div className="space-y-3">
              {OurBranch.map((data, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="flex items-center text-base text-gray-600 hover:text-main hover:translate-x-2 transition-all duration-300"
                >
                  <IconRenderer
                    lib="fa"
                    name="FaMapMarkerAlt"
                    className="mr-3 text-main"
                    size={16}
                  />
                  {data?.name}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Tautan Cepat</h3>
            <div className="space-y-3">
              {QuickLinks.map((data, idx) => (
                <a
                  key={idx}
                  href={`#${data?.link}`}
                  className="flex items-center text-base text-gray-600 hover:text-main hover:translate-x-2 transition-all duration-300 capitalize"
                >
                  <IconRenderer
                    lib="fa"
                    name="FaLink"
                    className="mr-3 text-main"
                    size={16}
                  />
                  {data?.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Info Kontak</h3>
            <div className="space-y-3">
              <a href="#" className="flex items-center text-base text-gray-600 hover:text-main transition-colors">
                <IconRenderer
                  lib="fa"
                  name="FaPhone"
                  className="mr-3 text-main shrink-0"
                  size={16}
                />
                +62 812-3456-7890
              </a>
              <a href="#" className="flex items-center text-base text-gray-600 hover:text-main transition-colors">
                <IconRenderer
                  lib="fa"
                  name="FaEnvelope"
                  className="mr-3 text-main shrink-0"
                  size={16}
                />
                cs@qalacoffee.com
              </a>
              <a href="#" className="flex items-center text-base text-gray-600 hover:text-main transition-colors">
                <IconRenderer
                  lib="fa"
                  name="FaMapMarkerAlt"
                  className="mr-3 text-main shrink-0"
                  size={16}
                />
                Indonesia, Jakarta
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Ikuti Kami</h3>
            <div className="space-y-3">
              {SocialLink.map((social, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="flex items-center text-base text-gray-600 hover:text-main hover:translate-x-2 transition-all duration-300 capitalize"
                >
                  <IconRenderer
                    lib="fa"
                    name={social.icon}
                    className="mr-3 text-main"
                    size={16}
                  />
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center text-sm md:text-base mt-16 pt-8 border-t border-gray-200 text-gray-500">
          Created by <span className="font-semibold text-main">boba</span> | All rights reserved
        </div>
      </div>
    </section>
  );
};
