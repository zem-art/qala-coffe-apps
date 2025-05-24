export const Footer = () => {
  return (
    <section className="bg-white px-6 py-16 text-main">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {/* Our Branches */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Our Branches</h3>
          {["India", "USA", "France", "Africa", "Japan"].map((branch, idx) => (
            <a
              key={idx}
              href="#"
              className="block text-base py-1 hover:pl-4 transition-all duration-200"
            >
              <i className="fas fa-arrow-right mr-2" />
              {branch}
            </a>
          ))}
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
          {["home", "about", "menu", "review", "book"].map((link, idx) => (
            <a
              key={idx}
              href={`#${link}`}
              className="block text-base py-1 hover:pl-4 transition-all duration-200"
            >
              <i className="fas fa-arrow-right mr-2" />
              {link}
            </a>
          ))}
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Contact Info</h3>
          <a href="#" className="block text-base py-1">
            <i className="fas fa-phone mr-2" /> +123-456-7890
          </a>
          <a href="#" className="block text-base py-1">
            <i className="fas fa-phone mr-2" /> +111-222-3333
          </a>
          <a href="#" className="block text-base py-1">
            <i className="fas fa-envelope mr-2" /> coffee@gmail.com
          </a>
          <a href="#" className="block text-base py-1">
            <i className="fas fa-map-marker-alt mr-2" /> Perú, Lima
          </a>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
          {[
            { icon: "fab fa-facebook-f", label: "facebook" },
            { icon: "fab fa-twitter", label: "twitter" },
            { icon: "fab fa-instagram", label: "instagram" },
            { icon: "fab fa-linkedin", label: "linkedin" },
            { icon: "fab fa-twitter", label: "twitter" },
          ].map((social, idx) => (
            <a
              key={idx}
              href="#"
              className="block text-base py-1 hover:pl-4 transition-all duration-200"
            >
              <i className={`${social.icon} mr-2`} />
              {social.label}
            </a>
          ))}
        </div>
      </div>

      <div className="text-center text-lg mt-12 text-main">
        Created by <span className="border-b border-main">mr. web designer</span> | All rights reserved
      </div>
    </section>
  );
};
