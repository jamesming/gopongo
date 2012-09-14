<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Main extends Base_Controller {
	
	function __construct() {
		
		parent::__construct();
		
		
	}	

	public function index()
	{
		$this->_data->body = "body/main/view";
		$this->_data->videoplayer = "hidden/videoplayer/view";
		$this->_data->youtube = "hidden/youtube/view";
		
		$this->_data->nav_selected = "";		
		
		$this->load->view('index', $this->_data);	
	}
	
	
	
	public function testvideo(){
		
		$this->_data->body = "body/main/testvideo";
		$this->_data->nav_selected = "";
		$this->load->view('index', $this->_data);
		
	}
}
