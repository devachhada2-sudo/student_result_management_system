<?php require 'database.php';auth();$id=(int)($_GET['id']??0);
$s=$db->prepare("SELECT s.*,r.* ,s.id sid FROM students s LEFT JOIN results r ON r.student_id=s.id WHERE s.id=?");$s->bind_param('i',$id);$s->execute();$r=$s->get_result()->fetch_assoc();
$title='Result Card';include 'header.php';
if(!$r):?><div class="alert alert-warning">Student not found.</div><?php elseif($r['grade']===null):?><div class="alert alert-info">No result yet. <a href="add_result.php?id=<?=$r['sid']?>">Add result</a></div><?php else:
$subs=['web_development'=>'Web Development Using PHP','database_management'=>'Database Management','software_engineering'=>'Software Engineering','cyber_security'=>'Cyber Security','computer_networks'=>'Computer Networks'];$pass=$r['result_status']=='PASS';?>
<button class="btn btn-grad mb-3 no-print" onclick="print()"><i class="bi bi-printer"></i> Print Result</button>
<div class="rcard fade-in"><div class="rhead"><h2 class="mb-0">GMIU</h2><div>Student Result Management System</div></div><div class="p-4">
<div class="row mb-3"><div class="col-sm-6"><b>Name:</b> <?=e($r['student_name'])?></div><div class="col-sm-6"><b>Enrollment No:</b> <?=e($r['enrollment_no'])?></div><div class="col-sm-6"><b>Course:</b> <?=e($r['course'])?></div><div class="col-sm-3"><b>Semester:</b> <?=e($r['semester'])?></div><div class="col-sm-3"><b>Section:</b> <?=e($r['section'])?></div></div>
<div class="table-responsive"><table class="table table-bordered text-center"><tr class="table-light"><th class="text-start">Subject</th><th>Marks</th><th>Maximum</th><th>Grade/Status</th></tr>
<?php foreach($subs as $k=>$l):$m=$r[$k];?><tr><td class="text-start"><?=$l?></td><td><?=$m?></td><td>100</td><td><?=grade($m)?> / <?=$m>=40?'🟢 PASS':'🔴 FAIL'?></td></tr><?php endforeach;?></table></div>
<div class="row text-center g-2 my-2"><div class="col-6 col-md-3"><div class="sum"><small>TOTAL</small><h4><?=$r['total_marks']?> / 500</h4></div></div><div class="col-6 col-md-3"><div class="sum"><small>PERCENTAGE</small><h4><?=e($r['percentage'])?>%</h4></div></div><div class="col-6 col-md-3"><div class="sum"><small>GRADE</small><h4><?=e($r['grade'])?></h4></div></div><div class="col-6 col-md-3"><div class="sum <?=$pass?'ok':'bad'?>"><small>RESULT</small><h4><?=$pass?'🟢 PASS':'🔴 FAIL'?></h4></div></div></div>
<div class="d-flex justify-content-between mt-5 pt-4"><div>Date: <?=date('d M Y')?></div><div class="text-center border-top pt-1 px-4">Controller of Examinations</div></div></div></div><?php endif;
include 'footer.php';
