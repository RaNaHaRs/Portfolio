export const publicContact = {
  email: 'rana.harsh.2607@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/harsh-rana-ba792a296/',
  githubUrl: 'https://github.com/RaNaHaRs/',
};

export const portfolioProfile = {
  name: 'Harsh Rana',
  degree: 'B.Tech in Information Technology',
  institute: 'A.D. Patel Institute of Technology',
  university: 'CVM University',
  graduationYear: '2027',
  cgpa: '7.82',
  careerGoal:
    'To become a Java Specialist with strong expertise in backend engineering, system design, distributed systems, and scalable enterprise software.',
};

export const knowladgebase = [
  {
    category: 'overview',
    title: portfolioProfile.name,
    content: `${portfolioProfile.name} is studying ${portfolioProfile.degree} at ${portfolioProfile.institute}, ${portfolioProfile.university}, with expected graduation in ${portfolioProfile.graduationYear}.`,
    keywords: ['background', 'student', 'portfolio'],
  },
  {
    category: 'education',
    title: 'Education',
    content: `${portfolioProfile.degree}, ${portfolioProfile.institute}, ${portfolioProfile.university}. Expected graduation ${portfolioProfile.graduationYear}. CGPA ${portfolioProfile.cgpa}.`,
    keywords: ['academic', 'college', 'university', 'degree', 'student', 'cgpa'],
  },
  {
    category: 'career-goal',
    title: 'Career goal',
    content: portfolioProfile.careerGoal,
    keywords: ['aspiration', 'Java specialist', 'career objective'],
  },
];