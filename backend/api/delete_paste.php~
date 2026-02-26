<?php
require 'config.php';
requireAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

$id = isset($_POST['id']) ? filter_var($_POST['id'], FILTER_VALIDATE_INT) : 0;

if (!$id) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid paste ID"]);
    exit;
}

try {
    $stmt = $pdo->prepare("DELETE FROM pastes WHERE id = ? AND user_id = ?");
    $stmt->execute([$id, $_SESSION['user_id']]);
    
    if ($stmt->rowCount() > 0) {
        echo json_encode(["status" => "success", "message" => "Paste deleted"]);
    } else {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "Paste not found or unauthorized"]);
    }
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Server error"]);
}
?>
