import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import "material-symbols/rounded.css";

export default function Featured() {
  return (
    <section className="max-w-300 w-full px-2 md:px-10 py-12.5 mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-1.5 bg-accent rounded-full"></div>
          <h2 className="text-white text-4xl md:text-5xl font-black tracking-tight uppercase">
            Featured Projects
          </h2>
        </div>

        <div className="flex bg-white/10 p-2 rounded-2xl border-2 border-white/20 backdrop-blur-md">
          <button className="px-8 py-3 rounded-xl bg-white text-background text-xs font-black uppercase tracking-widest shadow-xl">
            ALL STACKS
          </button>
          <button className="px-8 py-3 rounded-xl text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-colors">
            RUST
          </button>
          <button className="px-8 py-3 rounded-xl text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-colors">
            AI/ML
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* CARD 1 */}
        <Card
          className="group bg-white/10 border border-white/20 rounded-[2.5rem] overflow-hidden 
                    transition duration-300 shadow-2xl backdrop-blur-md cursor-pointer
                    hover:-translate-y-3 
                    hover:shadow-[0_35px_80px_-15px_rgba(131,50,172,0.6)] 
                    hover:border-white/40"
        >
          {/* Image */}
          <div className="aspect-video relative bg-background overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-tr from-accent/50 to-transparent"></div>

            <div className="absolute top-6 left-6 flex gap-2">
              <Badge className="bg-white/20 text-white font-black text-[15px] uppercase border border-white/40 backdrop-blur-md">
                8 Spots
              </Badge>

              <Badge className="bg-primary text-white font-black text-[15px] uppercase border border-white/20">
                Hot
              </Badge>
            </div>
          </div>

          {/* Header */}
          <CardHeader className="flex flex-row justify-between items-center p-8 pb-0">
            <h3 className="text-2xl font-black text-white group-hover:text-secondary transition-colors">
              Rust Systems Engine
            </h3>
            <span className="material-symbols-rounded text-white/80">
              trending_up
            </span>
          </CardHeader>

          {/* Content */}
          <CardContent className="p-8 pt-4 flex flex-col gap-5">
            <p className="text-foreground/90 text-base leading-relaxed font-medium">
              Build a high-performance CLI for distributed log processing.
              Master ownership and zero-cost abstractions.
            </p>

            <div className="flex flex-wrap gap-2">
              <Badge className="bg-white text-background font-black text-[15px] uppercase">
                Systems
              </Badge>

              <Badge className="bg-primary text-white font-black text-[15px] uppercase border border-white/20">
                Advanced
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* CARD 2 */}
        <Card
          className="group bg-white/10 border border-white/20 rounded-[2.5rem] overflow-hidden 
                      transition duration-300 shadow-2xl backdrop-blur-md cursor-pointer
                      hover:-translate-y-3 
                      hover:shadow-[0_35px_80px_-15px_rgba(131,50,172,0.6)] 
                      hover:border-white/40"
        >
          <div className="aspect-video relative bg-background overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-tr from-primary/50 to-transparent"></div>

            <div className="absolute top-6 left-6">
              <Badge className="bg-white/20 text-white font-black text-[15px] uppercase border border-white/40 backdrop-blur-md">
                3 Spots
              </Badge>
            </div>
          </div>

          <CardHeader className="flex flex-row justify-between items-center p-8 pb-0">
            <h3 className="text-2xl font-black text-white group-hover:text-secondary transition-colors">
              K8s Native Lab
            </h3>
            <span className="material-symbols-rounded text-white/80">
              terminal
            </span>
          </CardHeader>

          <CardContent className="p-8 pt-4 flex flex-col gap-5">
            <p className="text-foreground/90 text-base leading-relaxed font-medium">
              Architect self-healing microservices using CRDs. Master
              orchestration patterns.
            </p>

            <div className="flex flex-wrap gap-2">
              <Badge className="bg-white text-background font-black text-[15px] uppercase">
                DevOps
              </Badge>

              <Badge className="bg-primary text-white font-black text-[15px] uppercase border border-white/20">
                Intermediate
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* CARD 3 */}
        <Card
          className="group bg-white/10 border border-white/20 rounded-[2.5rem] overflow-hidden 
                    transition duration-300 shadow-2xl backdrop-blur-md cursor-pointer
                    hover:-translate-y-3 
                    hover:shadow-[0_35px_80px_-15px_rgba(131,50,172,0.6)] 
                    hover:border-white/40"
        >
          <div className="aspect-video relative bg-background overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-tr from-accent/50 to-transparent"></div>

            <div className="absolute top-6 left-6">
              <Badge className="bg-white/20 text-white font-black text-[15px] uppercase border-2 border-white/40 backdrop-blur-md">
                Project Full
              </Badge>
            </div>
          </div>
          <CardHeader className="flex flex-row justify-between items-center p-8 pb-0">
            <h3 className="text-2xl font-black text-white group-hover:text-secondary transition-colors">
              3D Web UX
            </h3>
            <span className="material-symbols-rounded text-white">
              inventory_2
            </span>
          </CardHeader>
          <CardContent className="p-8 pt-4 flex flex-col gap-5">
            <p className="text-foreground/90 text-base leading-relaxed font-medium">
              Immersive data visualizations using WebGL and Three.js. Push
              modern frontend interaction.
            </p>

            <div className="flex flex-wrap gap-2">
              <Badge className="bg-white text-background font-black text-[15px] uppercase">
                Frontend
              </Badge>
              <Badge className="bg-primary text-white font-black text-[15px] uppercase border border-white/20">
                Creative
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
