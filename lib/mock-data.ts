import type { CoachNote, Proof, User } from "@/lib/types";

export const currentUser: User = {
  id: "u1",
  email: "aarav@example.com",
  username: "aarav-gupta-cse",
  fullName: "Aarav Gupta",
  college: "VIT Vellore",
  year: "third",
  bio: "I build backend systems and solve algorithmic problems.",
  createdAt: new Date("2024-08-01"),
};

export const coachNote: CoachNote = {
  id: "c1",
  userId: "u1",
  content:
    "You have strong graph fundamentals. Add 3 dynamic programming proofs this week to show depth to recruiters. 🎯",
  type: "daily",
  actionSuggestion: "Show me what to build",
  createdAt: new Date(),
};

export const proofs: Proof[] = [
  {
    id: "p1",
    userId: "u1",
    title: "Internship Backend Microservice",
    description: "Built REST APIs handling 1M+ daily requests.",
    type: "github",
    url: "https://github.com/aarav/microservice",
    skillsExtracted: ["Node.js", "Express", "PostgreSQL"],
    whatItProves: [
      "Backend architecture & API design",
      "Database schema optimization",
      "Production deployment & debugging",
    ],
    status: "verified",
    verifiedAt: new Date("2024-09-10"),
    viewCount: 124,
    publicLink: "/aarav-gupta-cse#p1",
    isPublic: true,
    createdAt: new Date("2024-08-20"),
    updatedAt: new Date("2024-10-01"),
  },
  {
    id: "p2",
    userId: "u1",
    title: "Regional Hackathon 2024 Winner",
    description: "Won regional hackathon among 20 teams.",
    type: "hackathon",
    url: "https://drive.example/hackathon-certificate",
    skillsExtracted: ["React", "Team Leadership", "System Design"],
    whatItProves: ["Rapid prototyping", "Team collaboration"],
    status: "pending",
    viewCount: 51,
    publicLink: "/aarav-gupta-cse#p2",
    isPublic: true,
    createdAt: new Date("2024-09-14"),
    updatedAt: new Date("2024-09-20"),
  },
  {
    id: "p3",
    userId: "u1",
    title: "Codeforces Journey",
    description: "Expert level with 250+ solved problems.",
    type: "custom",
    url: "https://codeforces.com/profile/aarav",
    skillsExtracted: ["Dynamic Programming", "Graphs", "Greedy"],
    whatItProves: ["Algorithmic thinking", "Consistency"],
    status: "draft",
    viewCount: 17,
    publicLink: "/aarav-gupta-cse#p3",
    isPublic: false,
    createdAt: new Date("2024-07-01"),
    updatedAt: new Date("2024-10-10"),
  },
];
