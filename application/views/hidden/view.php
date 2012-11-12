<?php
	if( isset($edit) ){
		$this->load->view('hidden/modal/edit_asset_form_view');
		$this->load->view('hidden/modal/edit_category_form_view');
		?>
		<iframe  id='iframe_upload'  name='iframe_upload' style='width:0px;height:0px' src='' ></iframe>
		<?php     
	};
?>	

<?php $this->load->view('hidden/json/view'); ?>

