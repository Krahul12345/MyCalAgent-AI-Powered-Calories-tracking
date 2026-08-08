import { HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface QuickFAQProps {
  items: FAQItem[];
  title?: string;
}

export const QuickFAQ = ({ items, title = "Frequently Asked Questions" }: QuickFAQProps) => {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center">{title}</h2>
        <div className="space-y-5">
          {items.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200/60 bg-white/80 p-5 sm:p-6 shadow-sm"
              itemScope
              itemType="https://schema.org/Question"
            >
              <div className="flex items-start gap-3 mb-3">
                <HelpCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <h3
                  className="font-semibold text-slate-900 text-base leading-snug"
                  itemProp="name"
                >
                  {item.question}
                </h3>
              </div>
              <div
                className="text-sm sm:text-base text-slate-600 leading-relaxed pl-8"
                itemScope
                itemType="https://schema.org/Answer"
                itemProp="acceptedAnswer"
              >
                <span itemProp="text">{item.answer}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
