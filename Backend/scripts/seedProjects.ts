import mongoose from "mongoose";
import { Project } from "../models/project";
import { User } from "../models/users"; // adjust path if needed

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/halfass";

const techStacks = [
  ["React", "Node.js", "MongoDB"],
  ["Next.js", "PostgreSQL", "Prisma"],
  ["Rust", "Wasm", "Substrate"],
  ["Go", "Kafka", "Redis"],
  ["Python", "FastAPI", "Docker"],
  ["Solana", "Rust", "Web3.js"],
];

const goalsPool = [
  "Understand scalable architecture patterns",
  "Deploy production-ready services",
  "Master async workflows",
  "Implement authentication and authorization",
  "Write clean modular code",
  "Optimize performance bottlenecks",
];

const levels = ["beginner", "intermediate", "advanced", "chaos"] as const;
const statuses = ["open", "in-progress", "closed"] as const;

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to DB");

    const user = await User.findOne();
    if (!user) {
      throw new Error("No user found. Create a user first.");
    }

    // Optional: clear old seeded projects
    await Project.deleteMany({ user: user._id });

    const projects = [];

    for (let i = 1; i <= 20; i++) {
      const tech = techStacks[Math.floor(Math.random() * techStacks.length)]!;
      const goals = goalsPool.sort(() => 0.5 - Math.random()).slice(0, 3);

      const status = statuses[Math.floor(Math.random() * statuses.length)];

      const project = {
        title: `Project ${i} — Experimental Build`,
        blurb: `A focused build sprint to explore ${tech[0]} deeply.`,
        level: levels[Math.floor(Math.random() * levels.length)],
        goals,
        description: `This project dives deep into ${tech.join(
          ", ",
        )}. We will build something production-grade and learn through execution.`,
        techStack: tech,
        lookingFor: `Developers comfortable with ${tech[0]} and willing to experiment.`,
        user: user._id,
        members: [user._id],
        maxMembers: Math.floor(Math.random() * 4) + 3, // 3–6
        status,
        broadcast:
          status === "open"
            ? "Welcome! Let's build something ambitious."
            : "This project is currently not accepting new members.",
        closedAt: status === "closed" ? new Date() : null,
      };

      projects.push(project);
    }

    await Project.insertMany(projects);

    console.log("🔥 20 projects created successfully.");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
