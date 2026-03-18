import { Card, CardContent } from "@/components/ui/card";
import "material-symbols/rounded.css";

export default function Workflow() {
  return (
    <section
      id="workflow"
      className="w-full bg-(--workflow-bg) py-14 md:py-30 border-y border-white/10"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <div className="mb-14 sm:mb-16 md:mb-20">
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            HOW THIS THING WORKS?!
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Item 1 */}
          <Card className="bg-transparent border-none shadow-none group">
            <CardContent className="flex flex-col items-center p-0 text-center max-w-xs mx-auto">
              <div className="size-20 sm:size-24 rounded-full bg-primary flex items-center justify-center mb-6 border-4 border-white/20 shadow-xl group-hover:scale-110 transition-transform">
                <span
                  className="material-symbols-rounded text-white"
                  style={{ fontSize: 45 }}
                >
                  fact_check
                </span>
              </div>

              <h4 className="text-white font-black text-xl md:text-2xl mb-3">
                Discover
              </h4>

              <p className="text-foreground/80 text-sm md:text-base leading-relaxed">
                Find people like you. Not experts. Not polished. Just curious
                builders who want to make something real.
              </p>
            </CardContent>
          </Card>

          {/* Item 2 */}
          <Card className="bg-transparent border-none shadow-none group">
            <CardContent className="flex flex-col items-center p-0 text-center max-w-xs mx-auto">
              <div className="size-20 sm:size-24 rounded-full bg-primary flex items-center justify-center mb-6 border-4 border-white/20 shadow-xl group-hover:scale-110 transition-transform">
                <span
                  className="material-symbols-rounded text-white"
                  style={{ fontSize: 45 }}
                >
                  groups
                </span>
              </div>

              <h4 className="text-white font-black text-xl md:text-2xl mb-3">
                Assemble
              </h4>

              <p className="text-foreground/80 text-sm md:text-base leading-relaxed">
                Form a small team of 3–5. Same level. No résumés. No ego. Just
                people figuring it out together.
              </p>
            </CardContent>
          </Card>

          {/* Item 3 */}
          <Card className="bg-transparent border-none shadow-none group">
            <CardContent className="flex flex-col items-center p-0 text-center max-w-xs mx-auto">
              <div className="size-20 sm:size-24 rounded-full bg-primary flex items-center justify-center mb-6 border-4 border-white/20 shadow-xl group-hover:scale-110 transition-transform">
                <span
                  className="material-symbols-rounded text-white"
                  style={{ fontSize: 45 }}
                >
                  bolt
                </span>
              </div>

              <h4 className="text-white font-black text-xl md:text-2xl mb-3">
                Build
              </h4>

              <p className="text-foreground/80 text-sm md:text-base leading-relaxed">
                Start messy. Try things. Break things. Learn as you go. Ship
                something real.
              </p>
            </CardContent>
          </Card>

          {/* Item 4 */}
          <Card className="bg-transparent border-none shadow-none group">
            <CardContent className="flex flex-col items-center p-0 text-center max-w-xs mx-auto">
              <div className="size-20 sm:size-24 rounded-full bg-primary flex items-center justify-center mb-6 border-4 border-white/20 shadow-xl group-hover:scale-110 transition-transform">
                <span
                  className="material-symbols-rounded text-white"
                  style={{ fontSize: 45 }}
                >
                  verified
                </span>
              </div>

              <h4 className="text-white font-black text-xl md:text-2xl mb-3">
                Master
              </h4>

              <p className="text-foreground/80 text-sm md:text-base leading-relaxed">
                Get real experience. Build confidence. Become the kind of
                builder you couldn't hire before.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
