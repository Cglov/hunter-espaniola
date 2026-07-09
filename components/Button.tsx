import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "night";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay";

const variants: Record<Variant, string> = {
  primary: "bg-clay text-bone hover:bg-clay-deep",
  ghost:
    "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-bone",
  night:
    "bg-sand-on-night text-night hover:bg-bone",
};

const sizes = {
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
} as const;

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: {
  href: string;
  variant?: Variant;
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href">) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
