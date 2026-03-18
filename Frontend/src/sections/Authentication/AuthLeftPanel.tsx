import { useEffect, useState } from "react";
import paperPlaneViolet from "@/assets/paper-plane-violet.svg";

export default function AuthLeftPanel() {
  const [time, setTime] = useState(5);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (time <= 0) {
      setDone(true);
      launchConfetti();
      return;
    }

    const timer = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(timer);
  }, [time]);

  const launchConfetti = () => {
    const duration = 1500;
    const end = Date.now() + duration;

    const frame = () => {
      const colors = ["#a78bfa", "#ffffff", "#6366f1"];

      for (let i = 0; i < 3; i++) {
        const confetti = document.createElement("div");
        confetti.style.position = "fixed";
        confetti.style.width = "6px";
        confetti.style.height = "6px";
        confetti.style.background =
          colors[Math.floor(Math.random() * colors.length)];
        confetti.style.top = "50%";
        confetti.style.left = "50%";
        confetti.style.borderRadius = "50%";
        confetti.style.pointerEvents = "none";
        confetti.style.zIndex = "9999";

        document.body.appendChild(confetti);

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 200;

        confetti.animate(
          [
            { transform: "translate(0,0)", opacity: 1 },
            {
              transform: `translate(${Math.cos(angle) * distance}px, ${
                Math.sin(angle) * distance
              }px)`,
              opacity: 0,
            },
          ],
          {
            duration: 1000,
            easing: "ease-out",
          },
        );

        setTimeout(() => confetti.remove(), 1000);
      }

      if (Date.now() < end) requestAnimationFrame(frame);
    };

    frame();
  };

  return (
    <div className="relative hidden lg:flex lg:w-1/2 items-center justify-center overflow-hidden bg-primary/20">
      <div className="relative z-10 p-12 max-w-xl text-primary-foreground">
        <div className="mb-8 flex items-center gap-3">
          <img className="h-10 rounded-full" src={paperPlaneViolet} />
          <h2 className="text-2xl font-bold tracking-tight">BroFounders</h2>
        </div>

        <h1 className="text-5xl font-black leading-tight mb-6">
          Learn by Building Right Now!
        </h1>

        <p className="text-lg text-muted-foreground">
          Build with people who aren't perfect — just curious enough to start.
          Learn new things, collaborate across roles, and ship real projects
          together.
        </p>

        {/* TIMER */}
        <div className="mt-12 text-sm">
          {!done ? (
            <>
              <p className="font-bold text-xl">{time}s</p>
              <p className="text-muted-foreground">
                Time to start building your dreams.
              </p>
            </>
          ) : (
            <>
              <p className="font-bold text-xl flex items-center">
                Go build something
                <span className="material-symbols-rounded ml-2 leading-none">
                  rocket_launch
                </span>
              </p>
              <p className="text-muted-foreground">
                No more waiting. Start now.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
