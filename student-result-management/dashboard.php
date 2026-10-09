<?php require 'database.php';auth();
$q=fn($sql)=>(int)$db->query($sql)->fetch_row()[0];
$st=$q("SELECT COUNT(*) FROM students");$rs=$q("SELECT COUNT(*) FROM results");$ps=$q("SELECT COUNT(*) FROM results WHERE result_status='PASS'");$fl=$rs-$ps;
$g=array_fill_keys(['A+','A','B+','B','C','D','F'],0);foreach($db->query("SELECT grade,COUNT(*) c FROM results GROUP BY grade") as $r)$g[$r['grade']]=(int)$r['c'];
$top=$db->query("SELECT s.student_name,r.percentage,r.grade FROM results r JOIN students s ON s.id=r.student_id ORDER BY r.percentage DESC LIMIT 5");
$rec=$db->query("SELECT s.student_name,s.enrollment_no,r.percentage,r.grade,r.result_status,r.created_at FROM results r JOIN students s ON s.id=r.student_id ORDER BY r.created_at DESC,r.id DESC LIMIT 6");
$h=(int)date('G');$title='Good '.($h<12?'Morning':($h<17?'Afternoon':'Evening')).', Admin 👋';$sub="Here's what's happening with student results today.";
include 'header.php';$cards=[['Total Students',$st,'mortarboard','g1'],['Total Results',$rs,'clipboard-data','g2'],['Passed Students',$ps,'check-circle','g3'],['Failed Students',$fl,'x-circle','g4']];?>
<div class="row g-3 mb-4"><?php foreach($cards as $c):?><div class="col-6 col-xl-3"><div class="cardx stat fade-in"><div class="ico <?=$c[3]?>"><i class="bi bi-<?=$c[2]?>"></i></div><div><h2 class="mb-0" data-count="<?=$c[1]?>">0</h2><small class="text-muted"><?=$c[0]?></small></div></div></div><?php endforeach;?></div>
<div class="row g-3 mb-4"><div class="col-lg-7"><div class="cardx"><h6>Grade Distribution</h6><canvas id="gradeChart" height="150"></canvas></div></div>
<div class="col-lg-5"><div class="cardx"><h6>Pass vs Fail</h6><canvas id="pfChart" height="200"></canvas></div></div></div>
<div class="row g-3"><div class="col-lg-5"><div class="cardx"><h6>🏆 Top Performing Students</h6><table class="table table-hover align-middle"><tr><th>Rank</th><th>Student</th><th>%</th><th>Grade</th></tr>
<?php $i=0;foreach($top as $r):$i++;?><tr><td><?=['🥇','🥈','🥉'][$i-1]??$i?></td><td><?=e($r['student_name'])?></td><td><?=e($r['percentage'])?>%</td><td><span class="badge bg-grad"><?=e($r['grade'])?></span></td></tr><?php endforeach;?></table></div></div>
<div class="col-lg-7"><div class="cardx"><h6>🕒 Recent Results</h6><div class="table-responsive"><table class="table table-hover align-middle"><tr><th>Student</th><th>Enrollment</th><th>%</th><th>Grade</th><th>Status</th><th>Date</th></tr>
<?php foreach($rec as $r):?><tr><td><?=e($r['student_name'])?></td><td><?=e($r['enrollment_no'])?></td><td><?=e($r['percentage'])?>%</td><td><span class="badge bg-grad"><?=e($r['grade'])?></span></td><td><span class="badge bg-<?=$r['result_status']=='PASS'?'success':'danger'?>"><?=e($r['result_status'])?></span></td><td><?=e(substr($r['created_at'],0,10))?></td></tr><?php endforeach;?></table></div></div></div></div>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>
<script>const C=['#7c3aed','#3b82f6','#06b6d4','#10b981','#f59e0b','#f97316','#ef4444'];
new Chart(gradeChart,{type:'bar',data:{labels:<?=json_encode(array_keys($g))?>,datasets:[{data:<?=json_encode(array_values($g))?>,backgroundColor:C,borderRadius:8}]},options:{plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,ticks:{precision:0}}}}});
new Chart(pfChart,{type:'doughnut',data:{labels:['PASS','FAIL'],datasets:[{data:[<?=$ps?>,<?=$fl?>],backgroundColor:['#10b981','#ef4444']}]}});</script>
<?php include 'footer.php';
