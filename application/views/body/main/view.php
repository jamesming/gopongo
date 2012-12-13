<style>
	/**/
	#main{
		 width:970px;
	}	
	#main .wrapper{
		width:2830px;
	}
	#leftMenuBar{
		width:60px;	
	}
	.rightArea{
		width:817px;
		overflow-x:hidden;	
	}
	.rightArea .wrapper{
		width:830px;
	}
</style>	

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