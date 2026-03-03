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
    <div className="p-6 hover:bg-white/5 transition-colors flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-3">
          <div>
            <h4 className="text-lg font-bold text-white">
              {interest.project.title}
            </h4>
          </div>

          <span
            className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${statusColors[interest.status]}`}
          >
            {interest.status}
          </span>
        </div>

        <p className="text-sm text-foreground/80 italic mb-4">
          "{interest.message}"
        </p>
      </div>
    </div>
  );
}
