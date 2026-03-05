export default function EmptyTeamsState() {
  return (
    <div className="min-h-75 flex flex-col items-center justify-center text-center px-6">
      <div className="size-20 rounded-2xl bg-purple/10 border border-purple/20 flex items-center justify-center text-purple mb-6">
        <span className="material-symbols-rounded text-4xl">groups</span>
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">Select a Squad</h2>

      <p className="text-muted-foreground max-w-md">
        Choose a team from the left to view its broadcast, members, and
        workspace tools.
      </p>
    </div>
  );
}
