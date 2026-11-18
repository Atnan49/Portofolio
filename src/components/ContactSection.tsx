import { useRef, useState } from "react";
import { PORTFOLIO_PROFILE } from "../data/portfolio";
import {
  ScrollTrigger,
  createSplitRiseTrigger,
  createVerticalRiseTrigger,
  gsap,
  useGSAP,
} from "../lib/gsap";
import {
  buildMailtoHref,
  validateContactField,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from "../utils/contact";

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
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

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        createSplitRiseTrigger(".js-contact-title", {
          start: "top 72%",
          durationIn: 0.48,
        });

        createSplitRiseTrigger(".js-contact-headline", {
          start: "top 72%",
          stagger: 0.06,
          durationIn: 0.52,
        });

        createSplitRiseTrigger(".js-contact-copy", {
          start: "top 74%",
          stagger: 0.045,
          durationIn: 0.48,
        });

        createVerticalRiseTrigger(".js-contact-actions", {
          y: 52,
          scale: 1,
          start: "top 74%",
        });

        gsap.set(".js-contact-form", { y: 72, scale: 0.95, opacity: 0 });
        gsap.set(".js-contact-field", { y: 22, opacity: 0 });

        ScrollTrigger.create({
          trigger: ".js-contact-form",
          start: "top 72%",
          end: "max",
          onEnter: () => {
            gsap.to(".js-contact-form", {
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 0.52,
              ease: "power3.out",
              overwrite: true,
            });
            gsap.to(".js-contact-field", {
              y: 0,
              opacity: 1,
              duration: 0.42,
              stagger: 0.05,
              delay: 0.06,
              ease: "power3.out",
              overwrite: true,
            });
          },
          onLeaveBack: () => {
            gsap.to(".js-contact-field", {
              y: 22,
              opacity: 0,
              duration: 0.24,
              stagger: { each: 0.03, from: "end" },
              ease: "power2.out",
              overwrite: true,
            });
            gsap.to(".js-contact-form", {
              y: 72,
              scale: 0.95,
              opacity: 0,
              duration: 0.36,
              ease: "power2.out",
              overwrite: true,
            });
          },
        });

        gsap.set(".js-footer-rule", {
          scaleX: 0,
          transformOrigin: "left center",
        });
        gsap.set(".js-footer-item", { y: 32, opacity: 0 });

        ScrollTrigger.create({
          trigger: ".js-footer",
          start: "top 92%",
          end: "max",
          onEnter: () => {
            gsap.to(".js-footer-rule", {
              scaleX: 1,
              duration: 0.42,
              ease: "power3.out",
              overwrite: true,
            });
            gsap.to(".js-footer-item", {
              y: 0,
              opacity: 1,
              duration: 0.42,
              stagger: 0.06,
              ease: "power3.out",
              overwrite: true,
            });
          },
          onLeaveBack: () => {
            gsap.to(".js-footer-rule", {
              scaleX: 0,
              duration: 0.26,
              ease: "power2.out",
              overwrite: true,
            });
            gsap.to(".js-footer-item", {
              y: 32,
              opacity: 0,
              duration: 0.28,
              ease: "power2.out",
              overwrite: true,
            });
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  const handleFieldChange = (field: keyof ContactFormValues, nextValue: string) => {
    setValues((prev) => ({ ...prev, [field]: nextValue }));
    if (errors[field]) {
      const nextError = validateContactField(field, nextValue);
      setErrors((prev) => ({ ...prev, [field]: nextError }));
    }
  };

  const handleFieldBlur = (field: keyof ContactFormValues) => {
    const error = validateContactField(field, values[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors = validateContactForm(values);
    setErrors(validationErrors);

    if (validationErrors.name) {
      nameRef.current?.focus();
      setStatusMessage("Periksa kembali kolom nama sebelum mengirim.");
      return;
    }
    if (validationErrors.email) {
      emailRef.current?.focus();
      setStatusMessage("Periksa kembali format alamat email.");
      return;
    }
    if (validationErrors.message) {
      messageRef.current?.focus();
      setStatusMessage("Pesan minimal 10 karakter.");
      return;
    }

    const href = buildMailtoHref(PORTFOLIO_PROFILE.email, values);
    setStatusMessage("Membuka aplikasi email untuk mengirim pesan...");
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
      ref={sectionRef}
      className="overflow-x-clip bg-[#0A0A0A] text-[#FAFAFA] dark:border-t dark:border-[#262626] dark:bg-[#0A0A0A]"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-14 px-5 pt-16 pb-10 md:px-10 md:pt-20 lg:gap-16 lg:px-20 lg:pt-24 lg:pb-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="js-contact-info flex flex-col gap-5 lg:col-span-6">
            <h2 className="js-contact-title font-serif text-2xl font-bold md:text-[1.75rem]">
              Kontak
            </h2>

            <p className="js-contact-headline font-serif text-3xl leading-[1.2] text-[#FAFAFA] md:text-[2.5rem]">
              Mari berdiskusi soal proyek app, web, atau IoT.
            </p>

            <p className="js-contact-copy max-w-lg text-[15px] leading-[1.65] text-[#A3A3A3] md:text-base">
              Terbuka untuk kolaborasi pengembangan perangkat lunak dan proyek web. Kamu bisa mengirim pesan lewat formulir di samping atau melihat kode publikku di GitHub.
            </p>

            <div className="js-contact-actions flex flex-wrap items-center gap-5 pt-3">
              <a
                href={`mailto:${PORTFOLIO_PROFILE.email}`}
                className="inline-flex min-h-11 items-center border-b border-[#FAFAFA] px-0.5 text-[15px] font-semibold text-[#FAFAFA] transition-opacity hover:opacity-75"
              >
                {PORTFOLIO_PROFILE.email}
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex min-h-11 items-center justify-center rounded border border-[#737373] bg-[#141414] px-4 text-sm font-semibold text-[#FAFAFA] transition-all duration-150 hover:bg-[#FAFAFA] hover:text-[#0A0A0A] active:scale-[0.97]"
              >
                {copied ? "Email Disalin" : "Salin Email"}
              </button>

              <a
                href={PORTFOLIO_PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center px-1 text-[15px] font-semibold text-[#D4D4D4] transition-colors hover:text-[#FAFAFA]"
              >
                {PORTFOLIO_PROFILE.githubHandle}
              </a>
            </div>
          </div>

          <form
            noValidate
            aria-labelledby="contact-form-heading"
            onSubmit={handleSubmit}
            className="js-contact-form flex flex-col gap-5 rounded border border-[#262626] bg-[#141414] p-6 md:p-8 lg:col-span-6"
          >
            <h3 id="contact-form-heading" className="visually-hidden">
              Formulir Kirim Pesan
            </h3>

            <div className="js-contact-field flex flex-col gap-2">
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

            <div className="js-contact-field flex flex-col gap-2">
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
                inputMode="email"
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

            <div className="js-contact-field flex flex-col gap-2">
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

            <button
              type="submit"
              className="js-contact-field mt-1 inline-flex min-h-12 w-full items-center justify-center rounded bg-[#FAFAFA] px-6 py-3 text-[15px] font-bold text-[#0A0A0A] transition-colors duration-150 hover:bg-[#D4D4D4]"
            >
              Kirim Pesan
            </button>

            <p role="status" aria-live="polite" className="min-h-5 text-sm text-[#D4D4D4]">
              {statusMessage}
            </p>
          </form>
        </div>

        <footer className="js-footer">
          <div className="js-footer-rule h-px bg-[#262626]" />
          <div className="flex flex-col justify-between gap-3 pt-7 text-[13px] sm:flex-row sm:items-center">
            <p className="js-footer-item text-[#A3A3A3]">
              {PORTFOLIO_PROFILE.footerText}
            </p>
            <a
              href="#hero"
              className="js-footer-item inline-flex min-h-11 items-center font-semibold text-[#FAFAFA] transition-opacity hover:opacity-75"
            >
              Kembali ke Atas
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
