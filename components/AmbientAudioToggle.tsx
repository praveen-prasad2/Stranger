"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A very soft, fully synthesised ambient layer — no audio files. Three detuned
 * sine partials through a low-pass with a slow gain LFO. Scenes can nudge the
 * mood by dispatching `window` event "ambient-mood" with `{ detune, cutoff }`.
 * Off by default; the toggle is the only control.
 */
export function AmbientAudioToggle() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const oscRef = useRef<OscillatorNode[]>([]);

  const build = useCallback(() => {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AC();
    const master = ctx.createGain();
    master.gain.value = 0;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 520;
    filter.Q.value = 0.6;
    filter.connect(master);
    master.connect(ctx.destination);

    // slow breathing on the master
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.06;
    lfoGain.gain.value = 0.018;
    lfo.connect(lfoGain);
    lfoGain.connect(master.gain);
    lfo.start();

    const base = 110; // A2 — dusk
    [1, 1.5, 2.005].forEach((mult, i) => {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = base * mult;
      o.detune.value = (i - 1) * 4;
      const g = ctx.createGain();
      g.gain.value = i === 0 ? 0.5 : 0.22;
      o.connect(g);
      g.connect(filter);
      o.start();
      oscRef.current.push(o);
    });

    ctxRef.current = ctx;
    masterRef.current = master;
    filterRef.current = filter;
  }, []);

  const toggle = useCallback(() => {
    if (!ctxRef.current) build();
    const ctx = ctxRef.current!;
    const master = masterRef.current!;
    if (ctx.state === "suspended") ctx.resume();
    const next = !on;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.linearRampToValueAtTime(next ? 0.05 : 0.0001, ctx.currentTime + (next ? 2.5 : 1.2));
    setOn(next);
  }, [on, build]);

  useEffect(() => {
    const onMood = (e: Event) => {
      const { detune = 0, cutoff = 520 } =
        (e as CustomEvent<{ detune?: number; cutoff?: number }>).detail ?? {};
      const ctx = ctxRef.current;
      const filter = filterRef.current;
      if (!ctx || !filter) return;
      filter.frequency.cancelScheduledValues(ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(cutoff, ctx.currentTime + 3);
      oscRef.current.forEach((o, i) => {
        o.detune.cancelScheduledValues(ctx.currentTime);
        o.detune.linearRampToValueAtTime((i - 1) * 4 + detune, ctx.currentTime + 3);
      });
    };
    window.addEventListener("ambient-mood", onMood);
    return () => window.removeEventListener("ambient-mood", onMood);
  }, []);

  useEffect(() => {
    return () => {
      ctxRef.current?.close();
    };
  }, []);

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-[80] flex items-center gap-2.5 rounded-full px-3.5 py-2.5"
      style={{
        background: "rgba(251,246,237,0.7)",
        border: "1px solid var(--hairline)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
      aria-pressed={on}
      aria-label={on ? "Mute ambient sound" : "Play ambient sound"}
      data-hot="true"
    >
      <span className="flex items-end gap-[3px]" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block w-[2px] rounded-full"
            style={{
              height: on ? 10 + i * 3 : 4,
              background: on ? "var(--oxblood)" : "var(--muted-ink)",
              transition: "height 0.5s var(--ease-settle)",
              animation: on ? `bar 1.${4 + i}s ease-in-out ${i * 0.2}s infinite alternate` : "none",
            }}
          />
        ))}
      </span>
      <span
        className="font-body text-[0.62rem] uppercase tracking-[0.2em]"
        style={{ color: "var(--muted-ink)" }}
      >
        {on ? "Sound on" : "Sound"}
      </span>
      <style>{`@keyframes bar{to{transform:scaleY(1.7)}}`}</style>
    </button>
  );
}
