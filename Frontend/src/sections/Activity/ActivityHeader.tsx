export default function ActivityHeader() {
  return (
    <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 mb-8 sm:mb-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Activity Center
        </h1>
        <span className="text-sm sm:text-base text-muted-foreground max-w-md">
          Manage your sent and recevied messages here.
        </span>
      </div>
    </header>
  );
}
