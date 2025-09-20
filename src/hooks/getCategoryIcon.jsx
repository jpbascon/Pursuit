import { HeartPlus, Briefcase, BookOpen, HandCoins, Users, Shield } from "lucide-react"

export function getCategoryIcon(category) {
  if (!category) return <span />;

  const icons = {
    "Health & Fitness": <HeartPlus color="white" />,
    "Career Development": <Briefcase color="gray" />,
    "Personal Growth": <BookOpen color="#c99500" />,
    "Financial Goals": <HandCoins color="#ef4444" />,
    "Relationships": <Users color="#4993da" />,
    "Community Service": <Shield color="#3c9326" />
  };

  return icons[category] || <span />;
}