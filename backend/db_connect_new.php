<?php
// Configuration de la base de données
$host = 'localhost';
$dbname = 'archiva_db';  // Nom de votre base de données
$username = 'root';       // Utilisateur par défaut de phpMyAdmin
$password = '';           // Mot de passe (vide par défaut sur XAMPP/WAMP)

try {
  // Connexion PDO à MySQL
  $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
  
  // Configuration PDO
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
  
} catch (PDOException $e) {
  die(json_encode([
    'ok' => false,
    'error' => 'Erreur de connexion à la base de données: ' . $e->getMessage()
  ]));
}
