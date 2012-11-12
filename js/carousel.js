_.extend(core, {
	start:function(){
		
		
		var  that = this
			,url = window.base_url  + 'index.php/ajax/getCarousel';
		
		$('#json').load(url, function(){
			
			console.log(JSON.stringify(core.carousel));
			
		});	
		
		
		$('.carousel').carousel({
		  interval: 2000
		})
	}
});

window.onload = function(){ core.start();	};