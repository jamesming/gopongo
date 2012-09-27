<style>
	.droppable { width: 150px; height: 150px; padding: 0.5em; float: left; margin: 10px; }
	.draggable { width: 100px; height: 100px; padding: 0.5em; float: left; margin: 10px; cursor: hand; cursor: pointer; border: 1px solid #000;}
</style>
<div  id='main' class="container">
  <div class="row">
	<div class="span12">
			<div class="draggable" class="ui-widget-content">
				<p>I return home when I'm not dropped in the right place</p>
			</div>
		
			<div class="droppable ui-widget-header" id="element 1">
				<p>Drop me here</p>
			</div>
		
			<div class="droppable ui-widget-header" id="element 2">
				<p>Drop me here</p>
			</div>
		
			<div class="droppable ui-widget-header" id="element 3">
				<p>Drop me here</p>
			</div>		
	</div>
  </div>
</div>
<script>
$(function() {
	$( ".draggable" ).draggable({ revert: "invalid" });

	$( ".droppable" ).droppable({
		activeClass: "ui-state-hover",
		hoverClass: "ui-state-active",
		drop: function( event, ui ) {

			var targetElem = $(this).attr("id");

			$( this )
				.addClass( "ui-state-highlight" )
				.find( "p" )
					.html( "Dropped! inside " + targetElem );

					alert(targetElem);

		}
	});
});
</script>
