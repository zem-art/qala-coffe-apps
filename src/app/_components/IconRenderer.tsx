import { getIcon } from "~/utils/icon";

type IconRendererProps = {
  lib: "fa" | "md" | "ai" | "bs" | "ri";
  name: string;
  size?: number;
  className?: string;
};

export const IconRenderer = ({ lib, name, size = 24, className = "" }: IconRendererProps) => {
  const Icon = getIcon({ lib, name });

  if (!Icon) return <span className="text-main">Icon not found</span>;

  return <Icon size={size} className={className} />;
};
