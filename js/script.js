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

	,loadContentIntoFancyZoom: function(content){
		
		$('#modal_box').html( content );
		

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
    	
};

_.extend(core, {
	
	 initMain: function(){
	 	
		var  that = this
			,url = window.base_url  + 'index.php/json';
		
		$('#json').load(url, function(){
			that.create.init();
			that.bindElements.init();
		});	
	
		
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


		this.category_idx = 0;
		
	}

	,bindElements: {
		
		 init: function(){
			this.createNewDom();
			this.accordianControls();
			this.formSubmission();
		}
		
		,accordianControls: function(){
			
			$(".collapse").collapse({
					  toggle: true
			});
			
			$('.category').live('click', function(event) {
				$('#thumb-collection-ul').empty();			
				core.create.asset.init($(this).attr('idx'));
				core.category_idx  = $(this).attr('idx');
			});					
			
		}
		
		,createNewDom: function(){		
			
			$('#addCategory').click(function(event) {
				
				var count_catgeories = core.categories.length;
				
				core.create.category.add('', count_catgeories); 	
					
			});	
			
			$('#addAsset').click(function(event) {
				
				if ( ! core.form_asset_tpl) {
				  core.form_asset_tpl = core.loadTemplate('js/tpl/form_asset.tpl');
				}		
		
				var tpl = core.form_asset_tpl;
	
				core.loadContentIntoFancyZoom( tpl );		
				
				
			}).fancyZoom({});			
			
		}
		
		,formSubmission: function(){
			
			$('#zoom .submit_asset_form').live('click', function(event) {
				
				var  asset_name = $('#zoom .asset_name').val()
					,image_url = $('#zoom .image_url').val()
					,assetObj = {
						 name:asset_name
						,image:image_url
					};
					
				core.create.asset.add(
					 asset_name
					,image_url
					,core.category_idx
				);
				
				core.create.category_li.add(
					 core.category_idx
					,{name:asset_name}
				);
				
				if( typeof(core.categories[core.category_idx].assets) === "undefined"){	
					core.categories[core.category_idx].assets = [];
				};				
				
				core.categories[core.category_idx].assets.push(assetObj);
				
				$('body').click();
				
			});	
		}
		
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
					
					this.add(core.categories[idx].name, count);
					
					if( typeof(core.categories[idx].assets) !== "undefined"){
						
						for(var index in core.categories[idx].assets){
							core.create.category_li.add(idx, core.categories[idx].assets[index])
						};
					};
					
					
					
					count++;
				};
	
			}
			
			,add: function(name, count){
				
					if ( ! core.category_tpl) {
					  core.category_tpl = core.loadTemplate('js/tpl/category.tpl');
					}		
			
					var tpl = core.category_tpl;
		
					tpl  = tpl.replace(/{{idx}}/g, count);
					tpl  = tpl.replace(/{{name}}/g, name);
					
					$('#categories').append(tpl);
	
			}
			
		}

		,category_li:{
			
			add: function(idx, li_obj){	
			
					if ( ! core.category_li_tpl) {
					  core.category_li_tpl = core.loadTemplate('js/tpl/category_li.tpl');
					}		
			
					var tpl = core.category_li_tpl;
		
					tpl  = tpl.replace(/{{name}}/g, li_obj.name);
					
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
			 	
				for(var idx in core.categories[category_idx].assets){
					this.add(
							 core.categories[category_idx].assets[idx].name
							,core.categories[category_idx].assets[idx].image
							,category_idx
						);
				};
				
			}
			
			,add: function(
					 name
					,image
					,category_idx
				){	
				
				if ( ! core.asset_tpl) {
				  core.asset_tpl = core.loadTemplate('js/tpl/asset.tpl');
				}		
				
				var tpl = core.asset_tpl;
	
				tpl  = tpl.replace(/{{name}}/g, name);
				tpl  = tpl.replace(/{{image}}/g, image);
				
				$('#thumb-collection ul').append(tpl);	
							
			}
			
		}
		
	}

	
});

window.onload = function(){
	core.init();	
	core.initMain();	
};



