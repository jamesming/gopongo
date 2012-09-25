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
		</div>
	</div>
	<div   id='thumb-collection' class="span9">
		<div>
			<h2></h2>
			<span  href='#edit_category_modal_box'  class='editTitle ' category_idx='' category_id=''>edit</span>
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
