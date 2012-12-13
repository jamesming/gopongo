	<div  id='homeArea'  class="fl rightArea" >
		

			<div id="myCarousel" class="carousel slide shadowOnDiv">
				 
				  	<div class="carousel-inner">
						<?php foreach( $carousels  as  $key => $carousel){?>
							<div class="item<?php if($key == 0){ echo ' active ';};    ?>" >
								<img play_asset_id=<?php echo $carousel->asset_link    ?> src="<?php echo base_url().'uploads/' . $carousel->asset_id . '/thumb/image.jpg?v=' . rand(5,12312) . ';'    ?>" alt="" ></img>
							    <div class="carousel-caption">
							      <h4><?php echo $carousel->asset_name    ?></h4>
							      <p><?php echo $carousel->asset_description    ?></p>
							    </div>
							</div>
						
						<?php } ?>
					</div>
				  
				 
				  <a class="carousel-control left" href="#myCarousel" data-slide="prev"></a>
				  <a class="carousel-control right" href="#myCarousel" data-slide="next"></a>
			</div>
				

		
	</div>