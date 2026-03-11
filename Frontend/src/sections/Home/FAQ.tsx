import { useState } from "react";
import "material-symbols/rounded.css";

type FAQItem = {
  question: string;
  answer: string;
};

export default function FAQ() {
  const faqs: FAQItem[] = [
    {
      question: "What is BuildTogether?",
      answer:
        "BuildTogether is a platform where developers form small squads to build real-world projects. No courses, no tutorials — just shipping code and learning by doing.",
    },
    {
      question: "Do I need to be an expert developer?",
      answer:
        "No. Projects exist for different skill levels. Beginners can join learning squads while experienced developers can host advanced builds.",
    },
    {
      question: "How big are the teams?",
      answer:
        "Most projects run with 3–5 developers. Small enough to move fast, big enough to build something meaningful.",
    },
    {
      question: "Can I host my own project?",
      answer:
        "Yes. If you have a project idea or want to practice a stack, you can create a project and recruit developers to join your squad.",
    },
    {
      question: "Is this free to use?",
      answer:
        "Yes. The platform is currently free while we grow the builder community.",
    },
  ];

  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <section className="max-w-300 mx-auto w-full px-6 md:px-10 py-16 md:py-24">
      <div className="text-center mb-16">
        <h2 className="text-foreground text-sm font-black uppercase tracking-[0.4em] mb-4">
          QUESTIONS
        </h2>

        <h3 className="text-white text-4xl md:text-6xl font-black tracking-tight">
          Frequently Asked
        </h3>
      </div>

      <div className="max-w-3xl mx-auto flex flex-col divide-y divide-white/10">
        {faqs.map((faq, index) => {
          const open = openItems.includes(index);

          return (
            <div
              key={index}
              className="py-6 cursor-pointer"
              onClick={() => toggleItem(index)}
            >
              <div className="flex items-center justify-between gap-6">
                <h4 className="text-white text-lg md:text-xl font-bold">
                  {faq.question}
                </h4>

                <span
                  className={`material-symbols-rounded text-white transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                >
                  expand_more
                </span>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open ? "max-h-40 mt-4" : "max-h-0"
                }`}
              >
                <p className="text-foreground/80 text-sm md:text-base leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
