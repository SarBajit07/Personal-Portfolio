-- Schema definition for Portfolio Application

-- 1. Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  tech TEXT[] NOT NULL,
  link VARCHAR(255),
  github_link VARCHAR(255),
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  category VARCHAR(100) NOT NULL UNIQUE,
  items TEXT[] NOT NULL
);

-- 3. Timeline (Education & Experience) Table
CREATE TABLE IF NOT EXISTS timeline (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL CHECK (type IN ('education', 'experience')),
  period VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  organization VARCHAR(255) NOT NULL,
  description TEXT,
  order_index INT DEFAULT 0
);

-- 4. Messages (Contact form submissions) Table
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Admins Table
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL
);
