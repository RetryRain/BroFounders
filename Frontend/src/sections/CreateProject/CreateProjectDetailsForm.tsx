import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import type { Project } from "@/types/project";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  title: Project["title"];
  setTitle: Dispatch<SetStateAction<Project["title"]>>;

  blurb: Project["blurb"];
  setBlurb: Dispatch<SetStateAction<Project["blurb"]>>;

  description: Project["description"];
  setDescription: Dispatch<SetStateAction<Project["description"]>>;

  techStack: Project["techStack"];
  setTechStack: Dispatch<SetStateAction<Project["techStack"]>>;

  level: Project["level"];
  setLevel: Dispatch<SetStateAction<Project["level"]>>;

  maxMembers: Project["maxMembers"];
  setMaxMembers: Dispatch<SetStateAction<Project["maxMembers"]>>;

  lookingFor: Project["lookingFor"];
  setLookingFor: Dispatch<SetStateAction<Project["lookingFor"]>>;

  broadcast: string;
  setBroadcast: Dispatch<SetStateAction<string>>;

  memberCount: number;
  mode: "create" | "edit";
}

export default function CreateProjectDetailsForm({
  title,
  setTitle,
  blurb,
  setBlurb,
  description,
  setDescription,
  techStack,
  setTechStack,
  level,
  setLevel,
  maxMembers,
  setMaxMembers,
  lookingFor,
  setLookingFor,
  broadcast,
  setBroadcast,
  memberCount,
  mode,
}: Props) {
  const [customTech, setCustomTech] = useState("");

  const defaultTech = [
    "Frontend",
    "Backend",
    "Design",
    "Music",
    "Marketing",
    "AI",
    "No-Code",
    "Mobile",
    "Art",
    "Game Dev",
    "Experimenting",
    "Learning",
  ];

  const allTech = Array.from(new Set([...defaultTech, ...techStack]));

  const levels: Project["level"][] = [
    "beginner",
    "intermediate",
    "advanced",
    "chaos",
  ];

  const toggleTech = (tech: string) => {
    if (techStack.includes(tech)) {
      setTechStack((prev) => prev.filter((t) => t !== tech));
    } else {
      setTechStack((prev) => [...prev, tech]);
    }
  };

  const addCustomTech = () => {
    const trimmed = customTech.trim();
    if (!trimmed || techStack.includes(trimmed)) return;
    setTechStack([...techStack, trimmed]);
    setCustomTech("");
  };

  const formatTitle = (value: string) => {
    return value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const projectFull = memberCount >= maxMembers;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* TITLE */}
      <div className="flex flex-col gap-2">
        <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Title <span className="text-red-500">*</span>
        </label>

        <Input
          required
          value={title}
          maxLength={75}
          onChange={(e) => setTitle(formatTitle(e.target.value))}
          className="py-4 sm:py-5 text-sm sm:text-[17px]"
        />
      </div>

      {/* BLURB */}
      <div className="flex flex-col gap-2">
        <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Blurb <span className="text-red-500">*</span>
        </label>

        <Textarea
          required
          rows={2}
          value={blurb}
          maxLength={110}
          onChange={(e) => setBlurb(e.target.value)}
          className="py-3 sm:py-4 text-sm sm:text-[15px] resize-none"
        />
      </div>

      {/* DESCRIPTION */}
      <div className="flex flex-col gap-2">
        <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Description <span className="text-red-500">*</span>
        </label>

        <Textarea
          required
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="py-4 sm:py-5 text-sm sm:text-[16px] resize-none"
        />
      </div>

      {/* SCALE */}
      <div className="space-y-3 sm:space-y-4">
        <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-muted-foreground block">
          Project Scale <span className="text-red-500">*</span>
        </label>

        <div className="flex gap-2 flex-wrap">
          {levels.map((lvl) => (
            <Badge
              key={lvl}
              onClick={() => setLevel(lvl)}
              className={`capitalize cursor-pointer text-xs sm:text-sm ${
                level === lvl
                  ? "bg-purple text-white"
                  : "bg-card border-border text-muted-foreground hover:bg-purple/20"
              }`}
            >
              {lvl}
            </Badge>
          ))}
        </div>
      </div>

      {/* TECH STACK */}
      <div className="space-y-3 sm:space-y-4">
        <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-muted-foreground block">
          Tags <span className="text-red-500">*</span>
        </label>

        <div className="flex flex-wrap gap-2">
          {allTech.map((tech) => {
            const selected = techStack.includes(tech);

            return (
              <Badge
                key={tech}
                onClick={() => toggleTech(tech)}
                className={`cursor-pointer text-xs sm:text-sm ${
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

        <div className="flex items-center gap-2">
          <Input
            placeholder="Add custom tech..."
            value={customTech}
            maxLength={20}
            onChange={(e) => setCustomTech(e.target.value)}
            className="flex-1"
          />

          <Badge
            onClick={addCustomTech}
            className="cursor-pointer bg-purple text-white rounded-full px-4 py-2 whitespace-nowrap"
          >
            Add
          </Badge>
        </div>
      </div>

      {/* MAX MEMBERS */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Max Members <span className="text-red-500">*</span>
          </label>

          {mode === "edit" && projectFull && (
            <Badge className="bg-orange-500/20 text-orange-400 border border-orange-400/30 text-[10px] sm:text-xs">
              Increase to reopen project
            </Badge>
          )}
        </div>

        <Input
          type="number"
          value={maxMembers}
          min={2}
          max={50}
          onChange={(e) => setMaxMembers(Number(e.target.value))}
          className={projectFull ? "border-orange-400" : ""}
        />
      </div>

      {/* LOOKING FOR */}
      <div className="flex flex-col gap-2 mb-0">
        <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Who are you looking for? <span className="text-red-500">*</span>
        </label>

        <Textarea
          required
          rows={2}
          value={lookingFor}
          maxLength={200}
          onChange={(e) => setLookingFor(e.target.value)}
          className="py-3 sm:py-4 text-sm sm:text-[15px] resize-none"
        />

        <div className="text-right text-xs text-muted-foreground">
          {lookingFor.length}/200
        </div>
      </div>

      {/* BROADCAST */}
      <div className="flex flex-col gap-2">
        <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Broadcast Discussion Link <span className="text-red-500">*</span>
        </label>

        <Textarea
          required
          rows={2}
          placeholder={
            "Paste Discord / Telegram / Slack link...\n(shown only to members)"
          }
          value={broadcast}
          onChange={(e) => setBroadcast(e.target.value)}
          className="resize-none text-sm"
        />
      </div>
    </div>
  );
}
