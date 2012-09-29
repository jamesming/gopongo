<?php

class Models_Db_Categories_Model extends Database {
	
	
	function __construct() {
		
		parent::__construct();
		
		
	}
		
	public function editCategory($category_id, $post_array){
		
		return $this->update_table(
			$table = 'categories',
			$primary_key = $category_id, 
			$set_what_array = array(
				  'name' => $post_array['category_name']
			)
		);
		
	}
	
	public function insertCategory($post_array){
		return $this->insert_table(
			$table = 'categories', 
			$insert_what = array(
				 'name' => $post_array['category_name']
			)
		);
		
	}

}

