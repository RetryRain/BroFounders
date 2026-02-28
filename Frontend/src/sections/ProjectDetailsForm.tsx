import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface Props {
  title: string;
  setTitle: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  tags: string[];
  setTags: (v: string[]) => void;
  maxMembers: number;
  setMaxMembers: (v: number) => void;
}

export default function ProjectDetailsForm({
  title,
  setTitle,
  description,
  setDescription,
  tags,
  setTags,
  maxMembers,
  setMaxMembers,
}: Props) {
  const allTags = [
    "Rust",
    "Solana",
    "Wasm",
    "React",
    "Node.js",
    "Go",
    "Python",
    "TypeScript",
    "PostgreSQL",
  ];

  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  return (
    <div className="space-y-8">
      {/* TITLE */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Project Title
        </label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="py-5 text-[17px]"
        />
      </div>

      {/* DESCRIPTION */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Description
        </label>
        <Textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="py-5 text-[17px] resize-none"
        />
      </div>

      {/* STACK */}
      <div className="space-y-4">
        <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground block">
          Tech Stack
        </label>

        <div className="flex flex-wrap gap-2">
          {allTags.map((tech) => {
            const selected = tags.includes(tech);

            return (
              <Badge
                key={tech}
                onClick={() => toggleTag(tech)}
                className={`cursor-pointer ${
                  selected
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border-border text-muted-foreground hover:bg-primary/20"
                }`}
              >
                {tech}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* MEMBERS */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Max Members
        </label>
        <Input
          type="number"
          value={maxMembers}
          onChange={(e) => setMaxMembers(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
