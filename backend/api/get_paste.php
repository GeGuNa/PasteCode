<?php
require 'config.php';

/*error_log("Session ID: " . session_id());
error_log("user_id in session: " . (isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 'NOT SET'));
error_log("isLoggedIn: " . (isLoggedIn() ? 'true' : 'false'));
*/



if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}



$id = isset($_GET['id']) ? filter_var($_GET['id'], FILTER_VALIDATE_INT) : 0;

if (!$id) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid paste ID"]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT p.*, u.username as author FROM pastes p LEFT JOIN users u ON p.user_id = u.id WHERE p.id = ?");
    $stmt->execute([$id]);
    $paste = $stmt->fetch();

    if ($paste) {
    
        if ($paste['visibility'] === 'private' && (!isLoggedIn() || $_SESSION['user_id'] != $paste['user_id'])) {
            http_response_code(403);
            
            echo json_encode([
                "status" => "error", 
                "message" => "Access denied",
                "debug" => $debug_info
            ]);
            
            
            exit;
        }
        
        $paste['can_edit'] = isLoggedIn() && $_SESSION['user_id'] == $paste['user_id'];
        
        
        
        echo json_encode(["status" => "success", "paste" => $paste]);
    } else {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "Paste not found"]);
    }
    
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Server error"]);
}
?>
