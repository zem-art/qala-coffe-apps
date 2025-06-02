import React from "react";

type Props = {
  seed: string; // biasanya nama atau email user
  size?: number;
  variant?: "identicon" | "identicon" | "bottts" | "thumbs" | "notionists" | "Initials";
};

export const Avatar: React.FC<Props> = ({
  seed,
  size = 64,
  variant, // bisa ganti ke "avataaars", "bottts", dll.
}) => {
  const src = `https://api.dicebear.com/8.x/${variant}/svg?seed=${seed}`;

  return (
    <img
      src={src}
      alt="User avatar"
      width={size}
      height={size}
      className="mx-auto mb-2 rounded-full object-cover"
    />
  );
};
