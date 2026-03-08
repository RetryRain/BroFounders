import { Card, CardContent } from "@/components/ui/card";
import "material-symbols/rounded.css";

export default function Workflow() {
  return (
    <section
      id="workflow"
      className="w-full bg-(--workflow-bg) py-10 sm:py-12 md:py-16 border-y border-white/10"
    >
      <div className="max-w-300 mx-auto px-6 text-center">
        {/* Heading */}
        <div className="mb-14 sm:mb-16 md:mb-20">
          <h2 className="text-foreground text-[10px] sm:text-sm font-black uppercase tracking-[0.35em] sm:tracking-[0.4em] mb-3 sm:mb-4">
            THE WORKFLOW
          </h2>

          <h3 className="text-white text-3xl sm:text-4xl md:text-6xl font-black tracking-tight">
            How We Build
          </h3>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
          {/* Item 1 */}
          <Card className="bg-transparent border-none shadow-none group">
            <CardContent className="flex flex-col items-center p-0">
              <div className="size-20 sm:size-24 rounded-full bg-primary flex items-center justify-center mb-6 sm:mb-8 border-4 border-white/20 shadow-xl group-hover:scale-110 transition-transform">
                <span className="material-symbols-rounded text-white text-xl sm:text-2xl">
                  fact_check
                </span>
              </div>

              <h4 className="text-white font-black text-lg sm:text-xl mb-2 sm:mb-3">
                Discover
              </h4>

              <p className="text-foreground/90 text-xs sm:text-sm leading-relaxed max-w-xs">
                Find projects matching your target stack through curated
                listings.
              </p>
            </CardContent>
          </Card>

          {/* Item 2 */}
          <Card className="bg-transparent border-none shadow-none group">
            <CardContent className="flex flex-col items-center p-0">
              <div className="size-20 sm:size-24 rounded-full bg-primary flex items-center justify-center mb-6 sm:mb-8 border-4 border-white/20 shadow-xl group-hover:scale-110 transition-transform">
                <span className="material-symbols-rounded text-white text-xl sm:text-2xl">
                  groups
                </span>
              </div>

              <h4 className="text-white font-black text-lg sm:text-xl mb-2 sm:mb-3">
                Assemble
              </h4>

              <p className="text-foreground/90 text-xs sm:text-sm leading-relaxed max-w-xs">
                Join a vetted squad of 3-5 developers ready to execute.
              </p>
            </CardContent>
          </Card>

          {/* Item 3 */}
          <Card className="bg-transparent border-none shadow-none group">
            <CardContent className="flex flex-col items-center p-0">
              <div className="size-20 sm:size-24 rounded-full bg-primary flex items-center justify-center mb-6 sm:mb-8 border-4 border-white/20 shadow-xl group-hover:scale-110 transition-transform">
                <span className="material-symbols-rounded text-white text-xl sm:text-2xl">
                  bolt
                </span>
              </div>

              <h4 className="text-white font-black text-lg sm:text-xl mb-2 sm:mb-3">
                Sprint
              </h4>

              <p className="text-foreground/90 text-xs sm:text-sm leading-relaxed max-w-xs">
                Ship production-grade features in high-velocity 2-week cycles.
              </p>
            </CardContent>
          </Card>

          {/* Item 4 */}
          <Card className="bg-transparent border-none shadow-none group">
            <CardContent className="flex flex-col items-center p-0">
              <div className="size-20 sm:size-24 rounded-full bg-primary flex items-center justify-center mb-6 sm:mb-8 border-4 border-white/20 shadow-xl group-hover:scale-110 transition-transform">
                <span className="material-symbols-rounded text-white text-xl sm:text-2xl">
                  verified
                </span>
              </div>

              <h4 className="text-white font-black text-lg sm:text-xl mb-2 sm:mb-3">
                Master
              </h4>

              <p className="text-foreground/90 text-xs sm:text-sm leading-relaxed max-w-xs">
                Earn verified credentials and peer endorsements.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
