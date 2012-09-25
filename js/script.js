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
		
};

_.extend(core, {
	
	 initMain: function(){
	 	
	 	this.setPropertiesMain();
	 	
		var  that = this
			,url = window.base_url  + 'index.php/ajax/getAll';
		
		$('#json').load(url, function(){
//			console.log(JSON.stringify(core.categories));
			that.create.init();
			that.bindElements.init();
			
			that.create.jcrop.init()
		});	
		
	}
	
	,setPropertiesMain: function(){
		
		this.myPlayer = _V_("my_video_1");
		
		this.submissionMode = 'insert';  // || edit
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
					
					this.add(core.categories[idx].category_name, count);
					
					if( typeof(core.categories[idx].assets) !== "undefined"){
						
						for(var index in core.categories[idx].assets){
							core.create.category_li.add(idx, core.categories[idx].assets[index])
						};
					};
					
					count++;
				};
				
				$('#thumb-collection h2').html(core.categories[0].category_name);
				
				$('#thumb-collection .editTitle').attr({'category_id':core.categories[0].category_id,'category_idx':0});

				
			}
			
			,add: function(category_name, count){
				
					if ( ! core.category_tpl) {
					  core.category_tpl = core.loadTemplate('js/tpl/category.tpl');
					}		
			
					var tpl = core.category_tpl;
		
					tpl  = tpl.replace(/{{idx}}/g, count);
					tpl  = tpl.replace(/{{category_name}}/g, category_name);
					
					$('#categories').append(tpl);
					
					
	
			}
			
		}

		,category_li:{
			
			add: function(idx, li_obj){	
			
					if ( ! core.category_li_tpl) {
					  core.category_li_tpl = core.loadTemplate('js/tpl/category_li.tpl');
					}		
			
					var tpl = core.category_li_tpl;
					
					li_obj.asset_name = li_obj.asset_name.substring(0, 15);
		
					tpl  = tpl.replace(/{{asset_name}}/g, li_obj.asset_name);
					tpl  = tpl.replace(/{{asset_id}}/g, li_obj.asset_id);
					tpl  = tpl.replace(/{{youtube_id}}/g, li_obj.youtube_id);
					
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
							,count
						);
				};
				
			}
			
			,add: function(
					 asset_name
					,asset_id
					,youtube_url
					,youtube_thumb
					,youtube_id
					,count
				){	
				
				if ( ! core.asset_tpl) {
				  core.asset_tpl = core.loadTemplate('js/tpl/asset.tpl');
				}		
				
				var tpl = core.asset_tpl;
				
				asset_name = asset_name.substring(0, 15);
	
				tpl  = tpl.replace(/{{asset_name}}/g, asset_name);
				tpl  = tpl.replace(/{{asset_id}}/g, asset_id);
				tpl  = tpl.replace(/{{youtube_url}}/g, youtube_url);
				tpl  = tpl.replace(/{{youtube_thumb}}/g, youtube_thumb);
				tpl  = tpl.replace(/{{youtube_id}}/g, youtube_id);
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
	
	,bindElements: {
		
		 init: function(){
		 	
			this.insertNewCategory();
			this.accordianControls();
			this.formSubmission.init();
			
			this.insertAsset();
			this.editAsset.init();
			this.playAsset();
			this.deleteAsset();
			
			this.upload.thumb();
			this.upload.video();
			this.upload.form();
			
			this.editTitle();
			
		}
		
		,insertNewCategory: function(){		
			
			$('#addCategory').click(function(event) {
				
				var count_catgeories = core.categories.length;
				
				core.create.category.add('', count_catgeories); 	
					
			});	
			
		}		
		
		,accordianControls: function(){
			
			$(".collapse").collapse({
					  toggle: true
			});
			
			$('.category').live('click', function(event) {
				
				$('#thumb-collection').show();
				//$('#video_container').hide();
				$('#youtube_container').hide();
				
				//core.myPlayer.pause();
				
				$('#thumb-collection-ul').empty();			
				core.create.asset.init($(this).attr('idx'));
				core.category_idx  = $(this).attr('idx');
				
				$('#thumb-collection h2').html(core.categories[core.category_idx].category_name);
				
				$('#thumb-collection .editTitle').attr({'category_id':core.categories[core.category_idx].category_id,'category_idx':core.category_idx});
				
				core.misc.showHideButtonBasedOnNumofAssets();
				
				core.bindElements.editAsset.init();
				
			});		
			
			
			$('#categories li').click(function(event) {	

				core.misc.playYouTube( $(this) );

			});	
			
		}
		
		,formSubmission: {
			
			 init:function(){
			  	
			  	var that = this;
			
				$('#zoom .submit_asset_form').live('click', function(event) {
					
					var  asset_name = $('#zoom .asset_name').val();
					var  asset_youtube_url = $('#zoom .asset_youtube_url').val();
						
					$('body').click();
					
					/*if( core.submissionMode === 'insert'){
						
						var assetObj = {
							 asset_name:asset_name
							,category_id:core.categories[core.category_idx].category_id
						};
						
						that.postInsertAsset(assetObj);
						
					}else if( core.submissionMode === 'edit'){*/
						
						var assetObj = {
							  asset_name:asset_name
							 ,asset_youtube_url:asset_youtube_url
							 ,asset_id:core.updateThis.asset_id
						};						
						
						that.postEditAsset(assetObj);
						
					/*};*/
					
						
				});	
			}
			
			/*,postInsertAsset: function(assetObj){
				
	 			var url = window.base_url  + 'index.php/ajax/insertAsset';
	 			
				$.post(	url,
						assetObj,
						function(insert_id) {
							
							core.create.asset.add(
								 assetObj.asset_name
								,insert_id
								,core.category_idx
							);
							
							core.create.category_li.add(
								 core.category_idx
								,{
									 asset_name:assetObj.asset_name
									,asset_id:insert_id
								 }
							);
							
							if( typeof(core.categories[core.category_idx].assets) === "undefined"){	
								core.categories[core.category_idx].assets = [];
							};				
							
							_.extend(assetObj, {asset_id:insert_id});
							delete assetObj['category_id'];
							
							core.categories[core.category_idx].assets.push(assetObj);
							
							core.misc.showHideButtonBasedOnNumofAssets();
							
							var $el = $('.edit[asset_id=' + insert_id + ']');
							
							core.bindElements.editAsset.fancyZoomThis( $el );

						}
				);	
				
			}*/
			
			
			,postEditAsset: function(assetObj){
				
	 			var url = window.base_url  + 'index.php/ajax/editAsset';
	 			
				$.post(	url,
						assetObj,
						function( youtube_id ) {
							
							var youtubeObj = {
								'youtube_id': youtube_id
							};
							_.extend(assetObj, youtubeObj );
							
							if( core.submissionMode === 'insert'){
								core.bindElements.formSubmission.afterUpdate.createNewElements(assetObj);
							}else if( core.submissionMode === 'edit'){
								core.bindElements.formSubmission.afterUpdate.updateExistingElements(assetObj);
							};

						}
				);	
				
			}			
			
			,afterUpdate: {
			
				 updateExistingElements: function(assetObj){	
					
					var	 asset_id = assetObj['asset_id']				
						,idx_array = core.findIndexInArrayOfObjects( core.categories[core.category_idx].assets
																	,function( item ){
																			if( item.asset_id === asset_id) return true;
																	});	
					
					core.categories[core.category_idx].assets[ idx_array ].youtube_thumb = "http://img.youtube.com/vi/" +  assetObj.youtube_id + "/0.jpg";
					
//					core.categories[core.category_idx].assets[idx_array].asset_name= assetObj.asset_name;
//					$('.category-ul li[asset_id=' + assetObj['asset_id'] + ']').html(assetObj.asset_name);

					$('.title[asset_id=' + assetObj['asset_id'] + ']')
					// .html(assetObj.asset_name)
					.attr('youtube_id', assetObj.youtube_id);
					
					
					core.misc.getYouTubeTitle(assetObj.youtube_id, function(youtubeObj){
						
						youtubeObj.data.title = youtubeObj.data.title.substring(0, 15);
						
						assetObj.asset_name = youtubeObj.data.title;
						
						$('.title[asset_id=' + assetObj['asset_id'] + ']')
						.html(assetObj.asset_name);
						
						$('.category-ul li[asset_id=' + assetObj['asset_id'] + ']').html(assetObj.asset_name);
						
						core.categories[core.category_idx].assets[ idx_array ].asset_name = assetObj.asset_name;
						
					});
					
					
					
					
					$('#thumb-collection li[asset_id=' + assetObj['asset_id'] + '] div.play')
					.attr('youtube_id', assetObj.youtube_id)
					.css({
							 'background':'url(http://img.youtube.com/vi/' +  assetObj.youtube_id + '/0.jpg) no-repeat'
							,'background-position':'0px -45px'
							,'background-size':'282px'
					});
	
					
					
					core.submissionMode = 'insert';
					
				}
				
				,createNewElements: function(assetObj){
					
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
							
							assetObj.youtube_thumb = "http://img.youtube.com/vi/" +  assetObj.youtube_id + "/0.jpg";
							
							core.categories[core.category_idx].assets.push(assetObj);	
							
					});
									
					core.misc.showHideButtonBasedOnNumofAssets();
					
					var $el = $('.edit[asset_id=' + assetObj.asset_id + ']');
					
					core.bindElements.editAsset.fancyZoomThis( $el );	
					
				}
				
			}
			
			
		}
		
		,insertAsset: function(){
			
			$('#addAsset').fancyZoom({},function(){
				
				core.submissionMode = 'insert';
				
	 			var  url = window.base_url  + 'index.php/ajax/insertAsset'
	 				,assetObj = {
							 asset_name:''
							,category_id:core.categories[core.category_idx].category_id
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
		
		,playAsset: function(){
			$('.play').live('click', function(event) {
			 	core.misc.playYouTube( $(this) );
			});	
		}
		
		,editAsset: {
				
				 init: function(){
				 	
				 	this.fancyZoomThis( $('.edit') );
					
				}
				
				,fancyZoomThis: function( $el ){
					
					$el.fancyZoom({}, function(el){
				
						var	 asset_id = $(el).attr('asset_id')				
							,idx_array = core.findIndexInArrayOfObjects( 
												 core.categories[core.category_idx].assets
												,function( item ){
													if( item.asset_id === asset_id) return true;
												});	
						
						$('#zoom_content .asset_name').val(core.categories[core.category_idx].assets[idx_array[0]].asset_name);
						$('#zoom_content .asset_youtube_url').val(core.categories[core.category_idx].assets[idx_array[0]].youtube_url);
						
						$('#zoom_content img')
						.on('error', function() {
						    this.src = 'http://www.placehold.it/280x150';
						})
						.attr('src', 'uploads/'+asset_id+'/thumb/image.jpg');
						
						
						
						core.submissionMode = 'edit';
						
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
							
							var idx_array = core.findIndexInArrayOfObjects( 
								 core.categories[core.category_idx].assets
								,function( item ){
									if( item.asset_id === asset_id) return true;
								}
							);							
							
							core.categories[core.category_idx].assets.splice(idx_array[0], 1);
							
							core.misc.showHideButtonBasedOnNumofAssets();
							
						}
				);	
				
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

		,editTitle: function(){
			
			$('#thumb-collection .editTitle').fancyZoom({},function(el){

				var category_idx = $(el).attr('category_idx');
				console.log(core.categories[category_idx].category_name);
						
			});
			
//			$('#thumb-collection .editTitle').click(function(event) {
//				alert($(this).attr('category_idx'));			
//			});	
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
		
		
		,playYouTube: function($this){
			
			console.log('test');
			
				$('#thumb-collection').hide();
				//$('#video_container').show();
				$('#youtube_container').show();
				
				//var video_src = window.base_url + 'uploads/'+ $(this).attr('asset_id') +'/video/video.mp4?v=' + Math.random();
				
				//core.myPlayer.src(video_src);
				
				if( $this.attr('youtube_id') !== core.youtube_id){
					var   youtube_id = core.youtube_id = $this.attr('youtube_id')
						, yourtube_src = "http://www.youtube.com/embed/"+youtube_id+"?autoplay=1";
					
	//				console.log(JSON.stringify(core.categories));
	
					$('#youtube_iframe').attr('src', yourtube_src);					
				};
			
		}
		
		
		,getYouTubeTitle: function( youtube_id, updateYoutubeTitle ){
			
			$.getJSON('http://gdata.youtube.com/feeds/api/videos/' + youtube_id + '?v=2&alt=jsonc', function( youtubeObj ) {
			  updateYoutubeTitle(youtubeObj);
			});
		}
		
	}
	
});

window.onload = function(){
	core.initMain();	
};



