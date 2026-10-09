<?php require 'database.php';auth();
if($_SERVER['REQUEST_METHOD']=='POST'){chk();$id=(int)$_POST['id'];$s=$db->prepare("DELETE FROM students WHERE id=?");$s->bind_param('i',$id);$s->execute();flash('Student deleted.');}
header('Location: manage_students.php');
