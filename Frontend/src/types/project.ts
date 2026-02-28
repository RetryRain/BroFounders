export interface Project {
  _id: string;
  title: string;
  blurb: string;
  description: string;
  techStack: string[];
  goals: string[];
  lookingFor: string;
  members: string[];
  maxMembers: number;
  status: "open" | "in-progress" | "closed";
  level: "beginner" | "intermediate" | "advanced" | "chaos";
  user: { _id: string; name: string };
  createdAt: string;
  broadcast: string;
}
