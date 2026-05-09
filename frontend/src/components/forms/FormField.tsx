import type { ChangeEvent, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

type BaseProps = {
  id: string;
  label: string;
  error?: string;
  helperText?: string;
  children?: ReactNode;
};

type InputProps = BaseProps & {
  as?: "input";
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "value" | "onChange">;

type TextareaProps = BaseProps & {
  as: "textarea";
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "value" | "onChange">;

type FormFieldProps = InputProps | TextareaProps;

const fieldClassName =
  "mt-2 w-full rounded-brand border border-amber-line bg-white px-4 py-3 text-sm text-amber-black outline-none transition placeholder:text-amber-muted focus:border-amber-gold focus:ring-2 focus:ring-amber-softGold/40 disabled:cursor-not-allowed disabled:opacity-70";

export function FormField({
  id,
  label,
  error,
  helperText,
  as = "input",
  children,
  ...props
}: FormFieldProps) {
  const describedBy = error ? `${id}-error` : helperText ? `${id}-helper` : undefined;

  return (
    <div>
      <label className="text-sm font-semibold text-amber-espresso" htmlFor={id}>
        {label}
      </label>

      {as === "textarea" ? (
        <textarea
          className={fieldClassName}
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          rows={5}
          {...(props as Omit<TextareaProps, keyof BaseProps | "as">)}
        />
      ) : (
        <input
          className={fieldClassName}
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          {...(props as Omit<InputProps, keyof BaseProps | "as">)}
        />
      )}

      {children}

      {error ? (
        <p className="mt-2 text-sm font-medium text-amber-espresso" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
      {!error && helperText ? (
        <p className="mt-2 text-sm leading-6 text-amber-stone" id={`${id}-helper`}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
