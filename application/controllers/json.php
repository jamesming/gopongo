<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Json extends CI_Controller {
	
	function __construct() {
		
		parent::__construct();
		
	}	

	public function index(){
		
		$this->model = new Models_Db_Assets_Model;
		
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
				echo ",image:'http://lorempixel.com/280/159/city/".$count2."'";
				echo "}";
				$count2++;
			}
			echo "]";
			echo "}";
			$count1++;
		}
		
		echo "];</script>";
		
 	}
}
