import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, BriefcaseBusiness, CodeXml, FileDown, Mail } from 'lucide-react';
import resume from '../assets/resume/ADIT_IT_RanaHarshSandipkumar.pdf';
import { publicContact } from '../data/knowladgebase';
import './Contact.css';

const contactMethods = [
  {
    id: 'email',
    label: 'Email',
    value: publicContact.email,
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(publicContact.email)}`,
    description: 'Open a new message in Gmail.',
    Icon: Mail,
    external: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'Connect professionally',
    href: publicContact.linkedinUrl,
    description: 'Visit my LinkedIn profile.',
    Icon: BriefcaseBusiness,
    external: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'Explore my code',
    href: publicContact.githubUrl,
    description: 'Visit my GitHub profile.',
    Icon: CodeXml,
    external: true,
  },
  {
    id: 'resume',
    label: 'Resume',
    value: 'Download my resume',
    href: resume,
    description: 'Get a copy of my resume.',
    Icon: FileDown,
    download: true,
  },
];

function Contact() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="contact-section" aria-labelledby="contact-heading">
      <div className="contact-glow contact-glow--purple" aria-hidden="true" />
      <div className="contact-glow contact-glow--cyan" aria-hidden="true" />

      <div className="contact-container">
        <motion.header
          className="contact-header"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <p className="contact-eyebrow">LET&apos;S CONNECT</p>
          <h2 className="contact-heading" id="contact-heading">
            Have a Project or <span>Opportunity in Mind?</span>
          </h2>
          <p className="contact-introduction">
            Whether you have a development opportunity, a project idea, or simply want to
            connect, I&apos;d be happy to hear from you.
          </p>
        </motion.header>

        <motion.div
          className="contact-methods"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: reduceMotion ? 0 : 0.07 },
            },
          }}
        >
          {contactMethods.map(({ id, label, value, href, description, Icon, external, download }) => (
            <motion.a
              className="contact-method"
              key={id}
              href={href}
              target={external || download ? '_blank' : undefined}
              rel={external || download ? 'noopener noreferrer' : undefined}
              download={download ? true : undefined}
              aria-label={`${label}: ${value}${external || download ? ' (opens in a new tab)' : ''}`}
              variants={reduceMotion ? {} : {
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.42 }}
              whileHover={reduceMotion ? undefined : { y: -3 }}
            >
              <span className="contact-method-icon">
                <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span className="contact-method-copy">
                <span className="contact-method-label">{label}</span>
                <span className="contact-method-value">{value}</span>
                <span className="contact-method-description">{description}</span>
              </span>
              <ArrowUpRight className="contact-method-arrow" size={16} aria-hidden="true" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
