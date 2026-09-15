import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Heart, SlidersHorizontal, LockKeyhole, ScanEye } from "lucide-react";
import { EditorialPage, EditorialHero, SectionIntro, EditorialFAQ, EditorialDownload, EditorialLinks, EditorialDisclaimer, type FAQItem } from "@/components/editorial/Editorial";
import styles from "@/components/editorial/Editorial.module.css";

const values = [
  { icon: Heart, title: "Everyday wellbeing", body: "Meals and routines belong in the context of a life. Our focus is awareness, without turning every choice into a judgment." },
  { icon: SlidersHorizontal, title: "Personal choice", body: "Useful tools leave room for your preferences. Review your entries and decide which routines you want to track." },
  { icon: ScanEye, title: "Honest estimates", body: "AI can help with the details, but it can be wrong. Making that uncertainty visible is part of useful product design." },
  { icon: LockKeyhole, title: "Respect for privacy", body: "Personal wellness information deserves care. Our Privacy Policy explains how data is collected, processed, and managed." },
];

export default function AboutPageClient({ aboutFAQ }: { aboutFAQ: FAQItem[] }) {
  return <EditorialPage>
    <EditorialHero label="ABOUT US" title={"About\nMyCalAgent."} description="Built around a simple idea: wellness tracking should have room for everyday life." image="/about-editorial.png" alt="Illustrative lifestyle scene of friends sharing lunch, not a photograph of the MyCalAgent team" href="#our-story" action="Our perspective" />
    <div className={styles.strip}><div className={styles.wrap}><span>FOOD. HABITS. EVERYDAY LIFE.</span><Link href="/survey">Share ideas &amp; feedback<ArrowUpRight size={16} /></Link></div></div>
    <section id="our-story" className={`${styles.wrap} ${styles.section} ${styles.story}`}><SectionIntro eyebrow="WHY MYCALAGENT" title={"A fuller view\nof the everyday."} /><div className={styles.storyCopy}><p>What you eat is one part of your day. The routines around it matter to your experience, too.</p><p>MyCalAgent brings meals, hydration, fasting windows, and daily habits into one place. Our aim is to make recording those details simpler and reflecting on them more approachable.</p><p>We use AI to assist with nutrition estimates and observations across your logs. The purpose is to support personal awareness, while keeping uncertainty and your own judgment in view.</p><p>We see the product as an ongoing conversation with the people who use it. Everyday needs, questions, and feedback help inform what we explore next.</p></div></section>
    <section className={`${styles.tinted} ${styles.section}`}><div className={styles.wrap}><SectionIntro eyebrow="WHAT GUIDES THE WORK" title="Thoughtful tools. Human priorities." /><div className={styles.valueGrid}>{values.map(value => <article key={value.title}><value.icon size={27} strokeWidth={1.5} aria-hidden="true" /><h3>{value.title}</h3><p>{value.body}</p></article>)}</div></div></section>
    <section className={`${styles.wrap} ${styles.section} ${styles.split}`}><figure><div className={styles.photo}><Image src="/upcoming-cali.png" alt="Illustrative lifestyle photo of a woman using her phone at lunch" fill sizes="(max-width:640px) 90vw, 550px" /></div><figcaption className={styles.photoNote}>Illustrative lifestyle image, not a customer testimonial.</figcaption></figure><div><SectionIntro eyebrow="DESIGNED AROUND REAL ROUTINES" title={"A place for your habits.\nNot a score for your life."} description="A hurried lunch, a glass of water, a check-in at the end of the day. The starting point is what you choose to record, with space to review and correct it." /><Link href="/how-mycalagent-works" className={styles.textLink}>See how it works<ArrowUpRight size={18} /></Link></div></section>
    <section className={`${styles.rose} ${styles.quoteBand}`}><div className={styles.wrap}><span className={styles.eyebrow}>OUR PURPOSE</span><p>Make everyday wellness easier to record, and more approachable to reflect on.</p></div></section>
    <section className={`${styles.wrap} ${styles.section} ${styles.feedback}`}><div><SectionIntro eyebrow="PART OF THE CONVERSATION" title="What would make it useful to you?" /><p>Tell us what fits your routine, what gets in the way, and what you would like to see. Ideas inform our thinking without creating a promise of a future feature.</p></div><Link href="/survey" className={styles.button}>Share ideas &amp; feedback<ArrowUpRight size={18} /></Link></section>
    <EditorialFAQ items={aboutFAQ} title="Get to know MyCalAgent." /><EditorialDownload /><EditorialLinks links={[["Upcoming features", "/features/upcoming"], ["AI Insights", "/ai-wellness-insights"], ["Security", "/security"], ["Research", "/research"], ["Contact", "mailto:support@mycalagent.com"]]} /><EditorialDisclaimer />
  </EditorialPage>;
}
