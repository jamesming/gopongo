<?php

class Models_Up_Assets_Model extends Models_Up {

	public function saveXXX($post_array){
		
		$this->_create_directories($post_array);
		
		get_instance()->load->library('qquploadedfilexhr');
		
		$allowedExtensions = array("jpg", "JPG", "mp4");
		
		$sizeLimit = 10000 * 1024 * 1024; // max file size in bytes
		
		$uploader = new qqFileUploader($allowedExtensions, $sizeLimit);
		
		$result = $uploader->handleUpload(  $this->upload_path( $post_array )  );
		
		echo '<pre>';print_r(  $result  );echo '</pre>';
		
	}
	
	public function save( $post_array ) {
		
		sleep(2);
		
		$this->recursiveDelete( $this->upload_path( $post_array ));
		
		$this->_create_directories($post_array);
		
		get_instance()->load->library('upload', array(
			'file_name' => $post_array['target_name'],
			'upload_path' => $this->upload_path( $post_array ),
//			'allowed_types' => ( $post_array['target_folder'] == 'thumb' ? 'jpg|jpeg':'m4v|mp4|avi|mpeg|3gp'),
			'allowed_types' => '*',
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
			
			
			if( $post_array['target_folder'] == 'thumb' ){?>
			
					<script type="text/javascript" language="Javascript">
						var img_src = '<?php  echo base_url() . $this->upload_path( $post_array );   ?>/image.jpg';
						window.parent.$('#zoom_content .thumb_img').attr('src', img_src);
					</script>			
			
			
			<?php }else{?>
			
					<script type="text/javascript" language="Javascript">
						var img_src = '<?php  echo base_url() . $this->upload_path( $post_array );   ?>/image.jpg';
						window.parent.$('#zoom_content .video_input_field').val('').css({background:'lightgreen'})
					</script>				
			
			<?php } 
			
				
			
		}

		return TRUE;
	}
	
	public function upload_path( $post_array ) {
		return "uploads/" . $post_array['asset_id'] ."/".$post_array['target_folder']."/";
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
		
			@mkdir("uploads/".$post_array['asset_id']."/thumb/", 0755, TRUE);
			@mkdir("uploads/".$post_array['asset_id']."/video/", 0755, TRUE);

	}
	
	
	public function extract_video_id_from_youtube_url($youtubeurl) {
		
		if(strlen($youtubeurl)) {
			
			//** TAKEN FROM http://stackoverflow.com/questions/3392993/php-regex-to-get-youtube-video-id
			parse_str( parse_url( $youtubeurl, PHP_URL_QUERY ) );
			return $v;

		}
	
	}
	
	
	public function get_thumbnail_from_youtube_video_id($video_id){
		
		//http://stackoverflow.com/questions/6808013/get-the-youtube-video-thumbnail-from-youtube-video-url-using-php
	
		$thumbnail_array[0] = "http://img.youtube.com/vi/";
		$thumbnail_array[1] = $video_id;
		$thumbnail_array[2] = "/0.jpg";
		return $thumbnail_array[0].$thumbnail_array[1].$thumbnail_array[2];
	}
	
	
	public function getDuration($url){
		
		// http://stackoverflow.com/questions/9167442/get-duration-from-a-youtube-url

        parse_str(parse_url($url,PHP_URL_QUERY),$arr);
        $video_id=$arr['v']; 


        $data=@file_get_contents('http://gdata.youtube.com/feeds/api/videos/'.$video_id.'?v=2&alt=jsonc');
        if (false===$data) return false;

        $obj=json_decode($data);

        return $obj->data->duration;
    }
}
