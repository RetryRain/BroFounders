import { Button } from "@/components/ui/button";

export default function CreateProjectHeader() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
      {/* LEFT */}
      <div className="text-center lg:text-left">
        <div className="flex items-center justify-center lg:justify-start gap-2 text-primary font-bold text-sm uppercase tracking-widest mb-2">
          <span className="material-symbols-rounded text-sm">auto_awesome</span>
          <span>Creation Studio</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Build Your Project
        </h1>

        <p className="text-muted-foreground text-sm sm:text-base mt-1 max-w-md mx-auto lg:mx-0">
          Set the stage for your next collaborative masterpiece.
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
        <Button
          variant="outline"
          className="w-full sm:w-auto h-12 text-base font-bold rounded-full"
        >
          Save Draft
        </Button>

        <Button className="w-full sm:w-auto h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-bold rounded-full">
          Launch Project
        </Button>
      </div>
    </div>
  );
}
