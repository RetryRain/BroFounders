import { Button } from "@/components/ui/button";

export default function ActivityHeader() {
  return (
    <>
      {/* HEADER */}
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 mb-10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Activity Center
          </h1>
          <p className="text-muted-foreground">
            Manage your applications and hosting requests in one place.
          </p>
        </div>

        <Button className="bg-secondary text-background hover:bg-secondary/90 rounded-full font-bold gap-2 w-full sm:w-auto">
          <span className="material-symbols-rounded">history</span>
          View History
        </Button>
      </header>
    </>
  );
}
