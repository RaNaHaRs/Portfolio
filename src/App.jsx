import { Element } from 'react-scroll';
import Navbar from './components/navbar';
import About from './components/about';
import AiAssistance from './components/AiAssistance';
import Contact from './components/contact';
import ContactForm from './components/ContactForm';
import Experience from './components/experience';
import Footer from './components/Footer';
import Hero from './components/hero';
import Projects from './components/projects';
import Skills from './components/skills';
import Timeline from './components/timeline';

function App() {
  return (
    <div className='bg-black text-white min-h-screen'>
      <Navbar />
      <main className="pb-24">
        <Element name="home" id="home"><Hero /></Element>
        <Element name="about"><About /></Element>
        <Element name="skills"><Skills /></Element>
        <Element name="experience"><Experience /></Element>
        <Element name="projects" id="projects"><Projects /></Element>
        <Element name="journey" id="journey"><Timeline /></Element>
        <Element name="contact" id="contact">
          <Contact />
          <ContactForm />
        </Element>
      </main>
      <AiAssistance />
      <Footer />
    </div>
  );
}

export default App
