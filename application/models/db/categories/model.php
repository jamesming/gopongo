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

}

