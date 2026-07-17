export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

export const team: TeamMember[] = [
  {
    name: "Elena Vasquez",
    role: "Co-founder & CEO",
    bio: "Previously led infrastructure platform at a Fortune 500 logistics company. Started Nexora after provisioning the same environment by hand for the fortieth time.",
  },
  {
    name: "Marcus Chen",
    role: "Co-founder & Head of Platform",
    bio: "Spent seven years building internal developer platforms before deciding the problem deserved a real product, not another internal tool.",
  },
  {
    name: "Dana Whitfield",
    role: "Staff Engineer",
    bio: "Leads Nexora's provisioning engine. Formerly on the Kubernetes SIG-Node working group.",
  },
  {
    name: "Priyanka Reddy",
    role: "Senior SRE",
    bio: "Owns Nexora's own reliability program — the same SLO tooling customers use, running on Nexora itself.",
  },
  {
    name: "Tomás Ribeiro",
    role: "Head of Security",
    bio: "Built the compliance program that took Nexora through its first SOC 2 Type II audit in under six months.",
  },
  {
    name: "Sarah Kim",
    role: "Head of Customer Engineering",
    bio: "Works directly with platform teams migrating onto Nexora, from first manifest to full production rollout.",
  },
];
