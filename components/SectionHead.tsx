import type { ReactNode } from "react";

export function SectionHead({
  title,
  children,
  id,
}: {
  title: ReactNode;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:px-8">
      <h2
        id={id}
        className="chrome font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.86] font-black tracking-[-0.01em] text-balance"
      >
        {title}
      </h2>
      {children ? (
        <div className="max-w-md text-lg leading-relaxed text-steel lg:justify-self-end lg:pb-2">{children}</div>
      ) : null}
    </div>
  );
}
