<?php require 'database.php';auth();$subs=['web_development'=>'Web Development Using PHP','database_management'=>'Database Management','software_engineering'=>'Software Engineering','cyber_security'=>'Cyber Security','computer_networks'=>'Computer Networks'];$err='';
if($_SERVER['REQUEST_METHOD']=='POST'){chk();$sid=(int)$_POST['student_id'];$m=[];
 foreach($subs as $k=>$_){$x=$_POST[$k]??'';if(!ctype_digit($x)||$x>100){$err='Marks must be whole numbers from 0 to 100.';break;}$m[$k]=(int)$x;}
 if(!$err&&$sid<1)$err='Please select a student.';
 if(!$err){$t=array_sum($m);$p=round($t/5,2);$g=grade($p);$r=$p>=40?'PASS':'FAIL';
  $s=$db->prepare("INSERT INTO results(student_id,web_development,database_management,software_engineering,cyber_security,computer_networks,total_marks,percentage,grade,result_status) VALUES(?,?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE web_development=VALUES(web_development),database_management=VALUES(database_management),software_engineering=VALUES(software_engineering),cyber_security=VALUES(cyber_security),computer_networks=VALUES(computer_networks),total_marks=VALUES(total_marks),percentage=VALUES(percentage),grade=VALUES(grade),result_status=VALUES(result_status)");
  $s->bind_param('iiiiiiidss',$sid,$m['web_development'],$m['database_management'],$m['software_engineering'],$m['cyber_security'],$m['computer_networks'],$t,$p,$g,$r);$s->execute();flash('Result saved successfully!');header("Location: view_result.php?id=$sid");exit;}}
$title='Add Student Result';$sub='Marks are calculated live.';include 'header.php';?>
<div class="row g-3"><div class="col-lg-7"><div class="cardx fade-in"><?php if($err):?><div class="alert alert-danger"><?=e($err)?></div><?php endif;?>
<form method="post"><input type="hidden" name="t" value="<?=csrf()?>"><label class="form-label">Select Student</label><select name="student_id" class="form-select mb-3" required><option value="">-- Choose --</option>
<?php foreach($db->query("SELECT id,student_name,enrollment_no FROM students ORDER BY student_name") as $r):?><option value="<?=$r['id']?>" <?=($_GET['id']??'')==$r['id']?'selected':''?>><?=e($r['student_name'].' ('.$r['enrollment_no'].')')?></option><?php endforeach;?></select>
<?php foreach($subs as $k=>$l):?><div class="mb-3"><label class="form-label"><?=$l?> (0–100)</label><input type="number" min="0" max="100" name="<?=$k?>" class="form-control mk" required></div><?php endforeach;?>
<button class="btn btn-grad">Save Result</button></form></div></div>
<div class="col-lg-5"><div class="cardx preview text-white" id="prev"><h6>Result Preview</h6><h2 id="pTot">0 / 500</h2><p class="mb-1">Percentage: <b id="pPer">0%</b></p><div class="progress mb-2"><div class="progress-bar bg-light" id="pBar" style="width:0"></div></div><p class="mb-1">Grade: <b id="pGr">F</b></p><p class="mb-0">Result: <b id="pRes">FAIL</b></p></div></div></div>
<?php include 'footer.php';
