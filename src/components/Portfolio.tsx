"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  BrainCircuit,
  BriefcaseBusiness,
  Cloud,
  Download,
  Code2,
  Database,
  GraduationCap,
  Network,
  Mail,
  Menu,
  PanelsTopLeft,
  Phone,
  Wrench,
  X,
} from "lucide-react";
import { education, experience, navigation, projects, skillGroups } from "@/data/portfolio";
import ProjectShowcase from "@/components/ProjectShowcase";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const skillIcons = {
  "Programming Languages": Code2,
  "Frontend Development": PanelsTopLeft,
  "Backend Development & APIs": Network,
  "Databases & Backend Platforms": Database,
  "Cloud & Deployment": Cloud,
  "AI & Data Technologies": BrainCircuit,
  "Development Tools & Practices": Wrench,
} as const;

const marqueeTopics = [
  "SOFTWARE DEVELOPMENT",
  "WEB APPLICATIONS",
  "MOBILE APPLICATIONS",
  "FRONTEND DEVELOPMENT",
  "BACKEND SYSTEMS & APIs",
  "DATABASE INTEGRATION",
  "AI-POWERED APPLICATIONS",
  "WEB ACCESSIBILITY",
  "CLOUD DEPLOYMENT",
];

function SectionHeading({ number, title, eyebrow }: { number: string; title: string; eyebrow: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      variants={reveal}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="section-heading"
    >
      <span className="section-number">{number}</span>
      <p>{eyebrow}</p>
      <h2>{title}</h2>
    </motion.div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55%", threshold: [0, 0.2, 0.5] }
    );
    navigation.forEach(({ href }) => {
      const section = document.querySelector(href);
      if (section) observer.observe(section);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header className={`nav-wrap ${scrolled ? "nav-scrolled" : ""}`}>
      <nav className="nav-shell" aria-label="Primary navigation">
        <a className="wordmark" href="#home" aria-label="Mahwish Fatima, back to home">
          <span>MF</span>
          <b>Mahwish<br />Fatima</b>
        </a>
        <div className="desktop-nav">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className={active === item.href.slice(1) ? "active" : ""}>
              {item.label}
            </a>
          ))}
        </div>
        <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>
      <motion.div className="mobile-nav" initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}>
        {navigation.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
        ))}
      </motion.div>
    </header>
  );
}

function Hero() {
  const reducedMotion = useReducedMotion();
  const item = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="home" className="hero section-shell">
      <div className="hero-grid">
        <div className="hero-copy">
          <motion.div initial="hidden" animate="visible" variants={item} transition={{ duration: 0.6, delay: 0.1 }}>
            <p className="availability"><span /> Available for opportunities</p>
          </motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={item} transition={{ duration: 0.75, delay: 0.2 }}>
            Mahwish<br /><em>Fatima</em>
          </motion.h1>
          <motion.p className="hero-role" initial="hidden" animate="visible" variants={item} transition={{ duration: 0.65, delay: 0.32 }}>
            Software Developer
          </motion.p>
          <motion.p className="hero-intro" initial="hidden" animate="visible" variants={item} transition={{ duration: 0.65, delay: 0.42 }}>
            Web applications, mobile apps, and AI-powered products, combining intuitive interfaces with powerful backend systems and practical functionality.
          </motion.p>
          <motion.div className="hero-actions" initial="hidden" animate="visible" variants={item} transition={{ duration: 0.65, delay: 0.52 }}>
            <a className="button button-primary" href="#projects">View my work <ArrowDown size={16} /></a>
            <a className="button button-secondary" href="/Mahwish_Fatima.pdf" download="Mahwish_Fatima.pdf">Download CV <Download size={16} /></a>
            <a className="text-link" href="#contact">Contact me <ArrowUpRight size={16} /></a>
          </motion.div>
        </div>
        <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="hero-portrait-frame">
            <Image
              className="hero-portrait"
              src="/home page.jpeg"
              alt="Mahwish Fatima in a courtyard, wearing a black blazer"
              fill
              sizes="(max-width: 640px) 230px, (max-width: 900px) 260px, 330px"
              preload
            />
          </div>
          <div className="location-card"><span>Based in</span><strong>Karachi, PK</strong></div>
          <div className="stack-card">Web <i /> Mobile <i /> AI</div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroMarquee() {
  return (
    <div className="hero-marquee" aria-hidden="true">
      <div className="hero-marquee-track">
        {[0, 1].map((copy) => (
          <div className="hero-marquee-group" key={copy}>
            {marqueeTopics.map((topic) => (
              <span className="hero-marquee-item" key={topic}>
                <span>{topic}</span>
                <span className="hero-marquee-separator">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="section section-shell">
      <SectionHeading number="01" eyebrow="About" title="How I build software." />
      <div className="about-grid">
        <motion.div className="about-mark" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <Image
            className="about-portrait"
            src="/about page.jpeg"
            alt="Mahwish Fatima standing on a balcony in a cream sweater"
            fill
            sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 900px) 40vw, 35vw"
          />
        </motion.div>
        <motion.div className="about-copy" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={reveal} transition={{ duration: 0.7 }}>
          <p className="lead">I studied Software Engineering at DHA Suffa University and completed my BSc in 2025.</p>
          <p>My development work often extends beyond the interface into application logic, databases, APIs, authentication, integrations, and deployment. The projects have involved practical workflows, including telecom complaints and camera replacements in RCMS, and lost-item reporting and discovery in Foundly.</p>
          <p>Other work has called for a different focus: Dynovex Tech combines a business website with an AI chatbot and an integrated accessibility widget; Dialogix lets users explore datasets with natural-language questions; Accessia is a separate embeddable accessibility widget. Moving between them has reinforced the need to understand the problem before settling on an implementation.</p>
          <p>I start by clarifying what the software needs to accomplish and what its users need from it. I enjoy working across different parts of an application, while keeping the result usable, maintainable, and proportionate to the problem.</p>
        </motion.div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section section-shell">
      <SectionHeading number="02" eyebrow="Experience" title="Where I’ve been building." />
      <div className="timeline">
        {experience.map((item, index) => (
          <motion.article className="timeline-item" key={item.company} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.65, delay: index * 0.12 }}>
            <div className="timeline-meta">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item.period}</p>
              <small>{item.location}</small>
            </div>
            <div className="timeline-content">
              <h3>{item.role}</h3>
              <p className="company"><BriefcaseBusiness size={16} /> {item.company}</p>
              <ul>{item.responsibilities.map((point) => <li key={point}>{point}</li>)}</ul>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section id="projects" className="section section-shell">
      <motion.div
        className="projects-heading"
        initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="projects-heading-meta">
          <span>03</span>
          <p>Selected work</p>
          <i aria-hidden="true" />
          <span>Five case studies</span>
        </div>
        <div className="projects-heading-main">
          <h2>Ideas into<br /><em>interfaces.</em></h2>
          <p>A collection of software projects spanning mobile experiences, web platforms, accessibility and data.</p>
        </div>
      </motion.div>
      <div className="projects-list">
        {projects.map((project, index) => <ProjectShowcase key={project.title} project={project} index={index} />)}
      </div>
    </section>
  );
}

function Skills() {
  const reduceMotion = useReducedMotion() ?? false;
  const gridVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.1 } },
  };
  const groupVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.5, ease: "easeOut" },
    },
  };
  const listVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.045 } },
  };
  const skillVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 7 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.3, ease: "easeOut" },
    },
  };
  return (
    <section id="skills" className="section section-shell">
      <SectionHeading number="04" eyebrow="Capabilities" title="A practical, modern toolkit." />
      <motion.div
        className="skills-intro"
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
      >
        <span>Toolkit / 07 disciplines</span>
        <p>A curated view of the languages, platforms, and workflows represented across my projects.</p>
      </motion.div>
      <motion.div
        className="skills-grid"
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
      >
        {skillGroups.map((group, index) => {
          const CategoryIcon = skillIcons[group.title];
          return (
            <motion.article
              key={group.title}
              className={`skills-group skills-group-${index + 1}`}
              variants={groupVariants}
              whileHover={reduceMotion ? undefined : { y: -3, transition: { duration: 0.3, ease: "easeOut" } }}
            >
              <div className="skills-group-meta">
                <span className="skills-group-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="skills-group-icon" aria-hidden="true"><CategoryIcon size={17} strokeWidth={1.6} /></span>
                <span className="skills-group-count">{String(group.skills.length).padStart(2, "0")} skills</span>
              </div>
              <h3>{group.title}</h3>
              <motion.div
                className="skills-list"
                role="list"
                aria-label={`${group.title} skills`}
                variants={listVariants}
              >
                {group.skills.map((skill) => (
                  <motion.span
                    className="skill-chip"
                    key={skill}
                    role="listitem"
                    variants={skillVariants}
                    whileHover={reduceMotion ? undefined : { y: -3, scale: 1.04 }}
                    transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}

function Education() {
  const reduceMotion = useReducedMotion() ?? false;
  const [featuredEducation, ...supportingEducation] = education;
  const featuredVariants: Variants = {
    hidden: { opacity: 0, x: reduceMotion ? 0 : -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: reduceMotion ? 0 : 0.6, ease: "easeOut" },
    },
  };
  const timelineVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.12 } },
  };
  const timelineItemVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.45, ease: "easeOut" },
    },
  };

  return (
    <section id="education" className="section section-shell">
      <SectionHeading number="05" eyebrow="Education" title="The foundation behind the work." />
      <div className="education-showcase">
        <motion.article
          className="education-feature"
          variants={featuredVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="education-feature-meta">
            <span>01</span>
            <i aria-hidden="true" />
            <span>Featured qualification</span>
          </div>
          <div className="education-feature-main">
            <span className="education-feature-icon" aria-hidden="true">
              <GraduationCap size={24} strokeWidth={1.5} />
            </span>
            <div className="education-feature-copy">
              <p>Bachelor&apos;s degree</p>
              <h3>{featuredEducation.degree}</h3>
              <span>{featuredEducation.school}</span>
            </div>
          </div>
          <div className="education-feature-period">
            <span>Period</span>
            <time>{featuredEducation.period}</time>
          </div>
        </motion.article>
        <div className="education-timeline">
          <div className="education-timeline-heading">
            <span>Earlier education</span>
            <i aria-hidden="true" />
          </div>
          <motion.div
            className="education-timeline-list"
            variants={timelineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            {supportingEducation.map((item, index) => (
              <motion.article
                className="education-timeline-item"
                key={item.school}
                variants={timelineItemVariants}
              >
                <span className="education-timeline-marker" aria-hidden="true">
                  {String(index + 2).padStart(2, "0")}
                </span>
                <div className="education-timeline-copy">
                  <h3>{item.degree}</h3>
                  <p>{item.school}</p>
                </div>
                <time>{item.period}</time>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const subject = encodeURIComponent(String(data.get("subject") || "Portfolio enquiry"));
    const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`);
    setStatus("Opening your email application...");
    window.location.href = `mailto:mahwishfatima880@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="contact section-shell">
      <SectionHeading number="06" eyebrow="Contact" title="Have a project in mind?" />
      <div className="contact-grid">
        <motion.div className="contact-copy" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
          <p>Let&apos;s discuss opportunities, collaborations, or a product you&apos;d like to bring to life.</p>
          <a href="mailto:mahwishfatima880@gmail.com"><Mail size={17} /> mahwishfatima880@gmail.com</a>
          <a href="tel:+923283591747"><Phone size={17} /> +92 328 3591747</a>
          <p className="location">Karachi, Pakistan</p>
          <div className="social-links">
            <span title="LinkedIn profile placeholder"><Network size={18} /> LinkedIn <small>soon</small></span>
            <span title="GitHub profile placeholder"><Code2 size={18} /> GitHub <small>soon</small></span>
          </div>
        </motion.div>
        <motion.form className="contact-form" onSubmit={submit} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1 }}>
          <label>Name<input name="name" type="text" placeholder="Your name" required /></label>
          <label>Email<input name="email" type="email" placeholder="you@example.com" required /></label>
          <label>Subject<input name="subject" type="text" placeholder="Project or opportunity" required /></label>
          <label>Message<textarea name="message" rows={5} placeholder="Tell me about it..." required /></label>
          <button className="button button-primary" type="submit">Send message <ArrowUpRight size={16} /></button>
          <p className="form-status" role="status">{status}</p>
        </motion.form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <a className="wordmark" href="#home"><span>MF</span><b>Mahwish<br />Fatima</b></a>
        <div className="footer-nav">{navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</div>
        <button type="button" className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"><ArrowUp size={18} /></button>
      </div>
      <div className="copyright">© 2026 Mahwish Fatima. All rights reserved.</div>
    </footer>
  );
}

export default function Portfolio() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HeroMarquee />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
