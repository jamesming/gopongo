<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Ajax extends CI_Controller {
	
	function __construct() {
		
		parent::__construct();
		
		$this->assets_model = new Models_Db_Assets_Model;
		
		
	}
	
	function getAll(){
	
		echo "<script>core.categories =".json_encode($this->assets_model->getAll()).";</script>";
	 
	}

	public function getAllCategoriesAndAssets(){  // DEPRECIATED
		
		
		$categories = $this->assets_model->getAllCategoriesAndAssets();
		
		$count1 = 0;
		
		echo "<script>core.categories = [";
		
		foreach( $categories  as  $name => $category){
			if($count1!=0) echo ",";
			echo "{";
			echo "name:'".$name."'";
			echo ",assets:[";
			$count2=0;
			foreach( $category  as  $key => $asset){
				if($count2!=0) echo ",";
				echo "{name:'".$asset['asset_name']."'";
				echo ",asset_id:'".$asset['asset_id']."'";
				echo ",image_url:'http://lorempixel.com/280/159/city/".$count2."'";
				echo "}";
				$count2++;
				$category_id = $asset['category_id'];
			}
			echo "], category_id:".$category_id;
			echo "}";
			$count1++;
		}
		
		echo "];</script>";
		
 	}
 	
 	public function insertAsset(){
 		
 		echo $this->assets_model->insertAsset( $this->input->post() );
 		
 	}
 	
 	public function editAsset(){
 		
 		$post_array = $this->input->post();
 		
 		$asset_id = $post_array['asset_id'];
 		unset( $post_array['asset_id'] );
 		
 		echo $this->assets_model->editAsset($asset_id,  $post_array);
 		
 	}
 	
 	public function deleteAsset(){
 		
 		$this->assets_model->deleteAsset( $this->input->post() );
 	}
 	
 	public function upload(){
 		
 		$post_array = $this->input->post();

 		$this->upload = new Models_Uploads_Assets_Model;
 		$this->upload->save( $post_array );
 		
 	} 
}
