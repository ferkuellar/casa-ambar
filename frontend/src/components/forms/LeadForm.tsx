import { useState } from "react";

import { createLead } from "../../services/leadsApi";
import type { LeadPayload, LeadType, PreferredContactMethod } from "../../types/leads";
import { Button } from "../ui/Button";
import { FormField } from "./FormField";

type LeadFormProps = {
  leadType: LeadType;
  productId?: number;
  productName?: string;
  source: string;
  title: string;
  description: string;
  submitLabel: string;
  initialMessage?: string;
  showCustomFields?: boolean;
};

type FormValues = {
  name: string;
  email: string;
  phone: string;
  preferred_contact_method: PreferredContactMethod;
  message: string;
  occasion: string;
  budget_range: string;
};

type FormErrors = Partial<Record<keyof FormValues | "contact" | "form", string>>;
type SubmitState = "idle" | "submitting" | "success" | "error";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LeadForm({
  leadType,
  productId,
  productName,
  source,
  title,
  description,
  submitLabel,
  initialMessage = "",
  showCustomFields = false,
}: LeadFormProps) {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    phone: "",
    preferred_contact_method: "WHATSAPP",
    message: initialMessage,
    occasion: "",
    budget_range: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [successMessage, setSuccessMessage] = useState("");

  function updateValue<Key extends keyof FormValues>(key: Key, value: FormValues[Key]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined, contact: undefined, form: undefined }));
    if (submitState !== "idle") {
      setSubmitState("idle");
    }
  }

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Escribe tu nombre.";
    }

    if (!values.email.trim() && !values.phone.trim()) {
      nextErrors.contact = "Comparte correo o WhatsApp para poder contactarte.";
    }

    if (values.email.trim() && !emailPattern.test(values.email.trim())) {
      nextErrors.email = "Escribe un correo válido.";
    }

    if (!values.message.trim()) {
      nextErrors.message = "Cuéntanos brevemente qué necesitas.";
    }

    return nextErrors;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitState("error");
      return;
    }

    const payload: LeadPayload = {
      lead_type: leadType,
      name: values.name.trim(),
      email: values.email.trim() || undefined,
      phone: values.phone.trim() || undefined,
      message: values.message.trim(),
      product: productId,
      occasion: values.occasion.trim() || undefined,
      budget_range: values.budget_range.trim() || undefined,
      preferred_contact_method: values.preferred_contact_method,
      source,
    };

    setSubmitState("submitting");

    try {
      const response = await createLead(payload);
      setSuccessMessage(response.message);
      setSubmitState("success");
      setValues({
        name: "",
        email: "",
        phone: "",
        preferred_contact_method: values.preferred_contact_method,
        message: initialMessage,
        occasion: "",
        budget_range: "",
      });
    } catch {
      setErrors({ form: "No pudimos enviar tu solicitud. Inténtalo nuevamente." });
      setSubmitState("error");
    }
  }

  const isSubmitting = submitState === "submitting";

  return (
    <form
      className="rounded-brand border border-amber-line bg-amber-ivory p-5 shadow-premium sm:p-6"
      onSubmit={(event) => void handleSubmit(event)}
      noValidate
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-gold">
          {productName ? "Cotización de pieza" : "Solicitud Casa Ámbar"}
        </p>
        <h2 className="mt-3 font-heading text-3xl font-semibold text-amber-black">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-7 text-amber-stone">{description}</p>
      </div>

      <div className="mt-6 grid gap-4">
        <FormField
          id={`${source}-name`}
          label="Nombre"
          value={values.name}
          onChange={(event) => updateValue("name", event.target.value)}
          error={errors.name}
          autoComplete="name"
          disabled={isSubmitting}
          type="text"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            id={`${source}-email`}
            label="Correo electrónico"
            value={values.email}
            onChange={(event) => updateValue("email", event.target.value)}
            error={errors.email || errors.contact}
            autoComplete="email"
            disabled={isSubmitting}
            type="email"
            placeholder="correo@ejemplo.com"
          />
          <FormField
            id={`${source}-phone`}
            label="WhatsApp / teléfono"
            value={values.phone}
            onChange={(event) => updateValue("phone", event.target.value)}
            error={errors.contact}
            autoComplete="tel"
            disabled={isSubmitting}
            type="tel"
            placeholder="+52 614 000 0000"
          />
        </div>

        <label className="text-sm font-semibold text-amber-espresso" htmlFor={`${source}-contact-method`}>
          Método de contacto preferido
          <select
            className="mt-2 w-full rounded-brand border border-amber-line bg-white px-4 py-3 text-sm text-amber-black outline-none transition focus:border-amber-gold focus:ring-2 focus:ring-amber-softGold/40 disabled:cursor-not-allowed disabled:opacity-70"
            id={`${source}-contact-method`}
            value={values.preferred_contact_method}
            onChange={(event) =>
              updateValue(
                "preferred_contact_method",
                event.target.value as PreferredContactMethod,
              )
            }
            disabled={isSubmitting}
          >
            <option value="WHATSAPP">WhatsApp</option>
            <option value="EMAIL">Email</option>
            <option value="PHONE">Teléfono</option>
          </select>
        </label>

        {showCustomFields ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              id={`${source}-occasion`}
              label="Ocasión"
              value={values.occasion}
              onChange={(event) => updateValue("occasion", event.target.value)}
              autoComplete="off"
              disabled={isSubmitting}
              type="text"
              placeholder="Compromiso, aniversario, regalo..."
            />
            <FormField
              id={`${source}-budget`}
              label="Rango de presupuesto"
              value={values.budget_range}
              onChange={(event) => updateValue("budget_range", event.target.value)}
              autoComplete="off"
              disabled={isSubmitting}
              type="text"
              placeholder="Ej. $5,000 - $10,000 MXN"
            />
          </div>
        ) : null}

        <FormField
          id={`${source}-message`}
          label="Mensaje"
          as="textarea"
          value={values.message}
          onChange={(event) => updateValue("message", event.target.value)}
          error={errors.message}
          disabled={isSubmitting}
          placeholder="Cuéntanos qué pieza buscas o qué necesitas resolver."
        />
      </div>

      {errors.form ? (
        <p className="mt-4 rounded-brand border border-amber-gold bg-amber-cream p-3 text-sm font-medium text-amber-espresso" role="alert">
          {errors.form}
        </p>
      ) : null}

      {submitState === "success" ? (
        <p className="mt-4 rounded-brand border border-amber-line bg-amber-cream p-3 text-sm font-medium text-amber-espresso" role="status">
          {successMessage || "Gracias. Hemos recibido tu solicitud."}
        </p>
      ) : null}

      <Button className="mt-6 w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : submitLabel}
      </Button>
    </form>
  );
}
