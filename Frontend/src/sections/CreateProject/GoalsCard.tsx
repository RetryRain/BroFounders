import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Dispatch, SetStateAction } from "react";
import type { Project } from "@/types/project";

interface Props {
  goals: Project["goals"];
  setGoals: Dispatch<SetStateAction<Project["goals"]>>;
}

export default function GoalsCard({ goals, setGoals }: Props) {
  return (
    <Card className="glass-card md:min-h-125 rounded-2xl border-white/10 bg-card-background shadow-none">
      <CardContent className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">Project Goals</h3>
          <p className="text-sm text-muted-foreground">
            Define what this project aims to achieve.
          </p>
        </div>

        <div className="space-y-10">
          {goals.map((goal, index) => (
            <div key={index} className="space-y-1">
              <label className="text-sm text-muted-foreground">
                Goal {index + 1}
                {index < 2 && <span className="text-red-500 ml-1">*</span>}
              </label>

              <Input
                required={index < 2}
                placeholder={`Goal ${index + 1}`}
                value={goal}
                onChange={(e) => {
                  const updated = [...goals];
                  updated[index] = e.target.value;
                  setGoals(updated);
                }}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
