export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContactField(
  field: keyof ContactFormValues,
  value: string
): string | undefined {
  const trimmed = value.trim();

  if (field === "name") {
    if (!trimmed) return "Nama wajib diisi.";
    if (trimmed.length < 2) return "Nama minimal 2 karakter.";
    return undefined;
  }

  if (field === "email") {
    if (!trimmed) return "Alamat email wajib diisi.";
    if (!EMAIL_PATTERN.test(trimmed)) return "Masukkan format email yang valid.";
    return undefined;
  }

  if (!trimmed) return "Pesan wajib diisi.";
  if (trimmed.length < 10) return "Tulis pesan minimal 10 karakter agar konteksnya jelas.";
  return undefined;
}

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};
  const nameErr = validateContactField("name", values.name);
  const emailErr = validateContactField("email", values.email);
  const messageErr = validateContactField("message", values.message);

  if (nameErr) errors.name = nameErr;
  if (emailErr) errors.email = emailErr;
  if (messageErr) errors.message = messageErr;
  return errors;
}

export function buildMailtoHref(recipient: string, values: ContactFormValues): string {
  const cleanName = values.name.trim();
  const cleanEmail = values.email.trim();
  const cleanMessage = values.message.trim();
  const subject = `Diskusi Proyek dari ${cleanName}`;
  const body = `Nama: ${cleanName}\nEmail: ${cleanEmail}\n\nPesan:\n${cleanMessage}`;
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
