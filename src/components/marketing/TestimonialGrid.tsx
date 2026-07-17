import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import type { Testimonial } from "@/data/testimonials";

interface TestimonialGridProps {
  testimonials: Testimonial[];
}

export function TestimonialGrid({ testimonials }: TestimonialGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {testimonials.map((testimonial, index) => (
        <Reveal key={testimonial.author} index={index} step={60}>
          <Card interactive className="flex h-full flex-col justify-between gap-6">
            <p className="text-sm leading-relaxed text-fg">&ldquo;{testimonial.quote}&rdquo;</p>
            <div className="flex items-center gap-3">
              <Avatar name={testimonial.author} />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-fg">{testimonial.author}</span>
                <span className="text-xs text-fg-muted">
                  {testimonial.role}, {testimonial.company}
                </span>
              </div>
            </div>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}
