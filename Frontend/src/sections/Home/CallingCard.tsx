import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import "material-symbols/rounded.css";
import { Link } from "react-router-dom";
export default function CallingCard() {
  return (
    <section
      id="cta"
      className="max-w-300 mx-auto w-full py-10 sm:py-12 px-0 sm:px-6 flex justify-center"
    >
      <Card
        className="
        relative w-full max-w-275
        rounded-none border-0 shadow-none
        sm:rounded-[4rem]
        sm:border-4 sm:border-white/20
        sm:shadow-[0_30px_80px_-20px_rgba(131,50,172,0.5)]
        bg-linear-to-r from-[#3b1f6e] to-[#1a0f3c]
        overflow-hidden
        transition-all duration-500
        transform-gpu
        sm:hover:-translate-y-3
        sm:hover:scale-[1.02]
        sm:hover:shadow-[0_60px_140px_-20px_rgba(131,50,172,0.75)]
        sm:hover:border-white/40
      "
      >
        <CardContent className="relative z-10 flex flex-col items-center text-center gap-6 sm:gap-8 p-8 sm:p-12 md:p-16">
          {/* Badge */}
          <div className="bg-white text-[#1a0f3c] px-6 sm:px-8 py-2 rounded-full font-black text-xs sm:text-sm uppercase tracking-widest md:tracking-wide shadow-2xl">
            Still waiting?
          </div>
          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter max-w-3xl leading-tight">
            <span className="text-white">STOP WAITING.</span> <br />
            <span
              className="underline decoration-white/40 decoration-4 underline-offset-6 sm:underline-offset-8"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #e0aaff, #f4a0c8, #ffb3d9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              BUILD SOMETHING.
            </span>
          </h2>
          <p>No team? No experience? You've come to the right place.</p>
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 mt-4 sm:mt-6">
            <Link to="/projects">
              <Button
                className="
                px-6 sm:px-10 py-4 sm:py-6
                bg-white text-[#1a0f3c]
                rounded-full font-black text-sm sm:text-lg md:text-xl
                hover:scale-105 transition-all
                shadow-2xl hover:bg-[#f0e6ff] hover:text-[#1a0f3c]
                cursor-pointer
              "
              >
                FIND A PROJECT
              </Button>
            </Link>
            <a href="#workflow">
              <Button
                className="
                px-6 sm:px-10 py-4 sm:py-6
                bg-[#4a2880] text-white
                rounded-full font-black text-sm sm:text-lg md:text-xl
                shadow-xl
                transition-all duration-300
                hover:bg-[#5c34a0]
                hover:text-white
                hover:-translate-y-0.5
                hover:shadow-2xl
                active:scale-95
                cursor-pointer
              "
              >
                SEE HOW IT WORKS
              </Button>
            </a>
          </div>
        </CardContent>
        {/* Decorative Icon */}
        <div className="absolute top-0 right-0 p-8 sm:p-12 opacity-10">
          <span
            style={{ fontSize: 200 }}
            className="material-symbols-rounded rotate-12 text-white opacity-50 text-[120px] sm:text-[180px]"
          >
            architecture
          </span>
        </div>
      </Card>
    </section>
  );
}
