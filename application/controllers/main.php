<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Main extends Base_Controller {
	
	function __construct() {
		
		parent::__construct();
		
	}	

	public function index()
	{
		if( $this->_data->loggedIn == true ){
			
			$this->main_body();			
			
		}else{
			
			$this->_data->body = "body/login/view";
			$this->load->view('index', $this->_data);				
		};

	}
	
	
	public function main_body(){
		
		$this->_data->body = "body/main/view";
		$this->_data->hidden = "hidden/view";		
		$this->_data->videoplayer = "hidden/videoplayer/view";
		$this->_data->youtube = "hidden/youtube/view";
		$this->_data->jcrop = "hidden/jcrop/view";
		

		
		$this->load->view('index', $this->_data);			
		
		
	}

	public function validate(){
		
		sleep(0);	
		
		if( $this->input->post('username') == 'pongo'){
			
			$session_data = array('user_id' => 1 );						
			
			$this->session->set_userdata($session_data);			
			
			redirect('/main/main_body/');
			
		}else if($this->input->post('username') == 'jamesming'){
			
			$session_data = array('user_id' => 2 );						
			
			$this->session->set_userdata($session_data);	
			
			redirect('/main/main_body/');			
			
		}else{
			
			$this->session->sess_create();
			
			redirect('/main/index/');
			
		};
		
		
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
	
	
	public function testaudio(){
	?>	
		<audio     id='audioPlayer' src='http://ec-media.soundcloud.com/RyX1VUYc4L5W.128.mp3?ff61182e3c2ecefa438cd02102d0e385713f0c1faf3b0339595667f30d0ceb12bc47ca8f583a281f2c5bdc9ab424e432e37befdd465bfbc46fd226a1a3276e28926193f5a0&AWSAccessKeyId=AKIAJ4IAZE5EOI7PA7VQ&Expires=1349290691&Signature=QtiHgniMH%2FfQ03bMiSbAd6p5EmQ%3D' controls='controls' autoplay='autoplay' style='width: 197px;'></audio>
	<?php     	
	}
	
	
	public function testPlus(){
		
	?>	
	<!-- Place this tag where you want the share button to render. -->
<div class="g-plus" data-action="share"></div>

<!-- Place this tag after the last share tag. -->
<script type="text/javascript">
  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();
</script>
	<?php  		
		
	}
	
}
