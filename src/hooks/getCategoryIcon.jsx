import { HeartPlus, Briefcase, BookOpen, HandCoins, Users, Shield } from "lucide-react"

export function getCategoryIcon(category) {
  if (!category) return <span />;

  const icons = {
    "Health & Fitness": <HeartPlus />,
    "Career Development": <Briefcase />,
    "Personal Growth": <BookOpen />,
    "Financial Goals": <HandCoins />,
    "Relationships": <Users />,
    "Community Service": <Shield />
  };

  return icons[category] || <span />;
}