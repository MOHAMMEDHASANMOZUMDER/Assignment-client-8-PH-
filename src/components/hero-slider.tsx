"use client";
import Link from "next/link";
import { ArrowRight, Camera, Headphones, Mic2 } from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
  { eyebrow: "For the visual storytellers", title: "Light the scene.", text: "Cyc walls, daylight studios, and production-ready rooms for the work you want remembered.", icon: Camera },
  { eyebrow: "For the sound makers", title: "Find your frequency.", text: "Record, rehearse, and mix in spaces designed to let every detail come through.", icon: Headphones },
  { eyebrow: "For the bold ideas", title: "Make room for more.", text: "Flexible creative workspaces where your next project can take shape on its own terms.", icon: Mic2 },
];

export function HeroSlider() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 5000);
    return () => window.clearInterval(timer);
  }, []);
  const slide = slides[active];
  const Icon = slide.icon;
  return (
    <section className="hero-slider">
      <div className="hero-slide-copy">
        <span className="eyebrow">{slide.eyebrow}</span>
        <h1>{slide.title}</h1>
        <p>{slide.text}</p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/studios">Explore studios <ArrowRight size={17} /></Link>
          <Link className="button button-ghost" href="/add-studio">Host your space</Link>
        </div>
        <div className="slider-dots" aria-label="Hero slides">
          {slides.map((item, index) => <button key={item.title} className={index === active ? "slider-dot active" : "slider-dot"} aria-label={`Show slide ${index + 1}`} onClick={() => setActive(index)} />)}
        </div>
      </div>
      <div className={`hero-art hero-art-${active + 1}`}><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><div className="hero-card"><Icon size={28} /><span>CREATE<br /><strong>WITHOUT<br />LIMITS</strong></span></div></div>
    </section>
  );
}
