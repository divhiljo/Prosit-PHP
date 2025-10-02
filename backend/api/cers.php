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
    case 'GET':
      // Récupérer tous les CERs
      $stmt = $pdo->query('SELECT * FROM cers ORDER BY created_at DESC');
      $cers = $stmt->fetchAll(PDO::FETCH_ASSOC);
      echo json_encode(['ok' => true, 'data' => $cers]);
      break;

    case 'POST':
      // Créer un nouveau CER
      $data = json_decode(file_get_contents('php://input'), true);
      
      $stmt = $pdo->prepare('
        INSERT INTO cers (title, description, author, level, specialty, image_url)
        VALUES (:title, :description, :author, :level, :specialty, :image_url)
      ');
      
      $stmt->execute([
        ':title' => $data['title'],
        ':description' => $data['description'] ?? '',
        ':author' => $data['author'] ?? 'Anonyme',
        ':level' => $data['level'],
        ':specialty' => $data['specialty'] ?? '',
        ':image_url' => $data['image_url'] ?? ''
      ]);
      
      echo json_encode([
        'ok' => true,
        'message' => 'CER créé avec succès',
        'id' => $pdo->lastInsertId()
      ]);
      break;

    case 'DELETE':
      // Supprimer un CER
      $id = $_GET['id'] ?? null;
      if (!$id) {
        throw new Exception('ID manquant');
      }
      
      $stmt = $pdo->prepare('DELETE FROM cers WHERE id = :id');
      $stmt->execute([':id' => $id]);
      
      echo json_encode(['ok' => true, 'message' => 'CER supprimé']);
      break;

    default:
      http_response_code(405);
      echo json_encode(['ok' => false, 'error' => 'Méthode non autorisée']);
  }
} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => $e->getMessage()]);
}