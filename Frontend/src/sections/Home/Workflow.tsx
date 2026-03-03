import { Card, CardContent } from "@/components/ui/card";
import "material-symbols/rounded.css";

export default function Workflow() {
  return (
    <section
      id="workflow"
      className="w-full bg-(--workflow-bg) py-10 md:py-15 border-y border-white/10"
    >
      <div className="max-w-300 mx-auto px-6 text-center">
        {/* Heading */}
        <div className="mb-20">
          <h2 className="text-foreground text-sm font-black uppercase tracking-[0.4em] mb-4">
            THE WORKFLOW
          </h2>
          <h3 className="text-white text-5xl md:text-6xl font-black tracking-tight">
            How We Build
          </h3>
        </div>
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Item 1 */}
          <Card className="bg-transparent border-none shadow-none group">
            <CardContent className="flex flex-col items-center p-0">
              <div className="size-24 rounded-full bg-primary flex items-center justify-center mb-8 border-4 border-white/20 shadow-xl group-hover:scale-110 transition-transform">
                <span className="material-symbols-rounded text-white">
                  fact_check
                </span>
              </div>
              <h4 className="text-white font-black text-xl mb-3">Discover</h4>
              <p className="text-foreground/90 text-sm leading-relaxed max-w-50">
                Find projects matching your target stack through curated
                listings.
              </p>
            </CardContent>
          </Card>
          {/* Item 2 */}
          <Card className="bg-transparent border-none shadow-none group">
            <CardContent className="flex flex-col items-center p-0">
              <div className="size-24 rounded-full bg-primary flex items-center justify-center mb-8 border-4 border-white/20 shadow-xl group-hover:scale-110 transition-transform">
                <span className="material-symbols-rounded text-white">
                  groups
                </span>
              </div>
              <h4 className="text-white font-black text-xl mb-3">Assemble</h4>
              <p className="text-foreground/90 text-sm leading-relaxed max-w-50">
                Join a vetted squad of 3-5 developers ready to execute.
              </p>
            </CardContent>
          </Card>
          {/* Item 3 */}
          <Card className="bg-transparent border-none shadow-none group">
            <CardContent className="flex flex-col items-center p-0">
              <div className="size-24 rounded-full bg-primary flex items-center justify-center mb-8 border-4 border-white/20 shadow-xl group-hover:scale-110 transition-transform">
                <span className="material-symbols-rounded text-white">
                  bolt
                </span>
              </div>
              <h4 className="text-white font-black text-xl mb-3">Sprint</h4>
              <p className="text-foreground/90 text-sm leading-relaxed max-w-50">
                Ship production-grade features in high-velocity 2-week cycles.
              </p>
            </CardContent>
          </Card>
          {/* Item 4 */}
          <Card className="bg-transparent border-none shadow-none group">
            <CardContent className="flex flex-col items-center p-0">
              <div className="size-24 rounded-full bg-primary flex items-center justify-center mb-8 border-4 border-white/20 shadow-xl group-hover:scale-110 transition-transform">
                <span className="material-symbols-rounded text-white">
                  verified
                </span>
              </div>
              <h4 className="text-white font-black text-xl mb-3">Master</h4>
              <p className="text-foreground/90 text-sm leading-relaxed max-w-50">
                Earn verified credentials and peer endorsements.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
