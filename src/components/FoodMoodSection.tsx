import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Zap, Droplets, Clock, Heart } from "lucide-react";
import styles from "./HomeWellness.module.css";

const topics = [
  { icon: Zap, title: "Energy, in your own words.", description: "Keep personal energy check-ins alongside meal records. Look for repetition and variation, without assuming one caused the other." },
  { icon: Droplets, title: "Water is part of the day.", description: "Bring water entries into the picture alongside meals and routines. Missing entries may simply mean a busy day." },
  { icon: Clock, title: "Notice your rhythm.", description: "Reflect on logged meal times and eating windows, including how your routine varies from day to day." },
  { icon: Heart, title: "Make space for how you feel.", description: "Your mood check-ins add a personal perspective that nutrition numbers alone cannot capture." },
];

export default function FoodMoodSection() {
  return <section id="food-mood" className={styles.section} aria-labelledby="food-mood-heading">
    <div className={styles.wrap}>
      <div className={styles.heading}>
        <div><p className={styles.eyebrow}>Food &amp; Mood Insights</p><h2 id="food-mood-heading">Your meals.<br />Your mood.<br />Room for context.</h2></div>
        <p className={styles.lead}>A day is more than a calorie total. Bring your food logs and personal check-ins together, and approach the patterns with curiosity.</p>
      </div>
      <div className={styles.layout}>
        <figure><div className={styles.visual}><Image src="/ai-insights-editorial.png" alt="Breakfast, a glass of water, a notebook, and a phone on a light table" fill sizes="(max-width:760px) 90vw, 544px" /></div><figcaption className={styles.caption}>Illustrative lifestyle imagery. No personal results shown.</figcaption></figure>
        <div><div className={styles.topics}>{topics.map(topic => <article className={styles.topic} key={topic.title}><topic.icon size={25} aria-hidden="true" /><div><h3>{topic.title}</h3><p>{topic.description}</p></div></article>)}</div><Link className={styles.link} href="/ai-wellness-insights">Explore AI wellness insights <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
      </div>
    </div>
  </section>;
}
