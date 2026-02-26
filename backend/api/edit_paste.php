<?php
require 'config.php';

requireAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

$id = isset($_POST['id']) ? filter_var($_POST['id'], FILTER_VALIDATE_INT) : 0;
$title = isset($_POST['title']) ? sanitize($_POST['title']) : 'Untitled';
$content = isset($_POST['content']) ? $_POST['content'] : '';
$language = isset($_POST['language']) ? sanitize($_POST['language']) : 'text';
$visibility = isset($_POST['visibility']) ? sanitize($_POST['visibility']) : 'public';

if (!$id) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid paste ID"]);
    exit;
}

if (empty($content)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Content is required"]);
    exit;
}

try {

    $stmt = $pdo->prepare("SELECT user_id FROM pastes WHERE id = ?");
    $stmt->execute([$id]);
    $paste = $stmt->fetch();

    if (!$paste) {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "Paste not found"]);
        exit;
    }

    if ($paste['user_id'] != $_SESSION['user_id']) {
        http_response_code(403);
        echo json_encode(["status" => "error", "message" => "You don't have permission to edit this paste"]);
        exit;
    }


    $stmt = $pdo->prepare("UPDATE pastes SET title = ?, content = ?, language = ?, visibility = ? WHERE id = ? AND user_id = ?");
    $stmt->execute([$title, $content, $language, $visibility, $id, $_SESSION['user_id']]);
    
    echo json_encode([
        "status" => "success", 
        "message" => "Paste updated successfully",
        "id" => $id
    ]);
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed to update paste"]);
}
?>
