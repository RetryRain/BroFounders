interface Props {
  interest: any;
}

export default function SentApplicationItem({ interest }: Props) {
  const statusColors: Record<string, string> = {
    pending: "bg-orange-400/10 text-orange-400 border-orange-400/20 border",
    accepted: "bg-green-500/10 text-green-400 border-green-400/20 border",
    rejected: "bg-red-500/10 text-red-400 border-red-400/20 border",
  };

  return (
    <div className="p-4 sm:p-6 hover:bg-white/5 transition-colors flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
        <h4 className="text-base sm:text-lg font-bold text-white wrap-break-word">
          {interest.project.title}
        </h4>

        <span
          className={`self-start text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${statusColors[interest.status]}`}
        >
          {interest.status}
        </span>
      </div>

      <p className="text-sm text-foreground/80 italic wrap-break-word">
        "{interest.message}"
      </p>
    </div>
  );
}
