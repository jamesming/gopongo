<div  id="main" class="container" >
	
	<div  class='wrapper ' >
		<div  id='leftMenuBar' class="fl"   >
			<h4  id='homeNav'  class='GothamBold ' >Home</h4>
			<h4  id='workNav' class='GothamBold ' >Work</h4>
			<h4  id='clientsNav' class='GothamBold ' >Clients</h4>
			<h4  id='loginNav' class='GothamBold ' >Login</h4>
		</div>
		
		<?php $this->load->view("body/main/home/view"); ?>	
		<?php $this->load->view("body/main/work/view"); ?>	
		<?php $this->load->view("body/main/clients/view"); ?>	
		<?php $this->load->view("body/main/login/view"); ?>		
	</div>

</div>