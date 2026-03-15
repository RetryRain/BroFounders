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
            How BroFounders Work?!
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
                Find curious builders. Aspirant Developers, Marketers, Designers
                and people who just want to build something real.
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
                Form a team of 3-5 builders at a similar skill level. No
                résumés. No “know it all” nonsense.
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
                Work together on real projects. Experiment, break things, learn
                new tools, and ship something meaningful.
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
                Gain real experience, improve your skills, and build the
                confidence to tackle bigger ideas.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
