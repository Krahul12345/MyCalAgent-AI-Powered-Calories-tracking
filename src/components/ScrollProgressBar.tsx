"use client";

import { useEffect, useState } from "react";

export default function ScrollProgressBar() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed top-16 left-0 right-0 z-[9999] h-[5px]"
      style={{ background: "rgba(0,0,0,0.06)" }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          background: "linear-gradient(90deg, #10B981, #34d399, #6ee7b7)",
          transition: "width 0.1s linear",
          boxShadow: "0 0 8px rgba(16,185,129,0.6)",
        }}
      />
    </div>
  );
}
