import Link from "next/link";
import { cn } from "../../lib/utils";

const variants = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  outline: "btn btn-outline",
  ghost: "btn btn-ghost px-0",
};

export default function Button({
  children,
  href,
  type = "button",
  variant = "primary",
  className,
  ...props
}) {
  const classes = cn(variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
