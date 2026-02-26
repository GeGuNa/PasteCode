<?php
require 'config.php';

if (isLoggedIn()) {
    try {
        $stmt = $pdo->prepare("SELECT id, username, email FROM users WHERE id = ?");
        $stmt->execute([$_SESSION['user_id']]);
        $user = $stmt->fetch();
        
        if ($user) {
            echo json_encode([
                "status" => "success",
                "authenticated" => true,
                "user" => $user
            ]);
            exit;
        }
    } catch(PDOException $e) {}
}

echo json_encode([
    "status" => "success",
    "authenticated" => false,
    "user" => null
]);
?>
