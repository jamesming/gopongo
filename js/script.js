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
	 	
		var  that = this
			,url = window.base_url  + 'index.php/ajax/getAll';
		
		$('#json').load(url, function(){
			that.category_idx = 0;
			that.create.init();
			that.bindElements.init();
		});	
		
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
		
					tpl  = tpl.replace(/{{asset_name}}/g, li_obj.asset_name);
					tpl  = tpl.replace(/{{asset_id}}/g, li_obj.asset_id);
					
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
							,count
						);
				};
				
			}
			
			,add: function(
					 asset_name
					,asset_id
					,count
				){	
				
				if ( ! core.asset_tpl) {
				  core.asset_tpl = core.loadTemplate('js/tpl/asset.tpl');
				}		
				
				var tpl = core.asset_tpl;
	
				tpl  = tpl.replace(/{{asset_name}}/g, asset_name);
				tpl  = tpl.replace(/{{asset_id}}/g, asset_id);
				tpl  = tpl.replace(/{{asset_id}}/g, asset_id);
				tpl  = tpl.replace(/{{count}}/g, count);
				
				$('#thumb-collection ul.assets_ul').append(tpl);	
				
				core.misc.showHideButtonBasedOnNumofAssets();
							
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
			this.deleteAsset();
			
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
				$('#thumb-collection-ul').empty();			
				core.create.asset.init($(this).attr('idx'));
				core.category_idx  = $(this).attr('idx');
				
				core.misc.showHideButtonBasedOnNumofAssets();
				
				core.bindElements.editAsset();
				
			});					
			
		}
		
		,formSubmission: {
			
			 init:function(){
			  	
			  	var that = this;
			
				$('#zoom .submit_asset_form').live('click', function(event) {
					
					var  asset_name = $('#zoom .asset_name').val()
						,assetObj = {
							 asset_name:asset_name
							,category_id:core.categories[core.category_idx].category_id
						};
						
					$('body').click();
					
					that.postAsset(assetObj);
						
				});	
			}
			
			,postAsset: function(assetObj){
				
	 			url = window.base_url  + 'index.php/ajax/insertAsset';
	 			
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
							
							$el = $('.edit[asset_id=' + insert_id + ']');
							
							core.bindElements.editAsset.fancyZoomThis( $el );

						}
				);	
				
			}
		}
		
		,insertAsset: function(){
			
			$('#addAsset').fancyZoom({},function(){});	
				
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
							}
						);	
						
						
						$('#zoom_content .asset_name').val(core.categories[core.category_idx].assets[idx_array[0]].asset_name);
						
						
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
	}
	
});

window.onload = function(){
	core.initMain();	
};



