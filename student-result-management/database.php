<?php
session_start();
$db = @new mysqli('127.0.0.1', 'root', '', 'student_result_management');
if ($db->connect_error) {
    $db = @new mysqli('localhost', 'root', '', 'student_result_management', null, '/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock');
}
if ($db->connect_error) {
    die('Database connection failed: ' . $db->connect_error . '. Import database/student_result_management.sql first.');
}
$db->set_charset('utf8mb4');
function e($s){return htmlspecialchars((string)$s,ENT_QUOTES,'UTF-8');}
function grade($p){return $p>=90?'A+':($p>=80?'A':($p>=70?'B+':($p>=60?'B':($p>=50?'C':($p>=40?'D':'F')))));}
function csrf(){if(empty($_SESSION['t']))$_SESSION['t']=bin2hex(random_bytes(16));return $_SESSION['t'];}
function chk(){if(!hash_equals($_SESSION['t']??'',$_POST['t']??''))die('Invalid CSRF token');}
function auth(){if(empty($_SESSION['admin'])){header('Location: login.php');exit;}}
function flash($m){$_SESSION['flash']=$m;}
if($db->query("SELECT 1 FROM admins")->num_rows==0){$h=password_hash('admin123',PASSWORD_DEFAULT);$s=$db->prepare("INSERT INTO admins(username,password) VALUES('admin',?)");$s->bind_param('s',$h);$s->execute();}
