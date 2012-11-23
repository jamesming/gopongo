<div  id='main' class="container">
  <div class="row">
	<div class="span1">
		<h4>Home</h4>
		<h4>Work</h4>
		<h4>Clients</h4>
		<h4>Login</h4>
	</div>      	
	<div class="span2">
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
					<div id="collapse<?php echo $count ?>" class="accordion-body collapse in">
					  <div class="accordion-inner">
					    <ul  class="category-ul" >
					    	<?php foreach( $category['assets']  as $asset){ ?>
					    	
									<li asset_id=<?php echo $asset['asset_id']     ?>  category_id=<?php echo $category['category_id']    ?> >
									<?php echo $asset['asset_name']     ?>
									</li>
									
					    	<?php } ?>
					    </ul>
					  </div>
					</div>
				</div>
									
							
			
			
			<?php
			
			$count++;
			
			} ?>
			
		</div>
		<div  id='addNewCategory'  href='#edit_category_modal_box'  category_id='-1'><a class="btn btn-small" href="#"><i class="icon-plus-sign"></i>&nbsp;Add new Category </a>
		</div>
	</div>
	<div   id='thumb-collection' class="span9 fixedRightBody">
		<div>
			<h2></h2>
			<span  href='#edit_category_modal_box'  class='editCategoryTitle ' category_idx='' category_id=''>
				<a class="btn btn-small" href="#">
					Edit Category&nbsp;&nbsp;<i class="icon-edit"></i>
				</a>
			</span>
			<span  class='playAllInCategory ' <?php echo ( $this->session->userdata['user_id'] == 1  ? "   style='display:none'  " : "" );   ?>>
				<!-- <a class="btn btn-small" href="#"> -->
					Play Category&nbsp;&nbsp;<i class=" icon-play"></i>
				<!-- </a> -->
			</span>			
		</div>
		<div   style='clear:both;height:0px'  ></div>
		<ul  class=' assets_ul'   id='thumb-collection-ul' >
		</ul>
		<ul>
			<li href='#edit_asset_modal_box' id='addAsset' >Click to Add Asset</li>
		</ul>
	</div><?php $this->load->view($videoplayer); ?><?php $this->load->view($youtube); ?><?php $this->load->view($jcrop); ?>	
  </div>
</div>
