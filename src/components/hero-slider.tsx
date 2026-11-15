"use client";

import Link from "next/link";
import { ArrowRight, Camera, Headphones, Mic2 } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  { eyebrow: "For the visual storytellers", title: "Light the scene.", text: "Cyc walls, daylight studios, and production-ready rooms for the work you want remembered.", icon: Camera },
  { eyebrow: "For the sound makers", title: "Find your frequency.", text: "Record, rehearse, and mix in spaces designed to let every detail come through.", icon: Headphones },
  { eyebrow: "For the bold ideas", title: "Make room for more.", text: "Flexible creative workspaces where your next project can take shape on its own terms.", icon: Mic2 },
];

export function HeroSlider() {
  return (
    <Swiper className="hero-slider" modules={[Autoplay, Pagination]} autoplay={{ delay: 5000 }} pagination={{ clickable: true }} loop>
      {slides.map(({ eyebrow, title, text, icon: Icon }, index) => (
        <SwiperSlide className="hero-slide" key={title}>
          <div className="hero-slide-copy">
            <span className="eyebrow">{eyebrow}</span>
            <h1>{title}</h1>
            <p>{text}</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/studios">Explore studios <ArrowRight size={17} /></Link>
              <Link className="button button-ghost" href="/add-studio">Host your space</Link>
            </div>
          </div>
          <div className={`hero-art hero-art-${index + 1}`}><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><div className="hero-card"><Icon size={28} /><span>CREATE<br /><strong>WITHOUT<br />LIMITS</strong></span></div></div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
