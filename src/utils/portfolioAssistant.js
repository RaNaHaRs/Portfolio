import { experience } from '../data/experience';
import { portfolioProfile, publicContact } from '../data/knowladgebase';
import { projects } from '../data/projects';
import { currentlyExploring, skillCategories } from '../data/skills';
import { timeline } from '../data/timeline';
import { assistantResponses, classifyIntent } from './intentMatcher';
import { searchPortfolioKnowledge } from './fuseSearch';

const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const queryContains = (query, phrase) =>
  ` ${normalize(query)} `.includes(` ${normalize(phrase)} `);
const technologyTopicPatternForAssistant =
  /\b(?:java|spring boot|spring mvc|hibernate|jpa|node\.?js|express\.?js|react(?:\.js)?|python|flask|postgres(?:ql)?|mysql|mongodb|javascript|sql|rest apis?|socket\.?io)\b/i;

function makeAnswer(text, links = []) {
  return { text, links };
}

function projectMatches(query, project) {
  const normalizedQuery = normalize(query);
  const normalizedTitle = normalize(project.title);
  const aliases = {
    moviesearch: ['movie search', 'recommendation engine', 'movie recommendation'],
    recoverlab: ['recoverlab', 'crm'],
    rentify: ['rentify'],
  }[project.id] ?? [];

  if (
    normalizedQuery.includes(normalizedTitle) ||
    aliases.some((alias) => normalizedQuery.includes(alias))
  ) {
    return true;
  }

  const mentionedTechnologies = project.technologies.filter((technology) =>
    queryContains(query, technology),
  );

  if (mentionedTechnologies.length) return true;

  if (/\bbackend\b|\bserver side\b/i.test(query)) {
    return project.technologies.some((technology) =>
      /\b(?:java|spring boot|node\.js|express\.js|flask|rest api)\b/i.test(technology),
    );
  }

  return false;
}

function describeProject(project) {
  const links = [];
  if (project.githubUrl) links.push({ label: 'GitHub repository', href: project.githubUrl });
  if (project.liveUrl) links.push({ label: 'Live demo', href: project.liveUrl });

  const details = [
    `${project.title}: ${project.description}`,
    `Technologies: ${project.technologies.join(', ')}.`,
    `Highlights: ${project.highlights.join(' ')}`,
  ];

  if (project.id === 'recoverlab') {
    details.push(
      `During his internship, Harsh's documented contributions included ${experience.responsibilities.join(' ')}`,
    );
    details.push(
      'Harsh contributed to this production platform during his internship; it was not an independently built personal project.',
    );
  }

  return { text: details.join('\n\n'), links };
}

function answerProjects(query) {
  const indexedProjects = searchPortfolioKnowledge(query, ['projects']);
  const asksForDeployedProjects = /\b(?:deployed|live demo|live project|online)\b/i.test(query);
  const asksForRepositories = /\b(?:github|repository|repositories|repo)\b/i.test(query);
  const hasNamedProjectOrTechnology = projects.some((project) =>
    projectMatches(query, project),
  );
  const matchedByDetails = projects.filter((project) => {
    if (asksForDeployedProjects) return Boolean(project.liveUrl);
    if (asksForRepositories && !hasNamedProjectOrTechnology) return Boolean(project.githubUrl);
    return projectMatches(query, project);
  });
  const indexedTitles = new Set(indexedProjects.map(({ title }) => title));
  const selectedProjects = matchedByDetails.length
    ? matchedByDetails
    : !hasNamedProjectOrTechnology && !asksForDeployedProjects && !asksForRepositories
      ? projects
    : projects.filter((project) => indexedTitles.has(project.title));

  if (!selectedProjects.length) return null;

  const answers = selectedProjects.map(describeProject);
  return makeAnswer(
    answers.map(({ text }) => text).join('\n\n'),
    answers.flatMap(({ links }) => links),
  );
}

function answerSkills(query) {
  const matches = searchPortfolioKnowledge(query, ['skills', 'projects', 'experience']);
  const queryWords = ` ${normalize(query)} `;
  const knownTechnologies = [
    ...skillCategories.flatMap(({ skills }) => skills),
    ...projects.flatMap(({ technologies }) => technologies),
    ...experience.technologies,
  ].flatMap((technology) => technology.split('/').map((part) => part.trim()));
  const requestedTechnologies = [...new Set(knownTechnologies)].filter((technology) =>
    queryWords.includes(` ${normalize(technology)} `),
  );

  if (requestedTechnologies.length) {
    const matchingCategories = skillCategories.filter((category) =>
      category.skills.some((skill) => requestedTechnologies.includes(skill)),
    );
    const matchingProjects = projects.filter((project) =>
      project.technologies.some((technology) =>
        requestedTechnologies.some((skill) => normalize(technology) === normalize(skill)),
      ),
    );
    const proof = matchingProjects.length
      ? ` Documented project examples include ${matchingProjects.map(({ title }) => title).join(' and ')}.`
      : '';
    const categoryNames = matchingCategories.map(({ title }) => title).join(', ');
    return makeAnswer(
      `Yes. The portfolio lists ${requestedTechnologies.join(', ')} among Harsh's skills${categoryNames ? ` (${categoryNames})` : ''}.${proof}`,
    );
  }

  const skillResults = matches.filter(({ category }) => category === 'skills');
  if (!skillResults.length) return null;
  return makeAnswer(
    skillCategories
      .map(({ title, skills }) => `${title}: ${skills.join(', ')}.`)
      .join('\n\n'),
  );
}

function answerExperience() {
  const details = [
    `${experience.role} at ${experience.company} (${experience.duration}, ${experience.location}).`,
    `Contributions included ${experience.responsibilities.join(' ')}`,
    `Technologies: ${experience.technologies.join(', ')}.`,
    experience.achievement,
    experience.recognition,
  ];
  return makeAnswer(details.join('\n\n'), [
    { label: `Explore ${experience.projectName}`, href: experience.projectUrl },
  ]);
}

function answerEducation() {
  const document = searchPortfolioKnowledge('education academic CGPA graduation', ['education'])[0];
  if (!document) return null;
  return makeAnswer(
    `${portfolioProfile.name} is pursuing a ${portfolioProfile.degree} at ${portfolioProfile.institute}, ${portfolioProfile.university}. Expected graduation: ${portfolioProfile.graduationYear}. The portfolio lists a CGPA of ${portfolioProfile.cgpa}.`,
  );
}

function answerContact(query) {
  const results = searchPortfolioKnowledge(query, ['contact']).length
    ? searchPortfolioKnowledge(query, ['contact'])
    : searchPortfolioKnowledge('email', ['contact']);
  if (!results.length) return null;

  if (/\bgithub\b/i.test(query)) {
    return makeAnswer('Harsh’s GitHub profile:', [
      { label: publicContact.githubUrl, href: publicContact.githubUrl },
    ]);
  }
  if (/\blinkedin\b/i.test(query)) {
    return makeAnswer('Harsh’s LinkedIn profile:', [
      { label: publicContact.linkedinUrl, href: publicContact.linkedinUrl },
    ]);
  }

  return makeAnswer(`Harsh’s public contact email is ${publicContact.email}.`, [
    {
      label: publicContact.email,
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(publicContact.email)}`,
    },
    { label: 'GitHub profile', href: publicContact.githubUrl },
    { label: 'LinkedIn profile', href: publicContact.linkedinUrl },
  ]);
}

function answerAchievements(query) {
  const asksAboutHackathon = /\b(?:hackathon|sih)\b/i.test(query);
  const asksAboutCertification = /\b(?:certificate|certification|appreciation letter)\b/i.test(query);
  const asksAboutWinning = /\b(?:won|winner|award|prize|placed|rank(?:ed)?)\b/i.test(query);

  if (asksAboutWinning && asksAboutHackathon) {
    return makeAnswer(
      "The portfolio documents Harsh's participation in Smart India Hackathon 2024 and 2025, but it doesn't document a win, award, or placement.",
    );
  }

  if (asksAboutWinning && !asksAboutCertification) return null;

  const searchTerm = asksAboutHackathon
    ? 'hackathon'
    : asksAboutCertification
      ? 'certificate'
      : 'achievement';
  const results = searchPortfolioKnowledge(searchTerm, ['achievements']);
  if (!results.length) return null;

  return makeAnswer(
    [...new Set(results.map(({ content }) => content))].join('\n\n'),
  );
}

function answerOverview() {
  const document = searchPortfolioKnowledge('portfolio', ['overview'])[0];
  if (!document) return null;
  const currentTimeline = timeline.find((item) => item.status === 'current');
  return makeAnswer(
    `${document.content}\n\nCurrent focus: ${currentlyExploring.join(', ')}. ${currentTimeline?.description ?? ''}\n\nCareer goal: ${portfolioProfile.careerGoal}`,
  );
}

export function answerPortfolioQuestion(message) {
  const intent = classifyIntent(message);

  if (intent.type === 'out-of-scope') {
    return makeAnswer(assistantResponses.outOfScope);
  }
  if (intent.type === 'ambiguous') {
    return makeAnswer(assistantResponses.clarify);
  }

  let answer;
  switch (intent.topic) {
    case 'projects':
      answer = answerProjects(message);
      break;
    case 'experience':
      answer = technologyTopicPatternForAssistant.test(message)
        ? answerSkills(message)
        : searchPortfolioKnowledge(message, ['experience']).length
          ? answerExperience()
          : null;
      break;
    case 'education':
      answer = answerEducation();
      break;
    case 'contact':
      answer = answerContact(message);
      break;
    case 'resume':
      answer = makeAnswer('You can download Harsh’s resume using the Resume link in the portfolio navigation.');
      break;
    case 'current-focus': {
      const document = searchPortfolioKnowledge(message, ['current-focus'])[0];
      answer = document
        ? makeAnswer(`Harsh is currently exploring ${currentlyExploring.join(', ')}. ${document.content}`)
        : null;
      break;
    }
    case 'career-goal': {
      const document = searchPortfolioKnowledge(message, ['career-goal'])[0];
      answer = document ? makeAnswer(`Harsh’s stated career goal is: ${document.content}`) : null;
      break;
    }
    case 'achievements':
      answer = answerAchievements(message);
      break;
    case 'skills':
      answer = answerSkills(message);
      break;
    case 'overview':
      answer = answerOverview();
      break;
    default:
      answer = null;
  }

  return answer ?? makeAnswer(assistantResponses.unknown);
}
