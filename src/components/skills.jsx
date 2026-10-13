import { motion, useReducedMotion } from 'framer-motion';
import {
  BrainCircuit,
  Database,
  Monitor,
  ServerCog,
  Wrench,
} from 'lucide-react';
import { currentlyExploring, skillCategories } from '../data/skills';
import './Skills.css';

const categoryIcons = {
  ServerCog,
  Monitor,
  Database,
  Wrench,
  BrainCircuit,
};

function Skills() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="skills-section" id="skills" aria-labelledby="skills-heading">
      <div className="skills-glow skills-glow--purple" aria-hidden="true" />
      <div className="skills-glow skills-glow--cyan" aria-hidden="true" />

      <div className="skills-container">
        <motion.header
          className="skills-header"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <p className="skills-eyebrow">TECHNICAL EXPERTISE</p>
          <h2 className="skills-heading" id="skills-heading">
            Skills <span>&amp; Technologies</span>
          </h2>
          <p className="skills-description">
            Technologies and tools I use to build applications, work with data,
            and develop reliable backend systems.
          </p>
        </motion.header>

        <div className="skills-grid">
          {skillCategories.map(({ title, icon, label, description, featured, skills }, index) => {
            const Icon = categoryIcons[icon];

            return (
              <motion.article
                className={`skills-card${featured ? ' skills-card--featured' : ''}`}
                key={title}
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.08 }}
                transition={{ duration: 0.48, delay: reduceMotion ? 0 : index * 0.07 }}
                whileHover={reduceMotion ? undefined : { y: -4 }}
                aria-labelledby={`skills-${title.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`}
              >
                <div className="skills-card-heading">
                  <span className="skills-category-icon">
                    <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <div className="skills-card-title-wrap">
                    <h3 id={`skills-${title.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`}>
                      {title}
                    </h3>
                    {label && <span className="skills-primary-label">{label}</span>}
                  </div>
                </div>
                <p className="skills-card-description">{description}</p>
                <ul className="skills-chip-list" aria-label={`${title} skills`}>
                  {skills.map((skill) => (
                    <li className="skills-chip" key={skill}>{skill}</li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>

        <motion.aside
          className="skills-exploring"
          initial={reduceMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          aria-labelledby="skills-exploring-heading"
        >
          <div className="skills-exploring-heading">
            <span className="skills-exploring-dot" aria-hidden="true" />
            <h3 id="skills-exploring-heading">Currently Exploring</h3>
          </div>
          <ul className="skills-exploring-list">
            {currentlyExploring.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </motion.aside>
      </div>
    </section>
  );
}

export default Skills;
