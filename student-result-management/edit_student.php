<?php require 'database.php';auth();
$s=$db->prepare("SELECT * FROM students WHERE id=?");$id=(int)($_GET['id']??0);$s->bind_param('i',$id);$s->execute();$edit=$s->get_result()->fetch_assoc();
if(!$edit){header('Location: manage_students.php');exit;}
include 'add_student.php';
