<?php
try{
    $connect = new PDO("mysql:host=localhost;dbname=chat_php", "root", "123456");
    header("Content-Type: application/json");
    $data = json_decode(file_get_contents("php://input"));
    $message = $data->message;
    $id = intval($data->id);
    $sql = "INSERT INTO messages VALUES (NULL, '$id', '$message')";
    $connect->exec($sql);
    echo json_encode("Successfully added message");
}
catch(PDOException $e){
    echo json_encode($sql . $e->getMessage());
}