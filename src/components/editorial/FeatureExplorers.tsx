"use client";

import { useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Utensils, Droplets, Clock, Heart } from "lucide-react";
import styles from "./Editorial.module.css";

const steps = [
  { label: "Capture", title: "A meal worth\nremembering.", body: "Start with a photo of your meal or packaged food. Add the details a camera cannot see, such as ingredients, preparation, and portion size.", points: ["Photograph your meal in clear light", "Include drinks and extras in your log", "Use text when a photo is not enough"], image: "/how-it-works-editorial.png", alt: "A phone held above a colorful lunch" },
  { label: "Review", title: "AI estimates.\nYou have the final say.", body: "Check the identified foods and estimated nutrition. Correct ingredients and portions before saving; a photo cannot reliably reveal everything in a meal.", points: ["Review foods and serving sizes", "Correct the result by voice or text", "Treat nutrition values as estimates"], image: "/upcoming-cali.png", alt: "A person using a phone beside lunch" },
  { label: "Reflect", title: "Your everyday,\nwith a little context.", body: "Bring meal logs together with water, fasting windows, and personal check-ins. Explore observations over time without treating a pattern as proof of a cause.", points: ["Keep the routines that matter to you visible", "Look at repeated observations, not just one day", "Remember that missing logs limit the picture"], image: "/ai-insights-editorial.png", alt: "A phone, notebook, breakfast, and water" },
];

const signals = [
  { label: "Meals", sub: "Timing & food logs", icon: Utensils, observation: "Lunch was logged later on the days with lower afternoon energy check-ins.", context: "Meal times and self-reported energy could be compared across the same logged days.", limit: "This does not show that lunch timing caused a change in energy. Sleep, workload, missing entries, and other factors may matter." },
  { label: "Hydration", sub: "Water & daily context", icon: Droplets, observation: "Fewer water entries appeared on days you described as busy.", context: "Water logs and notes about your routine could appear together in a summary.", limit: "Fewer entries do not necessarily mean less water was consumed. Logging gaps cannot establish dehydration." },
  { label: "Meal windows", sub: "Schedules & routines", icon: Clock, observation: "Your logged eating window varied more on weekends.", context: "Logged meal times can provide a starting point for reflecting on differences in routine.", limit: "A timing pattern does not identify an ideal fasting schedule or establish that fasting is appropriate for you." },
  { label: "Food & mood", sub: "Personal check-ins", icon: Heart, observation: "Similar evening meals were followed by different mood check-ins.", context: "Food logs and personal reflections may reveal variation as well as repetition.", limit: "Mood has many influences. These observations cannot diagnose a condition or determine a food's effect on mental health." },
];

function nextTab(event: KeyboardEvent, index: number, length: number, prefix: string, select: (value: number) => void) {
  let next = index;
  if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % length;
  else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index + length - 1) % length;
  else if (event.key === "Home") next = 0;
  else if (event.key === "End") next = length - 1;
  else return;
  event.preventDefault(); select(next); document.getElementById(`${prefix}-${next}`)?.focus();
}

export function MealWalkthrough() {
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  const step = steps[selected];
  return <div><div className={styles.chapterTabs} role="tablist" aria-label="Meal logging walkthrough">{steps.map((item, i) => <button key={item.label} id={`step-${i}`} role="tab" aria-selected={selected === i} aria-controls="step-panel" tabIndex={selected === i ? 0 : -1} onClick={() => setSelected(i)} onKeyDown={event => nextTab(event, i, steps.length, "step", setSelected)}><span>0{i + 1}</span>{item.label}</button>)}</div><div id="step-panel" role="tabpanel" aria-labelledby={`step-${selected}`}><AnimatePresence mode="wait" initial={false}><motion.div key={selected} className={styles.chapterBody} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .15 }}><figure className={styles.chapterFigure}><div className={styles.photo}><Image src={step.image} alt={step.alt} fill sizes="(max-width:640px) 90vw, 550px" /></div></figure><div className={styles.chapterCopy}><span className={styles.eyebrow}>0{selected + 1} / {step.label.toUpperCase()}</span><h3>{step.title}</h3><p>{step.body}</p><ul>{step.points.map(point => <li key={point}><Check size={17} aria-hidden="true" />{point}</li>)}</ul></div></motion.div></AnimatePresence></div></div>;
}

export function InsightExplorer() {
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  const item = signals[selected];
  return <div className={styles.signalLayout}><div role="tablist" aria-label="Illustrative insight topics" className={styles.signalTabs}>{signals.map((signal, i) => <button role="tab" id={`signal-${i}`} key={signal.label} aria-controls="signal-panel" aria-selected={selected === i} tabIndex={selected === i ? 0 : -1} onClick={() => setSelected(i)} onKeyDown={event => nextTab(event, i, signals.length, "signal", setSelected)}><signal.icon size={22} aria-hidden="true" /><span><strong>{signal.label}</strong><small>{signal.sub}</small></span></button>)}</div><div><div role="tabpanel" id="signal-panel" aria-labelledby={`signal-${selected}`} className={styles.sample}><div className={styles.sampleLabel}><span>ILLUSTRATIVE EXAMPLE</span><span>Not personal data</span></div><motion.div key={selected} initial={selected === 0 ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : .15 }}><h3>{item.observation}</h3><p>{item.context}</p><div className={styles.sampleFoot}><strong>What this cannot tell you</strong><br />{item.limit}</div></motion.div></div><p className={styles.sampleBottom}>Examples explain the type of observation being discussed. They are not real user results, predictions, or a guarantee that an insight will be available.</p></div></div>;
}
