export const projects = [
  {
    id: 'recoverlab',
    title: 'RecoverLab CRM',
    category: 'Production Project',
    typeNote: 'Internship contribution',
    visual: 'crm',
    description:
      'A multi-tenant customer relationship management platform developed for data recovery business operations. The platform supports case management, inventory management, client portals, invoicing and payments, analytics dashboards, role-based access control, workflow automation, and real-time communication.',
    technologies: [
      'React.js',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'JWT Authentication',
      'Socket.IO',
    ],
    highlights: [
      'Multi-tenant architecture with role-based access control and authentication.',
      'Case and inventory workflows, REST API integration, and PostgreSQL database design.',
      'Real-time communication using Socket.IO.',
      'Contributed to the production application during an internship at Selkey Cybersecurity Pvt. Ltd.',
    ],
    liveUrl: 'https://datarescuecrm.com/home',
    githubUrl: null,
  },
  {
    id: 'rentify',
    title: 'Rentify',
    category: 'Full-Stack Application',
    visual: 'rentify',
    description:
      'A rental marketplace application built with Java and Spring Boot. It focuses on property listings, property discovery, rental workflows, and a responsive user interface.',
    technologies: ['Java', 'Spring Boot', 'Thymeleaf', 'MySQL', 'Bootstrap'],
    highlights: [
      'Java and Spring Boot backend with MVC-based application architecture.',
      'MySQL database integration using JPA/Hibernate.',
      'Property listing and search functionality.',
      'Responsive frontend using Thymeleaf and Bootstrap.',
    ],
    githubUrl: 'https://github.com/RaNaHaRs/Rentify-render.git',
    liveUrl: 'https://rentify-render-g9w0.onrender.com/',
  },
  {
    id: 'moviesearch',
    title: 'MovieSearch Recommendation Engine',
    category: 'Recommendation System',
    visual: 'movies',
    description:
      'A movie discovery and recommendation application combining a Spring Boot backend with a Python Flask service for recommendation logic. The project explores communication between different backend technologies and integration of recommendation functionality into a web application.',
    technologies: [
      'Java',
      'Spring Boot',
      'Python',
      'Flask',
      'JavaScript',
      'Machine Learning / Recommendation Logic',
    ],
    highlights: [
      'Spring Boot backend with a separate Python Flask recommendation service.',
      'API-based communication between application components.',
      'Movie recommendation functionality.',
    ],
    githubUrl: 'https://github.com/RaNaHaRs/Movie-recommendation-system',
    liveUrl: null,
  },
];