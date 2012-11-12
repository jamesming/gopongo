<script src="<?php echo base_url()    ?>js/libs/bootstrap/js/bootstrap.min.js"></script>

<script src="<?php echo base_url()    ?>js/plugins.js?v=<?php echo rand()    ?>"></script>
<script src="<?php echo base_url()    ?>js/core.js?v=<?php echo rand()    ?>"></script>


<?php  switch($body){ 
case "body/main/view": ?>
	<script src="<?php echo base_url()    ?>js/main.js?v=<?php echo rand()    ?>"></script>
<?php break; 
case "body/carousel/view":  ?>
	<script src="<?php echo base_url()    ?>js/carousel.js?v=<?php echo rand()    ?>"></script>
<?php } ?>


<script>
	var _gaq=[['_setAccount','<?php echo $GA_account;    ?>'],['_trackPageview']];
	(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
	g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
	s.parentNode.insertBefore(g,s)}(document,'script'));
</script>



<script type="text/javascript" language="Javascript">
				!window.parent.hasOwnProperty("$") ||	window.parent.$('.top').parent().css({background:'#' + (Math.random() * 0xFFFFFF << 0).toString(16)});
</script>

