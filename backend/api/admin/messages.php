<?php
require 'config.php';
requireAuth();


try {
    $stmt = $pdo->prepare("SELECT * FROM contact_messages ORDER BY created_at DESC");
    $stmt->execute();
    $messages = $stmt->fetchAll();
    
    echo json_encode(["status" => "success", "messages" => $messages]);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Server error"]);
}
?>
