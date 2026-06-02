import type { Database } from "./supabase";
import type { Proof, Opportunity } from "./types";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type DbProof = Database["public"]["Tables"]["proof_cards"]["Row"];
type DbOpportunity = Database["public"]["Tables"]["opportunities"]["Row"];

export function mapDbProofToProof(db: DbProof): Proof {
  return {
    id: db.id,
    userId: db.user_id,
    title: db.title,
    description: db.description ?? undefined,
    type: db.source_type === "project" ? "custom" : (db.source_type as Proof["type"]),
    url: db.source_url ?? "",
    skillsExtracted: db.skills_extracted || [],
    status: db.verification_status === "rejected" ? "draft" : (db.verification_status as Proof["status"]),
    viewCount: 0,
    publicLink: `/aarav-gupta-cse#${db.id}`,
    isPublic: db.verification_status === "verified",
    createdAt: new Date(db.created_at),
    updatedAt: new Date(db.updated_at),
  };
}

export function mapDbOpportunityToOpportunity(db: DbOpportunity): Opportunity {
  return {
    id: db.id,
    title: db.title,
    company: db.company,
    type: "internship",
    requiredSkills: [],
    matchPercentage: db.match_percentage,
    link: "#",
  };
}
