<div  id='workArea' class="rightArea fl"     style='display:none'  > 
	<div  class='wrapper ' >
		<div  id="leftControls" class=" fl">
			<div   id='categories' class="accordion" >
				
				<?php
				
					$count = 0;
					
					foreach( $categories  as $key => $category){ ?>
						
								
					<div class="accordion-group "category_idx=<?php echo $count ?> category_id=<?php echo $category['category_id']    ?>>
						<img  class='sort-handle-categories ' src='<?php echo base_url()    ?>img/sort-handle.png'/>
						<div class="accordion-heading">
						  
						  <a idx=<?php echo $count ?> class="accordion-toggle category" data-toggle="collapse" data-parent="#categories" href="#collapse<?php echo $count ?>">
						   <span  class='Gotham ' ><?php echo $category['category_name']    ?></span>
						  </a>
						</div>
						<div id="collapse<?php echo $count ?>" class="accordion-body collapse " style="height: 0px;">
						  <div class="accordion-inner">
						    <ul  class="category-ul" >
						    	<?php foreach( $category['assets']  as $asset){ ?>
						    	
										<li class='Gotham' asset_id=<?php echo $asset['asset_id']     ?>  category_id=<?php echo $category['category_id']    ?> ><?php echo $asset['asset_name']     ?></li>
										
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
		<div   id="thumb-collection" class="fl">
			<div  class='edit_container ' >
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
	
				<?php foreach( $categories[1]['assets']  as $asset){ ?>
				
					<li asset_id=<?php  echo $asset['asset_id']   ?>   category_id=<?php  echo $categories[0]['category_id']   ?>  class=' draggable ' >
						<div  class='dragHandle ' >
						</div>
						<div  asset_id=<?php  echo $asset['asset_id']   ?>  category_id=<?php  echo $categories[0]['category_id']   ?> class='play shadowOnDiv'   style='background:url(<?php echo base_url().'/uploads/'. $asset['asset_id'].'/thumb/image.jpg?v='.rand(3,123);   ?>) no-repeat;background-position: 0px -45px;background-size: 282px;'  >&nbsp;
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
</div>