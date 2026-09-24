import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Camera, Droplets, Clock, Heart, ShieldCheck, Link2, Check, CircleAlert } from "lucide-react";
import { EditorialPage, EditorialHero, SectionIntro, EditorialFAQ, EditorialDownload, EditorialLinks, EditorialDisclaimer, PageSchema } from "@/components/editorial/Editorial";
import { MealWalkthrough } from "@/components/editorial/FeatureExplorers";
import VideoSection from "@/components/VideoSection";
import styles from "@/components/editorial/Editorial.module.css";

const description = "See how MyCalAgent brings photo meal logging, nutrition estimates, hydration, and daily routines together, with you in control of your logs.";
export const metadata: Metadata = { title: "How MyCalAgent Works", description, alternates: { canonical: "https://www.mycalagent.com/how-mycalagent-works" }, openGraph: { title: "How MyCalAgent Works", description, url: "https://www.mycalagent.com/how-mycalagent-works" } };

const faq = [
  { question: "How does photo meal logging work?", answer: "Take a photo, review the foods and estimated portions, correct anything that needs changing, and save the entry. Photos cannot reliably reveal all ingredients or preparation methods, so your review matters." },
  { question: "Can I correct an AI estimate?", answer: "Yes. You can review and correct meal results by voice or text before saving. Nutrition estimates may still be inaccurate or incomplete." },
  { question: "What can I track alongside meals?", answer: "MyCalAgent includes water and beverage logging, fasting windows, and daily habit context. Food and mood check-ins can add your own perspective to a log." },
  { question: "Is Apple Health required?", answer: "No. The Apple Health connection on supported iOS devices is optional and permission-based. It can add context from steps, sleep, and workouts, with supported nutrition and water sync." },
  { question: "When will patterns appear?", answer: "There is no fixed timeline or guarantee. Observations depend on the quantity, consistency, and quality of your logs. Incomplete data may not support an insight, and a repeated association does not establish a cause." },
  { question: "How can I learn about data and privacy?", answer: "Our Privacy Policy explains data collection and processing. The Security page describes protections, and the AI Disclaimer explains the limits of estimates and observations." },
];

const features = [
  { icon: Camera, title: "Meals & nutrition", body: "Photos, portions, and nutrition estimates, reviewed by you before they become part of your day.", href: "/features/ai-meal-analysis" },
  { icon: Droplets, title: "Water & beverages", body: "Water toward your goal; coffee, tea, and other drinks recorded for nutrition and habit context.", href: "/features/hydration-tracking" },
  { icon: Clock, title: "Fasting windows", body: "An optional way to keep track of eating windows, timers, and the routine you choose.", href: "/features/intermittent-fasting" },
  { icon: Heart, title: "Food & mood", body: "Your personal check-ins alongside your meals, with room for variation from one day to the next.", href: "/features/food-and-mood" },
  { icon: ShieldCheck, title: "Dietary preferences", body: "Potential allergen and dietary conflicts can be flagged. Always check ingredients independently.", href: "/features/ai-meal-analysis" },
  { icon: Link2, title: "Optional connections", body: "Add Apple Health context on supported devices, with permission. Logging does not require a connection.", href: "/features/apple-health" },
];

export default function HowMyCalAgentWorksPage() {
  return <><PageSchema path="/how-mycalagent-works" title="How MyCalAgent Works" description={description} faq={faq} /><EditorialPage>
    <EditorialHero label="HOW IT WORKS" title={"How MyCalAgent\nworks."} description="Capture a meal. Review the details. Bring a little more context to your everyday routines." image="/how-it-works-editorial.png" alt="A phone capturing a colorful lunch on a light table" href="#walkthrough" action="Follow a meal" />
    <nav className={styles.strip} aria-label="Page chapters"><div className={styles.wrap}><a href="#walkthrough"><span>01</span>From photo to log</a><a href="#daily-context"><span>02</span>Your daily context</a><a href="#your-control"><span>03</span>You stay in control</a></div></nav>
    <VideoSection compact />
    <section id="walkthrough" className={`${styles.wrap} ${styles.section}`}><div className={styles.sectionTop}><SectionIntro eyebrow="SMALL STEPS, EVERYDAY" title={"One meal.\nThree simple steps."} /><p>A useful log starts with your perspective. AI assists with the estimate; you decide what gets saved.</p></div><MealWalkthrough /></section>
    <section id="daily-context" className={`${styles.tinted} ${styles.section}`}><div className={styles.wrap}><div className={styles.sectionTop}><SectionIntro eyebrow="BEYOND THE PLATE" title="Your day has more than one detail." /><p>Choose the routines you want to keep in view. Each adds another piece of context.</p></div><div className={styles.plainList}>{features.map(feature => <article key={feature.title}><h3><feature.icon size={22} aria-hidden="true" />{feature.title}</h3><p>{feature.body}</p><Link href={feature.href}>Explore feature<ArrowUpRight size={15} aria-hidden="true" /></Link></article>)}</div></div></section>
    <section id="your-control" className={`${styles.wrap} ${styles.section}`}><SectionIntro eyebrow="A TOOL, NOT THE FINAL WORD" title="You stay in control." description="A useful wellness tool should make its limits as clear as its features." /><div className={styles.boundary}><div><h3>Room for your judgment</h3><ul><li><Check size={18} />Review and edit estimated meal details.</li><li><Check size={18} />Choose whether to connect supported health data.</li><li><Check size={18} />Read observations alongside your own experience.</li></ul></div><div><h3>Limits worth knowing</h3><ul><li><CircleAlert size={18} />A photo cannot confirm allergens or food safety.</li><li><CircleAlert size={18} />AI observations do not prove cause and effect.</li><li><CircleAlert size={18} />The app does not provide medical advice or treatment.</li></ul></div></div></section>
    <EditorialFAQ items={faq} /><EditorialDownload /><EditorialLinks links={[["All features", "/features"], ["AI wellness insights", "/ai-wellness-insights"], ["Wellness pattern recognition", "/wellness-pattern-recognition"], ["Why calorie tracking fails", "/why-calorie-tracking-fails"], ["Research", "/research"], ["About", "/about"]]} /><EditorialDisclaimer />
  </EditorialPage></>;
}
