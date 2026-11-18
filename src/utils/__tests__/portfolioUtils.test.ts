import { describe, expect, it } from "vitest";
import {
  resolveEffectiveTheme,
  resolveNextStoredScheme,
  readStoredScheme,
} from "../theme";
import {
  validateContactField,
  validateContactForm,
  buildMailtoHref,
} from "../contact";

describe("theme utilities", () => {
  it("removes override when toggling back to match system preference", () => {
    expect(resolveNextStoredScheme("light", "light")).toBe("dark");
    expect(resolveNextStoredScheme("dark", "light")).toBeNull();
    expect(resolveNextStoredScheme("dark", "dark")).toBe("light");
    expect(resolveNextStoredScheme("light", "dark")).toBeNull();
  });

  it("resolves effective theme from stored override or system default", () => {
    expect(resolveEffectiveTheme(null, "dark")).toBe("dark");
    expect(resolveEffectiveTheme(null, "light")).toBe("light");
    expect(resolveEffectiveTheme("light", "dark")).toBe("light");
    expect(resolveEffectiveTheme("dark", "light")).toBe("dark");
  });

  it("handles unreadable or invalid storage gracefully", () => {
    const throwingStorage = {
      getItem() {
        throw new Error("SecurityError");
      },
    } as unknown as Storage;
    expect(readStoredScheme(throwingStorage)).toBeNull();

    const invalidStorage = {
      getItem() {
        return "sepia";
      },
    } as unknown as Storage;
    expect(readStoredScheme(invalidStorage)).toBeNull();

    const validStorage = {
      getItem() {
        return "dark";
      },
    } as unknown as Storage;
    expect(readStoredScheme(validStorage)).toBe("dark");
  });
});

describe("contact form utilities", () => {
  it("validates individual fields cleanly", () => {
    expect(validateContactField("name", "  ")).toBeTruthy();
    expect(validateContactField("name", "A")).toBeTruthy();
    expect(validateContactField("name", "Budi Santoso")).toBeUndefined();

    expect(validateContactField("email", "")).toBeTruthy();
    expect(validateContactField("email", "bukan-email")).toBeTruthy();
    expect(validateContactField("email", "budi@contoh.id")).toBeUndefined();

    expect(validateContactField("message", "Halo")).toBeTruthy();
    expect(
      validateContactField("message", "Halo Atnan, saya ingin berdiskusi tentang proyek web.")
    ).toBeUndefined();
  });

  it("returns field errors map on invalid submission and empty object when valid", () => {
    const invalid = validateContactForm({
      name: "",
      email: "invalid",
      message: "tes",
    });
    expect(invalid.name).toBeTruthy();
    expect(invalid.email).toBeTruthy();
    expect(invalid.message).toBeTruthy();

    const valid = validateContactForm({
      name: "Raka Pratama",
      email: "raka@domain.id",
      message: "Mari berdiskusi mengenai integrasi IoT dan web dashboard.",
    });
    expect(valid).toEqual({});
  });

  it("builds a properly URL-encoded mailto href", () => {
    const href = buildMailtoHref("atnanseptian1@gmail.com", {
      name: "Raka Pratama",
      email: "raka@domain.id",
      message: "Halo, apakah bersedia kolaborasi proyek web?",
    });
    expect(href.startsWith("mailto:atnanseptian1@gmail.com?subject=")).toBe(true);
    expect(href).toContain(encodeURIComponent("Raka Pratama"));
    expect(href).toContain(encodeURIComponent("raka@domain.id"));
    expect(href).toContain(encodeURIComponent("kolaborasi proyek web?"));
  });
});
