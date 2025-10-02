-- Créer la base de données
CREATE DATABASE IF NOT EXISTS archiva_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE archiva_db;

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des CERs
CREATE TABLE IF NOT EXISTS cers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  author VARCHAR(100) NOT NULL,
  level ENUM('X1', 'X2', 'X3', 'X4', 'X5') NOT NULL,
  specialty VARCHAR(255),
  image_url VARCHAR(255),
  file_url VARCHAR(255),
  user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Table des favoris
CREATE TABLE IF NOT EXISTS favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  cer_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (cer_id) REFERENCES cers(id) ON DELETE CASCADE,
  UNIQUE KEY unique_favorite (user_id, cer_id)
);

-- Insérer des données de test pour les CERs
INSERT INTO cers (title, description, author, level, specialty, image_url) VALUES
('Prosit 3.2 Annuaire Active Directory', 'L\'Annuaire Active Directory (AD) est un service de gestion des identités et des accès utilisé principalement dans les environnements Windows. Il permet de....', 'Sadjo Mamadou', 'X3', 'Résaux & Infra, Sécurité', '/MS.jpg'),
('Prosit 2.2 Modélisation UML', 'Le Langage de Modélisation Unifié, de l\'anglais Unified Modeling Language, est un langage de modélisation graphique à base de pictogrammes conçu comme...', 'Pauline lock', 'X2', 'Génie-logiciel', '/UML.png'),
('Prosit 3.3 API et Webservice', 'Les API sont principalement axées sur la communication entre applications pour l\'accès aux fonctionnalités. L\'EDI se concentre sur l\'échange de documents...', 'Daryl Noupik', 'X3', 'Génie-logiciel', '/API.jpg'),
('Prosit 4.1 Développement avancé', 'Advance Web Development fait référence au processus de création de sites Web dynamiques et interactifs qui vont au-delà des pages Web statique....', 'Providence Djekoun.', 'X4', 'Génie-logiciel', '/Program.jpg'),
('Prosit 4.5 Architecture microservices', 'Une architecture de microservices est un type d\'architecture d\'application dans laquelle l\'application est développée sous la forme d\'un ensemble de services....', 'Providence Djekoun.', 'X4', 'Génie-logiciel', '/microservices.png'),
('Prosit 4.5 Architecture distribuée', 'L\'architecture distribuée ou l\'informatique distribuée désigne un système d\'information ou un réseau pour lequel l\'ensemble des ressources disponibles ne se trouvent...', 'Sadjo Mamadou', 'X4', 'Résaux & Infra', '/ai.jpg');
