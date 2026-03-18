import paperPlaneViolet from "@/assets/paper-plane-violet.svg";
export default function AuthLeftPanel() {
  return (
    <>
      <div className="relative hidden lg:flex lg:w-1/2 items-center justify-center overflow-hidden bg-primary/20">
        <div className="relative z-10 p-12 max-w-xl text-primary-foreground">
          <div className="mb-8 flex items-center gap-3">
            <img className="h-10 rounded-full" src={paperPlaneViolet} />
            <h2 className="text-2xl font-bold tracking-tight">BroFounders</h2>
          </div>
          <h1 className="text-5xl font-black leading-tight mb-6">
            Learn by Building Right Now.
          </h1>
          <p className="text-lg text-muted-foreground">
            Build with people who aren't perfect — just curious enough to start.
            Learn new things, collaborate across roles, make your time awesome
            together.
          </p>
          <div className="mt-12 flex gap-4 items-center">
            <div className="flex -space-x-3">
              <div className="h-10 w-10 rounded-full border-2 border-primary bg-muted"></div>
              <div className="h-10 w-10 rounded-full border-2 border-primary bg-muted"></div>
              <div className="h-10 w-10 rounded-full border-2 border-primary bg-muted"></div>
            </div>
            <div className="text-sm">
              <p className="font-bold">1,200+ Members</p>
              <p className="text-muted-foreground">Collaborating right now</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
