import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Code2, LayoutDashboard, Film, House } from 'lucide-react';
import { projects } from '../data/projects';
import './Projects.css';

function ProjectVisual({ variant }) {
  if (variant === 'crm') {
    return (
      <div className="project-visual project-visual--crm" aria-hidden="true">
        <div className="crm-window">
          <div className="crm-window-bar"><span /><span /><span /></div>
          <div className="crm-dashboard">
            <div className="crm-sidebar"><i /><i /><i /><i /></div>
            <div className="crm-content">
              <div className="crm-title-line" />
              <div className="crm-stats">
                <span /><span /><span />
              </div>
              <div className="crm-chart">
                <i /><i /><i /><i /><i /><i /><i />
              </div>
              <div className="crm-table-lines"><i /><i /><i /></div>
            </div>
          </div>
        </div>
        <span className="project-visual-mark"><LayoutDashboard size={16} /></span>
        <span className="project-visual-caption">OPERATIONS / OVERVIEW</span>
      </div>
    );
  }

  if (variant === 'rentify') {
    return (
      <div className="project-visual project-visual--rentify" aria-hidden="true">
        <div className="rentify-sun" />
        <div className="rentify-building rentify-building--back"><i /><i /><i /><i /></div>
        <div className="rentify-building rentify-building--front"><i /><i /><i /><i /><i /><i /></div>
        <div className="rentify-ground" />
        <span className="project-visual-mark"><House size={17} /></span>
        <span className="project-visual-caption">FIND A PLACE TO CALL HOME</span>
      </div>
    );
  }

  return (
    <div className="project-visual project-visual--movies" aria-hidden="true">
      <div className="movie-orbit movie-orbit--outer" />
      <div className="movie-orbit movie-orbit--inner" />
      <div className="movie-poster movie-poster--one"><i /></div>
      <div className="movie-poster movie-poster--two"><i /></div>
      <div className="movie-poster movie-poster--three"><i /></div>
      <span className="project-visual-mark"><Film size={17} /></span>
      <span className="project-visual-caption">DISCOVER YOUR NEXT FILM</span>
    </div>
  );
}

function Projects() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="projects-section" aria-labelledby="projects-heading">
      <div className="projects-glow projects-glow--purple" aria-hidden="true" />
      <div className="projects-glow projects-glow--blue" aria-hidden="true" />

      <div className="projects-container">
        <motion.header
          className="projects-header"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <p className="projects-eyebrow">SELECTED WORK</p>
          <h2 className="projects-heading" id="projects-heading">
            Projects That Turn Ideas <span>Into Reality.</span>
          </h2>
          <p className="projects-description">
            From production software to personal experiments, here's a look at what I've built,
            the technologies I've explored, and the problems I've worked to solve.
          </p>
        </motion.header>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.article
              className="project-card"
              key={project.id}
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.08 }}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              aria-labelledby={`project-${project.id}-title`}
            >
              <ProjectVisual variant={project.visual} />

              <div className="project-card-content">
                <div className="project-card-title-row">
                  <div>
                    <p className="project-category">{project.category}</p>
                    <h3 id={`project-${project.id}-title`}>{project.title}</h3>
                  </div>
                  {project.typeNote && <span className="project-type-note">{project.typeNote}</span>}
                </div>

                <p className="project-description">{project.description}</p>

                <ul className="project-tech-list" aria-label={`${project.title} technologies`}>
                  {project.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>

                <ul className="project-highlights" aria-label={`${project.title} highlights`}>
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>

                <div className="project-actions">
                  {project.githubUrl && (
                    <a
                      className="project-action project-action--secondary"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title}: GitHub Repository (opens in a new tab)`}
                    >
                      <Code2 size={16} aria-hidden="true" />
                      <span>GitHub Repository</span>
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      className="project-action project-action--primary"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title}: Live Demo (opens in a new tab)`}
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
