import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { query } from './db.js';

dotenv.config();

const seed = async () => {
  console.log('Starting database seeding...');

  try {
    // 1. Seed Admin
    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'admin';
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Clear existing data
    await query('TRUNCATE TABLE admins, projects, skills, timeline RESTART IDENTITY CASCADE;');

    // Insert admin
    await query(
      'INSERT INTO admins (username, password_hash) VALUES ($1, $2)',
      [username, passwordHash]
    );
    console.log('✅ Admin user seeded.');

    // 2. Seed Skills
    const skills = [
      {
        category: 'Frontend',
        items: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Vite']
      },
      {
        category: 'Backend & ML',
        items: ['Node.js', 'Express', 'REST APIs', 'Python', 'PyTorch']
      },
      {
        category: 'Databases & Tools',
        items: ['MongoDB', 'Git', 'GitHub', 'Vercel', 'Postman']
      }
    ];

    for (const skill of skills) {
      await query(
        'INSERT INTO skills (category, items) VALUES ($1, $2)',
        [skill.category, skill.items]
      );
    }
    console.log('✅ Skills seeded.');

    // 3. Seed Projects
    const projects = [
      {
        title: 'Krishi Saathi',
        description: 'An agricultural web application providing farmers with real-time market prices, crop disease detection, and expert advice to increase farming productivity.',
        tech: ['React', 'Tailwind CSS', 'PyTorch', 'MongoDB'],
        link: '#',
        github_link: '#',
        order_index: 0
      },
      {
        title: 'Weather App',
        description: 'A sleek, responsive real-time weather application that fetches instant reports, forecast details, and wind metrics using OpenWeather API integration.',
        tech: ['React', 'Tailwind CSS', 'OpenWeather API'],
        link: '#',
        github_link: '#',
        order_index: 1
      }
    ];

    for (const project of projects) {
      await query(
        'INSERT INTO projects (title, description, tech, link, github_link, order_index) VALUES ($1, $2, $3, $4, $5, $6)',
        [project.title, project.description, project.tech, project.link, project.github_link, project.order_index]
      );
    }
    console.log('✅ Projects seeded.');

    // 4. Seed Timeline
    const timelines = [
      {
        type: 'education',
        period: '2022 - Present',
        title: 'B.Sc. in CSIT',
        organization: 'Madan Bhandari Memorial College',
        description: 'Running in 8th Semester. Specialized coursework in Web Development, Database Management, and Data Structures.',
        order_index: 0
      },
      {
        type: 'experience',
        period: 'Ongoing Development',
        title: 'Self-Directed Learning & Projects',
        organization: 'Independent Engineer',
        description: 'Designing fullstack applications, building agricultural tooling like Krishi Saathi, and researching deep learning integrations in react architectures.',
        order_index: 0
      }
    ];

    for (const item of timelines) {
      await query(
        'INSERT INTO timeline (type, period, title, organization, description, order_index) VALUES ($1, $2, $3, $4, $5, $6)',
        [item.type, item.period, item.title, item.organization, item.description, item.order_index]
      );
    }
    console.log('✅ Timeline items seeded.');

    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seed();
