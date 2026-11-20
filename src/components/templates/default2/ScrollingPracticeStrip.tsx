import { practiceAreas as defaultPracticeAreas } from "@/data/firmData";

export function ScrollingPracticeStrip({ content }: { content?: any; settings?: any }) {
  const sourceItems = content?.items ?? defaultPracticeAreas;
  const repeatedItems = [...sourceItems, ...sourceItems];

  return (
    <div
      aria-hidden="true"
      className="w-full overflow-hidden border-b border-line bg-paper-alt py-3.5 select-none"
    >
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
        {repeatedItems.map((area: any, index: number) => (
          <div
            key={`${area.id || index}-${index}`}
            className="inline-flex items-center gap-8"
          >
            <span className="inline-flex items-baseline gap-2.5">
              <span className="font-serif text-xs italic text-accent">
                {area.number || `0${(index % 13) + 1}`}
              </span>
              <span className="text-xs uppercase tracking-[0.18em] text-ink font-medium">
                {area.name}
              </span>
            </span>
            <span className="text-accent/60 text-xs">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
