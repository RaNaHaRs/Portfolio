import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Bot, CornerDownLeft, ExternalLink, MessageCircle, Send, X } from 'lucide-react';
import resume from '../assets/resume/ADIT_IT_RanaHarshSandipkumar.pdf';
import useChatbot from '../hooks/useChatbot';
import './AiAssistance.css';

const quickQuestions = [
  { label: 'View Skills', question: 'What technologies does Harsh work with?' },
  { label: 'Explore Projects', question: 'What projects has Harsh built?' },
  { label: 'Internship Experience', question: "Tell me about Harsh's internship." },
  { label: 'Education', question: "What is Harsh's educational background?" },
];

function Message({ message }) {
  return (
    <article className={`assistant-message assistant-message--${message.role}`}>
      {message.role === 'assistant' && (
        <span className="assistant-message-avatar" aria-hidden="true">
          <Bot size={15} />
        </span>
      )}
      <div className="assistant-message-content">
        <div className="assistant-message-bubble">
          {message.text.split('\n\n').map((paragraph, index) => (
            <p key={`${message.id ?? message.role}-${index}`}>{paragraph}</p>
          ))}
          {message.links?.length > 0 && (
            <div className="assistant-message-links">
              {message.links.map(({ label, href }) => (
                <a key={`${label}-${href}`} href={href} target="_blank" rel="noopener noreferrer">
                  {label}
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function AiAssistance() {
  const {
    messages,
    input,
    setInput,
    isOpen,
    setIsOpen,
    submitMessage,
  } = useChatbot();
  const reduceMotion = useReducedMotion();
  const conversationEnd = useRef(null);

  useEffect(() => {
    if (isOpen) conversationEnd.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [isOpen, messages, reduceMotion]);

  const handleSubmit = (event) => {
    event.preventDefault();
    submitMessage();
  };

  const handleComposerKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      submitMessage();
    }
  };

  return (
    <div className={`assistant-dock${isOpen ? ' assistant-dock--open' : ''}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.section
            className="assistant-panel"
            role="dialog"
            aria-label="Portfolio Assistant conversation"
            initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          >
            <header className="assistant-panel-header">
              <span className="assistant-panel-icon" aria-hidden="true"><Bot size={19} /></span>
              <div className="assistant-panel-heading">
                <h2>Portfolio Assistant</h2>
                <p>Answers based only on information in this portfolio.</p>
              </div>
              <button
                className="assistant-icon-button"
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close Portfolio Assistant"
              >
                <X size={18} />
              </button>
            </header>

            <div className="assistant-conversation" aria-live="polite" aria-relevant="additions">
              {messages.map((message, index) => (
                <Message key={message.id ?? `welcome-${index}`} message={message} />
              ))}

              {messages.length === 1 && (
                <div className="assistant-quick-actions" aria-label="Suggested questions">
                  {quickQuestions.map(({ label, question }) => (
                    <button key={label} type="button" onClick={() => submitMessage(question)}>
                      {label}
                    </button>
                  ))}
                  <a href={resume} download>
                    Download Resume
                    <ExternalLink size={12} aria-hidden="true" />
                  </a>
                </div>
              )}
              <div ref={conversationEnd} />
            </div>

            <form className="assistant-composer" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="assistant-question">Ask about Harsh&apos;s portfolio</label>
              <textarea
                id="assistant-question"
                rows="1"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleComposerKeyDown}
                placeholder="Ask about Harsh's skills, projects, or experience..."
                maxLength={500}
              />
              <span className="assistant-composer-hint" aria-hidden="true">
                <CornerDownLeft size={12} /> Enter to send
              </span>
              <button
                className="assistant-send-button"
                type="submit"
                aria-label="Send message"
                disabled={!input.trim()}
              >
                <Send size={16} />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <div className="assistant-dock-bar">
        {!isOpen ? (
          <button
            className="assistant-dock-mark assistant-dock-open"
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open Portfolio Assistant"
          >
            <MessageCircle size={18} aria-hidden="true" />
          </button>
        ) : (
          <span className="assistant-dock-mark" aria-hidden="true"><MessageCircle size={18} /></span>
        )}
        {!isOpen ? (
          <form className="assistant-entry-form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="assistant-entry">Ask about Harsh&apos;s portfolio</label>
            <input
              id="assistant-entry"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask me about Harsh's skills, projects, or experience..."
              maxLength={500}
            />
            <button
              className="assistant-send-button"
              type="submit"
              aria-label="Send question to Portfolio Assistant"
              disabled={!input.trim()}
            >
              <Send size={16} />
            </button>
          </form>
        ) : (
          <span className="assistant-dock-title">Portfolio Assistant</span>
        )}
      </div>
    </div>
  );
}

export default AiAssistance;
