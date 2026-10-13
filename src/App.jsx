import { Element } from 'react-scroll';
import Navbar from './components/Navbar';
import About from './components/About';
import AiAssistance from './components/AiAssistance';
import Contact from './components/Contact';
import ContactForm from './components/ContactForm';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Hero from './components/hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Timeline from './components/Timeline';

function App() {
  return (
    <div className='bg-black text-white min-h-screen'>
      <Navbar />
      <main>
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
