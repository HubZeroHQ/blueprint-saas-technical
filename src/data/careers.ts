export interface OpenRole {
  title: string;
  department: string;
  location: string;
}

export const openRoles: OpenRole[] = [
  { title: "Senior Platform Engineer", department: "Engineering", location: "Remote (US)" },
  { title: "Site Reliability Engineer", department: "Engineering", location: "Remote (US)" },
  { title: "Security Engineer", department: "Security", location: "Austin, TX" },
  { title: "Product Designer", department: "Design", location: "Austin, TX" },
  { title: "Solutions Engineer", department: "Customer Engineering", location: "Remote (US)" },
  { title: "Account Executive, Enterprise", department: "Sales", location: "Remote (US)" },
];

export const benefits = [
  {
    title: "Health coverage",
    description: "100% of medical, dental, and vision premiums covered for you and your dependents.",
  },
  {
    title: "Equity for everyone",
    description: "Every full-time employee holds equity — you build the company, you own part of it.",
  },
  {
    title: "Remote-first",
    description: "Work from anywhere in the US. We gather in person quarterly for a team offsite.",
  },
  {
    title: "Unlimited PTO",
    description: "A minimum of three weeks off is expected, not just allowed.",
  },
  {
    title: "Home office stipend",
    description: "$1,500 to set up your workspace, refreshed every two years.",
  },
  {
    title: "401(k) match",
    description: "4% match, vested immediately.",
  },
];
