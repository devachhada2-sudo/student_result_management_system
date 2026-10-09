<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Student Result Management System</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"><link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet"><link href="assets/css/style.css" rel="stylesheet"><link href="assets/css/responsive.css" rel="stylesheet"></head><body>
<section class="hero"><span class="blob b1"></span><span class="blob b2"></span><div class="container text-center position-relative">
<i class="bi bi-mortarboard-fill display-1"></i><h1 class="fw-bold mt-2">Student Result Management System</h1><p class="lead">Manage student results smarter, faster and easier.</p>
<a href="login.php" class="btn btn-light btn-lg m-1">Admin Login</a><a href="#features" class="btn btn-outline-light btn-lg m-1">View Features</a></div></section>
<section id="features" class="container py-5"><div class="row g-4">
<?php foreach([['bar-chart-line','Smart Dashboard','g1'],['pencil-square','Easy Result Management','g2'],['search','Quick Search','g3'],['printer','Printable Results','g4']] as $f):?>
<div class="col-6 col-lg-3"><div class="cardx text-center h-100"><div class="ico <?=$f[2]?> mx-auto"><i class="bi bi-<?=$f[0]?>"></i></div><h6 class="mt-3"><?=$f[1]?></h6></div></div><?php endforeach;?></div>
<h3 class="text-center mt-5 mb-4">How it Works</h3><div class="row g-3 text-center">
<?php foreach(['Add Student','Enter Marks','Automatic Calculation','Generate Result'] as $i=>$s):?><div class="col-6 col-md-3"><div class="step"><b><?=$i+1?></b></div><p class="mt-2"><?=$s?></p></div><?php endforeach;?></div></section></body></html>
