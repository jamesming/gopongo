<div class="accordion-group" category_idx={{idx}} >
	<img  class='sort-handle-categories ' src='img/sort-handle.png'/>
	<div class="accordion-heading">
	  
	  <a idx={{idx}} class="accordion-toggle category" data-toggle="collapse" data-parent="#categories" href="#collapse{{idx}}">
	    {{category_name}}
	  </a>
	</div>
	<div id="collapse{{idx}}" class="accordion-body collapse in">
	  <div class="accordion-inner">
	    <ul  class="category-ul" ></ul>
	  </div>
	</div>
</div>