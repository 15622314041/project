<?php 
    header("content-type:text/html;charset=utf-8");
    mysql_query('SET NAMES UTF8'); 
    //连接数据库
    $db = mysqli_connect("127.0.0.1","root","root","goods");

    $sql = "SELECT * FROM goodList";
    $result = mysqli_query($db,$sql);
    
    echo json_encode(mysqli_fetch_all($result,MYSQLI_ASSOC));

 ?>