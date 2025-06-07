// Import all icons from the libraries
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as RiIcons from "react-icons/ri";
import type { IconType } from "react-icons";

export type IconLibrary = "fa" | "md" | "ai" | "bs" | "ri";

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
    ri: RiIcons,
  };

  const icons = libraries[lib];
  const iconComponent = icons?.[name as keyof typeof icons];

  return iconComponent ?? null;
}
