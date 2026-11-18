import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { PORTFOLIO_PROFILE } from "../data/portfolio";
import {
  buildMailtoHref,
  validateContactField,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from "../utils/contact";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ContactSection() {
  const shouldReduceMotion = useReducedMotion();
  const [values, setValues] = useState<ContactFormValues>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [statusMessage, setStatusMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleFieldChange = (field: keyof ContactFormValues, nextValue: string) => {
    setValues((prev) => ({ ...prev, [field]: nextValue }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (statusMessage) setStatusMessage("");
  };

  const handleFieldBlur = (field: keyof ContactFormValues) => {
    const current = values[field];
    if (!current.trim() && !errors[field]) return;
    const error = validateContactField(field, current);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);

    if (nextErrors.name) {
      nameRef.current?.focus();
      setStatusMessage("Periksa kembali kolom yang masih perlu diperbaiki.");
      return;
    }
    if (nextErrors.email) {
      emailRef.current?.focus();
      setStatusMessage("Periksa kembali kolom yang masih perlu diperbaiki.");
      return;
    }
    if (nextErrors.message) {
      messageRef.current?.focus();
      setStatusMessage("Periksa kembali kolom yang masih perlu diperbaiki.");
      return;
    }

    const href = buildMailtoHref(PORTFOLIO_PROFILE.email, values);
    setStatusMessage(
      `Draf email ke ${PORTFOLIO_PROFILE.email} siap dikirim melalui aplikasi emailmu.`
    );
    window.location.href = href;
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO_PROFILE.email);
      setCopied(true);
      setStatusMessage(`Alamat ${PORTFOLIO_PROFILE.email} disalin ke papan klip.`);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setStatusMessage(
        `Tidak dapat menyalin otomatis. Silakan salin manual: ${PORTFOLIO_PROFILE.email}`
      );
    }
  };

  return (
    <section
      id="kontak"
      className="bg-[#0A0A0A] text-[#FAFAFA] dark:border-t dark:border-[#262626] dark:bg-[#0A0A0A]"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-14 px-5 pt-16 pb-10 md:px-10 md:pt-20 lg:gap-16 lg:px-20 lg:pt-24 lg:pb-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-col gap-5 lg:col-span-6"
          >
            <h2 className="font-serif text-2xl font-bold md:text-[1.75rem]">
              Kontak
            </h2>

            <p className="font-serif text-3xl leading-[1.2] text-[#FAFAFA] md:text-[2.5rem]">
              Mari berdiskusi soal proyek app, web, atau IoT.
            </p>

            <p className="max-w-lg text-[15px] leading-[1.65] text-[#A3A3A3] md:text-base">
              Terbuka untuk kolaborasi pengembangan perangkat lunak dan proyek web. Kamu bisa mengirim pesan lewat formulir di samping atau melihat kode publikku di GitHub.
            </p>

            <div className="flex flex-wrap items-center gap-5 pt-3">
              <a
                href={`mailto:${PORTFOLIO_PROFILE.email}`}
                className="inline-flex min-h-11 items-center border-b border-[#FAFAFA] px-0.5 text-[15px] font-semibold text-[#FAFAFA] transition-opacity hover:opacity-75"
              >
                {PORTFOLIO_PROFILE.email}
              </a>

              <motion.button
                type="button"
                onClick={handleCopyEmail}
                whileTap={{ scale: 0.97 }}
                className="inline-flex min-h-11 items-center justify-center rounded border border-[#737373] bg-[#141414] px-4 text-sm font-semibold text-[#FAFAFA] transition-colors hover:bg-[#FAFAFA] hover:text-[#0A0A0A]"
              >
                {copied ? "Email Disalin" : "Salin Email"}
              </motion.button>

              <a
                href={PORTFOLIO_PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center px-1 text-[15px] font-semibold text-[#D4D4D4] transition-colors hover:text-[#FAFAFA]"
              >
                {PORTFOLIO_PROFILE.githubHandle}
              </a>
            </div>
          </motion.div>

          <motion.form
            noValidate
            aria-labelledby="contact-form-heading"
            onSubmit={handleSubmit}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="flex flex-col gap-5 rounded border border-[#262626] bg-[#141414] p-6 md:p-8 lg:col-span-6"
          >
            <h3 id="contact-form-heading" className="visually-hidden">
              Formulir Kirim Pesan
            </h3>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-name"
                className="text-[13px] font-semibold text-[#FAFAFA]"
              >
                Nama
              </label>
              <input
                ref={nameRef}
                id="contact-name"
                name="name"
                type="text"
                required
                minLength={2}
                autoComplete="name"
                enterKeyHint="next"
                placeholder="Nama kamu"
                value={values.name}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                onBlur={() => handleFieldBlur("name")}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
                className="field-control min-h-12 w-full rounded border border-[#737373] bg-[#0A0A0A] px-3.5 text-base text-[#FAFAFA] placeholder:text-[#A3A3A3]"
              />
              {errors.name ? (
                <p id="contact-name-error" className="text-sm text-[#FAFAFA]">
                  {errors.name}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-email"
                className="text-[13px] font-semibold text-[#FAFAFA]"
              >
                Email
              </label>
              <input
                ref={emailRef}
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
                enterKeyHint="next"
                placeholder="nama@domain.com"
                value={values.email}
                onChange={(e) => handleFieldChange("email", e.target.value)}
                onBlur={() => handleFieldBlur("email")}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                className="field-control min-h-12 w-full rounded border border-[#737373] bg-[#0A0A0A] px-3.5 text-base text-[#FAFAFA] placeholder:text-[#A3A3A3]"
              />
              {errors.email ? (
                <p id="contact-email-error" className="text-sm text-[#FAFAFA]">
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-message"
                className="text-[13px] font-semibold text-[#FAFAFA]"
              >
                Pesan
              </label>
              <textarea
                ref={messageRef}
                id="contact-message"
                name="message"
                required
                minLength={10}
                rows={4}
                enterKeyHint="done"
                placeholder="Tulis keperluan atau pesan singkatmu..."
                value={values.message}
                onChange={(e) => handleFieldChange("message", e.target.value)}
                onBlur={() => handleFieldBlur("message")}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                className="field-control min-h-28 w-full resize-y rounded border border-[#737373] bg-[#0A0A0A] p-3.5 text-base text-[#FAFAFA] placeholder:text-[#A3A3A3]"
              />
              {errors.message ? (
                <p id="contact-message-error" className="text-sm text-[#FAFAFA]">
                  {errors.message}
                </p>
              ) : null}
            </div>

            <motion.button
              type="submit"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.985 }}
              className="mt-1 inline-flex min-h-12 w-full items-center justify-center rounded bg-[#FAFAFA] px-6 py-3 text-[15px] font-bold text-[#0A0A0A] transition-colors hover:bg-[#D4D4D4]"
            >
              Kirim Pesan
            </motion.button>

            <p role="status" aria-live="polite" className="min-h-5 text-sm text-[#D4D4D4]">
              {statusMessage}
            </p>
          </motion.form>
        </div>

        <footer className="flex flex-col justify-between gap-3 border-t border-[#262626] pt-7 text-[13px] sm:flex-row sm:items-center">
          <p className="text-[#A3A3A3]">{PORTFOLIO_PROFILE.footerText}</p>
          <a
            href="#hero"
            className="inline-flex min-h-11 items-center font-semibold text-[#FAFAFA] transition-opacity hover:opacity-75"
          >
            Kembali ke Atas
          </a>
        </footer>
      </div>
    </section>
  );
}
