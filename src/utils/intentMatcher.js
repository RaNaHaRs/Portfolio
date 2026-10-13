import { experience } from '../data/experience';
import { projects } from '../data/projects';
import { skillCategories } from '../data/skills';

const OUT_OF_SCOPE_RESPONSE =
  "I'm Harsh's Portfolio Assistant. I can help you explore Harsh Rana's background, technical skills, projects, professional experience, achievements, and career journey using information from his portfolio. I'm not designed to generate code, solve programming problems, or answer general questions. Feel free to ask me something about Harsh or his work!";

const UNKNOWN_INFORMATION_RESPONSE =
  "I don't have that specific information in Harsh's portfolio knowledge base yet. You can explore his listed projects and experience, or contact him directly for further details.";

const CLARIFICATION_RESPONSE =
  "Could you clarify what you'd like to know about Harsh, his work, or his portfolio?";

const instructionOverridePattern =
  /\b(?:ignore|forget|disregard|override)\b.{0,70}\b(?:instructions?|rules?|scope|knowledge base|previous)\b|\b(?:pretend|act)\s+(?:that\s+)?(?:you(?:'re| are)|as)\b|\b(?:reveal|show|print|share)\b.{0,50}\b(?:(?:hidden|system|developer)\s+(?:prompt|instructions?|message)|hidden instructions?)\b|\banswer\s+everything\s+from\s+now\s+on\b|\b(?:use|rely on)\b.{0,40}\b(?:general knowledge|outside (?:your )?scope|external knowledge)\b/i;

const explicitTaskPattern =
  /^\s*(?:write|generate|create|debug|fix|solve|teach|implement)\b.{0,140}\b(?:code|program|application|app|website|resume|cv|email|sql|query|poem|essay|problem|bug|tutorial|example)\b/i;

const requestForSolutionPattern =
  /^\s*(?:give me|provide|show me)\b.{0,100}\b(?:code|solution|program|answer|query)\b/i;

const generalHelpPattern =
  /^\s*(?:explain|teach me|show me how to|how do i|how can i)\b/i;

const genericProgrammingHelpPattern =
  /^\s*(?:help me|can you help|i need help)\b.{0,100}\b(?:coding|programming|java|python|javascript|sql|spring boot|react)\b/i;

const unrelatedQuestionPattern =
  /\b(?:weather|capital of|who won|yesterday'?s (?:match|game)|best (?:laptop|phone|restaurant)|write (?:me )?a poem|another developer|someone else)\b/i;

const generalTechnologyQuestionPattern =
  /^\s*(?:what is|what are|what does|how does|define|explain|teach me about|why use|difference between)\b/i;

const portfolioTopicPattern =
  /\b(?:background|education|academic|student|degree|college|university|cgpa|skills?|technologies|tech stack|experience|internship|projects?|built|contributed|career|goal|focus|learning|github|linkedin|resume|contact|certifications?|achievements?|hackathons?|portfolio|work)\b/i;

const portfolioSubjectPattern =
  /\b(?:harsh|rana|his|him|he|harsh'?s|this portfolio|my portfolio|this developer)\b/i;

const portfolioTechnologies = [
  ...skillCategories.flatMap(({ skills }) => skills),
  ...projects.flatMap(({ technologies }) => technologies),
  ...experience.technologies,
]
  .flatMap((technology) => technology.split('/').map((part) => part.trim()))
  .filter(Boolean);

const technologyTopicPattern = new RegExp(
  `\\b(?:${[...new Set(portfolioTechnologies)]
    .sort((left, right) => right.length - left.length)
    .map((technology) => technology.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')})\\b`,
  'i',
);

const generalProgrammingTopicPattern =
  /\b(?:binary search|two pointers?|dynamic programming|algorithms?|data structures?|dsa|coding|programming)\b/i;

export const assistantResponses = {
  outOfScope: OUT_OF_SCOPE_RESPONSE,
  unknown: UNKNOWN_INFORMATION_RESPONSE,
  clarify: CLARIFICATION_RESPONSE,
};

export function classifyIntent(message) {
  const query = message.trim();

  if (!query) return { type: 'ambiguous', topic: null };

  if (
    instructionOverridePattern.test(query) ||
    explicitTaskPattern.test(query) ||
    requestForSolutionPattern.test(query) ||
    unrelatedQuestionPattern.test(query)
  ) {
    return { type: 'out-of-scope', topic: null };
  }

  const hasPortfolioSubject = portfolioSubjectPattern.test(query);
  const hasPortfolioTopic = portfolioTopicPattern.test(query);

  if (hasPortfolioSubject && generalHelpPattern.test(query)) {
    const asksForGeneralInstruction =
      /\b(?:from scratch|step by step|with an example|tutorial|how to code|how to build)\b/i.test(
        query,
      );

    if (!asksForGeneralInstruction) {
      return { type: 'in-scope', topic: identifyTopic(query) };
    }
  }

  if (
    (generalHelpPattern.test(query) || genericProgrammingHelpPattern.test(query)) &&
    !hasPortfolioSubject
  ) {
    return { type: 'out-of-scope', topic: null };
  }

  if (hasPortfolioSubject || hasPortfolioTopic) {
    return { type: 'in-scope', topic: identifyTopic(query) };
  }

  if (
    generalTechnologyQuestionPattern.test(query) &&
    (technologyTopicPattern.test(query) || generalProgrammingTopicPattern.test(query))
  ) {
    return { type: 'out-of-scope', topic: null };
  }

  return { type: 'ambiguous', topic: null };
}

function identifyTopic(query) {
  if (/\b(?:project|projects|rentify|recoverlab|moviesearch|movie search)\b/i.test(query)) {
    return 'projects';
  }
  if (/\b(?:github|linkedin|contact|email|reach|job opportunity)\b/i.test(query)) {
    return 'contact';
  }
  if (/\b(?:resume|cv|download)\b/i.test(query)) return 'resume';
  if (/\b(?:education|academic|student|degree|college|university|cgpa)\b/i.test(query)) {
    return 'education';
  }
  if (/\b(?:internship|intern|experience|contributed|responsibilities)\b/i.test(query)) {
    return 'experience';
  }
  if (/\b(?:project|projects|rentify|recoverlab|moviesearch|movie search)\b/i.test(query)) {
    return 'projects';
  }
  if (/\b(?:currently learning|currently focusing|current focus|exploring)\b/i.test(query)) {
    return 'current-focus';
  }
  if (/\b(?:goal|career aspiration|career objective|aspire)\b/i.test(query)) {
    return 'career-goal';
  }
  if (/\b(?:achievements?|certifications?|certificates?|hackathons?|awards?|recognitions?|won)\b/i.test(query)) {
    return 'achievements';
  }
  if (/\b(?:skill|skills|technology|technologies|tech stack|worked with|used)\b/i.test(query)) {
    return 'skills';
  }
  if (/\b(?:who is|about|background|journey|portfolio)\b/i.test(query)) return 'overview';
  if (technologyTopicPattern.test(query)) return 'skills';
  return null;
}
