<?php
try{
    $connect = new PDO("mysql:host=localhost;dbname=chat_php", "root", "123456");

    $i = 0;

    foreach($connect->query('SELECT * FROM users') as $row {
        $users[$i++] = (object)['id' => $row['ID'], 'name' => $row['name'], 'city' => $row['city'], 'phone' => $row['phone'], 'img' => $row['logo_url']];
    }
    echo json_encode($messages);
}
catch(PDOException $e){
    echo json_encode($sql . $e->getMessage());
}