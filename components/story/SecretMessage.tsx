"use client";

import { useEffect, useRef, useState } from "react";
import { registerGsap, gsap, prefersReducedMotion } from "@/lib/gsap";
import { secretMessage } from "@/app/content";
import { Chapter } from "../Chapter";
import { Reveal } from "../Reveal";

export function SecretMessage() {
  const s = secretMessage();
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeBtn.current?.focus();
    if (!prefersReducedMotion()) {
      registerGsap();
      gsap.fromTo(backdrop.current, { opacity: 0 }, { opacity: 1, duration: 0.35 });
      gsap.fromTo(
        dialog.current,
        { opacity: 0, scale: 0.9, y: 14 },
        { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: "back.out(1.5)" },
      );
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => {
    if (prefersReducedMotion()) {
      setOpen(false);
      opener.current?.focus();
      return;
    }
    gsap.to(dialog.current, { opacity: 0, scale: 0.92, y: 10, duration: 0.3 });
    gsap.to(backdrop.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setOpen(false);
        opener.current?.focus();
      },
    });
  };

  return (
    <Chapter id="secret_message" center>
      <Reveal as="div" style={{ display: "grid", justifyItems: "center", gap: "1.25rem" }}>
        <span className="eyebrow" style={{ color: "var(--muted)" }}>
          A small warning
        </span>
        <button ref={opener} className="btn btn--ghost" onClick={() => setOpen(true)}>
          {s.trigger.text}
        </button>
      </Reveal>

      {open && (
        <div
          ref={backdrop}
          className="modal-backdrop"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="secret-title"
            className="card"
            style={{ maxWidth: "30rem", padding: "2.5rem", textAlign: "center" }}
          >
            <h3 id="secret-title" className="display h3">
              {s.modal.title}
            </h3>
            <p className="body" style={{ marginInline: "auto", marginTop: "1rem" }}>
              {s.modal.body}
            </p>
            <button ref={closeBtn} className="btn" style={{ marginTop: "1.75rem" }} onClick={close}>
              {s.modal.close_button}
            </button>
          </div>
        </div>
      )}
    </Chapter>
  );
}
