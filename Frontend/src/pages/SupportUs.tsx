import logo from "@/assets/logo.svg";

export default function SupportUs() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* FAINT LOGO BACKGROUND */}
      <img
        src={logo}
        alt="bg-logo"
        className="absolute inset-0 m-auto w-screen md:w-[50vw] rounded-full opacity-3 pointer-events-none select-none"
      />

      {/* CONTENT */}
      <div className="relative max-w-md sm:max-w-xl w-full p-5 sm:p-6 text-center space-y-6 z-10">
        {/* HEADER */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            Keep BroFounders Alive!
          </h1>
        </div>

        {/* TEXT */}
        <p className="text-sm sm:text-lg text-muted-foreground leading-relaxed max-w-sm sm:max-w-none mx-auto">
          Right now this platform runs on hopes, dreams, and free-tiers. If you
          believe in what we're building, help us keep it running and make it
          better for builders like you.
        </p>

        {/* BUTTON */}
        <form
          action="https://www.paypal.com/ncp/payment/KL8P7MAPLM8GJ"
          method="post"
          target="_blank"
          className="w-full sm:inline-block sm:w-auto"
        >
          <button
            type="submit"
            className="w-full sm:w-auto cursor-pointer bg-green-500 hover:bg-green-400 text-black font-bold px-5 py-3 rounded-xl shadow-lg active:scale-95 sm:hover:scale-105 transition"
          >
            💖 Support via PayPal
          </button>
        </form>
        {/* FOOTER */}
        <p className="text-xs sm:text-base text-muted-foreground opacity-70 leading-relaxed max-w-xs mx-auto">
          No subscriptions will be implemented in this platform.
          <br />
          Please support if you can.
        </p>
      </div>
    </div>
  );
}
