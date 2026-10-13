import { useCallback, useRef, useState } from 'react';
import { answerPortfolioQuestion } from '../utils/portfolioAssistant';

const welcomeMessage = {
  role: 'assistant',
  text: "Hi! I'm Harsh's Portfolio Assistant. Ask me about his background, skills, projects, experience, or career journey. I answer using information documented in this portfolio.",
};

export default function useChatbot() {
  const [messages, setMessages] = useState([welcomeMessage]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const submissionLock = useRef(false);
  const messageSequence = useRef(0);

  const submitMessage = useCallback((message = input) => {
    const question = message.trim();
    if (!question || submissionLock.current) return;

    submissionLock.current = true;
    messageSequence.current += 1;
    const userMessage = {
      id: `user-${messageSequence.current}`,
      role: 'user',
      text: question,
    };
    const answer = answerPortfolioQuestion(question);
    messageSequence.current += 1;
    const assistantMessage = {
      id: `assistant-${messageSequence.current}`,
      role: 'assistant',
      ...answer,
    };

    setMessages((current) => [...current, userMessage, assistantMessage]);
    setInput('');
    setIsOpen(true);
    submissionLock.current = false;
  }, [input]);

  return {
    messages,
    input,
    setInput,
    isOpen,
    setIsOpen,
    submitMessage,
  };
}
