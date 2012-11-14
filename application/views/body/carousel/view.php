<div  class='container ' >
	
	<div  class='row'   style=' background:red;'  >
		
		<div class="span3 ">
		test	
		</div>
		<div class="span9">
			<div id="myCarousel" class="carousel slide">
				 
				  	<div class="carousel-inner">
						<?php foreach( $carousels  as  $key => $carousel){?>
	
							<div class="item<?php if($key == 0){ echo ' active ';};    ?>" >
								<img src="<?php echo base_url().'uploads/' . $carousel->asset_id . '/thumb/image.jpg?v=' . rand(5,12312) . ';'    ?>" alt="" ></img>
							    <div class="carousel-caption">
							      <h4>{{img_title}}</h4>
							      <p>{{img_desc}}</p>
							    </div>
							</div>
						
						<?php } ?>
					</div>
				  
				 
				  <a class="carousel-control left" href="#myCarousel" data-slide="prev">&lsaquo;</a>
				  <a class="carousel-control right" href="#myCarousel" data-slide="next">&rsaquo;</a>
				
		</div>
	</div>
	
</div>
