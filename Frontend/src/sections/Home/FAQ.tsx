import { useState } from "react";
import "material-symbols/rounded.css";

type FAQItem = {
  question: string;
  answer: string;
};

export default function FAQ() {
  const faqs: FAQItem[] = [
    {
      question: "What is BroFounders?",
      answer:
        "BroFounders is a platform where builders who aren't “experts” yet can find teammates and work on real projects together.",
    },
    {
      question: "Do I need to be an expert to join?",
      answer:
        "No. BroFounders is built for people who are still learning or exploring new skills. You don't need to be an expert developer, designer, artist, or marketer to participate. If you're curious, willing to collaborate, and ready to build projects with others, you’re welcome here.",
    },
    {
      question: "Can I start my own project?",
      answer:
        "Yes. Anyone can create a project on BroFounders. If you have an idea, you can start a project, describe what you're building, and invite other developers, designers, artists, or creators to collaborate with you.",
    },
    {
      question: "Is BroFounders only for developers?",
      answer:
        "No. BroFounders is a collaborative builder community. Developers, designers, artists, marketers, writers, and curious creators are all welcome to join projects and work together.",
    },
    {
      question: "Is this free to use?",
      answer:
        "Yes. BroFounders is free to use. The goal is to help more people collaborate, learn new skills, and build real projects together without barriers or gatekeeping.",
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
        <h2 className="text-white text-4xl md:text-6xl font-black tracking-tight">
          Frequently Asked
        </h2>
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
