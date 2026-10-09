<?php auth();$title=$title??'Student Result';?><!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title><?=e($title)?> | SRMS</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
<link href="assets/css/style.css" rel="stylesheet"><link href="assets/css/responsive.css" rel="stylesheet"></head><body>
<?php include 'sidebar.php';?>
<main class="main"><div class="topbar fade-in"><button class="btn btn-light d-lg-none" onclick="document.getElementById('sidebar').classList.toggle('open')"><i class="bi bi-list"></i></button>
<div><h4 class="mb-0"><?=e($title)?></h4><small class="text-muted"><?=e($sub??'')?></small></div>
<div class="ms-auto d-flex align-items-center gap-2"><div class="avatar">A</div><div class="d-none d-sm-block lh-1"><b>Admin</b><br><small class="text-muted">Administrator</small></div></div></div>
