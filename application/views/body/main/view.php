<div  id='main' class="container" >

	<div  id='leftMenuBar' class="span1"   >
		<h4  id='homeNav' >Home</h4>
		<h4  id='workNav' >Work</h4>
		<h4  id='clientsNav' >Clients</h4>
		<h4  id='loginNav' >Login</h4>
	</div>
	

	<div  id='homeArea'  class="span10"  style='display:none'  >
		

			<div id="myCarousel" class="carousel slide">
				 
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
				  
				 
				  <a class="carousel-control left" href="#myCarousel" data-slide="prev">&lsaquo;</a>
				  <a class="carousel-control right" href="#myCarousel" data-slide="next">&rsaquo;</a>
			</div>
				

		
	</div>
	<div  id='workArea' class="span10"    > 
		
		<div  id="leftControls" class="span2 fl">
			<div   id='categories' class="accordion" >
				
				<?php
				
					$count = 0;
					
					foreach( $categories  as $category){ ?>
						
	
					<div class="accordion-group" category_idx=<?php echo $count ?> category_id=<?php echo $category['category_id']    ?>>
						<img  class='sort-handle-categories ' src='<?php echo base_url()    ?>img/sort-handle.png'/>
						<div class="accordion-heading">
						  
						  <a idx=<?php echo $count ?> class="accordion-toggle category" data-toggle="collapse" data-parent="#categories" href="#collapse<?php echo $count ?>">
						    <?php echo $category['category_name']    ?>
						  </a>
						</div>
						<div id="collapse<?php echo $count ?>" class="accordion-body collapse " style="height: 0px;">
						  <div class="accordion-inner">
						    <ul  class="category-ul" >
						    	<?php foreach( $category['assets']  as $asset){ ?>
						    	
										<li asset_id=<?php echo $asset['asset_id']     ?>  category_id=<?php echo $category['category_id']    ?> >
										<?php echo $asset['asset_name']     ?>
										</li>
										
						    	<?php } ?>
						    	
						    	
						    	<?php if( !$category['assets'] ){?>
						    	
						    		<li   style='visibility:hidden;'  >test</li>
						    	
						    	<?php } ?>
						    </ul>
						  </div>
						</div>
					</div>
										
								
				
				
				<?php
				
				$count++;
				
				} ?>
				
			</div>
			<div  id='addNewCategory'  href='#edit_category_modal_box'  category_id='-1'><a class="btn btn-small" href="#"><i class="icon-plus-sign"></i>&nbsp;Add New Category </a>
			</div>
		
		</div>
		<div   id="thumb-collection" class="span7 fl">
			<div>
				<h2></h2>
				<span  href='#edit_category_modal_box'  class='editCategoryTitle ' category_idx='' category_id=''>
					<a class="btn btn-small" href="#">
						Edit Category&nbsp;&nbsp;<i class="icon-edit"></i>
					</a>
				</span>	
				
				<span  href='#edit_asset_modal_box'   id='addAsset'>
					<a class="btn btn-small" href="#">
						Add An Asset&nbsp;&nbsp;<i class="icon-edit"></i>
					</a>
				</span>				
				
			</div>
			<div   style='clear:both;height:0px'  ></div>
			<ul  class=' assets_ul'   id='thumb-collection-ul' >
	
				<?php foreach( $categories[0]['assets']  as $asset){ ?>
				
					<li asset_id=<?php  echo $asset['asset_id']   ?>   category_id=<?php  echo $categories[0]['category_id']   ?>  class=' draggable ' >
						<div  class='dragHandle ' >
						</div>
						<div  asset_id=<?php  echo $asset['asset_id']   ?>  category_id=<?php  echo $categories[0]['category_id']   ?> class='play '   style='background:url(<?php echo base_url().'/uploads/'. $asset['asset_id'].'/thumb/image.jpg?v='.rand(3,123);   ?>) no-repeat;background-position: 0px -45px;background-size: 282px;'  >&nbsp;
						</div>
						<div  class='overlay' >
							<div  class='fl ' >
								<span asset_id=<?php  echo $asset['asset_id']   ?> category_id=<?php  echo $categories[0]['category_id']   ?> class='title' ><?php  echo $asset['asset_name']   ?></span>
							</div>
							<div  class='fr ' >
								<span asset_id=<?php  echo $asset['asset_id']   ?> class='edit '  href='#edit_asset_modal_box' ><i class="icon-edit  icon-white"></i></span>
								<span>&nbsp;&nbsp;&nbsp;</span>
								<span asset_id=<?php  echo $asset['asset_id']   ?> class='delete ' ><i class='icon-trash  icon-white'></i></span>
								
							</div>
						</div>
					</li>
						
				<?php } ?>
				<!-- <li href='#edit_asset_modal_box' id='addAsset' >Click to Add Asset</li> -->
				
			</ul>
	
		</div><?php $this->load->view($videoplayer); ?>			     	
		
	</div>

	<div id='clientsArea' >
		<img src='<?php echo base_url()    ?>img/clients.png' />
	</div>
	<div id='loginArea'  class="container">
			<div class="span4 well">
				<legend>Please Sign In</legend>
	          	<div class="alert alert-error">
	                <a class="close" data-dismiss="alert" href="#">×</a>Incorrect Username or Password!
	            </div>
				<form method="POST" action="<?php  echo base_url()   ?>main/validate" accept-charset="UTF-8">
				<input type="text" id="username" class="span4" name="username" placeholder="Username">
				<input type="password" id="password" class="span4" name="password" placeholder="Password">
	
				<button type="submit" class="btn btn-info btn-block">Sign in</button>
				</form>    
			</div>
</div>
