import { useEffect, useRef } from "react";
import { PORTFOLIO_PROFILE } from "../data/portfolio";

interface MobileMenuDialogProps {
  open: boolean;
  onClose: () => void;
}

let cachedSupportsDisplayTransition: boolean | undefined;

function canTransitionDisplay(): boolean {
  if (cachedSupportsDisplayTransition !== undefined) {
    return cachedSupportsDisplayTransition;
  }
  if (
    typeof window === "undefined" ||
    !window.CSS?.supports?.("transition-behavior", "allow-discrete") ||
    !document.body
  ) {
    return false;
  }
  const probe = document.createElement("div");
  probe.style.cssText = "transition: display 1s allow-discrete !important; display: block;";
  document.body.appendChild(probe);
  getComputedStyle(probe).display;
  probe.style.display = "none";
  cachedSupportsDisplayTransition = getComputedStyle(probe).display === "block";
  probe.remove();
  return cachedSupportsDisplayTransition;
}

function supportsTopLayerExit(): boolean {
  return (
    typeof window !== "undefined" &&
    Boolean(window.CSS?.supports?.("overlay", "auto")) &&
    canTransitionDisplay()
  );
}

const LINKS = [
  { href: "#tentang", label: "Tentang" },
  { href: "#karya", label: "Karya Pilihan" },
  { href: "#kontak", label: "Kontak" },
];

export function MobileMenuDialog({ open, onClose }: MobileMenuDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const closeAnimated = async (dialog: HTMLDialogElement) => {
    if (!dialog.open) return;
    if (!supportsTopLayerExit()) {
      dialog.setAttribute("data-closing", "");
      const animations = dialog.getAnimations({ subtree: true });
      if (animations.length > 0) {
        await Promise.race([
          Promise.allSettled(animations.map((a) => a.finished)),
          new Promise((resolve) => setTimeout(resolve, 600)),
        ]);
      }
      dialog.removeAttribute("data-closing");
    }
    if (dialog.open) dialog.close();
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.removeAttribute("data-closing");
      dialog.showModal();
    } else if (!open && dialog.open) {
      void closeAnimated(dialog);
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.removeAttribute("data-closing");
      onClose();
    };

    const handleCancel = (event: Event) => {
      event.preventDefault();
      void closeAnimated(dialog).then(onClose);
    };

    // Polyfill light dismiss when closedby="any" is unsupported (e.g. Safari).
    const supportsClosedBy = "closedBy" in HTMLDialogElement.prototype;
    let pressedOutside = false;

    const isOutside = (event: PointerEvent) => {
      const rect = dialog.getBoundingClientRect();
      return (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      );
    };

    const handlePointerDown = (event: PointerEvent) => {
      pressedOutside = isOutside(event);
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (pressedOutside && isOutside(event)) {
        void closeAnimated(dialog).then(onClose);
      }
      pressedOutside = false;
    };

    dialog.addEventListener("close", handleClose);
    dialog.addEventListener("cancel", handleCancel);
    if (!supportsClosedBy) {
      dialog.addEventListener("pointerdown", handlePointerDown);
      dialog.addEventListener("pointerup", handlePointerUp);
    }

    return () => {
      dialog.removeEventListener("close", handleClose);
      dialog.removeEventListener("cancel", handleCancel);
      if (!supportsClosedBy) {
        dialog.removeEventListener("pointerdown", handlePointerDown);
        dialog.removeEventListener("pointerup", handlePointerUp);
      }
    };
  }, [onClose]);

  const handleNavigate = () => {
    const dialog = dialogRef.current;
    if (dialog) {
      void closeAnimated(dialog).then(onClose);
    } else {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      {...({ closedby: "any" } as Record<string, string>)}
      aria-labelledby="mobile-nav-title"
      className="mobile-drawer fixed inset-y-0 right-0 left-auto m-0 hidden h-dvh max-h-dvh w-[min(86vw,340px)] flex-col justify-between border-l border-[#D4D4D4] bg-[#F7F7F5] p-6 text-[#0A0A0A] shadow-2xl dark:border-[#262626] dark:bg-[#0A0A0A] dark:text-[#FAFAFA]"
    >
      <div>
        <div className="flex items-center justify-between border-b border-[#D4D4D4] pb-4 dark:border-[#262626]">
          <h2 id="mobile-nav-title" className="font-serif text-xl font-bold">
            {PORTFOLIO_PROFILE.brandName}
          </h2>
          <button
            type="button"
            onClick={handleNavigate}
            aria-label="Tutup menu navigasi"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded border border-[#737373] px-3 text-sm font-semibold text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#FAFAFA] dark:text-[#FAFAFA] dark:hover:bg-[#FAFAFA] dark:hover:text-[#0A0A0A]"
          >
            Tutup
          </button>
        </div>

        <nav aria-label="Navigasi seluler" className="mt-6 flex flex-col divide-y divide-[#D4D4D4] dark:divide-[#262626]">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavigate}
              className="flex min-h-12 items-center font-serif text-2xl font-medium text-[#0A0A0A] transition-opacity hover:opacity-70 dark:text-[#FAFAFA]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="border-t border-[#D4D4D4] pt-5 text-sm text-[#525252] dark:border-[#262626] dark:text-[#A3A3A3]">
        <a
          href={`mailto:${PORTFOLIO_PROFILE.email}`}
          className="inline-flex min-h-11 items-center font-semibold text-[#0A0A0A] underline underline-offset-4 dark:text-[#FAFAFA]"
        >
          {PORTFOLIO_PROFILE.email}
        </a>
        <div className="mt-1">
          <a
            href={PORTFOLIO_PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center hover:text-[#0A0A0A] dark:hover:text-[#FAFAFA]"
          >
            {PORTFOLIO_PROFILE.githubHandle}
          </a>
        </div>
      </div>
    </dialog>
  );
}
