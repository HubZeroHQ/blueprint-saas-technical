"use client";

import { useState, type FormEvent } from "react";
import { z } from "zod";

import { CheckIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { FieldError, Input, Label, Textarea } from "@/components/ui/Field";
import { company } from "@/config/company";

const contactSchema = z.object({
  name: z.string().min(2, "Enter your name."),
  email: z.string().email("Enter a valid email address."),
  company: z.string().min(2, "Enter your company name."),
  message: z.string().min(10, "Tell us a bit more — at least 10 characters."),
});

type ContactValues = z.infer<typeof contactSchema>;
type ContactErrors = Partial<Record<keyof ContactValues, string>>;

const EMPTY_VALUES: ContactValues = { name: "", email: "", company: "", message: "" };

function buildMailtoHref(values: ContactValues): string {
  const subject = `Contact form: ${values.company}`;
  const body = `${values.message}\n\n—\n${values.name}\n${values.email}\n${values.company}`;
  return `mailto:${company.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<"idle" | "opened">("idle");

  function handleChange(field: keyof ContactValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = contactSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: ContactErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ContactValues;
        fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    // This blueprint has no backend to receive form submissions, so the
    // form hands off to the visitor's own email client instead of
    // pretending to submit somewhere.
    window.location.href = buildMailtoHref(result.data);
    setStatus("opened");
  }

  if (status === "opened") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-technical border border-border bg-bg-subtle p-8">
        <span className="flex h-10 w-10 items-center justify-center rounded-technical bg-success-muted text-success">
          <CheckIcon className="h-5 w-5" />
        </span>
        <h3 className="text-lg font-semibold text-fg">Your email client should now be open</h3>
        <p className="text-sm leading-relaxed text-fg-muted">
          We&rsquo;ve pre-filled a message to {company.contact.email} with what you entered.
          Send it from there, or reach us directly at that address.
        </p>
        <Button variant="secondary" onClick={() => setStatus("idle")}>
          Fill out another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-name">Name</Label>
          <Input
            id="contact-name"
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
          {errors.name && <FieldError id="contact-name-error">{errors.name}</FieldError>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            type="email"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
          />
          {errors.email && <FieldError id="contact-email-error">{errors.email}</FieldError>}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-company">Company</Label>
        <Input
          id="contact-company"
          value={values.company}
          onChange={(e) => handleChange("company", e.target.value)}
          aria-invalid={Boolean(errors.company)}
          aria-describedby={errors.company ? "contact-company-error" : undefined}
        />
        {errors.company && <FieldError id="contact-company-error">{errors.company}</FieldError>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-message">How can we help?</Label>
        <Textarea
          id="contact-message"
          rows={5}
          value={values.message}
          onChange={(e) => handleChange("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        {errors.message && <FieldError id="contact-message-error">{errors.message}</FieldError>}
      </div>

      <Button type="submit" size="lg" className="w-fit">
        Send message
      </Button>
    </form>
  );
}
