<?php

class Models_Db_Assets_Model extends Database {
		
	public function getAllCategoriesAndAssets($where_array = array()){
		
		$join_array = array(
						'assets' => 'assets.category_id = categories.id'
						);	
											
		
		$_categories =  $this->select_from_table_left_join( 
					 $table = 'categories' 
					,$select_what = '
						  categories.id as category_id
						, categories.name as category_name
						, assets.id as asset_id
						, assets.name as asset_name '
					,$where_array
					,$use_order = TRUE
					,$order_field = 'categories.id'
					,$order_direction = 'asc'
					,$limit = -1
					,$use_join = TRUE
					,$join_array
					);
					
					
		if( empty($_categories) ){
			return array();
		};
		
		$_categories = $this->object_to_array($_categories);
		
		$categories_ids = array();
		$categories_names = array();
		
		// get unique elements in nested array.
		foreach ( $_categories  as $_category){
			if (!in_array($_category['category_id'], $categories_ids)){
				 array_push($categories_ids, $_category['category_id']);
				 array_push($categories_names, $_category['category_name']);
			};
		}
		
		$length_categories_ids = count($categories_ids);
		
		for($i=0 ; $i < $length_categories_ids; $i++){
			
				foreach( $_categories  as $_category){
					
					if(    $categories_ids[$i] == $_category['category_id']
							&& !empty($_category['asset_id'])
							){
						
							$asset['asset_id'] = $_category['asset_id'];
							$asset['asset_name'] = $_category['asset_name'];
							$asset['category_id'] = $_category['category_id'];
							$asset['category_name'] = $_category['category_name'];										
							
							$bag[] = $asset;
							 
							$assets[$categories_names[$i]] = $bag;									
						
					};
					
				}
				unset($asset, $bag);
		}
		
		return $assets;
	}
	
	
	public function insertAsset($post_array){
		
		return $this->insert_table(
			$table = 'assets', 
			$insert_what = array(
				 'name' => $post_array['name']
				,'category_id' => $post_array['category_id']
			)
		);
		
	}
	
	public  function deleteAsset($post_array){
		
		$this->delete_from_table(
			$table = 'assets', 
			$where_array = $post_array
		);
		
	}
}
