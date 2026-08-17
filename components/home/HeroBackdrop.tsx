"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * The moving part of the hero, layered over the server-rendered poster.
 *
 * The poster itself deliberately lives outside this component: it is the largest thing
 * painted on first load, so keeping it as plain server markup means it is on screen without
 * waiting for any of this to hydrate. Everything here fades in *on top* of it, so slide 0
 * is simply "nothing covering the poster".
 */
const stills = ["/bgs/bg-frame-1.webp", "/bgs/bg-frame-2.webp"] as const;
const SLIDE_COUNT = stills.length + 1;

export default function HeroBackdrop() {
  const [active, setActive] = useState(0);
  /**
   * Nothing here mounts until the browser is idle, so the video and the two extra
   * backgrounds never compete with the first paint. The carousel's first turn is at 7s, so
   * they are always ready in time.
   *
   * `motion` is decided at the same moment rather than up front, so the whole decision
   * lands in one state update off the render path.
   */
  const [{ enhanced, motion }, setHero] = useState({ enhanced: false, motion: false });

  useEffect(() => {
    const enhance = () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // Honour data-saver / metered connections: the still hero is the design intact.
      const conn = (
        navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
      ).connection;
      const thrifty = Boolean(conn?.saveData) || /(^|-)[23]g$/.test(conn?.effectiveType ?? "");
      /*
       * Phones get the still. The clip is 16:9, so covering a portrait viewport crops most
       * of it away and upscales the rest about 2x — it is the device where the video looks
       * worst, and where its ~1.1MB hurts most on mobile data. The poster is the video's
       * own first frame, so the composition a phone sees is exactly the intended one.
       */
      const roomForVideo = window.matchMedia("(min-width: 768px)").matches;

      setHero({ enhanced: true, motion: !reduced && !thrifty && roomForVideo });
    };

    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(enhance, { timeout: 3000 })
      : window.setTimeout(enhance, 1200);

    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle as number);
      else clearTimeout(idle as number);
    };
  }, []);

  useEffect(() => {
    if (!enhanced || !motion) return;
    const id = setInterval(() => setActive((i) => (i + 1) % SLIDE_COUNT), 7000);
    return () => clearInterval(id);
  }, [enhanced, motion]);

  if (!enhanced) return null;

  return (
    <>
      {/* The loop sits on slide 0, directly over its own first frame. */}
      {motion && (
        <div
          className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
            active === 0 ? "opacity-100" : "opacity-0"
          }`}
        >
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src="/bgs/hero-loop.webm" type="video/webm" />
            <source src="/bgs/hero-loop.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      {stills.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
            active === i + 1 ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt=""
            fill
            // Same portrait-cover reasoning as the poster — a phone genuinely needs a
            // wider file here than a desktop does. ~20KB as AVIF at 2048px.
            sizes="(max-width: 768px) 250vw, 120vw"
            className="object-cover object-top sm:object-center"
          />
        </div>
      ))}
    </>
  );
}
