import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./HomeWellness.module.css";

const principles = [
  { title: "A photo is a starting point.", text: "AI assists with food identification and nutrition estimates. You review the details and correct what the camera cannot see." },
  { title: "Keep the wider day in view.", text: "Meals, water, eating windows, and personal check-ins bring different parts of your everyday routine into one place." },
  { title: "Your judgment stays central.", text: "Observations can give you something to reflect on. They are not a diagnosis, a proven cause, or a promise of a particular result." },
];

export default function WellnessComparisonSection() {
  return <section id="why-mycalagent" className={`${styles.section} ${styles.different}`} aria-labelledby="comparison-heading"><div className={styles.wrap}>
    <div className={styles.heading}><div><p className={styles.eyebrow}>Why MyCalAgent Is Different</p><h2 id="comparison-heading">More context.<br />Not just a count.</h2></div><p className={styles.lead}>AI assistance, everyday records, and room for your perspective. This is the approach behind MyCalAgent.</p></div>
    <div className={styles.principles}>{principles.map((item, index) => <article className={styles.principle} key={item.title}><span className={styles.number}>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>
    <div className={styles.closing}><p>For general wellness and informational use. AI estimates may be inaccurate or incomplete; patterns do not establish cause and effect.</p><Link href="/how-mycalagent-works" className={styles.link}>See how it works <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
  </div></section>;
}
