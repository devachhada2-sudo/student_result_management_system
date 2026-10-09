<?php require 'database.php';auth();$q=trim($_GET['q']??'');$rows=null;
if($q!==''){$l="%$q%";$s=$db->prepare("SELECT s.id,s.student_name,s.enrollment_no,r.percentage,r.grade,r.result_status FROM students s LEFT JOIN results r ON r.student_id=s.id WHERE s.enrollment_no LIKE ? OR s.student_name LIKE ?");$s->bind_param('ss',$l,$l);$s->execute();$rows=$s->get_result();}
$title='Search Result';$sub='Find by enrollment number or name.';include 'header.php';?>
<div class="cardx fade-in text-center"><h4>Find Student Result</h4><form class="d-flex gap-2 mt-3"><input name="q" class="form-control form-control-lg" placeholder="Enrollment number or student name" value="<?=e($q)?>" required><button class="btn btn-grad"><i class="bi bi-search"></i></button></form></div>
<?php if($rows):?><div class="cardx mt-3"><?php if(!$rows->num_rows):?><p class="mb-0 text-muted">No student found.</p><?php endif;foreach($rows as $r):?>
<div class="d-flex justify-content-between align-items-center border-bottom py-2"><div><b><?=e($r['student_name'])?></b><br><small><?=e($r['enrollment_no'])?></small></div><div>
<?php if($r['grade']):?><span class="badge bg-grad"><?=e($r['grade'])?></span> <span class="badge bg-<?=$r['result_status']=='PASS'?'success':'danger'?>"><?=e($r['result_status'])?></span> <?php endif;?><a class="btn btn-sm btn-grad" href="view_result.php?id=<?=$r['id']?>">View Result</a></div></div><?php endforeach;?></div><?php endif;?>
<?php include 'footer.php';
