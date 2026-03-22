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
        "BroFounders is a platform where beginners and early-stage builders find teammates and build real projects together — even if you're just getting started.",
    },
    {
      question: "Do I need to be experienced to join?",
      answer:
        "No. Most people here are still figuring things out. You don't need experience — just the willingness to start, learn, and not disappear after day one.",
    },
    {
      question: "Can I start a project without technical skills?",
      answer:
        "Yes. Ideas don't need code to start. Many projects begin with non-technical people who find developers, designers, and collaborators here.",
    },
    {
      question: "Who can join BroFounders?",
      answer:
        "Anyone who wants to build. Developers, designers, marketers, writers, artists — or someone who doesn't even know what they are yet.",
    },
    {
      question: "Is BroFounders free?",
      answer: "Yes. No paywalls. No gatekeeping. Just build.",
    },
    {
      question: "How is this different from platforms like Y Combinator?",
      answer:
        "Y Combinator picks people who are already impressive. BroFounders is for people who are not there yet — but are willing to become that by building.",
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
        <h2 className="text-purple-500 text-4xl md:text-6xl font-black tracking-tight">
          BEFORE YOU OVERTHINK IT!
        </h2>
      </div>

      <div className="max-w-3xl mx-auto flex flex-col divide-y divide-white/10">
        {faqs.map((faq, index) => {
          const open = openItems.includes(index);

          return (
            <div
              id="faq"
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
