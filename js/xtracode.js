 		,leftControls: function(){

			$('.category').live('click', function(event) {
				
				$('#thumb-collection').show();
				$('#video_container').hide();
				$('#thumb-collection-ul').empty();			
				
				core.category_idx  = $(this).attr('idx');
				
				var  url = window.base_url  + 'index.php/ajax/getAssets';
				url += '?category_id=' + core.categories[core.category_idx].category_id;
				url += '&category_idx=' + core.category_idx;

				$('#json').load(url, function(){
					
					var addAssetsLiToCategoryUL = function(){
						if( $('.accordion-group[category_id=' + core.categories[core.category_idx].category_id + '] .category-ul li').length == 0
							&& core.categories[core.category_idx].assets.length > 0
						){
							for(var assetIdx in core.categories[core.category_idx].assets){
								core.create.category_li.add(
									core.category_idx, 
									core.categories[core.category_idx].assets[assetIdx])
							};	
							
							$('.accordion-group[category_id=' + core.categories[core.category_idx].category_id + '] .collapse')	
							.collapse();
							console.log('hapening');
							
						};
						
					};
					
					addAssetsLiToCategoryUL();

					core.create.asset.init(core.category_idx);
					
					$('#thumb-collection h2').html(core.categories[core.category_idx].category_name);
					
					$('#thumb-collection .editCategoryTitle').attr({'category_id':core.categories[core.category_idx].category_id,'category_idx':core.category_idx});
					
					core.misc.showHideButtonBasedOnNumofAssets();
					
					core.bindElements.model.assets.editAsset.init();
					
					
					$('#thumb-collection-ul .play[asset_id=' + core.asset_id + ']').css({border:'5px solid #5888D5'});					
					
					
				});	
				
			});		
			
			
			$('#categories li').click(function(event) {	
					
					if( core.user_id == 1 ){
						
						 	core.misc.playVideo( $(this) );
								
					}else{
						
						 	core.misc.playYouTube( $(this) );
									
					};

			});	
			
		}
		
		
		[{"user_id":"1","category_id":"66","category_name":"Carousel","assets":[{"asset_id":"581","asset_description":"","asset_name":"two"},{"asset_id":"580","asset_description":"","asset_name":"test"},{"asset_id":"582","asset_description":"","asset_name":"three"},{"asset_id":"583","asset_description":"","asset_name":"test"}]},{"user_id":"1","category_id":"1","category_name":"Animation","assets":[]},{"user_id":"1","category_id":"2","category_name":"Cable","assets":[{"asset_id":"463","asset_description":"","asset_name":"Peanuts"},{"asset_id":"444","asset_description":"","asset_name":"Second Video"}]},{"user_id":"1","category_id":"3","category_name":"Children's","assets":[]},{"user_id":"1","category_id":"4","category_name":"Digital Content","assets":[]},{"user_id":"1","category_id":"5","category_name":"Integrated","assets":[]},{"user_id":"1","category_id":"6","category_name":"Network","assets":[]},{"user_id":"1","category_id":"7","category_name":"Shoot","assets":[]},{"user_id":"1","category_id":"8","category_name":"Presentations","assets":[]}] 