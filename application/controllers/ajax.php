<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Ajax extends CI_Controller {
	
	function __construct() {
		
		parent::__construct();
		
		$this->model = new Models_Db_Assets_Model;
		
	}	

	public function getAllCategoriesAndAssets(){
		
		
		$categories = $this->model->getAllCategoriesAndAssets();
		
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
 		
 		echo $this->model->insertAsset( $this->input->post() );
 		
 	}
}
