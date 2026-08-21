import { JsonLd } from "@/components/shared/JsonLd";
import { Accordion, type AccordionItem } from "@/components/ui/Accordion";

interface FAQSectionProps {
  items: AccordionItem[];
}

export function FAQSection({ items }: FAQSectionProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <Accordion items={items} />
    </>
  );
}
