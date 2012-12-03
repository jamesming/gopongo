_.extend(core, {
	
	 start: function(){
	 	
		var  that = this
			,url = window.base_url  + 'index.php/ajax/getAll';
		
		this.misc.setFooterAbsoluteIfWindowHeightGreaterThanBodyHeight();
		
		$('#json').load(url, function(){
			
//			console.log(JSON.stringify(core.categories));
			
			that.setPropertiesMain();
			
			$('#thumb-collection h2').html(core.categories[0].category_name);

			that.create.init();
			that.bindElements.init();
			
		});	
		
	}

	,setPropertiesMain: function(){
		
		this.user_id = core.categories[0].user_id;
		this.myPlayer = _V_("my_video_1");
		this.submissionModeAssets = 'insert';  // || edit
		this.category_idx = 0; // var category_id = core.categories[core.category_idx].category_id
		this.updateThis = {asset_id:0};  // core.updateThis.asset_id
		this.disableUpload = false;
		this.pongoRed = 'red';
	}

	,create: {
		
		 init: function(){
//			this.category.init();
//			this.asset.init(0);
			this.setFixedRightBody()
		}
		
		,category: {
			
			init: function(){
				
				var count = 0; 
				
				for(var idx in core.categories){
					
					this.add(core.categories[idx].category_id, core.categories[idx].category_name, count);
					
					if( typeof(core.categories[idx].assets) !== "undefined"){
						
						for(var index in core.categories[idx].assets){
							core.create.category_li.add(
								idx, 
								core.categories[idx].assets[index])
						};
					};
					
					count++;
				};
				
				
				$('#thumb-collection h2').html(core.categories[0].category_name);
				
				$('#thumb-collection .editCategoryTitle').attr({'category_id':core.categories[0].category_id,'category_idx':0});

				
			}
			
			,add: function(category_id, category_name, count){
				
					if ( ! core.category_tpl) {
					  core.category_tpl = core.loadTemplate(window.base_url+'js/tpl/category.tpl');
					}		
			
					var tpl = core.category_tpl;
		
					tpl  = tpl.replace(/{{base_url}}/g, window.base_url);
					tpl  = tpl.replace(/{{idx}}/g, count);
					tpl  = tpl.replace(/{{category_name}}/g, category_name);
					tpl  = tpl.replace(/{{category_id}}/g, category_id);
					
					$('#categories').append(tpl);
	
			}
			
		}

		,category_li:{
			
			add: function(idx, li_obj){
				
					if ( ! core.category_li_tpl) {
					  core.category_li_tpl = core.loadTemplate(window.base_url+'js/tpl/category_li.tpl');
					}		
			
					var tpl = core.category_li_tpl;
					
					// li_obj.asset_name = li_obj.asset_name.substring(0, 25);

					tpl  = tpl.replace(/{{asset_name}}/g, li_obj.asset_name);
					tpl  = tpl.replace(/{{asset_id}}/g, li_obj.asset_id);
					tpl  = tpl.replace(/{{category_id}}/g, core.categories[idx].category_id);
					
					$('#categories > div')
					.eq(idx)
					.children('div > div')
					.eq(1).children('div')
					.children('ul')
					.append(tpl);	
				
			}
			
		}
				
		,asset: {
			
			 init: function(category_idx){
			 	var count=0;
				for(var idx in core.categories[category_idx].assets){
					count++;
					this.add(
							 core.categories[category_idx].assets[idx].asset_name
							,core.categories[category_idx].assets[idx].asset_id
							,core.categories[category_idx].category_id
							,count
						);
						
//					setting up first-time ordering of assets						
//					core.order.model.assets.setOne(core.categories[category_idx].assets[idx].asset_id, idx);
				};
				
				core.bindElements.model.assets.dragAsset();
				
			}
			
			,add: function(
					 asset_name
					,asset_id
					,category_id
					,count
				){	
				
				if ( ! core.asset_tpl) {
				  core.asset_tpl = core.loadTemplate(window.base_url+'js/tpl/asset.tpl');
				}		
				
				var tpl = core.asset_tpl;
				
				// asset_name = asset_name.substring(0, 25);
	
				tpl  = tpl.replace(/{{asset_name}}/g, asset_name);
				tpl  = tpl.replace(/{{asset_id}}/g, asset_id);
				
				
				var img_src = window.base_url + 'uploads/'+ asset_id +'/thumb/image.jpg?v=' + Math.random();
				tpl  = tpl.replace(/{{image_thumb}}/g, img_src);
				tpl  = tpl.replace(/{{category_id}}/g, category_id);
				tpl  = tpl.replace(/{{count}}/g, count);
				
				$('#thumb-collection ul.assets_ul').append(tpl);
				
				$('li[asset_id='+asset_id+'] img')
				.on('error', function() {
//				    this.src = 'http://www.placehold.it/280x159';
				})
				//.attr('src', 'uploads/'+asset_id+'/thumb/image.jpg');
				
				
							
			}
			
		}
		
		,setFixedRightBody: function(){
			
			$('.fixedRightBody').css({
					'right':($('body').width() /2 ) - 560
				})
			
		}
		
		,jcrop:{
			 init:function(){
				this.bind();
				
			}
			,bind:function(){
				$('#edit').click(function(event) {
					$('#jcropContainer').toggle();
				});	
			}
		}
		
	}
	
	,order:{
	
		model:{
		
			 assets:{
				
				 setOne: function(asset_id, order, direction){

						var url = window.base_url  + 'index.php/ajax/reorderOneAsset'
							assetObj = {
								 asset_id:asset_id
								,order:order
								,category_id: core.categories[core.category_idx].category_id
								,direction: direction
							};

						$.post(	url,
								assetObj,
								function( data ) {}
						);
					
				}
				
				,setGroup: function(){
					
						var url = window.base_url  + 'index.php/ajax/reorderAssets'
							postObj = {
								 category_id:core.categories[core.category_idx].category_id
							};

						$.post(	url,
								postObj,
								function( data ) {}
						);
					
				}
				
			}
			
			,categories:{
			
				 setOne: function(category_id, order, direction){

						var url = window.base_url  + 'index.php/ajax/reorderOneCategory'
							categoryObj = {
								 category_id:category_id
								,order:order
								,direction: direction
							};

						$.post(	url,
								categoryObj,
								function( data ) {
									
								console.log(data);
									
								}
						);
					
				}
				
				,setGroup: function(){
					
						var url = window.base_url  + 'index.php/ajax/reorderCategories'
							postObj = {};

						$.post(	url,
								postObj,
								function( data ) {}
						);
					
				}
			}
		}	
		
	}
	
	,bindElements: {
		
		 init: function(){
		 	
		 	this.nav.init()

			this.model.categories.init();
			this.model.assets.init();
			
			this.leftControls();
			
			this.upload.thumb();
			this.upload.video();
			this.upload.form();
			this.carousel_images()
			
			this.resizeWindow();

		}
		
		,nav:{
			 init:function(){
				this.home();
				this.work();
				this.clients();
				this.login();
			}
			
			,activateLeftItem: function($this){
				$('#leftMenuBar h4').css({color:'#333333'});
				$this.css({color:core.pongoRed});	
			}
			
			,home:function(){
				
				$('#homeNav').click(function(event) {
					core.bindElements.nav.activateLeftItem($(this));
					$('#clientsArea').hide();
					$('#workArea').hide();
					$('#homeArea').show().css({color:core.pongoRed});
					$('#loginArea').hide();
				});	
				
			}
			,work:function(){
				
				$('#workNav').click(function(event) {
					core.bindElements.nav.activateLeftItem();
					$('#workArea').show();
					$('#homeArea').hide();
					$('#clientsArea').hide();
					$('#loginArea').hide();
				});					
			}
			
			,clients:function(){
				
				$('#clientsNav').click(function(event) {
					core.bindElements.nav.activateLeftItem();
					$('#clientsArea').show();
					$('#homeArea').hide();
					$('#workArea').hide();
					$('#loginArea').hide();
				});					
				
			}
			
			,login: function(){
				
				$('#loginNav').click(function(event) {
					$('#clientsArea').hide();
					$('#homeArea').hide();
					$('#workArea').hide();
					$('#loginArea').show();
				});						
				
				
			}
			
			
		}
		

		
		,model:{
			
			 categories:{
			
				init: function(){	
					this.insertNewCategory();
					this.editCategory();
					this.playCategory();
					this.sortCategories();
				}
				
				,insertNewCategory: function(){		
					
					$('#addNewCategory').fancyZoom({},function(el){

						$('#zoom .submit_category_form').click(function(event) {
							
							
							
								var categoryObj = {
									  category_name: $('#zoom .category_name').val()
									 ,order: core.categories.length + 1
								};
								
					 			var url = window.base_url  + 'index.php/ajax/insertCategory';
					 			
								$.post(	url,
										categoryObj,
										function( insert_id ) {
											
												var count_catgeories = core.categories.length;
												
												core.create.category.add(
														  insert_id
														, categoryObj.category_name
														, count_catgeories); 
														
														
												_.extend(categoryObj, {
														 assets:[]
														,category_id: insert_id
													});
														
												delete categoryObj.order;
												
												core.categories.push(categoryObj);	
												
														
												$('body').click();
				
										}
								);
									
						});


			
						
					});
					
					
				}		
				
				,editCategory: function(){
					
					$('#thumb-collection .editCategoryTitle').fancyZoom({},function(el){
				
						$('#zoom .category_name').val(core.categories[core.category_idx].category_name);
						
						$('#zoom .submit_category_form').click(function(event) {
							
								var categoryObj = {
									 category_id:$(el).attr('category_id')
									,category_name: $('#zoom .category_name').val()
								};
								
					 			var url = window.base_url  + 'index.php/ajax/editCategory';
					 			
								$.post(	url,
										categoryObj,
										function( data ) {
											
												core.categories[core.category_idx].category_name = categoryObj.category_name;
												
												$('#thumb-collection h2').html( categoryObj.category_name );
												
												$('.accordion-group a.category[idx=' + core.category_idx + ']').html( categoryObj.category_name );
												
												$('body').click();
				
										}
								);
									
						});	
						
					});
					
				}
				

				,playCategory: function(){
					
					$('.playAllInCategory').live('click', function(event) {
						
						core.playlist = [];
						core.playlistIdx  = 0; 
						
						for(var key in core.categories[core.category_idx].assets){
							
							core.playlist.push({
								 asset_id: core.categories[core.category_idx].assets[key].asset_id
								,youtube_id: core.categories[core.category_idx].assets[key].youtube_id	
							});
						
						}
						
						core.misc.playCategory();
						
							
					});	
					
				}
				
				,sortCategories: function(){			
						$( "#categories" ).sortable({ 
								 revert: "invalid" 
								,handle:".sort-handle-categories"
								,opacity: 0.7
								,helper: "clone"
								,start: function(event, ui) {
									
								    var start_pos = ui.item.index();
								    ui.item.data('start_pos', start_pos);
								    

								    
								}
								,update: function(event, ui) {
									
								    var start_pos = ui.item.data('start_pos');
								    var end_pos = $(ui.item).index();
								    
								    if( start_pos > end_pos){
								    	var direction = 'desc';
								    }else{
								    	var direction = 'asc';
								    };
								    
								    var  category_id = $(ui.item).attr('category_id')
								    	,order = $(ui.item).index()								    
								    
									core.order.model.categories.setOne(category_id, order, direction);								    
								    
								   	// console.log(start_pos, end_pos);
								    
								}
							}
						);
						$( "#categories" ).disableSelection();
											
				}
			}				
			
			,assets:{
				
				 init: function(){	
					this.insertAsset();
					this.editAsset.init();
					this.deleteAsset();
					this.playAsset();
					this.dragAsset();
					this.formSubmission.init();
					
				}
				
				,insertAsset: function(){
					
					$('#addAsset').fancyZoom({},function(){
						
						core.submissionModeAssets = 'insert';
						
			 			var  url = window.base_url  + 'index.php/ajax/insertAsset'
			 				,assetObj = {
									 asset_name:''
									,category_id:core.categories[core.category_idx].category_id
									,order:core.categories[core.category_idx].assets.length									
								};
			 			
						$.post(	url,
								assetObj,
								function(insert_id) {
									
									core.updateThis = {
										asset_id:insert_id	
									};
									
								});
						
					});	
						
				}
				
				,editAsset: {
						
						 init: function(){
						 	
						 	this.fancyZoomThis( $('.edit') );
						 	
						}
						
						,fancyZoomThis: function( $el ){
							
							$el.fancyZoom({}, function(el){
								
								var	 asset_id = $(el).attr('asset_id')				
									,idx_assets_array = core.findIndexInArrayOfObjects( 
														 core.categories[core.category_idx].assets
														,function( item ){
															if( item.asset_id === asset_id) return true;
														});	
														
														
								
								$('#zoom_content .asset_name').val(core.categories[core.category_idx].assets[idx_assets_array[0]].asset_name);
								$('#zoom_content input.asset_link').val(core.categories[core.category_idx].assets[idx_assets_array[0]].asset_link);
								
								$('#zoom_content img')
								.on('error', function() {
								    //this.src = 'http://www.placehold.it/280x150';
								})
								.attr('src', window.base_url + 'uploads/'+asset_id+'/thumb/image.jpg?v=' +  Math.random());
								
								core.submissionModeAssets = 'edit';
								
								if( core.category_idx == 0){
									
									$('#zoom_content .oh .input-append').hide();
									$('#zoom_content .control-group.asset_link').show();
									
									
								}else{
									$('#zoom_content .oh .input-append').show();
									$('#zoom_content .control-group.asset_link').hide();
								};
								
								core.updateThis = {
									asset_id:asset_id 	
								};
								
		
							});
							
						}
					
				}
				
				,deleteAsset: function(){
					
					$('.delete').live('click', function(event) {
						
						var agree=confirm("Are you sure you want to delete this asset?");
						if (!agree){
							return false ;
						};						
						
						var	 asset_id = $(this).attr('asset_id')
							,assetObj = {id: asset_id};
						
			 			url = window.base_url  + 'index.php/ajax/deleteAsset';
			 			
						$.post(	url,
								assetObj,
								function(data) {
								
									$('li[asset_id='+asset_id+']').remove();
									
									var idx_assets_array = core.findIndexInArrayOfObjects( 
										 core.categories[core.category_idx].assets
										,function( item ){
											if( item.asset_id === asset_id) return true;
										}
									);							
									
									core.categories[core.category_idx].assets.splice(idx_assets_array[0], 1);
									
									
									
								}
						);	
						
					});	
					
				}						
				
				,playAsset: function(){

					$('.play').live('click', function(event) {
					 	core.misc.playVideo( $(this) );
					});	
				}			
				
				,dragAsset: function(){
					

						$( "#thumb-collection-ul" ).sortable({ 
								 revert: "invalid" 
								,handle:".dragHandle"
								,opacity: 0.7
								,helper: "clone"
								,start: function(event, ui) {
									
								    var start_pos = ui.item.index();
								    ui.item.data('start_pos', start_pos);
								    
								}
								,update: function(event, ui) {
									
								    var start_pos = ui.item.data('start_pos');
								    var end_pos = $(ui.item).index();
								    
								    if( start_pos > end_pos){
								    	var direction = 'desc';
								    }else{
								    	var direction = 'asc';
								    };

								    var  asset_id = $(ui.item).attr('asset_id')
								    	,order = $(ui.item).index()
								    	,newAssets = core.moveElementInArray(core.categories[core.category_idx].assets, start_pos, end_pos);
								    	
								    core.categories[core.category_idx].assets = newAssets;
								    
									$('#categories > div')
									.eq(core.category_idx)
									.children('div > div')
									.eq(1).children('div')
									.children('ul').children().remove();
								    
									for(var index in core.categories[core.category_idx].assets){
										core.create.category_li.add(core.category_idx, core.categories[core.category_idx].assets[index])
									};
								    
								    core.order.model.assets.setOne(asset_id, order, direction);
								    
								}						
							}
						);
						$( "#thumb-collection-ul" ).disableSelection();
						
						
						$('.accordion-group')
						.droppable({
							accept: ".draggable",
							hoverClass: "ui-state-highlight",
							tolerance: "pointer",
							drop: function( event, ui ) {
								
								
								var  category_idx = $(this).attr('category_idx')
									,category_id = core.categories[category_idx].category_id
									,asset_id = ui.draggable.attr('asset_id')
									,idx_assets_array = core.findIndexInArrayOfObjects( core.categories[core.category_idx].assets
																			,function( item ){
																					if( item.asset_id === asset_id) return true;
																			})												
									,assetObj = core.categories[core.category_idx].assets[idx_assets_array]
									,postObj = {
										 asset_id: asset_id
										,category_id: category_id	
									};
									
									$.post(	window.base_url  + 'index.php/ajax/moveAsset',
											postObj,
											function( data) {
												
												if( core.categories[core.category_idx].assets.length === 1){
													$('#thumb-collection-ul').empty();	// may produce an error message: Uncaught TypeError: Cannot call method 'removeChild' of null 
												}else{
													ui.draggable.remove();
												};

												
												core.categories[core.category_idx].assets.splice(idx_assets_array[0], 1);
												
												core.order.model.assets.setGroup();
												
												
												
												core.categories[category_idx].assets.push(assetObj);
												
												$('.accordion-group[category_idx=' + core.category_idx + '] li[asset_id=' + asset_id + ']').appendTo(  $('.accordion-group[category_idx=' + category_idx + '] ul') );
												
												$('.accordion-group[category_idx=' + category_idx + '] .accordion-body').css({height:'auto'});
												
//												$('.accordion-group[category_idx=' + category_idx + '] .accordion-toggle').click();
												
												
											}
									);	
									
							}
						});
						
				}
				
				,formSubmission: {
					
					 init:function(){
					 	
					  	this.submit();

					}
					
					,submit: function(){
					  	var that = this;
					
						$('#zoom .submit_asset_form').live('click', function(event) {
							
							var  asset_name = $('#zoom .asset_name').val()
								,asset_description =  $('#zoom .asset_description').val()
								,asset_link = $('#zoom input.asset_link').val();
								
							$('body').click();
							
								var assetObj = {
									  asset_name:asset_name
									 ,asset_link:asset_link
									 ,asset_description:asset_description
									 ,asset_id:core.updateThis.asset_id
								};						
								
								that.postEditAsset(assetObj);
								
						});							
					}

					,postEditAsset: function(assetObj){
						
			 			var url = window.base_url  + 'index.php/ajax/editAsset';
			 			console.log(assetObj);
						$.post(	url,
								assetObj,
								function() {

									if( core.submissionModeAssets === 'insert'){
										core.bindElements.model.assets.formSubmission.afterUpdate.createNewElements(assetObj);
									}else if( core.submissionModeAssets === 'edit'){
										core.bindElements.model.assets.formSubmission.afterUpdate.updateExistingElements(assetObj);
									};

								}
						);			 			

		 				
					}			
					
					,afterUpdate: {
						
						 createNewElements: function(assetObj){
						 	
	
							core.create.asset.add(
								 assetObj.asset_name
								,assetObj.asset_id
								,core.category_idx
							);	
							
							core.create.category_li.add(
								 core.category_idx
								,{
									 asset_name:assetObj.asset_name
									,asset_id:assetObj.asset_id
								 }
							);							
							
							if( typeof(core.categories[core.category_idx].assets) === "undefined"){	
								core.categories[core.category_idx].assets = [];
							};								
							
							core.categories[core.category_idx].assets.push(assetObj);
							
							
							
							var $el = $('.edit[asset_id=' + assetObj.asset_id + ']');
							
							core.bindElements.model.assets.editAsset.fancyZoomThis( $el );																		
						
							
						}						
					
						 ,updateExistingElements: function(assetObj){	
							
							var	 asset_id = assetObj['asset_id']				
								,idx_assets_array = core.findIndexInArrayOfObjects( core.categories[core.category_idx].assets
																			,function( item ){
																					if( item.asset_id === asset_id) return true;
																			});	
																			
							$('.title[asset_id=' + assetObj['asset_id'] + ']')
							.html(assetObj.asset_name);
							
							$('.category-ul li[asset_id=' + assetObj['asset_id'] + ']').html(assetObj.asset_name);
							
							core.categories[core.category_idx].assets[ idx_assets_array ].asset_link = assetObj.asset_link;
														
							$('#thumb-collection li[asset_id=' + assetObj['asset_id'] + '] div.play')
							.css({
									 'background':'url(' + window.base_url + 'uploads/'+ assetObj['asset_id'] +'/thumb/image.jpg?v=' + Math.random() + ') no-repeat'
									,'background-position':'0px -45px'
									,'background-size':'282px'
							});
							
							core.submissionModeAssets = 'insert';	
							
						}

					}
					
				}
				
			}
			
		}
		
 		,leftControls: function(){

			$('.category').live('click', function(event) {
				
				core.category_idx  = $(this).attr('idx');
				
				var rightPanelStuff = function(){
					$('#thumb-collection').show();
					$('#video_container').hide();
					$('#thumb-collection-ul li.draggable').remove();
					$('#thumb-collection h2').html(core.categories[core.category_idx].category_name);						
					$('#thumb-collection .editCategoryTitle').attr({'category_id':core.categories[core.category_idx].category_id,'category_idx':core.category_idx});
					core.create.asset.init(core.category_idx);
					core.bindElements.model.assets.editAsset.init();
				};
				
				rightPanelStuff();

			});		
			
			$('#categories li').click(function(event) {	
					
					core.misc.playVideo( $(this) );

			});	
			
		}
		
		,upload: {
			
			 thumb: function(){	
			 	
			 	$('#zoom_content .thumb_img').live('click', function(event) {
			 		
//			 		if( core.disableUpload ){
//			 			alert('please wait till the other upload has completed.');
//			 			return;
//			 		};
			 		
			 		$(this).attr('src', 'img/loading.gif');
			 		
			 		$('#zoom_content .filename').val('');
			 		$('#zoom_content input[name=target_name]').val('image.jpg');
			 		$('#zoom_content input[name=target_folder]').val('thumb');
			 		$('#zoom_content .filename').click();
			 	});	
			 		
			}
			
			,video: function(){
				
				$('#zoom_content .video_uplr').live('click', function(event) {
					
					$('#zoom_content input[name=target_name]').val('video.mp4');
					$('#zoom_content input[name=target_folder]').val('video');
					$('#zoom_content .video_input_field').val('loading...')
					$('#zoom_content .filename').click();
				});	
				
			}
			
			,form: function(){
				
				$('#zoom_content .filename').live('change', function(event) {
					
					core.disableUpload = true;
					
					$('#zoom_content input[name=asset_id]').val(core.updateThis.asset_id);
					if( $('#zoom_content input[name=asset_id]').val() > 0){
						$('#zoom_content form.uploadVideo').submit();
					}else{
						alert('Call James when this happens.');						
					};
					
					
				});	
				
			}
			
		}
		
		,carousel_images: function(){
		
			$('.carousel-inner img').click(function(event) {
				$('#workArea').show();
				$('#homeArea').hide();				
				core.misc.playVideoByAssetId( $(this).attr('play_asset_id') );
			});	
			
		}


		,resizeWindow: function(){
			 
				$(window).resize(function(){
					core.misc.setFooterAbsoluteIfWindowHeightGreaterThanBodyHeight();
				});
				
		}

	}
	
	,misc: {

		highlight_video_that_is_playing: function(asset_id){
			
			var assetIdx = core.findIndexInArrayOfObjects( 
														 core.categories[core.category_idx].assets
														,function( item ){
															if( item.asset_id === asset_id) return true;
														});
			
			core.asset_id = asset_id;
			
			$('.accordion-toggle.category').css(
				{
					'text-decoration': 'none',
					'font-weight': 'normal',
					'font-size': '14px'
				}
			);			
			$('.accordion-toggle.category[idx=' + core.category_idx + ']').css(
				{
					'text-decoration': 'underline',
					'font-weight': 'bold',
					'font-size': '16px'
				}
			);
			
			
			
			$('.category-ul > li').css(
				{	
					 'font-weight':'normal'
					,'text-decoration':'none'
					
				});
			
			$('li[asset_id=' + asset_id + '] ').css(
				{	
					 'font-weight':'bold'
					,'text-decoration':'underline'
					
				});
			
			$('#thumb-collection').hide();
			
			
			
		}

		,playVideo: function($this){  // DEPRECIATED

				var	 asset_id = $this.attr('asset_id')
					,category_id = $this.attr('category_id')
					,idx_categories_array = core.findIndexInArrayOfObjects( 
										 core.categories
										,function( item ){
											if( item.category_id === category_id) return true;
										});	

				$('.category-ul > li').css({background:'white'});	
				$('li[asset_id=' + asset_id + '] ').css({background:'red'});										


				$('#thumb-collection').hide();
				$('#video_container').show();

				var video_src = window.base_url + 'uploads/'+ $this.attr('asset_id') +'/video/video.mp4?v=' + Math.random();

				core.myPlayer.src(video_src);				




		}
		
		,playVideoByAssetId: function( asset_id ){	
			for(var catIdx in core.categories){
				
				for(var assetIdx in core.categories[catIdx].assets){
					
					if( core.categories[catIdx].assets[assetIdx].asset_id == asset_id){
						
						$('#categories a[idx='+catIdx+']').click();
						
						setTimeout(function(){
							$('#thumb-collection li div.play[asset_id='+asset_id+']').click();
						}, 1000);
						
					};
					
					
				};
			};
		}
		
		
		,setFooterAbsoluteIfWindowHeightGreaterThanBodyHeight : function(){
						
						var windowHeight = "innerHeight" in window 
				               ? window.innerHeight
				               : document.documentElement.offsetHeight; 	
				               
				         if(  windowHeight > $('body').height()){		
				        	$('#footBng').css({position:'absolute'});
				         }else{
				         	$('#footBng').css({position:'relative'});
				         };
						
		}
	}
	
});

window.onload = function(){ core.start();	};