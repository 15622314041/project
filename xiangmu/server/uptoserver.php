<?php
    // header("content-type:text/html;charset=utf-8");
    // mysql_query('SET NAMES UTF8');
    $con = mysqli_connect("127.0.0.1","root","root","goods");
    $data = file_get_contents("goods.json");
    $arr = json_decode($data,true);
    var_dump($arr);

    for($i = 0;$i<count($arr);$i++){
        $src = $arr[$i]["src"];
        $origin = $arr[$i]["origin"];
        $name = $arr[$i]["name"];
        $comment = $arr[$i]["comment"];
        $gif = $arr[$i]["gif"];
        $price = $arr[$i]["price"];
        $isSelf = $arr[$i]["isSelf"];
        // var_dump($arr[$i]["src"],$arr[$i]["alt"]);
        $sql = "INSERT INTO `goods`.`goodList` (`src`, `origin`,`name`, `comment`, `gif`, `price`, `isSelf`) VALUES ('$src', '$origin','$name', '$comment', '$gif', '$price', '$isSelf')";
        mysqli_query($con,$sql);
    }
?>