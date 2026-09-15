"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, AudioLines, Footprints, Headphones, Layers3, LockKeyhole, Plus, Minus, Activity, MessageSquare } from "lucide-react";
import styles from "./UpcomingFeatures.module.css";

const concepts = [
  {
    id: "cali", label: "Cali voice", icon: AudioLines, number: "01", title: "A conversation.\nIn your own words.",
    image: "/upcoming-cali.png", imageAlt: "Lifestyle concept: a woman speaking into her phone beside her lunch", teaser: "Conversations & meal logging",
    description: "We're exploring spoken conversations with Cali, alongside text, for reflecting on your logged meals and everyday routines.",
    details: ["Voice conversations with visible transcripts", "Meal dictation and editable corrections", "Text as an alternative to voice"],
    note: "Concept only. AI responses may be inaccurate or incomplete and are not medical advice.",
    visualTitle: "Ask Cali", visualSubtitle: "Voice + text concept", prompt: "Let's look back at my meals.", response: "A space to reflect on what you've logged, in a conversation that fits your day.",
  },
  {
    id: "movement", label: "Movement", icon: Footprints, number: "02", title: "Everyday movement.\nA new perspective.",
    image: "/upcoming-movement-tracking-concept.png", imageAlt: "Concept illustration: a man stretching with blue motion-tracking markers and a phone on a stand", teaser: "Everyday activity & mobility",
    description: "An exploration of camera-assisted movement sessions, repetition counts, and activity summaries alongside your daily logs.",
    details: ["Guided mobility and fitness sessions", "Camera-based movement estimates", "Session history alongside everyday habits"],
    note: "Concept only. Movement estimates are not an assessment of injury, exercise safety, or a substitute for professional guidance.",
    visualTitle: "Movement", visualSubtitle: "Session library concept", prompt: "Make room for movement.", response: "Mobility, everyday activity, and workout sessions are directions under consideration.",
  },
  {
    id: "meditation", label: "Meditation", icon: Headphones, number: "03", title: "A little space.\nJust for you.",
    image: "/upcoming-meditation.png", imageAlt: "Lifestyle concept: a woman seated comfortably listening through headphones", teaser: "Guided audio & reflection",
    description: "We're considering guided audio, ambient sound, and visual breathing cues for moments of personal reflection.",
    details: ["Guided breathing and reflection", "Voice with optional ambient sound", "Simple playback and session choices"],
    note: "Concept only. Intended for general wellbeing, not treatment of anxiety, sleep disorders, pain, or other conditions.",
    visualTitle: "A moment to pause", visualSubtitle: "Guided audio concept", prompt: "Find a moment of your own.", response: "Breathing, quiet reflection, and evening sessions are being explored. Audio is not available in this preview.",
  },
  {
    id: "glucose", label: "Glucose trends", icon: Activity, number: "04", title: "More context.\nCarefully considered.",
    image: "/upcoming-glucose.png", imageAlt: "Lifestyle concept: a phone, notebook, water, and meal arranged on a table", teaser: "Optional data & meal context",
    description: "An optional concept for viewing summaries of existing Apple Health glucose data alongside logged meals, with attention to data coverage.",
    details: ["Read-only Apple Health data, with permission", "Qualitative summaries and coverage information", "An optional, separately enabled experience"],
    note: "Initial scope considers iOS only. No direct sensor connection, glucose alerts, diagnosis, predictions, or medication guidance. Never use for treatment decisions.",
    visualTitle: "Glucose trend insights", visualSubtitle: "Optional connection concept", prompt: "Context starts with coverage.", response: "A summary would depend on the available records. Limited data may mean there is no trend to show.",
  },
];

const questions = [
  ["When would these features be available?", "There are no announced release dates. These concepts may change, be delayed, or never be released. This page is a preview of directions under consideration, not a delivery commitment."],
  ["Would they be included in my plan?", "Pricing, plan inclusion, supported devices, regions, and eligibility have not been announced. Do not purchase a subscription based on these concepts. Refer to the current pricing page for available plans."],
  ["Are these medical features?", "No. These concepts are for general wellness and informational use. MyCalAgent does not provide medical advice, diagnosis, or treatment. AI outputs and camera estimates may be inaccurate. Consult a qualified healthcare professional for health decisions."],
  ["Would I need to share more data?", "Voice, camera, and connected-health concepts may require additional permissions and consent if released. Details would be provided for the specific feature. The existing Privacy Policy governs current data practices; these concepts do not change it."],
];

export default function UpcomingFeatures() {
  const [selected, setSelected] = useState(0);
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);
  const reduced = useReducedMotion();
  const concept = concepts[selected];
  const Icon = concept.icon;

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="upcoming-title">
        <Image src="/upcoming-wellness-studio.png" alt="A bright studio with a person seated on an exercise mat, lifestyle concept imagery" fill priority sizes="100vw" className={styles.heroImage} />
        <div className={styles.heroContent}>
          <Link href="/features" className={styles.eyebrow}>MYCALAGENT / A LOOK AHEAD</Link>
          <h1 id="upcoming-title">Upcoming<br />features.</h1>
          <p className={styles.heroLead}>More ways to connect<br />with your everyday.</p>
          <p className={styles.heroDescription}>A first look at the ideas we're exploring<br className={styles.desktopBreak} /> for MyCalAgent. Thoughtful by design.<br className={styles.desktopBreak} /> Still taking shape.</p>
          <div className={styles.heroActions}><a href="#explore" className={styles.exploreLink}>Explore the concepts <ArrowDown size={18} /></a><Link href="/survey" className={styles.heroSurvey}><MessageSquare size={17} />Share ideas &amp; feedback</Link></div>
        </div>
        <div className={styles.heroCaption}>CONCEPT PREVIEW <span>No release dates or availability commitments.</span></div>
      </section>

      <section className={styles.feedback} aria-labelledby="feedback-heading">
        <MessageSquare className={styles.feedbackIcon} size={28} aria-hidden="true" />
        <div><span className={styles.eyebrow}>YOUR PERSPECTIVE MATTERS</span><h2 id="feedback-heading">What would you like to see?</h2><p>Tell us which ideas interest you, what's missing, and what could fit your everyday life.</p><span className={styles.feedbackNote}>Our survey includes space for suggestions. Feedback does not guarantee development or release.</span></div>
        <Link href="/survey" className={styles.surveyButton}>Share ideas &amp; feedback <ArrowUpRight size={19} /></Link>
      </section>

      <section id="explore" className={styles.gallery} aria-labelledby="explore-heading">
        <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>FOUR DIRECTIONS. ONE EVERYDAY LIFE.</span><h2 id="explore-heading">A closer look at what's possible.</h2></div><span className={styles.conceptLabel}>Under consideration</span></div>
        <div className={styles.tabs} role="tablist" aria-label="Feature concepts">
          {concepts.map((item, index) => <button key={item.id} id={`tab-${item.id}`} role="tab" aria-selected={selected === index} aria-controls="concept-panel" tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={(event) => {
            let next = index;
            if (event.key === "ArrowRight") next = (index + 1) % concepts.length;
            else if (event.key === "ArrowLeft") next = (index + concepts.length - 1) % concepts.length;
            else if (event.key === "Home") next = 0;
            else if (event.key === "End") next = concepts.length - 1;
            else return;
            event.preventDefault(); setSelected(next); document.getElementById(`tab-${concepts[next].id}`)?.focus();
          }}><item.icon size={25} aria-hidden="true" /><span className={styles.tabText}><strong>{item.label}</strong><span>{item.teaser}</span></span>{selected === index && <motion.span layoutId="concept-tab" className={styles.tabUnderline} transition={{ type: "spring", bounce: 0, duration: reduced ? 0 : 0.35 }} />}</button>)}
        </div>
        <div id="concept-panel" role="tabpanel" aria-labelledby={`tab-${concept.id}`} tabIndex={0} className={styles.panel}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={concept.id} className={styles.panelInner} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.14 }}>
              <div className={styles.conceptCopy}><span className={styles.index}>{concept.number} / EXPLORING</span><h3>{concept.title}</h3><p>{concept.description}</p><ul>{concept.details.map(detail => <li key={detail}><Plus size={15} />{detail}</li>)}</ul><p className={styles.note}>{concept.note}</p></div>
              <figure className={`${styles.conceptVisual} ${styles[concept.id]}`}>
                <div className={styles.featurePhoto}><Image src={concept.image} alt={concept.imageAlt} fill sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 900px) 45vw, 540px" /><span className={styles.photoLabel}>Concept imagery</span></div>
                <figcaption className={styles.photoCaption}><div className={styles.visualTop}><Icon size={22} aria-hidden="true" /><span>{concept.visualSubtitle}</span></div><h4>{concept.visualTitle}</h4><p>{concept.response}</p><span className={styles.visualDisclaimer}>AI-generated illustration, not an app screenshot</span></figcaption>
              </figure>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className={styles.principles} aria-labelledby="principles-heading">
        <div><span className={styles.eyebrow}>THE THINKING BEHIND THE IDEAS</span><h2 id="principles-heading">More possibility.<br />The same care.</h2></div>
        <div className={styles.principle}><LockKeyhole size={25} /><h3>Choice comes first.</h3><p>Optional experiences and clear permission choices are central to the concepts we're exploring.</p></div>
        <div className={styles.principle}><Layers3 size={25} /><h3>Context, with limits.</h3><p>Everyday observations, with uncertainty acknowledged. No promised outcomes or clinical conclusions.</p></div>
      </section>

      <section className={styles.faq} aria-labelledby="questions-heading"><div><span className={styles.eyebrow}>A FEW THINGS TO KNOW</span><h2 id="questions-heading">Looking ahead,<br />with clarity.</h2><p>Ideas evolve. Here's what this preview means.</p></div><div>{questions.map(([question, answer], index) => <div className={styles.question} key={question}><h3><button aria-expanded={openQuestion === index} aria-controls={`answer-${index}`} onClick={() => setOpenQuestion(openQuestion === index ? null : index)}>{question}{openQuestion === index ? <Minus size={18} /> : <Plus size={18} />}</button></h3><div id={`answer-${index}`} hidden={openQuestion !== index}><p>{answer}</p></div></div>)}</div></section>
      <section className={styles.bottom}><div><h2>Explore MyCalAgent today.</h2><p>Discover the features currently described on our website.</p></div><Link href="/features">Current features <ArrowUpRight size={19} /></Link></section>
      <div className={styles.legal}><p>Concepts are illustrative and may change or not be released. This preview does not amend our terms or create an entitlement to future features. General wellness information only; not medical advice, diagnosis, or treatment.</p><div><Link href="/terms">Terms of Service</Link><Link href="/privacy">Privacy Policy</Link><Link href="/ai-disclaimer">AI Disclaimer</Link></div></div>
    </main>
  );
}
