import { motion, useReducedMotion } from 'framer-motion';
import {
  Award,
  Building2,
  CalendarDays,
  Code2,
  GraduationCap,
  School,
} from 'lucide-react';
import { portfolioProfile } from '../data/knowladgebase';
import './About.css';

const statistics = [
  { value: '1', label: 'Internship', Icon: Building2 },
  { value: '3', label: 'Major projects', Icon: Code2 },
  { value: '2', label: 'Hackathon participations', Icon: Award },
  { value: '2027', label: 'Graduation year', Icon: CalendarDays },
];

const focusAreas = [
  'Java Backend Development',
  'Spring Boot & REST APIs',
  'Database Design',
  'System Design & Architecture',
];

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

function About() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="about-section" id="about" aria-labelledby="about-heading">
      <div className="about-glow about-glow--left" aria-hidden="true" />
      <div className="about-glow about-glow--right" aria-hidden="true" />

      <div className="about-container">
        <div className="about-layout">
          <div className="about-introduction">
            <motion.div
              initial={reduceMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.18 }}
              variants={reveal}
              transition={{ duration: 0.55 }}
            >
              <p className="about-eyebrow">GET TO KNOW ME</p>
              <h2 className="about-heading" id="about-heading">
                Building software <span>beyond the classroom.</span>
              </h2>
            </motion.div>

            <motion.div
              className="about-biography"
              initial={reduceMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.14 }}
              variants={reveal}
              transition={{ duration: 0.6, delay: 0.08 }}
            >
              <p>
                I&apos;m {portfolioProfile.name}, studying {portfolioProfile.degree} at{' '}
                {portfolioProfile.institute}, {portfolioProfile.university}, graduating in{' '}
                {portfolioProfile.graduationYear}.
              </p>
              <p>
                My journey into software development started after Class 12,
                when I joined a programming vacation batch to explore how
                software works. That initial curiosity grew into building
                full-stack applications, exploring backend architecture, and
                contributing to software used in real business operations.
              </p>
              <p>
                During my internship at Selkey Cybersecurity Pvt. Ltd., I
                contributed to RecoverLab CRM, a production-grade CRM platform,
                working with React, Node.js, Express.js, and PostgreSQL. The
                experience helped me understand how application features, APIs,
                databases, and deployment fit together in a real-world software
                product.
              </p>
              <p>
                Today, my primary focus is Java backend development, especially
                Spring Boot, REST APIs, database design, and enterprise
                applications. I enjoy solving practical problems, learning how
                systems work internally, and turning ideas into reliable
                software.
              </p>
            </motion.div>

            <motion.p
              className="about-goal"
              initial={reduceMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={reveal}
              transition={{ duration: 0.5, delay: 0.12 }}
            >
              <span className="about-goal-label">My goal:</span> {portfolioProfile.careerGoal}
            </motion.p>
          </div>

          <div className="about-details">
            <motion.article
              className="about-education-card"
              initial={reduceMotion ? false : { opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65 }}
              whileHover={reduceMotion ? undefined : { y: -4 }}
            >
              <div className="about-card-topline">
                <span className="about-card-icon"><GraduationCap size={20} /></span>
                <span className="about-card-label">EDUCATION</span>
                <span className="about-card-year">{portfolioProfile.graduationYear}</span>
              </div>

              <div className="about-profile">
                <div className="about-avatar" aria-hidden="true">HR</div>
                <div>
                  <h3>{portfolioProfile.name}</h3>
                  <p>{portfolioProfile.degree}</p>
                </div>
              </div>

              <div className="about-education-divider" />

              <dl className="about-education-details">
                <div>
                  <dt><School size={15} aria-hidden="true" /> Institute</dt>
                  <dd>{portfolioProfile.institute}</dd>
                </div>
                <div>
                  <dt><Building2 size={15} aria-hidden="true" /> University</dt>
                  <dd>{portfolioProfile.university}</dd>
                </div>
                <div className="about-cgpa">
                  <dt><Award size={15} aria-hidden="true" /> CGPA</dt>
                  <dd>{portfolioProfile.cgpa}</dd>
                </div>
              </dl>
            </motion.article>

            <motion.article
              className="about-internship-card"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              whileHover={reduceMotion ? undefined : { y: -3 }}
            >
              <div className="about-internship-heading">
                <span className="about-internship-icon"><Building2 size={17} aria-hidden="true" /></span>
                <div>
                  <h3>Web Development Intern</h3>
                  <p>Selkey Cybersecurity Pvt. Ltd.</p>
                </div>
                <span className="about-internship-date">May 2026 – June 2026</span>
              </div>
              <ul className="about-internship-tech" aria-label="Internship technologies">
                <li>React.js</li>
                <li>Node.js</li>
                <li>Express.js</li>
                <li>PostgreSQL</li>
              </ul>
            </motion.article>

            <motion.div
              className="about-statistics"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: reduceMotion ? 0 : 0.08,
                  },
                },
              }}
            >
              {statistics.map(({ value, label, Icon }) => (
                <motion.article
                  className="about-stat-card"
                  key={label}
                  variants={reveal}
                  transition={{ duration: 0.45 }}
                  whileHover={reduceMotion ? undefined : { y: -3 }}
                >
                  <span className="about-stat-icon"><Icon size={17} aria-hidden="true" /></span>
                  <span className="about-stat-value">{value}</span>
                  <span className="about-stat-label">{label}</span>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          className="about-focus"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
        >
          <div className="about-focus-heading">
            <Code2 size={18} aria-hidden="true" />
            <h3>Career focus</h3>
          </div>
          <ul className="about-focus-list" aria-label="Professional focus areas">
            {focusAreas.map((focus) => (
              <li key={focus}>{focus}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
