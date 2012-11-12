<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Ajax extends CI_Controller {
	
	function __construct() {
		
		parent::__construct();
		
		$this->assets_model = new Models_Db_Assets_Model;
		
		$this->categories_model = new Models_Db_Categories_Model;
	}
	
	public function getAll(){
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
 	
 	public function editCategory(){
 		
 		$post_array = $this->input->post();
 		
 		$category_id = $post_array['category_id'];
 		unset( $post_array['category_id'] );
 		
 		echo $this->categories_model->editCategory($category_id,  $post_array);
 	}
 	
 	public function insertCategory(){
 		
 		$post_array = $this->input->post(); 
 		
 		echo $this->categories_model->insertCategory($post_array);		
 		
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

 		$this->upload = new Models_Up_Assets_Model;
 		$this->upload->save( $post_array );
 		
 	} 
 	
 	public function moveAsset(){
 		
 		$post_array = $this->input->post();
 		
 		$asset_id = $post_array['asset_id'];
 		unset( $post_array['asset_id'] ); 		
 		echo $this->assets_model->moveAssetToCategory($asset_id,  $post_array );
 		
 	}
 	
 	public function reorderOneCategory(){
 		
 		$post_array = $this->input->post();
 		
 		$category_id = $post_array['category_id'];
 		unset( $post_array['category_id'] ); 		

 		echo $this->categories_model->reorderOneCategory($category_id, $post_array);
 	}
 	
 	public function reorderCategories(){
 		
 		echo '<pre>';print_r(  $this->categories_model->reorderCategories() );echo '</pre>';  exit;
 		
 	} 	
 	
 	public function reorderOneAsset(){
 		
 		$post_array = $this->input->post();
 		
 		$asset_id = $post_array['asset_id'];
 		unset( $post_array['asset_id'] ); 		
 		
 		$category_id = $post_array['category_id'];
 		unset( $post_array['category_id'] );
 		
 		echo $this->assets_model->reorderOneAsset($asset_id, $category_id, $post_array);
 	}
 	
 	public function reorderAssets(){
 		
 		$post_array = $this->input->post();
 		
 		echo '<pre>';print_r(  $this->assets_model->reorderAssets( $post_array['category_id']) );echo '</pre>';  exit;
 		
 	}
 	
 	public function testPostToIframe(){
 		echo "testing this thing";
 		
 	}
}
