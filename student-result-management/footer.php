</main>
<?php if(!empty($_SESSION['flash'])):?><div class="toast-box"><div class="toast show align-items-center text-bg-success border-0"><div class="d-flex"><div class="toast-body"><i class="bi bi-check-circle me-2"></i><?=e($_SESSION['flash'])?></div><button class="btn-close btn-close-white m-auto me-2" data-bs-dismiss="toast"></button></div></div></div><?php unset($_SESSION['flash']);endif;?>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="assets/js/script.js"></script></body></html>
