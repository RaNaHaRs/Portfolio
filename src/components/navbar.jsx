import { Link as ScrollLink } from 'react-scroll';
import resume from '../assets/resume/ADIT_IT_RanaHarshSandipkumar.pdf';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md border-b border-green-500/20 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap justify-between items-center gap-y-2">
        <div className="shrink-0 text-green-500 font-bold text-xl">
          <ScrollLink to="home" smooth duration={500} offset={-80}>Harsh Rana</ScrollLink>
        </div>

        <ul className="flex w-full flex-wrap justify-start gap-x-4 gap-y-2 text-xs sm:text-sm lg:w-auto lg:justify-end lg:gap-6">
          <li><ScrollLink to="home" smooth duration={500} offset={-80} spy activeClass="text-green-500">Home</ScrollLink></li>
          <li><ScrollLink to="about" smooth duration={500} offset={-80} spy activeClass="text-green-500">About</ScrollLink></li>
          <li><ScrollLink to="skills" smooth duration={500} offset={-80} spy activeClass="text-green-500">Skills</ScrollLink></li>
          <li>
            <a
              href="#experience"
              onClick={(event) => {
                event.preventDefault();
                const section = document.getElementById('experience');

                if (section) {
                  const top = section.getBoundingClientRect().top + window.scrollY - 80;
                  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                  window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
                }
              }}
            >
              Experience
            </a>
          </li>
          <li><ScrollLink to="projects" smooth duration={500} offset={-80} spy activeClass="text-green-500">Projects</ScrollLink></li>
          <li>
            <a
              href="#journey"
              className="rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
              onClick={(event) => {
                event.preventDefault();
                const section = document.getElementById('journey');

                if (section) {
                  const top = section.getBoundingClientRect().top + window.scrollY - 80;
                  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                  window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
                }
              }}
            >
              Journey
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
              onClick={(event) => {
                event.preventDefault();
                const section = document.getElementById('contact');

                if (section) {
                  const top = section.getBoundingClientRect().top + window.scrollY - 80;
                  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                  window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
                }
              }}
            >
              Contact
            </a>
          </li>
          <li><a href={resume} download>Resume</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;