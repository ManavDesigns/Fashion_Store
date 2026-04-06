import { cn } from "../../lib/utils";

export default function SectionTitle({
  eyebrow,
  title,
  description,
  action,
  className,
}) {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12", className)}>
      <div className="max-w-2xl">
        {eyebrow ? (
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-3 block">
            {eyebrow}
          </span>
        ) : null}
        <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tighter text-primary">
          {title}
        </h2>
        {description ? (
          <p className="text-secondary text-base md:text-lg mt-4 font-medium leading-relaxed">
            {description}
          </p>
        ) : null}
      </div>

      {action ? <div className="flex-shrink-0 mb-1">{action}</div> : null}
    </div>
  );
}
