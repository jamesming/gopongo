<style>
#footBng{
background:url(<?php  echo base_url()   ?>img/footerTiled.png) repeat-x;
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
