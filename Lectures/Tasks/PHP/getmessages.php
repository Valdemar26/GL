<?php
try{
    $connect = new PDO("mysql:host=localost;dbname=chat_php", "root", "123456");

    $i = 0;

    foreach($connect->query('SELECT * FROM messages') as $row {
        $messages[$i++] = (object)['id' => $row['ID'], 'user_id' => $row['user_id'], 'message' => $row['message']];
    }
    echo json_encode($messages);
}
catch(PDOException $e){
    echo json_encode($sql . $e->getMessage());
}