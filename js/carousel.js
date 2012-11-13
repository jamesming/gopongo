_.extend(core, {
	start:function(){
		
		var  that = this
			,url = window.base_url  + 'index.php/ajax/getCarousel';
		
		$('#json').load(url, function(){
			that.addImagesToCarousel();
			$('.carousel').carousel({
			  interval: 2000
			})			
		});	

	},
	
	addImagesToCarousel: function(){
		
		var slides = '', tpl = '', img_src ='';
		this.carousel_tpl = core.loadTemplate(window.base_url+'js/tpl/carousel.tpl');
		
		for(var idx in core.carousel){
			
			tpl  = this.carousel_tpl;
			img_src = window.base_url + 'uploads/'+ core.carousel[idx].asset_id +'/thumb/image.jpg?v=' + Math.random();		
			tpl = tpl.replace(/{{img_src}}/g, img_src);
			
			slides += tpl;
		};
		
		$('.carousel-inner').append(slides);		
	}
});

window.onload = function(){ core.start();	};