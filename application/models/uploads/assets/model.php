<?php

class Models_Uploads_Assets_Model extends Models_Uploads {

	const FILE = 'path';
	
	public $user_id;
	public $title;
	public $filename;
	public $path;
	public $name;
	public $alt;
	public $description;
	

	
	public function save( $post_array ) {
		
		$this->_create_directories($post_array);
		
//		@unlink($this->filepath());
		
		get_instance()->load->library('upload', array(
			'file_name' => 'image.jpg',
			'upload_path' => $this->upload_path( $post_array ),
			'allowed_types' => 'jpg|jpeg',
			'max_size' => '1000000',
			'max_width' => '2000',
			'max_height' => '2000',
		));
		
		if ( ! get_instance()->upload->do_upload('filename')) {
			?>
			<script type="text/javascript" language="Javascript">
				alert('error');	
			</script>
			<?php     
		}

		return TRUE;
	}
	
	public function upload_path( $post_array ) {
		return "uploads/thumbs/".$post_array['asset_id']."/";
	}
	
	public function filepath() {
		return $this->upload_path()."/$this->filename";
	}
	
	public function file_url() {
		return base_url().$this->filepath();
	}
	
	public function file_exists() {
		return file_exists($this->filepath());
	}
	
	protected function _create_directories($post_array) {
		
			@mkdir("uploads", 0755, TRUE);
			@mkdir("uploads/videos", 0755, TRUE);
			@mkdir("uploads/thumbs", 0755, TRUE);
			@mkdir("uploads/thumbs/".$post_array['asset_id']."/", 0755, TRUE);
			@mkdir("uploads/videos/".$post_array['asset_id']."/", 0755, TRUE);

	}
	

	
}
