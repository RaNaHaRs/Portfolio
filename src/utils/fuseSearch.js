import Fuse from 'fuse.js';
import { experience } from '../data/experience';
import { knowladgebase, publicContact } from '../data/knowladgebase';
import { projects } from '../data/projects';
import { skillCategories, currentlyExploring } from '../data/skills';
import { timeline } from '../data/timeline';

function makeDocument(category, title, content, keywords = []) {
  return { category, title, content, keywords };
}

export const portfolioKnowledge = [
  ...knowladgebase.map(({ category, title, content, keywords = [] }) =>
    makeDocument(category, title, content, keywords),
  ),
  ...skillCategories.map((category) =>
    makeDocument(
      'skills',
      category.title,
      `${category.description} Technologies: ${category.skills.join(', ')}.`,
      [category.title, ...category.skills],
    ),
  ),
  makeDocument(
    'current-focus',
    'Current technical focus',
    `The current focus areas are ${currentlyExploring.join(', ')}. ${timeline.find((item) => item.status === 'current')?.description ?? ''}`,
    ['currently learning', 'current focus', ...currentlyExploring],
  ),
  makeDocument(
    'experience',
    `${experience.role} at ${experience.company}`,
    `${experience.role} at ${experience.company}, ${experience.duration}, ${experience.location}. Contributions: ${experience.responsibilities.join(' ')} ${experience.achievement} Recognition: ${experience.recognition}`,
    ['internship', 'professional experience', experience.projectName, ...experience.technologies],
  ),
  ...projects.map((project) =>
    makeDocument(
      'projects',
      project.title,
      `${project.category}. ${project.typeNote ?? ''} ${project.description} Technologies: ${project.technologies.join(', ')}. Highlights: ${project.highlights.join(' ')} ${project.githubUrl ? `GitHub: ${project.githubUrl}` : ''} ${project.liveUrl ? `Live demo: ${project.liveUrl}` : ''}`,
      [
        project.title,
        project.category,
        ...project.technologies,
        ...project.highlights,
        ...(project.id === 'moviesearch' ? ['movie search', 'recommendation engine'] : []),
        ...(project.id === 'recoverlab' ? ['CRM', 'internship contribution'] : []),
      ],
    ),
  ),
  ...timeline
    .filter((item) => item.category === 'Hackathon' || item.category === 'Recognition')
    .map((item) =>
      makeDocument(
        'achievements',
        item.title,
        `${item.date}: ${item.description}`,
        [
          item.category,
          'achievement',
          ...(item.category === 'Hackathon'
            ? ['participation', 'Smart India Hackathon', 'SIH']
            : ['recognition', 'certificate', 'certification']),
          ...(item.details ?? []),
        ],
      ),
    ),
  makeDocument(
    'achievements',
    'Internship recognition',
    experience.recognition,
    [
      'appreciation letter',
      'internship completion certificate',
      'recognition',
      'achievement',
      'certificate',
      'certification',
    ],
  ),
  makeDocument(
    'contact',
    'Public contact and profiles',
    `Public email: ${publicContact.email}. GitHub profile: ${publicContact.githubUrl}. LinkedIn profile: ${publicContact.linkedinUrl}.`,
    ['email', 'GitHub', 'LinkedIn', 'contact', 'profiles'],
  ),
];

const fuse = new Fuse(portfolioKnowledge, {
  includeScore: true,
  ignoreLocation: true,
  threshold: 0.7,
  minMatchCharLength: 2,
  keys: [
    { name: 'title', weight: 0.38 },
    { name: 'keywords', weight: 0.34 },
    { name: 'content', weight: 0.28 },
  ],
});

const queryStopWords = new Set([
  'a', 'about', 'am', 'an', 'and', 'are', 'can', 'did', 'do', 'does', 'for',
  'has', 'have', 'he', 'her', 'him', 'his', 'how', 'is', 'me', 'of', 'please',
  'rana', 'the', 'tell', 'using',
  'what', 'where', 'which', 'who', 'with', 'work', 'worked', 'you', 'harsh',
]);

export function searchPortfolioKnowledge(query, categories, limit = 8) {
  const allowedCategories = new Set(categories);
  const normalizedQuery = query
    .toLowerCase()
    .replace(/[^a-z0-9.+#]+/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 1 && !queryStopWords.has(word))
    .join(' ');

  return fuse
    .search(normalizedQuery)
    .filter(
      ({ item, score }) =>
        allowedCategories.has(item.category) && score !== undefined && score <= 0.7,
    )
    .slice(0, limit)
    .map(({ item, score }) => ({ ...item, score }));
}
