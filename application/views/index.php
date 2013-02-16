<!doctype html>
<html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<?php $this->load->view($header); ?>
<style>
#logo-section .A{
	width: 184px;
	margin-left: 185px;
	background:url(<?php  echo base_url()   ?>img/logoA.png) no-repeat;
}
#logo-section .B{
	width:525px;
	margin-right: 246px;
	margin-top: 35px;	
	background:url(<?php  echo base_url()   ?>img/logoB.png) no-repeat;
	height: 111px;
}
</style>
<body>
	<!--[if lt IE 7]><p class=chromeframe>Your browser is <em>ancient!</em> <a href="http://browsehappy.com/">Upgrade to a different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to experience this site.</p><![endif]-->
	<?php
	if( $loggedIn){
		$this->load->view($nav); 
	};?>
	<div  id='logo-section'  class='container nowrap'   >
		<div  class="span11 A fl"  >
		</div >
		<div class="span11 B fr" >
		</div>
	</div>
	<div  class='mid-section container' >
			<?php $this->load->view($body); ?>
	</div>
<?php
	if( isset($hidden) ){
		$this->load->view($hidden); 
	};
?>	
<?php $this->load->view($company); ?>
<?php $this->load->view($footer); ?>
</body>
</html>


