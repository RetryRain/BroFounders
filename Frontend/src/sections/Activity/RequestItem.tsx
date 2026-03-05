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
    <div className="p-4 sm:p-6 hover:bg-white/5 transition-colors flex flex-col sm:flex-row gap-4 sm:gap-6">
      {/* Avatar */}
      <div className="shrink-0">
        <div className="size-12 sm:size-14 rounded-full bg-purple/20 border border-purple/30 flex items-center justify-center text-purple font-bold text-lg sm:text-xl">
          {initials}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="min-w-0">
            <h4 className="text-base sm:text-lg font-bold text-white truncate">
              {interest.user.name}
            </h4>

            <p className="text-sm text-muted-foreground mt-1">
              Applied for{" "}
              <span className="text-purple font-medium">
                {interest.project.title}
              </span>
            </p>
          </div>

          {/* Buttons */}
          {interest.status === "pending" && (
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button
                className="w-full sm:w-auto"
                onClick={() => onRespond(interest._id, "accepted")}
              >
                Accept
              </Button>

              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => onRespond(interest._id, "rejected")}
              >
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

        <p className="text-sm text-foreground/80 italic wrap-break-word">
          "{interest.message}"
        </p>
      </div>
    </div>
  );
}
