import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown,
  ArrowUpRight,
  Atom,
  Coffee,
  Database,
  Download,
  Leaf,
  UserRound,
} from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import resume from '../assets/resume/ADIT_IT_RanaHarshSandipkumar.pdf';
import './hero.css';

const showAvailabilityBadge = true;

function scrollToSection(sectionId, reduceMotion) {
  const section = document.getElementById(sectionId);

  if (!section) {
    return;
  }

  const top = section.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
}

const technologies = [
  { name: 'Java', Icon: Coffee, className: 'hero-tech-card--java' },
  { name: 'Spring Boot', Icon: Leaf, className: 'hero-tech-card--spring' },
  { name: 'React', Icon: Atom, className: 'hero-tech-card--react' },
  { name: 'MySQL', Icon: Database, className: 'hero-tech-card--mysql' },
];

function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-bottom-glow" aria-hidden="true" />

      <div className="hero-container">
        <div className="hero-layout">
          <div className="hero-copy">
            {showAvailabilityBadge && (
              <motion.div
                className="hero-availability"
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="hero-status-dot" aria-hidden="true" />
                <span>Open to Opportunities</span>
              </motion.div>
            )}

            <motion.p
              className="hero-greeting"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              Hi, I&apos;m
            </motion.p>

            <motion.h1
              className="hero-name"
              id="hero-title"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.14 }}
            >
              Harsh Rana
            </motion.h1>

            <motion.div
              className="hero-role"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
            >
              <h2>Java Backend Developer</h2>
              <p className="hero-specialty" aria-label="Java Developer, Spring Boot Developer, REST API Developer, Backend Engineering">
                <span aria-hidden="true">&lt;</span>
                {reduceMotion ? (
                  <span>Java Developer</span>
                ) : (
                  <TypeAnimation
                    sequence={[
                      'Java Developer',
                      1400,
                      'Spring Boot Developer',
                      1400,
                      'REST API Developer',
                      1400,
                      'Backend Engineering',
                      1400,
                    ]}
                    wrapper="span"
                    speed={55}
                    deletionSpeed={65}
                    repeat={Infinity}
                    cursor
                  />
                )}
                <span aria-hidden="true"> /&gt;</span>
              </p>
            </motion.div>

            <motion.p
              className="hero-description"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.32 }}
            >
              I build backend-focused web applications with Java and Spring Boot,
              design REST APIs, and work with databases to solve real-world
              problems through clean, reliable software.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.a
                className="hero-button hero-button--primary"
                href={resume}
                download="Harsh_Rana_Resume.pdf"
                whileHover={reduceMotion ? undefined : { y: -3 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                <Download size={18} aria-hidden="true" />
                <span>Download Resume</span>
              </motion.a>

              <motion.a
                className="hero-button hero-button--secondary"
                href="#projects"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection('projects', reduceMotion);
                }}
                whileHover={reduceMotion ? undefined : { y: -3 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                <span>View Projects</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            className="hero-visual"
            aria-label="Illustration of a Java backend developer with technology cards and a code sample"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.2 }}
          >
            <div className="hero-orbit hero-orbit--outer" aria-hidden="true" />
            <div className="hero-orbit hero-orbit--inner" aria-hidden="true" />
            <div className="hero-portrait-glow" aria-hidden="true" />
            <div className="hero-portrait" aria-hidden="true">
              <div className="hero-portrait-inner">
                <UserRound className="hero-portrait-icon" strokeWidth={1.1} />
                <span>HR</span>
              </div>
            </div>

            <svg className="hero-circuit" viewBox="0 0 560 480" fill="none" aria-hidden="true">
              <path d="M34 115h80l28 28h56" />
              <path d="M526 132h-68l-25 25h-58" />
              <path d="M28 355h82l30-30h45" />
              <path d="M532 347h-77l-26-26h-51" />
              <circle cx="34" cy="115" r="3" />
              <circle cx="526" cy="132" r="3" />
              <circle cx="28" cy="355" r="3" />
              <circle cx="532" cy="347" r="3" />
            </svg>

            <div className="hero-tech-cards" aria-hidden="true">
              {technologies.map(({ name, Icon, className }, index) => (
                <motion.div
                  className={`hero-tech-card ${className}`}
                  key={name}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.42 + index * 0.09 }}
                >
                  <span className="hero-tech-icon">
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                  <span>{name}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="hero-code-panel"
              initial={reduceMotion ? false : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
            >
              <div className="hero-code-header">
                <span className="hero-code-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span>Developer.java</span>
                <span className="hero-code-status">JAVA</span>
              </div>
              <pre aria-label="Java code example"><code>
                <span className="hero-code-muted">@RestController</span>{'\n'}
                <span className="hero-code-keyword">public class</span> Developer {'{'}{'\n'}
                {'  '}String role = <span className="hero-code-string">&quot;Java Backend Developer&quot;</span>;{'\n'}
                {'}'}
              </code></pre>
            </motion.div>
          </motion.div>
        </div>

        <div className="hero-scroll-wrap">
          <motion.a
            className="hero-scroll-link"
            href="#about"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection('about', reduceMotion);
            }}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <span className="hero-scroll-mouse" aria-hidden="true">
              <span />
            </span>
            <span>Explore My Work</span>
            <ArrowDown size={14} aria-hidden="true" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
