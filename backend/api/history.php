<?php
require 'config.php';

requireAuth();

try {
    $stmt = $pdo->prepare("SELECT id, title, language, visibility, created_at FROM pastes WHERE user_id = ? ORDER BY created_at DESC");
    $stmt->execute([$_SESSION['user_id']]);
    $pastes = $stmt->fetchAll();
    
    echo json_encode(["status" => "success", "pastes" => $pastes]);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Server error"]);
}
?>
