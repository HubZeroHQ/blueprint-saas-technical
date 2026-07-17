"use client";

import { useState, type FormEvent } from "react";
import { z } from "zod";

import { CheckIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { FieldError, Input, Label, Textarea } from "@/components/ui/Field";

const contactSchema = z.object({
  name: z.string().min(2, "Enter your name."),
  email: z.string().email("Enter a valid email address."),
  company: z.string().min(2, "Enter your company name."),
  message: z.string().min(10, "Tell us a bit more — at least 10 characters."),
});

type ContactValues = z.infer<typeof contactSchema>;
type ContactErrors = Partial<Record<keyof ContactValues, string>>;

const EMPTY_VALUES: ContactValues = { name: "", email: "", company: "", message: "" };

export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

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
    setStatus("submitting");

    // No backend is wired up in this blueprint — this simulates the
    // request so the form's success state can be demonstrated.
    setTimeout(() => {
      setStatus("success");
      setValues(EMPTY_VALUES);
    }, 900);
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-technical border border-border bg-bg-subtle p-8">
        <span className="flex h-10 w-10 items-center justify-center rounded-technical bg-success-muted text-success">
          <CheckIcon className="h-5 w-5" />
        </span>
        <h3 className="text-lg font-semibold text-fg">Message sent</h3>
        <p className="text-sm leading-relaxed text-fg-muted">
          Thanks for reaching out — someone from our team will reply within one business day.
        </p>
        <Button variant="secondary" onClick={() => setStatus("idle")}>
          Send another message
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

      <Button type="submit" size="lg" disabled={status === "submitting"} className="w-fit">
        {status === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
