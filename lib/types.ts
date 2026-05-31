export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  college: string;
  year: "first" | "second" | "third" | "fourth" | "graduate";
  bio?: string;
  avatarUrl?: string;
  createdAt: Date;
}

export interface Proof {
  id: string;
  userId: string;
  title: string;
  description?: string;
  type: "github" | "kaggle" | "certificate" | "hackathon" | "custom";
  url: string;
  skillsExtracted: string[];
  whatItProves?: string[];
  status: "verified" | "pending" | "draft";
  verifiedAt?: Date;
  viewCount: number;
  publicLink: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CoachNote {
  id: string;
  userId: string;
  content: string;
  type: "daily" | "weekly" | "milestone";
  actionSuggestion: string;
  createdAt: Date;
}
