<?php

class Models_Db_Assets_Model extends Database {
	
	public function getAll(){
		

		$this->upload = new Models_Up_Assets_Model;
		
		$join_array = array(
			'assets' => 'assets.category_id = categories.id'
		);	
											
		
		$categories_raw =  $this->select_from_table_left_join( 
					 $table = 'categories'
					,$select_what = '
						  categories.user_id as user_id
						, categories.id as category_id
						, categories.name as category_name
						, assets.id as asset_id
						, assets.youtube_url as youtube_url
						, assets.description as asset_description
						, assets.youtube_thumb as youtube_thumb
						, assets.duration as duration
						, assets.name as asset_name '   
					,$where_array = array(
						'user_id =' => (  $this->session->userdata['user_id'] == 1 ? 1 : 2 ) 
					)
					,$use_order = TRUE
					,$order_field = 'categories.order asc, assets.order asc'
					,$order_direction = ''
					,$limit = -1
					,$use_join = TRUE
					,$join_array
					);
					
					
		$categories_raw = $this->object_to_array($categories_raw);
		

		$count = 0;

		$previous_id = 0;
		
		foreach( $categories_raw  as $key =>  $category){
			$count++;
			if( $category['category_id'] == $previous_id || $previous_id == 0){

					foreach( $category  as  $field => $value){
		 
		 
						 	if (!in_array($field, array('asset_id', 'asset_name', 'asset_description', 'youtube_url', 'youtube_thumb', 'duration'))){
						 			$category_array[$field] = $value;
							}else{
									
									if( $field =='asset_id'){
										$grouped_asset['asset_id'] = $value;
									}elseif( $field =='asset_name'){
										$grouped_asset['asset_name'] = $value;
									}elseif( $field =='asset_description'){
										$grouped_asset['asset_description'] = $value;	
									}elseif( $field =='user_id'){
										$grouped_asset['user_id'] =  $value;
									};
									
									
									
							};
					}
					
					$assets[] = $grouped_asset;
					unset($grouped_asset);

			}else{

					$category_array['assets'] = ( isset($assets[0]['asset_id'] ) ? $assets : array());	
					unset($assets);							

					$categories[] = $category_array;	

					foreach( $category  as  $field => $value){
		 
						 	if (!in_array($field, array('asset_id', 'asset_name', 'asset_description', 'youtube_url', 'youtube_thumb', 'duration'))){
						 			$category_array[$field] = $value;
							}else{
								
									if( $field =='asset_id'){
										$grouped_asset['asset_id'] = $value;
									}elseif( $field =='asset_name'){
										$grouped_asset['asset_name'] = $value;
									}elseif( $field =='asset_description'){
										$grouped_asset['asset_description'] = $value;	
									}elseif( $field =='user_id'){
										$grouped_asset['user_id'] =  $value;
									};

									
							};
						
					}		
					
					$assets[] = $grouped_asset;
					unset($grouped_asset);								
			};

			
			$previous_id = $category['category_id'];		
			

		}
		
		if( $count ==  count($categories_raw) ){

						$category_array['assets'] = ( isset($assets[0]['asset_id'] ) ? $assets : array());			
						$categories[] = $category_array;
	
		};
					
		return $this->object_to_array( $categories );
	}
	
	public function getCarousel(){
		
		$join_array = array(
						'assets' => 'assets.category_id = categories.id'
						);	
											
		
		return $this->select_from_table_left_join( 
					 $table = 'categories' 
					,$select_what = '
						  assets.id as asset_id
						, assets.name as asset_name '
					,$where_array = array(
						'carousel' => 1
					)
					,$use_order = TRUE
					,$order_field = 'categories.id'
					,$order_direction = 'asc'
					,$limit = -1
					,$use_join = TRUE
					,$join_array
					);
				
	}	
		
	public function getAllCategoriesAndAssets($where_array = array()){   // DEPRECIATED
		
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
				 'name' => $post_array['asset_name']
				,'category_id' => $post_array['category_id']
				,'order' => $post_array['order']
			)
		);
		
	}
	
	public function editAsset($asset_id, $post_array){
		
		
		if( $this->session->userdata['user_id'] == 1){
			
					return $this->update_table(
						$table = 'assets',
						$primary_key = $asset_id, 
						$set_what_array = array(
							  'name' => $post_array['asset_name']  
							 ,'description' => $post_array['asset_description']
						)
					);				
		}else{
			
					$this->upload = new Models_Up_Assets_Model;
					$youtube_id = $this->upload->extract_video_id_from_youtube_url($post_array['asset_youtube_url']);
					$youtube_thumb = $this->upload->get_thumbnail_from_youtube_video_id($youtube_id);
					$youtube_array = $this->upload->getVideoDataFromYouTube( $youtube_id );
					
					$this->update_table(
						$table = 'assets',
						$primary_key = $asset_id, 
						$set_what_array = array(
							  'youtube_url' => $post_array['asset_youtube_url']
							 ,'youtube_id' => $youtube_id
							 ,'youtube_thumb' => $youtube_thumb
							 ,'name' => ( $post_array['asset_name'] !='' ? $post_array['asset_name'] :$youtube_array['data']['title'] )
							 ,'duration' => $youtube_array['data']['duration']
						)
					);
					
					return $youtube_id;			
			
			
		};
		
		
	}
	
	public  function deleteAsset($post_array){
		
		$dir_path = 'uploads/'  .  $post_array['id'] . '/';
		
		$this->upload = new Models_Up_Assets_Model;
		
		$this->upload->recursiveDelete($dir_path);
		
		$this->delete_from_table(
			$table = 'assets', 
			$where_array = $post_array
		);
		
	}
	
	public function reorderOneAsset($asset_id, $category_id,  $post_array){

		$this->update_table(
			$table = 'assets',
			$primary_key = $asset_id, 
			$set_what_array = array(
				'order' => $post_array['order']
			)
		);
		
		$this->reorderAssets($category_id, $post_array['direction']);
			
	}
	
	public function reorderAssets($category_id, $direction = 'asc'){
		
		$assets = $this->object_to_array(
			$this->select_from_table( 
			$table = 'assets', 
			$select_what = "id, order, updated", 
			$where_array = array(
				'category_id' => $category_id
			), 
			$use_order = TRUE, 
			$order_field = 'order asc, updated '. $direction, 
			$order_direction = '', 
			$limit = -1
			));
			
		$order = 0;	
			
		foreach( $assets  as  $key => $asset){
			
			$this->update_table( 
				$table = 'assets', 
				$primary_key = $asset['id'], 
				$set_what_array =
					array(
						'order' => $order 
					)
				);
				
			$order++;
			
		}
		
	}
	
	public  function clear_table_of_empty_records_flagged_with_update_field_equals_0000(){
		
		$this->upload = new Models_Up_Assets_Model;
		
		$assets = $this->object_to_array($this->select_from_table( 
			$table = 'assets', 
			$select_what = "id", 
			$where_array = array(
						'updated' => '0000-00-00 00:00:00' 
				)));
		
		
		foreach( $assets  as  $asset){
			
			$this->upload->recursiveDelete( 'uploads/' . $asset['id'].'/'  );

		}
		
		$this->delete_from_table(
		$table = 'assets', 
		$where_array = array(
					'updated' => '0000-00-00 00:00:00' 
			)
		);
		
		
	}
	
	public function moveAssetToCategory($asset_id,  $post_array ){
		
		$size = $this->count_records( 
			 $table = 'assets'
			,$where_array = array(
				'category_id' => $post_array['category_id'])
			);

		return $this->update_table(
			$table = 'assets',
			$primary_key = $asset_id, 
			$set_what_array = array(
				  'category_id' => $post_array['category_id']
				 ,'order' => $size
			)
		);
	}

}
