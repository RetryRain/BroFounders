import { Badge } from "@/components/ui/badge";

export default function SentApplicationItem() {
  return (
    <div className="p-6 hover:bg-white/5 transition-colors flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-3">
          <div>
            <h4 className="text-lg font-bold text-white">
              Decentralized Asset Hub
            </h4>
            <p className="text-sm text-muted-foreground mt-1">
              Hosted by{" "}
              <span className="text-purple font-medium">Marcus Vane</span>
            </p>
          </div>

          <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border bg-orange-400/10 text-orange-400 border-orange-400/20">
            Under Review
          </span>
        </div>

        <p className="text-sm text-foreground/80 italic mb-4">
          "Excited to contribute to cross-chain liquidity protocols and deepen
          my Rust experience."
        </p>

        <div className="flex flex-wrap gap-2">
          {["Rust", "Solana", "Wasm"].map((tag) => (
            <Badge
              key={tag}
              className="bg-white/5 border border-white/10 text-xs text-muted-foreground"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
