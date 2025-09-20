import { HeartPlus, Briefcase, BookOpen } from "lucide-react"

export function getCategoryIcon(category) {
  if (!category) return <span />;
  const normalized = category.toLowerCase().trim();

  const icons = {
    "health & fitness": (
      <HeartPlus color="white" />
    ),
    "career development": (
      <Briefcase color="black" />
    ),
    "personal growth": (
      <BookOpen color="#c99500" />
    ),
  };

  return icons[normalized] || <span />;
}