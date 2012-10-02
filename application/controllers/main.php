<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Main extends Base_Controller {
	
	function __construct() {
		
		parent::__construct();
		
		
	}	

	public function index()
	{
		$this->_data->body = "body/main/view";
		$this->_data->hidden = "hidden/view";		
		$this->_data->videoplayer = "hidden/videoplayer/view";
		$this->_data->youtube = "hidden/youtube/view";
		$this->_data->jcrop = "hidden/jcrop/view";
		
		$this->_data->nav_selected = "";		
		
		$this->load->view('index', $this->_data);	
	}
	
	
	
	public function testvideo(){
		
		$this->_data->body = "body/main/testvideo";
		$this->_data->nav_selected = "";
		$this->load->view('index', $this->_data);
		
	}
	
	public function test(){

		$this->_data->body = "body/test/view";
		$this->_data->nav_selected = "";		
		$this->load->view('index', $this->_data);
		
		
	}
	
	
	public function testPostToIframe(){
		
	?>	
	<form  
		target='iframe_upload'  
		action='<?php echo base_url()    ?>ajax/testPostToIframe'  
		enctype='multipart/form-data'  
		method='POST'
	>
		<input name="filename" id="filename" type="file" value="">
		<input name="submit" id="submit" type="submit" value="submit">
	</form>
	<iframe  id='iframe_upload' name='iframe_upload'  style='border:1px solid gray;width:200px;height:200px'  ></iframe>
	
	<?php     	
		
	}
}
