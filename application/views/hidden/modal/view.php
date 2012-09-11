<div   id='modal_box'   style='display:none'  >
	<div  class='form_asset_container span7' >
		<form  class="form-horizontal">
			
			<h2>Video Upload
			</h2>
			<div>
				<div  class=' oh' >
					
					
					  <div class="control-group">
					    <label class="control-label" for="asset_name">Name</label>
					    <div class="controls">
					      <input type="text" class="asset_name input-medium" placeholder="Name" >
					    </div>
					  </div>		
					  <div class="control-group">
					    <label class="control-label" for="asset_client">Client</label>
					    <div class="controls">
					      <input type="text" class="asset_client input-medium" placeholder="Client" >
					    </div>
					  </div>						  		
					  
					  <div class="control-group">
					    <label class="control-label" for="asset_description">Description</label>
					    <div class="controls">
					    	<textarea class="asset_description input-medium" placeholder="Description" ></textarea>
					    </div>
					  </div>		  
					  
					
				</div>
				
				
				<div  class=' oh' >
					
					<div  class='img_wrapper ' >
						<img  src="http://www.placehold.it/280x159" class="img-polaroid thumb_img">
					</div>
					<div class="input-append">
					  <input class="span2" size="16" type="text"><button class="btn video_uplr" type="button">Go!</button>
					</div>			
					
				</div>				
			</div>
			
			<div  class='submit_wrapper '   >
				<button class='btn btn-primary submit_asset_form'  type="button" >Submit</button>
			</div>

		</form>
		
		<form  class='uploadVideo'  target='iframe_upload'  action='<?php echo base_url()    ?>ajax/upload'  enctype='multipart/form-data'  method='POST'>
			<input name="filename"  class='filename ' type="file" value=""   style='visibility:hidden'  >
			<input name="asset_id" type="hidden" value="">
			<input type="submit" value="submit"  style='visibility:hidden' >
			<!--  -->
		</form>		
		
	</div>
</div>