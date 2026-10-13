import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { LoaderCircle, Send } from 'lucide-react';
import './ContactForm.css';

const submissionEndpoint = 'https://api.web3forms.com/submit';
const successMessage = "Thanks for reaching out! Your message has been sent successfully.";
const configurationMessage =
  "The contact form isn't configured yet. Please use the email link above to get in touch.";
const unavailableMessage =
  "Your message couldn't be sent right now. Please try again or contact me using the email link above.";

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const submissionLock = useRef(false);
  const reduceMotion = useReducedMotion();
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim();

  async function handleSubmit(event) {
    event.preventDefault();
    if (submissionLock.current) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const subject = String(formData.get('subject') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();

    if (!name || !email || !subject || !message) {
      setStatus({
        type: 'error',
        message: 'Please complete all fields. The message cannot be blank.',
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    if (!accessKey) {
      setStatus({ type: 'error', message: configurationMessage });
      return;
    }

    submissionLock.current = true;
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch(submissionEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email,
          subject,
          message,
          ...(formData.get('botcheck') ? { botcheck: true } : {}),
        }),
      });

      const result = await response.json();
      if (!response.ok || result.success !== true) {
        throw new Error('Web3Forms submission was not successful.');
      }

      form.reset();
      setStatus({ type: 'success', message: successMessage });
    } catch {
      setStatus({ type: 'error', message: unavailableMessage });
    } finally {
      submissionLock.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <section className="contact-form-section" aria-labelledby="contact-form-heading">
      <div className="contact-container">
        <motion.div
          className="contact-form-panel"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.55 }}
        >
          <div className="contact-form-heading">
            <p className="contact-form-kicker">SEND A MESSAGE</p>
            <h2 id="contact-form-heading">Let&apos;s start a conversation.</h2>
            <p>Share a little about what you have in mind, and I&apos;ll get back to you.</p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="hidden" name="access_key" value={accessKey ?? ''} />
            <input
              className="contact-form-honeypot"
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              aria-hidden="true"
            />

            <div className="contact-form-fields">
              <div className="contact-field">
                <label htmlFor="contact-name">Full Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  maxLength={100}
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-email">Email Address</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  maxLength={254}
                  required
                />
              </div>

              <div className="contact-field contact-field--full">
                <label htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder="What would you like to discuss?"
                  maxLength={160}
                  required
                />
              </div>

              <div className="contact-field contact-field--full">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell me a little about your project or opportunity..."
                  rows={5}
                  maxLength={5000}
                  required
                />
              </div>
            </div>

            <div className="contact-form-footer">
              <p className="contact-form-privacy">
                Your details are used only to respond to your message.
              </p>
              <button className="contact-submit" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="contact-submit-spinner" size={17} aria-hidden="true" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={16} aria-hidden="true" />
                  </>
                )}
              </button>
            </div>

            <p
              className={`contact-form-status${status ? ` contact-form-status--${status.type}` : ''}`}
              role={status?.type === 'error' ? 'alert' : 'status'}
              aria-live={status?.type === 'error' ? 'assertive' : 'polite'}
              aria-atomic="true"
            >
              {status?.message ?? ''}
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export default ContactForm;
