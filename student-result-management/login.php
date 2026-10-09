<?php require 'database.php';$err='';
if($_SERVER['REQUEST_METHOD']=='POST'){chk();$u=trim($_POST['username']??'');$s=$db->prepare("SELECT password FROM admins WHERE username=?");$s->bind_param('s',$u);$s->execute();$r=$s->get_result()->fetch_assoc();
 if($r&&password_verify($_POST['password']??'',$r['password'])){session_regenerate_id(true);$_SESSION['admin']=$u;header('Location: dashboard.php');exit;}$err='Invalid username or password.';}?>
<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Login | SRMS</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"><link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet"><link href="assets/css/style.css" rel="stylesheet"><link href="assets/css/responsive.css" rel="stylesheet"></head><body>
<div class="hero login-wrap"><span class="blob b1"></span><span class="blob b2"></span><div class="container"><div class="row align-items-center g-4">
<div class="col-lg-6 text-center text-lg-start"><h1 class="fw-bold display-5">Student Result Management</h1><p class="lead">Smart • Simple • Accurate</p></div>
<div class="col-lg-5 offset-lg-1"><form method="post" class="cardx text-dark p-4"><input type="hidden" name="t" value="<?=csrf()?>">
<div class="ico g1 mx-auto"><i class="bi bi-mortarboard-fill"></i></div><h4 class="text-center mt-3">Welcome Back!</h4>
<?php if($err):?><div class="alert alert-danger py-2"><?=e($err)?></div><?php endif;?>
<div class="mb-3"><label class="form-label">Username</label><input name="username" class="form-control" required></div>
<div class="mb-3"><label class="form-label">Password</label><input type="password" name="password" class="form-control" required></div>
<button class="btn btn-grad w-100">Login</button><small class="d-block text-center text-muted mt-3">Demo: admin / admin123</small></form></div></div></div></div></body></html>
