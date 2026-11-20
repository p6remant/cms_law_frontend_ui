import { firmStatistics as defaultStats } from "@/data/firmData";

export function FirmStatisticsSection({ content }: { content?: any; settings?: any }) {
  const items = content?.items ?? defaultStats;

  return (
    <section
      aria-label="Firm statistics and key facts"
      className="border-b border-line bg-paper py-12 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-line">
          {items.map((stat: any, idx: number) => (
            <div
              key={stat.id || idx}
              className={`flex flex-col justify-between ${
                idx > 0 ? "lg:pl-8" : ""
              } ${idx < items.length - 1 ? "lg:pr-8" : ""}`}
            >
              <dt className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
                {stat.label}
              </dt>
              <dd className="mt-3 flex items-baseline gap-2">
                <span className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-ink tabular-nums">
                  {stat.value}
                </span>
                {stat.suffix && (
                  <span className="font-serif text-lg italic text-accent">
                    {stat.suffix}
                  </span>
                )}
              </dd>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {stat.detail}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
