import { motion, useReducedMotion } from 'framer-motion';
import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  Clapperboard,
  Code2,
  GitBranch,
  GraduationCap,
  Target,
  Trophy,
} from 'lucide-react';
import { timeline } from '../data/timeline';
import './Timeline.css';

const milestoneIcons = {
  Award,
  BookOpen,
  BriefcaseBusiness,
  Clapperboard,
  Code2,
  GitBranch,
  GraduationCap,
  Target,
  Trophy,
};

function Timeline() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="journey-section" aria-labelledby="journey-heading">
      <div className="journey-glow journey-glow--violet" aria-hidden="true" />
      <div className="journey-glow journey-glow--cyan" aria-hidden="true" />

      <div className="journey-container">
        <motion.header
          className="journey-header"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <p className="journey-eyebrow">THE JOURNEY</p>
          <h2 className="journey-heading" id="journey-heading">
            Every Step Built the Developer <span>I Am Today.</span>
          </h2>
          <p className="journey-introduction">
            From the first steps in programming to learning through projects and industry
            experience, each chapter informs what I am building toward next.
          </p>
        </motion.header>

        <div className="journey-track">
          <motion.div
            className="journey-axis"
            initial={reduceMotion ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ duration: 1.15, ease: 'easeOut' }}
            aria-hidden="true"
          />

          <ol className="journey-list" aria-label="Developer journey milestones">
            {timeline.map((event, index) => {
              const Icon = milestoneIcons[event.icon];
              const side = index % 2 === 0 ? 'left' : 'right';

              return (
                <motion.li
                  className={`journey-item journey-item--${side}${event.status === 'upcoming' ? ' journey-item--upcoming' : ''}`}
                  key={event.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.5, delay: reduceMotion ? 0 : (index % 3) * 0.06 }}
                >
                  <span
                    className={`journey-marker journey-marker--${event.importance}`}
                    aria-hidden="true"
                  >
                    <Icon size={16} strokeWidth={1.8} />
                  </span>

                  <article className="journey-card">
                    <div className="journey-card-topline">
                      <time className="journey-date" dateTime={event.dateTime}>
                        {event.date}
                      </time>
                      <span className={`journey-category${event.status === 'upcoming' ? ' journey-category--upcoming' : ''}`}>
                        {event.category}
                      </span>
                    </div>
                    <h3>{event.title}</h3>
                    <p className="journey-description">{event.description}</p>
                    {event.details && (
                      <ul className="journey-details" aria-label={`${event.title} details`}>
                        {event.details.map((detail) => <li key={detail}>{detail}</li>)}
                      </ul>
                    )}
                  </article>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Timeline;
