import { motion, useReducedMotion } from 'framer-motion';
import {
  Award,
  Building2,
  CalendarDays,
  Check,
  ExternalLink,
  MapPin,
} from 'lucide-react';
import { experience } from '../data/experience';
import './Experience.css';

function Experience() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="experience-section" id="experience" aria-labelledby="experience-heading">
      <div className="experience-glow experience-glow--purple" aria-hidden="true" />
      <div className="experience-glow experience-glow--cyan" aria-hidden="true" />

      <div className="experience-container">
        <motion.header
          className="experience-header"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <p className="experience-eyebrow">CAREER JOURNEY</p>
          <h2 className="experience-heading" id="experience-heading">
            Professional <span>Experience</span>
          </h2>
          <p className="experience-description">
            Turning development skills into real-world software.
          </p>
        </motion.header>

        <div className="experience-timeline">
          <motion.div
            className="experience-timeline-rail"
            initial={reduceMotion ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            aria-hidden="true"
          />
          <motion.div
            className="experience-timeline-node"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
            aria-hidden="true"
          />

          <motion.article
            className="experience-card"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.14 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            whileHover={reduceMotion ? undefined : { y: -3 }}
          >
            <div className="experience-card-header">
              <div className="experience-company-mark" aria-hidden="true">
                <Building2 size={25} strokeWidth={1.7} />
              </div>
              <div className="experience-title-block">
                <div className="experience-title-topline">
                  <p className="experience-company">{experience.company}</p>
                  <span className="experience-type">Internship</span>
                </div>
                <h3>{experience.role}</h3>
                <div className="experience-meta">
                  <span><CalendarDays size={15} aria-hidden="true" />{experience.duration}</span>
                  <span><MapPin size={15} aria-hidden="true" />{experience.location}</span>
                </div>
              </div>
            </div>

            <div className="experience-card-divider" />

            <div className="experience-card-content">
              <div className="experience-contributions">
                <h4>Contributions</h4>
                <motion.ul
                  className="experience-responsibilities"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={{
                    hidden: { opacity: 1 },
                    visible: {
                      transition: { staggerChildren: reduceMotion ? 0 : 0.07 },
                    },
                  }}
                >
                  {experience.responsibilities.map((responsibility) => (
                    <motion.li
                      key={responsibility}
                      variants={reduceMotion ? {} : {
                        hidden: { opacity: 0, x: -8 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      transition={{ duration: 0.38 }}
                    >
                      <span className="experience-bullet" aria-hidden="true">
                        <Check size={12} strokeWidth={2.4} />
                      </span>
                      <span>{responsibility}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <div className="experience-project">
                  <div className="experience-project-copy">
                    <span className="experience-project-label">Featured project</span>
                    <span className="experience-project-name">{experience.projectName}</span>
                  </div>
                  <a
                    className="experience-project-link"
                    href={experience.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Explore ${experience.projectName} live project (opens in a new tab)`}
                  >
                    <span>Explore Live Project</span>
                    <ExternalLink size={16} aria-hidden="true" />
                  </a>
                </div>
              </div>

              <aside className="experience-highlights" aria-label="Technologies and recognition">
                <div className="experience-highlight-block">
                  <h4>Technology stack</h4>
                  <ul className="experience-tech-list" aria-label="Internship technologies">
                    {experience.technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                </div>

                <motion.div
                  className="experience-achievement"
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <span className="experience-highlight-icon"><Award size={17} aria-hidden="true" /></span>
                  <div>
                    <h4>Key Achievement</h4>
                    <p>{experience.achievement}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="experience-recognition"
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.18 }}
                >
                  <span className="experience-recognition-icon"><Award size={17} aria-hidden="true" /></span>
                  <div>
                    <span className="experience-recognition-label">Recognition</span>
                    <p>{experience.recognition}</p>
                  </div>
                </motion.div>
              </aside>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

export default Experience;
