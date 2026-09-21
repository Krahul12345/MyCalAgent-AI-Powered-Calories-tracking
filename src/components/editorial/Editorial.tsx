import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowDown, ArrowUpRight, ChevronDown } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import AppStoreButtons from "@/components/AppStoreButtons";
import styles from "./Editorial.module.css";

export interface FAQItem { question: string; answer: string }

export function EditorialPage({ children }: { children: ReactNode }) {
  return <><Navigation /><main className={styles.page}>{children}</main><Footer /></>;
}

export function EditorialHero({ label, title, description, image, alt, href, action }: { label: string; title: string; description: string; image: string; alt: string; href: string; action: string }) {
  return <section className={styles.hero}><Image src={image} alt={alt} fill priority sizes="100vw" className={styles.heroImage} /><div className={styles.heroContent}><span className={styles.eyebrow}>MYCALAGENT / {label}</span><h1>{title}</h1><p>{description}</p><a href={href} className={styles.textLink}>{action}<ArrowDown size={18} aria-hidden="true" /></a></div></section>;
}

export function SectionIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div className={styles.sectionIntro}><span className={styles.eyebrow}>{eyebrow}</span><h2>{title}</h2>{description && <p>{description}</p>}</div>;
}

export function EditorialFAQ({ items, title = "A little more clarity." }: { items: FAQItem[]; title?: string }) {
  return <section className={`${styles.wrap} ${styles.faq}`}><SectionIntro eyebrow="QUESTIONS & ANSWERS" title={title} /><div>{items.map(item => <details key={item.question} className={styles.question}><summary>{item.question}<ChevronDown size={18} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div></section>;
}

export function EditorialLinks({ links }: { links: [string, string][] }) {
  return <nav className={`${styles.wrap} ${styles.related}`} aria-label="Explore related pages"><span className={styles.eyebrow}>CONTINUE EXPLORING</span><div>{links.map(([label, href]) => <Link key={href} href={href}>{label}<ArrowUpRight size={17} aria-hidden="true" /></Link>)}</div></nav>;
}

export function EditorialDownload() {
  return <section className={styles.download}><div className={styles.wrap}><div><span className={styles.eyebrow}>MYCALAGENT, IN YOUR EVERYDAY</span><h2>Start with your next meal.</h2><p>A place for your meals, water, and daily routines.</p></div><AppStoreButtons /></div></section>;
}

export function EditorialDisclaimer() {
  return <div className={`${styles.wrap} ${styles.disclaimer}`}><p>MyCalAgent is for general wellness and informational use, not medical advice, diagnosis, or treatment. AI estimates and observations may be inaccurate or incomplete. Patterns do not establish cause and effect.</p><Link href="/ai-disclaimer">AI Disclaimer</Link><Link href="/terms">Terms of Service</Link><Link href="/privacy">Privacy Policy</Link></div>;
}

export function PageSchema({ path, title, description, faq }: { path: string; title: string; description: string; faq: FAQItem[] }) {
  const url = `https://www.mycalagent.com${path}`;
  const schema = { "@context": "https://schema.org", "@graph": [{ "@type": "WebPage", "@id": url, url, name: title, description, publisher: { "@type": "Organization", name: "MyCalAgent", url: "https://www.mycalagent.com" } }, { "@type": "FAQPage", mainEntity: faq.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }, { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.mycalagent.com" }, { "@type": "ListItem", position: 2, name: title, item: url }] }] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />;
}
