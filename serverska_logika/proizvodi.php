<?php
$conn = mysqli_connect("localhost", "root", "","ita");
if(isset($_GET['id'])){
	$query = "SELECT * FROM products WHERE product_id=".$_GET['id'];
}else{
	$query = "SELECT * FROM products";
}
$rez = mysqli_query($conn,$query);
$ukupno = [];
while($red = mysqli_fetch_object($rez)){
	array_push($ukupno,$red);
}
echo json_encode($ukupno);

/*
$pdo = new PDO("mysql:host=localhost;dbname=ita;charset=utf8","root","");
$query = "select * from products";
$rez = $pdo->query($query);
$rez = $rez->fetchAll(PDO::FETCH_OBJ);
echo json_encode($rez);


$pdo = new PDO("mysql:host=localhost;dbname=prodavnica;charset=utf8","root","");
if(isset($_GET['id'])){
	$query = "select * from proizvodi where id = " . $_GET['id'];
}else{
	$query = "select * from proizvodi";
}
$rez = $pdo->query($query);
$rez = $rez->fetchAll(PDO::FETCH_OBJ);
echo json_encode($rez);
*/