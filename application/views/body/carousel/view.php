﻿<div  class='container ' >
	
	<div  class='row'   style=' background:red;'  >
		
		<div class="span3 ">
		test	
		</div>
		<div class="span9">
			<div id="myCarousel" class="carousel slide">
				  <!-- Carousel items -->
				  <div class="carousel-inner">
				    <div class="active item">
				    	<img src="http://twitter.github.com/bootstrap/assets/img/bootstrap-mdo-sfmoma-01.jpg" alt="">
					    <div class="carousel-caption">
			              <h4>First Thumbnail label</h4>
			              <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
				        </div>
				    </div>
				    <div class="item">
						<img src="http://twitter.github.com/bootstrap/assets/img/bootstrap-mdo-sfmoma-02.jpg" alt="">
						<div class="carousel-caption">
						  <h4>Second Thumbnail label</h4>
						  <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
						</div>			
					</div>
					<div class="item">
						<img src="http://twitter.github.com/bootstrap/assets/img/bootstrap-mdo-sfmoma-03.jpg" alt="">
						<div class="carousel-caption">
						  <h4>Third Thumbnail label</h4>
						  <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
						</div>
					</div>
				  </div>
				  <!-- Carousel nav -->
				  <a class="carousel-control left" href="#myCarousel" data-slide="prev">&lsaquo;</a>
				  <a class="carousel-control right" href="#myCarousel" data-slide="next">&rsaquo;</a>
				
			</div>	
		</div>
	</div>
	
</div>




<script type="text/javascript" language="Javascript">
	setTimeout(function(){
		$('.carousel').carousel({
		  interval: 2000
		})
	}, 2000);

</script>