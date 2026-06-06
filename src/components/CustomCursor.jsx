import { useEffect, useRef } from "react";

/**
 * CustomCursor
 * Uses React refs + direct DOM style updates instead of useState,
 * so mouse movement never triggers a React re-render.
 */
export const CustomCursor = () => {
  const dotRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const glow = glowRef.current;
    if (!dot || !glow) return;

    const onMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor hidden md:block" />
      <div ref={glowRef} className="custom-cursor-glow hidden md:block" />
    </>
  );
};
