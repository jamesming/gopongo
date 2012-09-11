<?php

class Models_Uploads_Assets_Model extends Models_Uploads {

	public function saveXXX($post_array){
		
		$this->_create_directories($post_array);
		
		get_instance()->load->library('qquploadedfilexhr');
		
		$allowedExtensions = array("jpg", "JPG", "mp4");
		
		$sizeLimit = 10000 * 1024 * 1024; // max file size in bytes
		
		$uploader = new qqFileUploader($allowedExtensions, $sizeLimit);
		
		$result = $uploader->handleUpload(  $this->upload_path( $post_array )  );
		
		echo '<pre>';print_r(  $result  );echo '</pre>';  exit;
		
	}
	

	
	public function save( $post_array ) {
		
		$this->recursiveDelete( $this->upload_path( $post_array ));
		
		$this->_create_directories($post_array);
		
		get_instance()->load->library('upload', array(
			'file_name' => $post_array['target_name'],
			'upload_path' => $this->upload_path( $post_array ),
			'allowed_types' => ( $post_array['target_folder'] == 'thumbs' ? 'jpg|jpeg':'mp4|avi|mpeg|3gp'),
			'max_size' => '1000000000000000'/*,
			'max_width' => '2000',
			'max_height' => '2000',*/
		));
		
		if ( ! get_instance()->upload->do_upload('filename')) {
			?>
			<script type="text/javascript" language="Javascript">
				alert('<?php echo get_instance()->upload->display_errors()    ?>');	
			</script>
			<?php     
		}else{
			?>
			<script type="text/javascript" language="Javascript">
				alert('Success');	
			</script>
			<?php  			
			
		}

		return TRUE;
	}
	
	public function upload_path( $post_array ) {
		return "uploads/" . $post_array['target_folder'] ."/".$post_array['asset_id']."/";
	}
	
/*	public function filepath() {
		return $this->upload_path()."/$this->filename";
	}
	
	public function file_url() {
		return base_url().$this->filepath();
	}
	
	public function file_exists() {
		return file_exists($this->filepath());
	}*/
	
	protected function _create_directories($post_array) {
		
			@mkdir("uploads", 0755, TRUE);
			@mkdir("uploads/videos", 0755, TRUE);
			@mkdir("uploads/thumbs", 0755, TRUE);
			@mkdir("uploads/thumbs/".$post_array['asset_id']."/", 0755, TRUE);
			@mkdir("uploads/videos/".$post_array['asset_id']."/", 0755, TRUE);

	}
	

	
}
