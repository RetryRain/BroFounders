import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import "material-symbols/rounded.css";
import { Link } from "react-router-dom";

export default function CallingCard() {
  return (
    <section className="max-w-300 mx-auto w-full py-10 px-2 flex justify-center">
      <Card
        className="
            relative w-full max-w-275
            rounded-[4rem]
            bg-linear-to-r from-primary to-background
            border-4 border-white/20
            shadow-[0_30px_80px_-20px_rgba(131,50,172,0.5)]
            overflow-hidden
            transition-all duration-500
            transform-gpu
            hover:-translate-y-3
            hover:scale-[1.02]
            hover:shadow-[0_60px_140px_-20px_rgba(131,50,172,0.75)]
            hover:border-white/40
        "
      >
        <CardContent className="relative z-10 flex flex-col items-center text-center gap-8 p-16">
          {/* Top Badge */}
          <div className="bg-white text-background px-8 py-2.5 rounded-full font-black text-sm uppercase md:tracking-[0.3em] shadow-2xl text-nowrap md:text-wrap cursor-pointer">
            READY TO LAUNCH?
          </div>

          {/* Heading */}
          <h2 className="text-2xl md:text-7xl font-black text-white tracking-tighter max-w-3xl leading-tight">
            SHIP CODE. <br />
            <span className="text-foreground underline decoration-white/60 decoration-4 underline-offset-8">
              GAIN MASTERY.
            </span>
          </h2>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            <Link to={"/Projects"}>
              <Button
                className="
                  px-12 py-6
                  bg-white text-background
                  rounded-full font-black text-base md:text-xl
                  hover:scale-105 transition-all
                  shadow-2xl hover:bg-background hover:text-white
                  cursor-pointer
                "
              >
                START BROWSING
              </Button>
            </Link>
            <a href="#workflow">
              <Button
                className="
                  px-12 py-6
                  bg-primary text-primary-foreground
                  rounded-full font-black text-base md:text-xl
                  shadow-xl
                  transition-all duration-300
                  hover:bg-accent
                  hover:text-accent-foreground
                  hover:-translate-y-0.5
                  hover:shadow-2xl
                  active:scale-95
                  cursor-pointer
              "
              >
                HOW IT WORKS
              </Button>
            </a>
          </div>
        </CardContent>

        {/* Decorative Giant Icon (Optional, like original) */}
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <span className="material-symbols-rounded rotate-12 text-white opacity-50">
            code
          </span>
        </div>
      </Card>
    </section>
  );
}
