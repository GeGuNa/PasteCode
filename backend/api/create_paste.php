<?php
require 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
} 

$title = isset($_POST['title']) ? sanitize($_POST['title']) : 'Untitled';
$content = isset($_POST['content']) ? $_POST['content'] : '';
$language = isset($_POST['language']) ? sanitize($_POST['language']) : 'text';
$visibility = isset($_POST['visibility']) ? sanitize($_POST['visibility']) : 'public';
$user_id = isLoggedIn() ? $_SESSION['user_id'] : null;

if (empty($content)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Content is required"]);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO pastes (user_id, title, content, language, visibility) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$user_id, $title, $content, $language, $visibility]);
    
    echo json_encode([
        "status" => "success", 
        "message" => "Paste created successfully",
        "id" => $pdo->lastInsertId()
    ]);
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed to create paste"]);
}


?>
