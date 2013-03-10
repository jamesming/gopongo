<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

	<meta name ="viewport" content ="width = 320">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=0" />
	<script type="text/javascript" language="Javascript">
		
		(function(){
			
			var  href = window.location.href
			
					,href_array = href.split("?")
					
					,basePortion_array = href_array[0].split("//")
					
					,protocol= basePortion_array[0]
					
					,host_array =  basePortion_array[1].split("/");
					
			window.base_url = protocol + '//' + host_array[0] + '/' + host_array[1] + '/';			
			
		})();
		
	</script>
</head>
<body>
	<style>
#footBng{
background-image:url(img/footerTiled.png);
background-repeat: repeat;
}

#footBng .container{
background: transparent url(img/footerA.png) no-repeat;
height: 184px;
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

</body>
</html>