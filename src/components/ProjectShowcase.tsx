"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import { ChevronDown, ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import type { Project } from "@/data/portfolio";

function ProjectPlaceholder({ project }: { project: Project }) {
  if (project.visual === "mobile") {
    return (
      <div className="phone-placeholder" aria-hidden="true">
        <div className="phone-placeholder-heading"><i /><span /><i /></div>
        <div className="phone-placeholder-map"><i /><i /><i /></div>
        <div className="phone-placeholder-card"><i /><span /><span /></div>
        <div className="phone-placeholder-card phone-placeholder-card-short"><i /><span /></div>
        <div className="phone-placeholder-nav"><i /><i /><i /><i /></div>
      </div>
    );
  }

  return (
    <div className={`dashboard-placeholder placeholder-${project.visual}`} aria-hidden="true">
      <aside className="dashboard-placeholder-sidebar">
        <i className="dashboard-placeholder-brand" />
        <i /><i /><i /><i /><i />
      </aside>
      <div className="dashboard-placeholder-content">
        <div className="dashboard-placeholder-header"><i /><span /><i /></div>
        <div className="dashboard-placeholder-title"><i /><span /></div>
        <div className="dashboard-placeholder-stats"><i /><i /><i /></div>
        {project.visual === "dashboard" ? (
          <div className="dashboard-placeholder-panels">
            <div className="dashboard-placeholder-chart"><i /><span /></div>
            <div className="dashboard-placeholder-chat"><i /><span /><span /><span /></div>
          </div>
        ) : (
          <div className="dashboard-placeholder-table">
            <i /><i /><i /><i /><i /><i />
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectVideoModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "Tab") {
        const focusable = document.querySelectorAll<HTMLElement>(
          ".project-video-modal button, .project-video-modal iframe"
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [onClose]);

  if (!project.youtubeId) return null;

  return (
    <motion.div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-video-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.22 }}
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <motion.div
        className={`modal project-video-modal ${project.videoAspect === "portrait" ? "project-video-modal-portrait" : "project-video-modal-landscape"}`}
        initial={{ y: reduceMotion ? 0 : 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: reduceMotion ? 0 : 12, opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="modal-header">
          <p id="project-video-title">{project.title} / Demonstration</p>
          <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Close video">
            <X size={20} />
          </button>
        </div>
        <div className={`project-video-player project-video-player-${project.videoAspect ?? "landscape"}`}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(project.youtubeId)}?autoplay=1&playsinline=1&rel=0`}
            title={`${project.title} demonstration`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectShowcase({ project, index }: { project: Project; index: number }) {
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;
  const screenshot = project.screenshots[activeScreenshot];
  const [detailsOpen, setDetailsOpen] = useState(false);
  const detailsId = `project-details-${index + 1}`;
  const closeVideo = useCallback(() => setVideoOpen(false), []);
  const revealVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 26 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.72, ease: [0.22, 1, 0.36, 1] },
    },
  };
  const contentVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.075, delayChildren: reduceMotion ? 0 : 0.06 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 13 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.article
      className={`project-row project-${project.accent}`}
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
    >
      <motion.div className="project-info" variants={contentVariants}>
        <motion.div className="project-index-row" variants={itemVariants}>
          <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
          <span className="project-index-rule" aria-hidden="true" />
          <span className="project-index-label">Project / Case study</span>
        </motion.div>
        <motion.h3 variants={itemVariants}>{project.title}</motion.h3>
        <motion.p className="project-category" variants={itemVariants}>{project.category}</motion.p>
        <motion.p className="project-description" variants={itemVariants}>{project.summary}</motion.p>
        <motion.p className="project-content-label" variants={itemVariants}>Key highlights</motion.p>
        <motion.ul className="project-features project-highlights" variants={contentVariants}>
          {project.highlights.map((highlight) => <motion.li key={highlight} variants={itemVariants}>{highlight}</motion.li>)}
        </motion.ul>
        <motion.div className="tags project-primary-tags" variants={contentVariants} role="list" aria-label={`${project.title} primary technologies`}>
          {project.technologiesAndFrameworks.slice(0, 5).map((technology) => (
            <motion.span key={technology} variants={itemVariants} role="listitem">{technology}</motion.span>
          ))}
        </motion.div>
        <motion.button
          className="project-details-toggle"
          type="button"
          variants={itemVariants}
          aria-expanded={detailsOpen}
          aria-controls={detailsId}
          onClick={() => setDetailsOpen((open) => !open)}
        >
          <span>{detailsOpen ? "Hide project details" : "View project details"}</span>
          <ChevronDown size={15} aria-hidden="true" />
        </motion.button>
        <motion.div
          id={detailsId}
          className="project-details"
          role="region"
          aria-labelledby={`${detailsId}-heading`}
          aria-hidden={!detailsOpen}
          initial={false}
          animate={{ height: detailsOpen ? "auto" : 0, opacity: detailsOpen ? 1 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: "hidden" }}
        >
          <div className="project-details-inner">
            <h4 id={`${detailsId}-heading`} className="project-content-label">Full project description</h4>
            <p className="project-details-description">{project.description}</p>
            <p className="project-content-label">Complete feature list</p>
            <ul className="project-features">
              {project.features.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
            <div className="project-contribution">
              <span>My contribution</span>
              <p>{project.contribution}</p>
            </div>
            <div className="project-stacks">
              <div className="project-stack-group">
                <p className="project-content-label">Programming Languages</p>
                <div className="tags" role="list" aria-label={`${project.title} programming languages`}>
                  {project.programmingLanguages.map((language) => <span key={language} role="listitem">{language}</span>)}
                </div>
              </div>
              <div className="project-stack-group">
                <p className="project-content-label">Technologies &amp; Frameworks</p>
                <div className="tags" role="list" aria-label={`${project.title} technologies and frameworks`}>
                  {project.technologiesAndFrameworks.map((technology) => <span key={technology} role="listitem">{technology}</span>)}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        {(project.liveUrl || project.githubUrl) && (
          <motion.div className="project-links" variants={itemVariants}>
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">View live project</a>}
            {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>}
          </motion.div>
        )}
      </motion.div>

      <div className={`project-preview project-visual-${project.visual}`}>
        <div className="project-preview-orbit" aria-hidden="true" />
        <div className="project-preview-stage">
          {project.youtubeId ? (
            <button
              className={`project-video-preview ${project.videoAspect === "portrait" ? "project-video-preview-portrait" : "project-video-preview-landscape"}`}
              type="button"
              onClick={() => setVideoOpen(true)}
              aria-label={`Play ${project.title} demonstration`}
            >
              <Image
                src={`https://i.ytimg.com/vi/${encodeURIComponent(project.youtubeId)}/hqdefault.jpg`}
                alt=""
                fill
                sizes={project.videoAspect === "portrait" ? "(max-width: 640px) 190px, 260px" : "(max-width: 760px) 90vw, 55vw"}
                unoptimized
              />
              <span className="video-play-overlay" aria-hidden="true">
                <Play size={22} fill="currentColor" />
              </span>
              <span className="video-preview-label" aria-hidden="true">Play demo</span>
            </button>
          ) : project.visual === "mobile" ? (
            <div className="phone-pair">
              <div className="project-phone project-phone-back" aria-hidden="true">
                <div className="project-phone-screen"><ProjectPlaceholder project={project} /></div>
              </div>
              <div className="project-phone project-phone-front">
                <div className="project-phone-screen">
                  {screenshot ? (
                    <Image
                      className="project-screenshot"
                      src={screenshot.src}
                      alt={screenshot.alt}
                      fill
                      sizes="(max-width: 640px) 155px, 190px"
                      style={{ objectFit: screenshot.fit ?? "cover" }}
                      unoptimized
                    />
                  ) : (
                    <ProjectPlaceholder project={project} />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="project-browser">
              <div className="project-browser-toolbar" aria-hidden="true">
                <span /><span /><span />
                <div>Project preview</div>
              </div>
              <div className="project-browser-screen">
                {screenshot ? (
                  <Image
                    className="project-screenshot"
                    src={screenshot.src}
                    alt={screenshot.alt}
                    fill
                    sizes="(max-width: 760px) 100vw, 55vw"
                    style={{ objectFit: screenshot.fit ?? "cover" }}
                    unoptimized
                  />
                ) : (
                  <ProjectPlaceholder project={project} />
                )}
              </div>
            </div>
          )}
        </div>
        <div className="project-preview-footer">
          <p className="project-preview-caption" aria-live="polite">
            {project.youtubeId
              ? "Project demo · select to play"
              : screenshot
                ? screenshot.caption
                : "Interface concept"}
          </p>
          <span aria-hidden="true">MF / WORKS</span>
        </div>
        {project.screenshots.length > 1 && (
          <div className="screenshot-controls" role="group" aria-label={`${project.title} screenshots`}>
            <button
              type="button"
              onClick={() => setActiveScreenshot((activeScreenshot - 1 + project.screenshots.length) % project.screenshots.length)}
              aria-label="Show previous screenshot"
            >
              <ChevronLeft size={17} />
            </button>
            <div className="screenshot-dots">
              {project.screenshots.map((item, screenshotIndex) => (
                <button
                  key={`${screenshotIndex}-${item.src}`}
                  type="button"
                  className={activeScreenshot === screenshotIndex ? "active" : ""}
                  onClick={() => setActiveScreenshot(screenshotIndex)}
                  aria-label={`Show screenshot ${screenshotIndex + 1}: ${item.caption}`}
                  aria-pressed={activeScreenshot === screenshotIndex}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setActiveScreenshot((activeScreenshot + 1) % project.screenshots.length)}
              aria-label="Show next screenshot"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {videoOpen && project.youtubeId && (
          <ProjectVideoModal project={project} onClose={closeVideo} />
        )}
      </AnimatePresence>
    </motion.article>
  );
}
