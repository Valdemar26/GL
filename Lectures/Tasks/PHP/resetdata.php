<?php
    $connect = new PDO("mysql:host=localhost;dbname=chat_php", "root", "123456");
    $sql = "DELETE FROM users";
    $connect->query($sql);
    echo json_encode("Successfully deleted data");