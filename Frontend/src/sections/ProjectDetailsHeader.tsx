import { Badge } from "@/components/ui/badge";

interface Props {
  title: string;
  description: string;
  status: string;
}

export function ProjectDetailsHeader({ title, description, status }: Props) {
  return (
    <div className="bg-sidebar px-6 py-6 sm:px-10 sm:py-10 flex justify-between items-start">
      <div className="flex flex-col gap-2 sm:gap-3">
        <div className="hidden sm:flex gap-3">
          <Badge className="bg-purple/20 text-purple border border-purple/40 uppercase tracking-widest text-[11px] px-4 py-1.5 rounded-full">
            {status} Project
          </Badge>
          <Badge className="bg-white/10 text-muted-foreground border border-white/10 uppercase tracking-widest text-[11px] px-4 py-1.5 rounded-full">
            Intermediate Level
          </Badge>
        </div>

        <Badge className="sm:hidden self-start bg-white/10 text-muted-foreground border border-white/10 uppercase tracking-widest text-[10px] px-3 py-1 rounded-full">
          Intermediate Level
        </Badge>

        <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          {title}
        </h2>

        <p className="text-sm sm:text-base text-muted-foreground font-medium line-clamp-3 sm:line-clamp-none">
          {description}
        </p>
      </div>
    </div>
  );
}
