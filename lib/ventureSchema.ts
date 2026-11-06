import { z } from "zod";

export const ventureLifecycleSchema = z.enum(["IDENTIFY", "DESIGN", "TEST", "BUILD"]);
export const ventureTierSchema = z.enum(["Flagship Assets", "Active Validations", "Incubation Concepts"]);
export const ventureCategorySchema = z.enum(["Commerce", "Behavioral", "Technology", "Creative", "Civic", "Industrial"]);
export const businessStatusSchema = z.enum([
  "Operating Business",
  "Available Service",
  "In Development",
  "Concept",
  "Previously Operated"
]);

export const portfolioVentureSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  eyebrow: z.string().min(1),
  category: ventureCategorySchema,
  tier: ventureTierSchema,
  businessStatus: businessStatusSchema,
  lifecycle: ventureLifecycleSchema,
  stage: z.string().min(1),
  status: z.string().min(1),
  summary: z.string().min(1),
  problem: z.string().min(1),
  thesis: z.string().min(1),
  currentState: z.string().min(1),
  founderRole: z.string().min(1),
  nextMilestone: z.string().min(1),
  opportunity: z.string().min(1),
  externalUrl: z.string().url().optional(),
  externalLabel: z.string().min(1).optional(),
  art: z.string().min(1),
  heroArt: z.string().min(1),
  accent: z.string().min(1),
  accentSoft: z.string().min(1),
  tags: z.array(z.string())
});

export type VentureLifecycle = z.infer<typeof ventureLifecycleSchema>;
export type VentureTier = z.infer<typeof ventureTierSchema>;
export type BusinessStatus = z.infer<typeof businessStatusSchema>;
export type PortfolioVenture = z.infer<typeof portfolioVentureSchema>;

export function parsePortfolioVentureList(input: unknown): PortfolioVenture[] {
  return z.array(portfolioVentureSchema).parse(input);
}
