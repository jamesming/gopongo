<?php
class Base_Controller extends CI_Controller 
{

	protected $_data;
	
	function __construct() {
		
		parent::__construct();

		$this->_data = new stdClass;
		
		$this->_data->title = "Pongo";
		$this->_data->company_name = "Pongo LLC";
		$this->_data->GA_account = "UA-XXXXX-X";

		$this->_data->header = "header/header";
		$this->_data->nav = "nav/nav";
		$this->_data->hidden = "hidden/view";
		$this->_data->company = "footer/company";			
		$this->_data->footer = "footer/footer";
		
		
	}
	


	function create_table(){
		
		/* 
		*
		*  		/create_table?table=categories
		*
		*/
		
		$table = $this->input->get('table');
		
		$this->model = new Models_Db_Categories_Model;
		
		$this->model->create_generic_table($table); 
		
		
		$fields_array = array(
		                      'name' => array(
		                                               'type' => 'varchar(255)'
		                                    ),
		                                    
		                                    
		                      'category_id' => array(
		                                               'type' => 'int(11)'
		                                    )/*,,
		                      'numberOfColors' => array(
		                                               'type' => 'int(11)'
		                                    )			                                    
		                                    
		                                    
		                      'county' => array(
		                                               'type' => 'varchar(255)'
		                                    ),
		                      'city' => array(
		                                               'type' => 'varchar(255)'
		                                    ),
		                      'state' => array(
		                                               'type' => 'varchar(255)'
		                                    )*/
		              ); 
		              
		echo '<pre>';print_r(  $fields_array   );echo '</pre>';   
		$this->model->add_column_to_table_if_not_exist(
			$table, 
			$fields_array
		);
	   
	
	}
}