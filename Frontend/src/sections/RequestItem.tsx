import { Button } from "@/components/ui/button";

interface Props {
  interest: any;
  onRespond: (id: string, status: "accepted" | "rejected") => void;
}

export default function RequestItem({ interest, onRespond }: Props) {
  const initials = interest.user.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="p-6 border-b border-white/5 hover:bg-white/5 transition-colors flex flex-col md:flex-row gap-6">
      <div className="shrink-0">
        <div className="size-14 rounded-full bg-purple/20 border border-purple/30 flex items-center justify-center text-purple font-bold text-xl">
          {initials}
        </div>
      </div>

      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
          <div>
            <h4 className="text-lg font-bold text-white">
              {interest.user.name}
            </h4>

            <p className="text-sm text-muted-foreground mt-1">
              Applied for{" "}
              <span className="text-purple font-medium">
                {interest.project.title}
              </span>
            </p>
          </div>

          {interest.status === "pending" && (
            <div className="flex gap-2">
              <Button onClick={() => onRespond(interest._id, "accepted")}>
                Accept
              </Button>

              <Button onClick={() => onRespond(interest._id, "rejected")}>
                Reject
              </Button>
            </div>
          )}

          {interest.status !== "pending" && (
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              {interest.status}
            </span>
          )}
        </div>

        <p className="text-sm text-foreground/80 italic">
          "{interest.message}"
        </p>
      </div>
    </div>
  );
}
