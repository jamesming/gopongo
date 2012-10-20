core = {
	init:function(){
		
		this.setProperties();
		
		this.loadSpinner();
		
	}
	
	,setProperties:function(){
		
		this.spinnerDelay = 2000;

	}
	
	,getRandoms: function(numPicks, low, high) {
		
		
			var len = high - low + 1;
			var nums = new Array(len);
			var selections = [], i;
			// initialize the array
			for (i = 0; i < len; i++) {
			    nums[i] = i + low;
			}
			
			// randomly pick one from the array
			for (var i = 0; i < numPicks; i++) {
			    var index = Math.floor(Math.random() * nums.length);
			    selections.push(nums[index]);
			    nums.splice(index, 1);
			}
			return(selections);
	}
	
	,loadSpinner:function(){
		
					var  style =''
							,that = this;
							
					this.loadScript('spinner', window.base_url + 'js/libs/spinner/' + 'spin.min.js', function(){
						
							that.loadCSS(window.base_url + 'js/libs/spinner/' + 'spin.css');
			
							that.createFixedDiv(
								 'spinner'
								, style
							);
							
							that.spinner = new Spinner();
							that.target = document.getElementById('spinner');
							
						});
					this.processCallbackQueue();
	}	
	,scripts: {}
	,loadScript : function(name, url, callback){
		
		this.callbackQueue[name] = {
			 scripts:false
			,callback:callback	
		};

			if( !this.scripts[name]){
				
    		if(    typeof(this.target) !== "undefined" 
    				&& typeof(this.spinner) !== "undefined" ){
    					
					this.target.style.display='block';					
					this.spinner.spin(this.target);	
    					
					this.target.style.display='block';					
					this.spinner.spin(this.target);	    			
    		};					
				
				this.scripts[name] = url;
				
    		var  head = document.documentElement
    				,script = document.createElement('script');
    		
    		script.async = false;
    		script.src = url;
    		
    		var 	that = this
    				 ,done = false;
    		
    		script.onload = script.onreadystatechange = function(){

										
    			if( this.readyState != 'loading' ) {  											
    											
    											done = true;

    											if( that.callbackQueue[name]){		
    												that.callbackQueue[name].scripts = true;
    											};

    											script.onload = script.onreadystatechange = null;
    											if( head && script.parentNode ){
    												head.removeChild( script );
    											};
    				
    			};
    			
    		};
    		head.insertBefore( script, head.firstChild );					
				
			} 
			else {

				this.callbackQueue[name].scripts = true;
				
			}
	}
	
	,callbackQueue: {}    	
	,processCallbackQueue: function(){
		
    		var		that = this
    		     ,queueIsReady = function(){
    		     		var readiness = true;
				    		for( name in that.callbackQueue){
				    			if( that.callbackQueue[name].scripts === false){
				    				readiness = false;
				    			};
				    		};
				    		return readiness;  			
			    		}
			    	 ,doWhenReady = function(){
			    	 	
			    	 		if( queueIsReady() === false){
			    	 			setTimeout(function(){
			    	 				doWhenReady();
			    	 			}, 10);
			    	 		}else{
						    		for( name in that.callbackQueue){
						    			that.callbackQueue[name].callback();
						    			delete that.callbackQueue[name];
						    		};
						    		that.callbackQueue = {};
						    		setTimeout(function(){
						    			if( typeof(that.spinner) !== "undefined"){
						    				that.spinner.stop();
						    				that.target.style.display='none';	
						    			}  
						    		}, core.spinnerDelay);
						    		
			    	 		};
			    	 };
			    	 
			 doWhenReady();

	}	

	,loadCSS: function( url){
	
			var     head = document.getElementsByTagName('head')[0]				    		
						, link = document.createElement('link')
					  , path = url + '?v=' + Math.floor(Math.random() * (99999999999999 - 1 + 1)) + 1;			
					  
				    link.rel = 'stylesheet';
				    link.type = 'text/css';
				    link.href = path;
				    link.media = 'all';
				    head.parentNode.insertBefore(link, head);			
				    $(head).prepend(link);			
	
	}

	,in_array: function (needle, haystack){
		    var  count = 0
		    	,len = haystack.length;
		    for (var i=0; i<len; i++) {
		        if (haystack[i] == needle) return true;
		        count++;
		    }
		    return false;
	}
	
	,createFixedDiv:function( nameOfId, style ){
	  var newDiv = document.createElement('div');
		newDiv.id =  nameOfId;
		newDiv.innerHTML = style;
		document.body.insertBefore(newDiv, document.body.firstChild);	
	}			
	
	,addToDom: function( element, id, parent, count, callback ){
		var  el =   document.createElement(element)
			,parent = document.getElementById(parent);
			
		if( id !==''){
			el.id = id;	
		};
		
		parent.insertBefore( el, parent.firstChild);
		callback(el, count);
	}			

	,loadContentIntoModalBoxPreFancyZoom: function(content){
		
		$('#modal_box').html( content );

	}
	
	,loadContentIntoFancyZoom: function(content){
		
		$('#zoom_content').html( content );
	
	}
	
	,getByClass: function(className, parent) {
		parent || (parent=document);
		var descendants=parent.getElementsByTagName('*'), i=-1, e, result=[];
		while (e=descendants[++i]) {
		  ((' '+(e['class']||e.className)+' ').indexOf(' '+className+' ') > -1) && result.push(e);
		}
		return result;
	}
	
	,loadTemplate: function(tpl) {
		var out = '';
		jQuery.ajax({
			url: tpl + '?v=' + Math.random(),
			success: function(data){
				out = data;
			},
			async:false
		});
		return out;
	}
	
	,getObjectLength : function(o){
	  var length = 0;
	
	  for (var i in o) {
	    if (Object.prototype.hasOwnProperty.call(o, i)){
	      length++;
	    }
	  }
	  return length;
	}			
	
	,setPropertiesMain: function(){
		
		this.categories = 
			[{	
			 	 name:'Animation'
			 	,assets:[ {
			 		 	 name:'Animation1'
			 		 	,image:'http://lorempixel.com/280/159/city/'
			 		 	}
			 		,{
			 		 	 name:'Animation2'
			 		 	,image:'http://lorempixel.com/280/159/city/' 
			 			}
			 	]
			 }
			,{	name:'Cable'
			 	,assets:[ {
			 		 	 name:'Cable1'
			 		 	,image:'http://lorempixel.com/280/159/sports/'
			 		 	}
			 		,{
			 		 	 name:'Cable2'
			 		 	,image:'http://lorempixel.com/280/159/sports/' 
			 			}
			 		,{
			 		 	 name:'Cable2'
			 		 	,image:'http://lorempixel.com/280/159/sports/' 
			 			}
			 		,{
			 		 	 name:'Cable2'
			 		 	,image:'http://lorempixel.com/280/159/sports/' 
			 			}
			 	]
			 }
			,{name:'Children\'s'}
			,{name:'Digital Content'}
			,{name:'Integrated'}
			,{name:'Network'}
			,{name:'Shoot'}
			,{name:'Presentations'}
		];


	}
	
	,findIndexInArrayOfObjects :function(array, callback ){
		
		/* 
		*
		*  Usage: core.findIndexInArrayOfObjects( array, function( item ){
						if( item.asset_id === 4) return TRUE;
				  })
		*
		*/
		
	    var matchingIndices = []
	    	lengthArray =  array.length;
		
	    for(var i = 0;i < lengthArray; i++){
	        if( callback( array[i] ) )
	           matchingIndices.push(i);
	    }
	
	    return matchingIndices;
	}
	
	,getObjInArray: function( array ){
		
		var obj = array.filter(function (element) { 
						    return element.asset_id === asset_id;
						});	
						
		return obj;
	}
		
	,moveElementInArray: function(arr, old_index, new_index) {

            while (old_index < 0) { 
                old_index += arr.length;
            }
            while (new_index < 0) {
                new_index += arr.length;
            }
            if (new_index >= arr.length) {
                var k = new_index - arr.length;
                while ((k--) + 1) {
                    arr.push(undefined);
                }
            }
            
            var obj = arr.splice(old_index, 1)[0];
            
            arr.splice(new_index, 0, obj);

            return arr;
     }
	
};

_.extend(core, {
	
	 start: function(){
	 	
		var  that = this
			,url = window.base_url  + 'index.php/ajax/getAll';
		
		$('#json').load(url, function(){
			
//			console.log(JSON.stringify(core.categories));
			
			that.setPropertiesMain();

			that.create.init();
			that.bindElements.init();
			that.misc.youtubeAPI();
			
			// that.create.jcrop.init()
		});	
		
	}

	,setPropertiesMain: function(){
		
		this.user_id = core.categories[0].user_id;
		
		this.myPlayer = _V_("my_video_1");
		
		this.submissionModeAssets = 'insert';  // || edit
		this.category_idx = 0; // var category_id = core.categories[core.category_idx].category_id
		this.updateThis = {asset_id:0};  // core.updateThis.asset_id
		
		// var youtube_thumb = core.categories[core.category_idx].assets[ {{ index }} ].youtube_thumb
		// var asset_id = core.categories[core.category_idx].assets[ {{ index }} ].asset_id
		
		this.youtube_id = '';
	}

	,create: {
		
		 init: function(){
			this.category.init();
			this.asset.init(0);
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
					tpl  = tpl.replace(/{{youtube_id}}/g, li_obj.youtube_id);
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
							,core.categories[category_idx].assets[idx].youtube_url
							,core.categories[category_idx].assets[idx].youtube_thumb
							,core.categories[category_idx].assets[idx].youtube_id
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
					,youtube_url
					,youtube_thumb
					,youtube_id
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
				tpl  = tpl.replace(/{{youtube_url}}/g, youtube_url);
				
				if( core.user_id == 1){
					var img_src = window.base_url + 'uploads/'+ asset_id +'/thumb/image.jpg?v=' + Math.random();
					tpl  = tpl.replace(/{{image_thumb}}/g, img_src);
				}else{
					tpl  = tpl.replace(/{{image_thumb}}/g, youtube_thumb);
				};
				
				
				
				tpl  = tpl.replace(/{{youtube_id}}/g, youtube_id);
				tpl  = tpl.replace(/{{category_id}}/g, category_id);
				tpl  = tpl.replace(/{{count}}/g, count);
				
				$('#thumb-collection ul.assets_ul').append(tpl);
				
				$('li[asset_id='+asset_id+'] img')
				.on('error', function() {
//				    this.src = 'http://www.placehold.it/280x159';
				})
				//.attr('src', 'uploads/'+asset_id+'/thumb/image.jpg');
				
				core.misc.showHideButtonBasedOnNumofAssets();
							
			}
			
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
								function( data ) {}
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
		 	
			this.model.categories.init();
			this.model.assets.init();
			
			this.accordianControls();
			
			this.upload.thumb();
			this.upload.video();
			this.upload.form();
			

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
								};
								
					 			var url = window.base_url  + 'index.php/ajax/insertCategory';
					 			
								$.post(	url,
										categoryObj,
										function( insert_id ) {
											
												var count_catgeories = core.categories.length;
												
												core.create.category.add(
														  categoryObj.category_name
														, count_catgeories); 
														
												var catObj = {
													 category_id: insert_id
													,category_name:categoryObj.category_name
													,assets:[]
												};
												
												core.categories.push(catObj);	
												
														
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
					
					$('#thumb-collection .playAllInCategory').click(function(event) {
						
						core.playlist = [];
						core.playlistIdx  = 0; 
						
						for(var key in core.categories[core.category_idx].assets){
							
							core.playlist.push({
								 asset_id: core.categories[core.category_idx].assets[key].asset_id
								,youtube_id: core.categories[core.category_idx].assets[key].youtube_id	
							});
						
						}
						
						core.misc.playCategoryByIdx();
						
							
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
						 	
						 	$('.asset_youtube_url').live('click', function(event) {
						 		$(this).select()
						 	});	
							
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
								$('#zoom_content .asset_youtube_url').val(core.categories[core.category_idx].assets[idx_assets_array[0]].youtube_url);
								
								$('#zoom_content img')
								.on('error', function() {
								    //this.src = 'http://www.placehold.it/280x150';
								})
								.attr('src', 'uploads/'+asset_id+'/thumb/image.jpg');
								
								
								
								core.submissionModeAssets = 'edit';
								
								core.updateThis = {
									asset_id:asset_id 	
								};
								
		
							});
							
						}
					
				}
				
				,deleteAsset: function(){
					
					$('.delete').live('click', function(event) {
						
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
									
									core.misc.showHideButtonBasedOnNumofAssets();
									
								}
						);	
						
					});	
					
				}						
				
				,playAsset: function(){
					
					
					if( core.user_id == 1 ){
						$('.play').live('click', function(event) {
						 	core.misc.playVideo( $(this) );
						});								
					}else{
						$('.play').live('click', function(event) {
						 	core.misc.playYouTube( $(this) );
						});							
					};
					
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
								,asset_youtube_url = $('#zoom .asset_youtube_url').val()
								,asset_description =  $('#zoom .asset_description').val()
								,asset_client = $('#zoom .client').val();
								
							$('body').click();
							
								var assetObj = {
									  asset_name:asset_name
									 ,asset_youtube_url:asset_youtube_url
									 ,asset_client:asset_client
									 ,asset_description:asset_description
									 ,asset_id:core.updateThis.asset_id
								};						
								
								that.postEditAsset(assetObj);
								
						});							
					}

					,postEditAsset: function(assetObj){
						
			 			var url = window.base_url  + 'index.php/ajax/editAsset';
			 			
			 			if( core.user_id === 1){

							if( core.submissionModeAssets === 'insert'){
								core.bindElements.model.assets.formSubmission.afterUpdate.createNewElements(assetObj);
							}else if( core.submissionModeAssets === 'edit'){
								core.bindElements.model.assets.formSubmission.afterUpdate.updateExistingElements(assetObj);
							};
			 				
			 			}else{
			 				
							$.post(	url,
									assetObj,
									function( youtube_id ) {
										
										var youtubeObj = {
											'youtube_id': youtube_id
										};
										_.extend(assetObj, youtubeObj );
										
										if( core.submissionModeAssets === 'insert'){
											core.bindElements.model.assets.formSubmission.afterUpdate.createNewElements(assetObj);
										}else if( core.submissionModeAssets === 'edit'){
											core.bindElements.model.assets.formSubmission.afterUpdate.updateExistingElements(assetObj);
										};
			
									}
							);				 				
			 				
			 			};
			 			

						
					}			
					
					,afterUpdate: {
						
						 createNewElements: function(assetObj){
						 	
						 	
							if( core.user_id == 1){
								
									core.create.asset.add(
										 assetObj.asset_name
										,assetObj.asset_id
										,assetObj.asset_youtube_url = ''
										,youtube_thumb = ''
										,assetObj.youtube_id = ''
										,core.category_idx
									);								
								
							}else{
								
								core.misc.getYouTubeTitle(assetObj.youtube_id, function(youtubeObj){
								
									youtubeObj.data.title = youtubeObj.data.title.substring(0, 15);
									
									assetObj.asset_name = youtubeObj.data.title;
								
									core.create.asset.add(
										 assetObj.asset_name
										,assetObj.asset_id
										,assetObj.asset_youtube_url
										,youtube_thumb = "http://img.youtube.com/vi/" +  assetObj.youtube_id + "/0.jpg"
										,assetObj.youtube_id
										,core.category_idx
									);
		
									
									assetObj.youtube_thumb = "http://img.youtube.com/vi/" +  assetObj.youtube_id + "/0.jpg";
										
								});
								
							}
							
							
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
							
							core.misc.showHideButtonBasedOnNumofAssets();
							
							var $el = $('.edit[asset_id=' + assetObj.asset_id + ']');
							
							core.bindElements.model.assets.editAsset.fancyZoomThis( $el );								
							
						}						
					
						 ,updateExistingElements: function(assetObj){	
							
							var	 asset_id = assetObj['asset_id']				
								,idx_assets_array = core.findIndexInArrayOfObjects( core.categories[core.category_idx].assets
																			,function( item ){
																					if( item.asset_id === asset_id) return true;
																			});	
																			
							if( core.user_id == 1){
								
									$('.title[asset_id=' + assetObj['asset_id'] + ']')
									.html(assetObj.asset_name);
									
									$('.category-ul li[asset_id=' + assetObj['asset_id'] + ']').html(assetObj.asset_name);
									
									core.categories[core.category_idx].assets[ idx_assets_array ].asset_name = assetObj.asset_name;
																
									$('#thumb-collection li[asset_id=' + assetObj['asset_id'] + '] div.play')
									.css({
											 'background':'url(' + window.base_url + 'uploads/'+ assetObj['asset_id'] +'/thumb/image.jpg?v=' + Math.random() + ') no-repeat'
											,'background-position':'0px -45px'
											,'background-size':'282px'
									});
									
							}else{
							
								core.categories[core.category_idx].assets[ idx_assets_array ].youtube_thumb = "http://img.youtube.com/vi/" +  assetObj.youtube_id + "/0.jpg";
			
								$('.title[asset_id=' + assetObj['asset_id'] + ']')
								.attr('youtube_id', assetObj.youtube_id);
								
								if( assetObj.asset_name == ''){
									
									core.misc.getYouTubeTitle(assetObj.youtube_id, function(youtubeObj){
										
										youtubeObj.data.title = youtubeObj.data.title.substring(0, 15);
										
										if( assetObj.asset_name == ''){
											assetObj.asset_name = youtubeObj.data.title;
										};
										
										$('.title[asset_id=' + assetObj['asset_id'] + ']')
										.html(assetObj.asset_name);
										
										$('.category-ul li[asset_id=' + assetObj['asset_id'] + ']').html(assetObj.asset_name);
										
										core.categories[core.category_idx].assets[ idx_assets_array ].asset_name = assetObj.asset_name;
										
									});									
									
								}else{
										$('.title[asset_id=' + assetObj['asset_id'] + ']')
										.html(assetObj.asset_name);
										
										$('.category-ul li[asset_id=' + assetObj['asset_id'] + ']').html(assetObj.asset_name);
										
										core.categories[core.category_idx].assets[ idx_assets_array ].asset_name = assetObj.asset_name;
																			
								};
								
								
								$('#thumb-collection li[asset_id=' + assetObj['asset_id'] + '] div.play')
								.attr('youtube_id', assetObj.youtube_id)
								.css({
										 'background':'url(http://img.youtube.com/vi/' +  assetObj.youtube_id + '/0.jpg) no-repeat'
										,'background-position':'0px -45px'
										,'background-size':'282px'
								});
								
							}
							
							core.submissionModeAssets = 'insert';	
							
						}

					}
					
				}
				
			}
			
		}
		
 		,accordianControls: function(){
			
			$(".collapse").collapse({
					  toggle: true
			});
			
			$('.category').live('click', function(event) {
				
				$('#thumb-collection').show();
				
				if( core.user_id == 1 ){
					
					$('#video_container').hide();
					core.myPlayer.pause();
												
				}else{
					
					$('#youtube_container').hide();
								
				};

				
				$('#thumb-collection-ul').empty();			
				
				core.category_idx  = $(this).attr('idx');
				
				core.create.asset.init(core.category_idx);
				
				
				$('#thumb-collection h2').html(core.categories[core.category_idx].category_name);
				
				$('#thumb-collection .editCategoryTitle').attr({'category_id':core.categories[core.category_idx].category_id,'category_idx':core.category_idx});
				
				core.misc.showHideButtonBasedOnNumofAssets();
				
				core.bindElements.model.assets.editAsset.init();
				
				
				$('#thumb-collection-ul .play[asset_id=' + core.asset_id + ']').css({border:'3px solid red'});
				
			});		
			
			
			$('#categories li').click(function(event) {	
					
					if( core.user_id == 1 ){
						
						 	core.misc.playVideo( $(this) );
								
					}else{
						
						 	core.misc.playYouTube( $(this) );
									
					};

			});	
			
		}
		
		,upload: {
			
			 thumb: function(){	
			 	
			 	$('#zoom_content .thumb_img').live('click', function(event) {
			 		
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
					$('#zoom_content input[name=asset_id]').val(core.updateThis.asset_id);
					$('#zoom_content form.uploadVideo').submit();
					
				});	
				
			}
			
		}


	}
	
	,misc: {
		
		showHideButtonBasedOnNumofAssets: function(){	
			
				var lengthOfAssets = core.categories[core.category_idx].assets.length;
				
				if( lengthOfAssets >= 9){
					$('#addAsset').hide();
				}else{
					$('#addAsset').show();
				};		
				
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
		,playYouTube: function($this){
			
				var	 asset_id = $this.attr('asset_id')
					,category_id = $this.attr('category_id')
					,idx_categories_array = core.findIndexInArrayOfObjects( 
										 core.categories
										,function( item ){
											if( item.category_id === category_id) return true;
										});
				
				this.highlight_video_that_is_playing(asset_id);
				
				if(	$this.attr('youtube_id') !== core.youtube_id){
					
					if(		typeof(core.playlist)   !== "undefined"
					 	&&  typeof(core.playlist[core.playlistIdx])   !== "undefined"
						&&  $this.attr('youtube_id') == core.playlist[core.playlistIdx].youtube_id
					){
						
						return;
						
					 }; 
						
					core.playlist = [];		
					
					var  youtube_id = core.youtube_id = $this.attr('youtube_id');
					
					var doWhenReady = function(){
						
							if( typeof(core.player.loadVideoById) == "undefined"){
								setTimeout(function(){
									doWhenReady();
								}, 10);
							}else{
								
								core.player.loadVideoById({videoId:youtube_id});
								core.player.playVideo();		
								
							};
						}
						
					doWhenReady();
					
				};
			
		}
		
		,playCategoryByIdx: function(){
			
			core.player.loadVideoById({videoId:core.playlist[core.playlistIdx].youtube_id});
			
			core.player.playVideo();	
			
			this.highlight_video_that_is_playing(core.playlist[core.playlistIdx].asset_id);
			
		}
		
		,highlight_video_that_is_playing: function(asset_id){
			
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
			$('#youtube_container').show();		

			
			$('#youtube_container .title').html(core.categories[core.category_idx].assets[ assetIdx ].asset_name);	
			
		}
		
		,getYouTubeTitle: function( youtube_id, updateYoutubeTitle ){
			
			$.getJSON('http://gdata.youtube.com/feeds/api/videos/' + unescape(youtube_id) + '?v=2&alt=jsonc', function( youtubeObj ) {
			  updateYoutubeTitle(youtubeObj);
			});
		}
		
		,youtubeAPI: function(){

				core.player = new YT.Player('player', {
				  width: '640',
				  height: '480',
				  events: {
				     onReady: function(event) {
				     	// event.target.playVideo();
					}
					,onStateChange: function(event) {
						// console.log(event.data);
						
						if( typeof(core.playlist) !== "undefined"  ){
							var lengthOfPlaylist  = core.playlist.length;
							
							if( event.data == 0  && lengthOfPlaylist > 0 ){
								core.playlistIdx++;
								if( core.playlistIdx == (lengthOfPlaylist)) core.playlistIdx = 0;
								core.misc.playCategoryByIdx();
							};							
							
						};

					}
				  }
				});

		}
		
	}
	
});

window.onload = function(){ core.start();	};



