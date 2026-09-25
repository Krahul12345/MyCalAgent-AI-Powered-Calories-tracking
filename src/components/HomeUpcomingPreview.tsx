"use client";

import Image from "next/image";
import Link from "next/link";
import { Activity, ArrowUpRight, AudioLines, Footprints, Headphones } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const concepts = [
  {
    title: "Movement",
    kicker: "Everyday activity & mobility",
    image: "/upcoming-movement-tracking-concept.png",
    alt: "A person stretching with movement tracking markers",
    href: "/features/upcoming#explore",
    icon: Footprints,
  },
  {
    title: "Cali voice",
    kicker: "Conversations & meal logging",
    image: "/upcoming-cali.png",
    alt: "A person speaking into a phone beside a meal",
    href: "/features/upcoming#explore",
    icon: AudioLines,
  },
  {
    title: "Meditation",
    kicker: "Guided audio & reflection",
    image: "/upcoming-meditation.png",
    alt: "A person sitting comfortably with headphones",
    href: "/features/upcoming#explore",
    icon: Headphones,
  },
  {
    title: "Glucose trends",
    kicker: "Optional data & meal context",
    image: "/upcoming-glucose-monitoring-concept.png",
    alt: "A glucose monitoring concept screen on a phone",
    href: "/features/upcoming#explore",
    icon: Activity,
  },
];

export function HomeUpcomingPreview() {
  const reduced = useReducedMotion();

  return (
    <section className="relative z-10 px-6 pb-24">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-[linear-gradient(135deg,rgba(235,246,240,0.92),rgba(248,251,249,0.98))] px-5 py-8 shadow-[0_24px_80px_rgba(16,68,47,0.08)] sm:px-8 md:px-10 md:py-10">
        <div className="mb-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Upcoming features</p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950 md:text-4xl">
              Four directions we&apos;re exploring next.
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              A quick visual look at concepts under consideration, with Movement first.
            </p>
          </div>
          <Link
            href="/features/upcoming"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-700/15 transition-transform active:scale-[0.98]"
          >
            View upcoming features
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {concepts.map((concept, index) => {
            const Icon = concept.icon;
            return (
              <motion.div
                key={concept.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : index * 0.04 }}
              >
                <Link
                  href={concept.href}
                  className="group block overflow-hidden rounded-2xl bg-white/85 shadow-[0_18px_45px_rgba(18,59,44,0.08)] ring-1 ring-emerald-950/10 transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(18,59,44,0.13)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-emerald-50">
                    <Image
                      src={concept.image}
                      alt={concept.alt}
                      fill
                      sizes="(max-width: 640px) calc(100vw - 72px), (max-width: 1024px) 45vw, 300px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-emerald-950/35 to-transparent" />
                    <span className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-emerald-800 shadow-sm backdrop-blur">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="min-h-[118px] px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 text-lg font-black text-slate-950">{concept.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{concept.kicker}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
