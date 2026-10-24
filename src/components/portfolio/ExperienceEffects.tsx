import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useSpring } from "motion/react";
import Lenis from "lenis";
import gsap from "gsap";

export function ExperienceEffects() {
  const reduced = useReducedMotion();
  const x = useSpring(-100, { stiffness: 160, damping: 22 });
  const y = useSpring(-100, { stiffness: 160, damping: 22 });
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.3, smoothWheel: true, anchors: true });
    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (fine) document.documentElement.classList.add("orb-cursor-enabled");
    const universe = gsap.to(document.documentElement, {
      "--star-drift": "240px",
      duration: 90,
      repeat: -1,
      ease: "none",
    });
    let magnetic: HTMLElement | null = null;
    const move = (event: PointerEvent) => {
      if (!fine) return;
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const target = event.target instanceof Element ? event.target : null;
      setActive(Boolean(target?.closest("a, button, .project-card")));
      const next =
        target?.closest<HTMLElement>(".hero-actions a, .hero-actions button, .project-card") ??
        null;
      if (magnetic && magnetic !== next)
        gsap.to(magnetic, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 0.5 });
      magnetic = next;
      if (next) {
        const box = next.getBoundingClientRect();
        const dx = (event.clientX - box.left - box.width / 2) / box.width;
        const dy = (event.clientY - box.top - box.height / 2) / box.height;
        gsap.to(
          next,
          next.classList.contains("project-card")
            ? { rotateX: -dy * 5, rotateY: dx * 5, duration: 0.6 }
            : { x: dx * 7, y: dy * 7, duration: 0.4 },
        );
      }
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      universe.kill();
      document.documentElement.classList.remove("orb-cursor-enabled");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [reduced, x, y]);
  if (reduced) return null;
  return (
    <>
      <motion.div
        className="cursor-halo"
        aria-hidden
        style={{ x, y }}
        animate={{ scale: active ? 1.8 : 1, opacity: visible ? 0.5 : 0 }}
      />
      <motion.div
        ref={cursor}
        className="ai-cursor"
        aria-hidden
        style={{ x, y }}
        animate={{ scale: active ? 2.4 : 1, opacity: visible ? 1 : 0 }}
      />
    </>
  );
}

export function BootSequence() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (sessionStorage.getItem("portfolio-booted") || reduced) {
      setDone(true);
      return;
    }
    const value = { progress: 0 };
    const tween = gsap.to(value, {
      progress: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => setProgress(Math.round(value.progress)),
      onComplete: () => {
        sessionStorage.setItem("portfolio-booted", "true");
        setDone(true);
      },
    });
    return () => {
      tween.kill();
    };
  }, [reduced]);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="boot-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.6 }}
          role="status"
          aria-label="Initializing portfolio"
        >
          <div className="boot-mark">✳</div>
          <span className="mono">PERSONAL OPERATING SYSTEM</span>
          <div className="boot-percentage">
            {progress}
            <small>%</small>
          </div>
          <div className="boot-track">
            <motion.div animate={{ scaleX: progress / 100 }} />
          </div>
          <span className="mono">
            {progress < 40
              ? "INITIALIZING NEURAL CORE"
              : progress < 80
                ? "ESTABLISHING ORBIT"
                : "ALL SYSTEMS ONLINE"}
            <span className="boot-dots">...</span>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
