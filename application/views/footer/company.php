<style>
#footBng{
background-image:url('<?php  echo base_url()   ?>img/footerTiled.png');
background-repeat: repeat;
width: 1170px;
}

#footBng .container{
background: transparent url(<?php echo base_url()    ?>img/footerA.png) no-repeat;
height: 26px;
width: 903px;
background-position-y: -5px;
}
#footBng .container #email_hotspot{
position: absolute;
top: 0px;
left: 710px;
width: 180px;
height: 25px;
cursor:pointer;
}
</style>

<div  id='footBng'    >
      <footer  class='container ' >
      	<a href='mailto:Pongo@gopongo.com' target='_blank'>
      		<div  id='email_hotspot' >
      		</div>
    	</a>
      </footer>
</div>

<script type="text/javascript" language="Javascript">
	
(function(){
	var gWd = function(doc, win){
			var e = document.documentElement,
				g = document.getElementsByTagName('body')[0],
				x = window.innerWidth || e.clientWidth || g.clientWidth,
				y = window.innerHeight || e.clientHeight || g.clientHeight;
			return {width:x,height:y,devicePixelRatio:window.devicePixelRatio,screenWidth:screen.width};
		}
	$('#footBng').width(screen.width * window.devicePixelRatio); 
	    
})();
</script>
