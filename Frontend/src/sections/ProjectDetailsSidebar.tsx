// interface ProjectDetailsSidebarProps {
//   members: number;
//   maxMembers: number;
//   onClose: () => void;
// }

import { Button } from "@/components/ui/button";

// export function ProjectDetailsSidebar({
//   members,
//   maxMembers,
// }: ProjectDetailsSidebarProps) {
//   const percentage = (members / maxMembers) * 100;
//   const radius = 54;
//   const circumference = 2 * Math.PI * radius;
//   const offset = circumference - (percentage / 100) * circumference;

//   return (
//     <div
//       className="
//     hidden md:flex
//     w-[320px] lg:w-90
//     bg-sidebar
//     flex-col gap-10
//     border-l border-white/5
//     p-10 shrink-0
//   "
//     >
//       <section className="sticky top-10">
//         <h3 className="text-purple font-extrabold text-[10px] mb-5 uppercase tracking-widest opacity-80">
//           Availability
//         </h3>

//         <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 flex flex-col items-center">
//           <div className="relative flex items-center justify-center mb-4">
//             <svg className="w-32 h-32">
//               <circle
//                 className="text-white/10"
//                 cx="64"
//                 cy="64"
//                 r={radius}
//                 stroke="currentColor"
//                 strokeWidth="12"
//                 fill="transparent"
//               />
//               <circle
//                 className="text-purple transition-all duration-500"
//                 cx="64"
//                 cy="64"
//                 r={radius}
//                 stroke="currentColor"
//                 strokeWidth="12"
//                 fill="transparent"
//                 strokeDasharray={circumference}
//                 strokeDashoffset={offset}
//                 strokeLinecap="round"
//                 transform="rotate(-90 64 64)"
//               />
//             </svg>

//             <div className="absolute flex flex-col items-center">
//               <span className="text-3xl font-black text-white leading-none">
//                 {members}/{maxMembers}
//               </span>
//               <span className="text-[10px] font-black text-purple/60 uppercase tracking-widest mt-1">
//                 Slots
//               </span>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// ─── Sidebar (updated) ────────────────────────────────────────────────────────

interface ProjectDetailsSidebarProps {
  members: number;
  maxMembers: number;
  onClose: () => void;
}

export function ProjectDetailsSidebar({
  members,
  maxMembers,
  onClose,
}: ProjectDetailsSidebarProps) {
  const percentage = (members / maxMembers) * 100;
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className="
        hidden md:flex
        w-[320px] lg:w-90
        bg-sidebar
        flex-col gap-10
        border-l border-white/5
        p-10 shrink-0
        overflow-y-auto
      "
    >
      {/* Close lives here — stays put because sidebar only scrolls if
          its own content overflows, which it won't at typical heights */}
      <div className="flex justify-end">
        <Button
          size="icon"
          variant="ghost"
          onClick={onClose}
          className="text-white/50 hover:text-white"
        >
          <span className="material-symbols-rounded">close</span>
        </Button>
      </div>

      {/* Availability */}
      <section>
        <h3 className="text-purple font-extrabold text-[10px] mb-5 uppercase tracking-widest opacity-80">
          Availability
        </h3>
        <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 flex flex-col items-center">
          <div className="relative flex items-center justify-center mb-4">
            <svg className="w-32 h-32">
              <circle
                className="text-white/10"
                cx="64"
                cy="64"
                r={radius}
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
              />
              <circle
                className="text-purple transition-all duration-500"
                cx="64"
                cy="64"
                r={radius}
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform="rotate(-90 64 64)"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black text-white leading-none">
                {members}/{maxMembers}
              </span>
              <span className="text-[10px] font-black text-purple/60 uppercase tracking-widest mt-1">
                Slots
              </span>
            </div>
          </div>
          <p className="text-sm font-bold text-muted-foreground text-center">
            Join {members} others exploring this stack
          </p>
        </div>
      </section>
    </div>
  );
}
