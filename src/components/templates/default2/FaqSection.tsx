"use client";

import { useState } from "react";
import { faqCategories as defaultCategories, faqQuestions as defaultQuestions } from "@/data/firmData";

export function FaqSection({ content }: { content?: any; settings?: any }) {
  const eyebrow = content?.eyebrow ?? "05 / Questions & Statutory Guidance";
  const heading = content?.heading ?? "Frequently asked questions.";
  const description =
    content?.description ??
    "Responses below outline general statutory procedures under Nepali law for informational reference only. They do not constitute legal advice or predict the outcome of any specific proceeding.";
  const categories = content?.categories ?? defaultCategories;
  const questions = content?.questions ?? defaultQuestions;

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    categories[0]?.id || "cat-divorce"
  );
  const [openQuestionId, setOpenQuestionId] = useState<string | null>(
    questions.find((q: any) => q.categoryId === (categories[0]?.id || "cat-divorce"))?.id ?? null
  );

  const activeCategory =
    categories.find((c: any) => c.id === selectedCategoryId) ?? categories[0];

  const filteredQuestions = questions.filter(
    (q: any) => q.categoryId === selectedCategoryId
  );

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    const firstInCat = questions.find((q: any) => q.categoryId === categoryId);
    setOpenQuestionId(firstInCat ? firstInCat.id : null);
  };

  const toggleQuestion = (questionId: string) => {
    setOpenQuestionId((prev) => (prev === questionId ? null : questionId));
  };

  return (
    <section
      id="questions"
      aria-labelledby="faq-heading"
      className="scroll-mt-20 border-b border-line bg-paper-alt/40 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Heading & Disclaimer Notice */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12 border-b border-line">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
              {eyebrow}
            </p>
            <h2
              id="faq-heading"
              className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-ink"
            >
              {heading}
            </h2>
          </div>
          <div className="lg:col-span-7 flex flex-col justify-end">
            <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-muted">
              {description}
            </p>
          </div>
        </div>

        {/* Main Two-Column FAQ Layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Topic Filter Controls */}
          <div className="lg:col-span-4">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted mb-4">
              Select Subject Area
            </p>
            <div
              role="tablist"
              aria-label="Frequently asked question topics"
              className="flex flex-col border-t border-line"
            >
              {categories.map((category: any, idx: number) => {
                const isSelected = category.id === selectedCategoryId;
                return (
                  <button
                    key={category.id}
                    type="button"
                    role="tab"
                    id={`faq-tab-${category.id}`}
                    aria-selected={isSelected}
                    aria-controls={`faq-panel-${category.id}`}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`flex items-baseline justify-between border-b border-line py-4 px-3 text-left transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-ink text-paper"
                        : "text-ink hover:bg-paper-alt"
                    }`}
                  >
                    <span className="font-serif text-lg sm:text-xl font-normal">
                      {category.label}
                    </span>
                    <span
                      className={`font-serif text-xs ${
                        isSelected ? "text-accent" : "text-muted"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>

            {activeCategory && (
              <div className="mt-6 border border-line bg-surface p-4">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink">
                  Topic Scope
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">
                  {activeCategory.description}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Questions & Accessible Accordion Answers */}
          <div
            role="tabpanel"
            id={`faq-panel-${activeCategory?.id || 'default'}`}
            aria-labelledby={`faq-tab-${activeCategory?.id || 'default'}`}
            className="lg:col-span-8"
          >
            <div className="divide-y divide-line border-t border-b border-line bg-surface">
              {filteredQuestions.map((item: any, idx: number) => {
                const isOpen = openQuestionId === item.id;
                const answerId = `faq-answer-${item.id}`;
                const triggerId = `faq-trigger-${item.id}`;

                return (
                  <div key={item.id} className="px-5 sm:px-7">
                    <h3>
                      <button
                        type="button"
                        id={triggerId}
                        aria-expanded={isOpen}
                        aria-controls={answerId}
                        onClick={() => toggleQuestion(item.id)}
                        className="flex w-full items-start justify-between gap-6 py-6 text-left cursor-pointer group"
                      >
                        <div className="flex items-baseline gap-4">
                          <span className="font-serif text-sm text-accent tabular-nums">
                            0{idx + 1}
                          </span>
                          <span className="font-serif text-xl sm:text-2xl font-normal text-ink group-hover:text-accent transition-colors leading-snug">
                            {item.question}
                          </span>
                        </div>
                        <span
                          aria-hidden="true"
                          className="mt-1 shrink-0 font-serif text-xl text-accent"
                        >
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                    </h3>

                    {isOpen && (
                      <div
                        id={answerId}
                        role="region"
                        aria-labelledby={triggerId}
                        className="pb-6 pl-8 pr-2 space-y-4"
                      >
                        <p className="text-sm sm:text-base leading-relaxed text-muted">
                          {item.answer}
                        </p>
                        {item.statutoryReference && (
                          <div className="pt-2 border-t border-line/70 flex flex-wrap items-center justify-between gap-2 text-xs">
                            <span className="uppercase tracking-[0.14em] text-muted">
                              Statutory Reference:
                            </span>
                            <span className="font-medium text-ink">
                              {item.statutoryReference}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Informational Disclaimer Callout */}
            <div className="mt-6 border-l-2 border-accent pl-4 py-1">
              <p className="text-xs leading-relaxed text-muted">
                <strong className="font-medium text-ink">
                  Important Notice:
                </strong>{" "}
                Statutory limitation periods (Hadhmyad), documentary
                authentication thresholds, and filing procedures depend on the
                specific facts and dates of each case. Consult a licensed
                Advocate before acting on general statutory summaries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
