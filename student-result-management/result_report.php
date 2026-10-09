<?php require 'database.php';auth();$title='Reports';$sub='Class performance summary.';include 'header.php';
$a=$db->query("SELECT COUNT(*) n,ROUND(AVG(percentage),2) av,MAX(percentage) mx,MIN(percentage) mn,SUM(result_status='PASS') p FROM results")->fetch_assoc();?>
<button class="btn btn-grad mb-3 no-print" onclick="print()"><i class="bi bi-printer"></i> Print Report</button>
<div class="cardx"><div class="row text-center g-3"><?php foreach([['Results',$a['n']],['Average %',$a['av']],['Highest %',$a['mx']],['Lowest %',$a['mn']],['Pass Rate',$a['n']?round($a['p']/$a['n']*100).'%':'0%']] as $x):?><div class="col-6 col-md"><div class="sum"><small><?=$x[0]?></small><h4><?=e($x[1])?></h4></div></div><?php endforeach;?></div></div>
<?php include 'footer.php';
