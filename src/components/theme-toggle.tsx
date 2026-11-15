"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("studiospace-theme");
    const initial = saved === "dark";
    // Restore the user's persisted preference after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(initial);
    document.documentElement.dataset.theme = initial ? "dark" : "light";
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    window.localStorage.setItem("studiospace-theme", next ? "dark" : "light");
  };

  return (
    <button className="button button-small theme-toggle" onClick={toggle} aria-label={`Switch to ${dark ? "light" : "dark"} theme`}>
      {dark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
