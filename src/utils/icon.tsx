// Import all icons from the libraries
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import type { IconType } from "react-icons";

type IconLibrary = "fa" | "md" | "ai" | "bs";

interface GetIconProps {
  lib: IconLibrary;
  name: string;
}

export function getIcon({ lib, name }: GetIconProps): IconType | null {
  const libraries: Record<IconLibrary, Record<string, IconType>> = {
    fa: FaIcons,
    md: MdIcons,
    ai: AiIcons,
    bs: BsIcons,
  };

  const icons = libraries[lib];
  const iconComponent = icons?.[name as keyof typeof icons];

  return iconComponent ?? null;
}
