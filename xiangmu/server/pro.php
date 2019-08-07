<?php
    $con = mysqli_connect("127.0.0.1","root","root","datahui");
    $data = file_get_contents("data.json");
    $arr = json_decode($data,true);
    var_dump($arr);

    for($i = 0;$i<count($arr);$i++){
        $src = $arr[$i]["src"];
        $alt = $arr[$i]["alt"];
        // var_dump($arr[$i]["src"],$arr[$i]["alt"]);
        $sql = "INSERT INTO `datahui`.`products` (`src`, `alt`) VALUES ('$src', '$alt')";
        mysqli_query($con,$sql);
    }
?>