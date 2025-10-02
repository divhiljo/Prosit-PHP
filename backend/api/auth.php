<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Gérer les requêtes OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

require_once __DIR__ . '/../db_connect_new.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
  switch ($method) {
    case 'POST':
      $data = json_decode(file_get_contents('php://input'), true);
      $action = $data['action'] ?? '';
      
      if ($action === 'signup') {
        // Inscription
        if (empty($data['nom']) || empty($data['prenom']) || empty($data['email']) || empty($data['password'])) {
          echo json_encode(['ok' => false, 'message' => 'Tous les champs sont requis']);
          exit;
        }
        
        // Vérifier si l'email existe déjà
        $stmt = $pdo->prepare('SELECT id FROM users WHERE email = :email');
        $stmt->execute(['email' => $data['email']]);
        if ($stmt->fetch()) {
          echo json_encode(['ok' => false, 'message' => 'Cet email est déjà utilisé']);
          exit;
        }
        
        // Hasher le mot de passe
        $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
        
        // Insérer l'utilisateur
        $stmt = $pdo->prepare('
          INSERT INTO users (nom, prenom, email, password)
          VALUES (:nom, :prenom, :email, :password)
        ');
        
        $stmt->execute([
          'nom' => $data['nom'],
          'prenom' => $data['prenom'],
          'email' => $data['email'],
          'password' => $hashedPassword
        ]);
        
        $userId = $pdo->lastInsertId();
        
        // Récupérer l'utilisateur créé
        $stmt = $pdo->prepare('SELECT id, nom, prenom, email, created_at FROM users WHERE id = :id');
        $stmt->execute(['id' => $userId]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        echo json_encode([
          'ok' => true,
          'message' => 'Compte créé avec succès',
          'user' => $user
        ]);
        
      } elseif ($action === 'login') {
        // Connexion
        if (empty($data['email']) || empty($data['password'])) {
          echo json_encode(['ok' => false, 'message' => 'Email et mot de passe requis']);
          exit;
        }
        
        // Récupérer l'utilisateur
        $stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');
        $stmt->execute(['email' => $data['email']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$user) {
          echo json_encode(['ok' => false, 'message' => 'Email ou mot de passe incorrect']);
          exit;
        }
        
        // Vérifier le mot de passe
        if (!password_verify($data['password'], $user['password'])) {
          echo json_encode(['ok' => false, 'message' => 'Email ou mot de passe incorrect']);
          exit;
        }
        
        // Retourner l'utilisateur sans le mot de passe
        unset($user['password']);
        
        echo json_encode([
          'ok' => true,
          'message' => 'Connexion réussie',
          'user' => $user
        ]);
        
      } else {
        echo json_encode(['ok' => false, 'message' => 'Action non reconnue']);
      }
      break;
      
    default:
      http_response_code(405);
      echo json_encode(['ok' => false, 'message' => 'Méthode non autorisée']);
      break;
  }
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'message' => 'Erreur serveur: ' . $e->getMessage()]);
}
