"use client";
const bgImg = "";

export const BookingForm = () => {
  return (
    <section
      id="book"
      className={"bg-[url('/image/booking-bg.jpg')] bg-cover bg-center py-16 px-4"}
    >
      <h1 className="text-6xl md:text-5xl font-bold text-center text-main mb-10 uppercase">
        booking{" "}
        <span className="block text-lg font-normal">reserve a table</span>
      </h1>

      <form className="max-w-2xl mx-auto border border-main rounded-xl p-6 bg-white/60 backdrop-blur-md shadow">
        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 text-base rounded-md bg-transparent border border-main text-main placeholder-main mb-4 focus:outline-none focus:border-main/60"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 text-base rounded-md bg-transparent border border-main text-main placeholder-main mb-4 focus:outline-none focus:border-main/60"
        />
        <input
          type="number"
          placeholder="Number"
          className="w-full p-3 text-base rounded-md bg-transparent border border-main text-main placeholder-main mb-4 focus:outline-none focus:border-main/60"
        />
        <textarea
          placeholder="Message"
          rows={6}
          className="w-full p-3 text-base rounded-md bg-transparent border border-main text-main placeholder-main mb-4 resize-none focus:outline-none focus:border-main/60"
        ></textarea>
        <input
          type="submit"
          value="send message"
          className="btn bg-main text-white py-2 px-4 rounded-md hover:bg-main/80 cursor-pointer transition"
        />
      </form>
    </section>
  );
};
