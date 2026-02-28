import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function ProjectDetailsForm() {
  return (
    <div className="space-y-8">
      {/* TITLE */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Project Title
        </label>
        <Input
          defaultValue="Decentralized Asset Hub"
          className="bg-white/5 border-white/10 focus-visible:ring-indigo-bloom py-5 text-[17px]!"
        />
      </div>

      {/* DESCRIPTION */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Description
        </label>
        <Textarea
          rows={4}
          defaultValue="Building a high-performance cross-chain liquidity protocol using Rust and Substrate. Aiming for low latency and high security."
          className="bg-white/5 border-white/10 focus-visible:ring-indigo-bloom resize-none py-5 text-[17px]!"
        />
      </div>

      {/* STACK */}
      <div className="space-y-4">
        <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground block">
          Tech Stack
        </label>

        <div className="flex flex-wrap gap-2">
          {["Rust", "Solana", "Wasm"].map((tech) => (
            <Badge key={tech} className="bg-primary text-white cursor-pointer">
              {tech}
            </Badge>
          ))}

          {["React", "Node.js", "Go", "Python", "TypeScript", "PostgreSQL"].map(
            (tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="border-white/10 bg-white/5 text-muted-foreground hover:bg-primary/20 hover:border-primary/50 cursor-pointer"
              >
                {tech}
              </Badge>
            ),
          )}
        </div>
      </div>

      {/* MEMBERS + PLATFORM */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Max Members
          </label>
          <Input
            type="number"
            defaultValue={5}
            className="bg-white/5 border-white/10 focus-visible:ring-indigo-bloom"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Coordination Platform
          </label>

          <Select defaultValue="discord">
            <SelectTrigger className="bg-white/5 border-white/10 focus:ring-indigo-bloom">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="discord">Discord</SelectItem>
              <SelectItem value="slack">Slack</SelectItem>
              <SelectItem value="telegram">Telegram</SelectItem>
              <SelectItem value="matrix">Matrix</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
