import { cn } from "@/lib/utils";

export function Layout({
  children,
  className,
  pageScroll,
}: {
  children: React.ReactNode;
  className?: string;
  pageScroll?: boolean;
}) {
  return (
    <main
      className={cn(
        `w-full sm:px-10 2xl:px-40 min-h-[calc(100svh-var(--header-height-lg)-var(--footer-height))] ${pageScroll && "min-h-[400px] lg:h-[calc(100svh-var(--header-height-lg)-var(--footer-height))]"}`,
        className,
      )}
    >
      {children}
    </main>
  );
}
