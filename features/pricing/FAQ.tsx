import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../components/ui/accordion';

//TODO: actual content needed here!

function FAQ() {
  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center p-4">
      <h2 className="mb-6 text-3xl font-black">Frequently Asked Questions</h2>
      <div className="w-full">
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" className="rounded-lg border px-4">
            <AccordionTrigger className="py-4">Is it accessible?</AccordionTrigger>
            <AccordionContent className="pb-4">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="rounded-lg border px-4">
            <AccordionTrigger className="py-4">Is it styled?</AccordionTrigger>
            <AccordionContent className="pb-4">
              Yes. It comes with default styles that matches the other components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="rounded-lg border px-4">
            <AccordionTrigger className="py-4">Is it animated?</AccordionTrigger>
            <AccordionContent className="pb-4">
              Yes. It&apos;s animated by default, but you can disable it if you prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}

export default FAQ;
