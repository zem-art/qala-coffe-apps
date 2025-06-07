import { IconRenderer } from "../IconRenderer";

export const Footer = () => {
  const OurBranch = [
    { name: "Qala Coffee", link: "#" },
  ];

  const QuickLinks = [
    { name: "home", link: "#home" },
    { name: "about", link: "#about" },
    { name: "menu", link: "#menu" },
    { name: "review", link: "#review" },
    { name: "book", link: "#book" },
  ];

  const SocialLink = [
    { icon: "FaFacebook", label: "facebook" },
    { icon: "FaTwitter", label: "twitter" },
    { icon: "FaInstagram", label: "instagram" },
    { icon: "FaLinkedin", label: "linkedin" },
  ];

  return (
    <section className="bg-white px-6 py-16 text-main">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {/* Our Branches */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Our Branches</h3>
          {OurBranch.map((data, idx) => (
            <a
              key={idx}
              href="#"
              className="block text-base py-1 hover:pl-4 transition-all duration-200"
            >
              <IconRenderer
                lib="fa"
                name="FaMapMarkerAlt"
                className="inline-block mr-2 text-main"
                size={16}
              />
              {data?.name}
            </a>
          ))}
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
          {QuickLinks.map((data, idx) => (
            <a
              key={idx}
              href={`#${data?.link}`}
              className="block text-base py-1 hover:pl-4 transition-all duration-200"
            >
              <IconRenderer
                lib="fa"
                name="FaLink"
                className="inline-block mr-2 text-main"
                size={16}
              />
              {data?.name}
            </a>
          ))}
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Contact Info</h3>
          <a href="#" className="block text-base py-1">
            <IconRenderer
              lib="fa"
              name="FaPhone"
              className="inline-block mr-2 text-main"
              size={16}
            />
            +62 812-3456-7890
          </a>
          <a href="#" className="block text-base py-1">
            <IconRenderer
              lib="fa"
              name="FaEnvelope"
              className="inline-block mr-2 text-main"
              size={16}
            />
            cs@qalacoffee.com
          </a>
          <a href="#" className="block text-base py-1">
            <IconRenderer
              lib="fa"
              name="FaMapMarkerAlt"
              className="inline-block mr-2 text-main"
              size={16}
            />
            Indonesia, Jakarta
          </a>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
          {SocialLink.map((social, idx) => (
            <a
              key={idx}
              href="#"
              className="block text-base py-1 hover:pl-4 transition-all duration-200"
            >
              <i className={`${social.icon} mr-2`} />
              <IconRenderer
                lib="fa"
                name={social.icon}
                className="inline-block mr-2 text-main"
                size={16}
              />
              {social.label}
            </a>
          ))}
        </div>
      </div>

      <div className="text-center text-lg mt-12 text-main">
        Created by <span className="border-b border-main">boba</span> | All rights reserved
      </div>
    </section>
  );
};
