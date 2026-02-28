import ProjectCard from "../sections/ProjectCard";

export default function ProjectCardPreview() {
  return (
    <div className="sticky top-8 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
          Live Preview
        </h3>

        <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-md font-bold">
          WYSIWYG
        </span>
      </div>

      <ProjectCard
        title="Decentralized Asset Hub"
        description="Building a high-performance cross-chain liquidity protocol using Rust and Substrate. Aiming for low latency and high security."
        tags={["Rust", "Solana", "Wasm"]}
        members={1}
        maxMembers={5}
        status="open"
        weeksLeft={2}
      />

      {/* Tip Card */}
      <div className="rounded-xl p-5 border border-dashed border-primary/30 bg-white/5 backdrop-blur-xl">
        <h4 className="text-sm font-bold text-white mb-1">Pro Tip</h4>
        <p className="text-xs text-muted-foreground">
          Projects with a clear stack and a Discord link tend to get filled 40%
          faster.
        </p>
      </div>
    </div>
  );
}
