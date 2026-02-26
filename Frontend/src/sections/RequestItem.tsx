import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import "material-symbols/rounded.css";

export default function RequestItem() {
  return (
    <div className="p-6 border-b border-white/5 hover:bg-white/5 transition-colors flex flex-col md:flex-row gap-6">
      <div className="shrink-0">
        <div className="size-14 rounded-full bg-purple/20 border border-purple/30 flex items-center justify-center text-purple font-bold text-xl">
          JD
        </div>
      </div>

      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
          <div>
            <h4 className="text-lg font-bold text-white">
              Jordan Doe
              <span className="ml-2 text-xs font-normal text-muted-foreground uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">
                Noob
              </span>
            </h4>

            <p className="text-sm text-muted-foreground mt-1">
              Applied for{" "}
              <span className="text-purple font-medium">
                Decentralized Asset Hub
              </span>
            </p>
          </div>

          <div className="flex gap-2">
            <Button className="bg-secondary text-background text-sm font-bold rounded-lg px-4 py-2 hover:bg-secondary/80">
              Accept
            </Button>

            <Button
              variant="outline"
              className="border-white/10 text-muted-foreground text-sm font-bold px-4 py-2 hover:bg-white/5"
            >
              Reject
            </Button>
          </div>
        </div>

        {/* Interests */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-[10px] font-bold text-muted-foreground uppercase">
            Interests:
          </span>
          {["Rust", "Smart Contracts", "Wasm"].map((tag) => (
            <Badge
              key={tag}
              className="bg-white/5 border border-white/10 text-xs text-muted-foreground"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <p className="text-sm text-foreground/80 italic">
          "I've been learning Rust for 3 months and want to apply it to a real
          project. I'm eager to learn and can dedicate 10 hours a week."
        </p>
      </div>
    </div>
  );
}
