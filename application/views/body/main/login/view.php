	<div id='loginArea'  class=" rightArea fl"    style='display:none' >
			<div class="span4 well">
				<legend>Please Sign In</legend>
	          	<div class="alert alert-error">
	                <a class="close" data-dismiss="alert" href="#">×</a>Incorrect Username or Password!
	            </div>
				<form method="POST" action="<?php  echo base_url()   ?>main/validate" accept-charset="UTF-8">
					<input type="text" id="username" class="span4" name="username" placeholder="Username">
					<input type="password" id="password" class="span4" name="password" placeholder="Password">
		
					<button type="submit" class="btn btn-info btn-block">Sign in</button>
				</form>    
			</div>
	</div>