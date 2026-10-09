<?php require 'database.php';auth();
$edit=$edit??null;$f=['student_name','enrollment_no','email','phone','course','semester','section'];$v=$edit?:array_fill_keys($f,'');$err='';
if($_SERVER['REQUEST_METHOD']=='POST'){chk();foreach($f as $k)$v[$k]=trim($_POST[$k]??'');
 if(!preg_match('/^\d{6,15}$/',$v['enrollment_no']))$err='Enrollment must be 6-15 digits.';
 elseif($v['student_name']===''||!filter_var($v['email'],FILTER_VALIDATE_EMAIL))$err='A valid name and email are required.';
 else try{
  if($edit){$s=$db->prepare("UPDATE students SET student_name=?,enrollment_no=?,email=?,phone=?,course=?,semester=?,section=? WHERE id=?");$s->bind_param('sssssssi',$v['student_name'],$v['enrollment_no'],$v['email'],$v['phone'],$v['course'],$v['semester'],$v['section'],$edit['id']);}
  else{$s=$db->prepare("INSERT INTO students(student_name,enrollment_no,email,phone,course,semester,section) VALUES(?,?,?,?,?,?,?)");$s->bind_param('sssssss',$v['student_name'],$v['enrollment_no'],$v['email'],$v['phone'],$v['course'],$v['semester'],$v['section']);}
  $s->execute();flash($edit?'Student updated successfully!':'Student added successfully!');header('Location: manage_students.php');exit;
 }catch(mysqli_sql_exception $x){$err='Enrollment number already exists.';}}
$title=$edit?'Edit Student':'Add New Student';$sub='Enter student information below.';include 'header.php';
$L=['student_name'=>'Student Name','enrollment_no'=>'Enrollment Number','email'=>'Email','phone'=>'Phone','course'=>'Course','semester'=>'Semester','section'=>'Section'];?>
<div class="cardx fade-in"><?php if($err):?><div class="alert alert-danger"><?=e($err)?></div><?php endif;?>
<form method="post"><input type="hidden" name="t" value="<?=csrf()?>"><div class="row g-3">
<?php foreach($L as $k=>$l):?><div class="col-md-6"><div class="form-floating"><input class="form-control" id="<?=$k?>" name="<?=$k?>" placeholder="<?=$l?>" value="<?=e($v[$k])?>" <?=$k=='phone'?'':'required'?>><label for="<?=$k?>"><?=$l?></label></div></div><?php endforeach;?></div>
<div class="mt-4"><a href="manage_students.php" class="btn btn-light">Cancel</a> <button class="btn btn-grad"><?=$edit?'Save Changes':'Add Student'?></button></div></form></div>
<?php include 'footer.php';
