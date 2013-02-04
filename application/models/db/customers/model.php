<?php

class Models_Db_Customers_Model extends Database {
	
	public function getCustomers(){

		return $this->object_to_array($this->select_from_table( 
			$table = 'customers', 
			$select_what = "*", 
			$where_array = array(), 
			$use_order = FALSE, 
			$order_field = '', 
			$order_direction = 'asc', 
			$limit = -1
		));

	}
	


}
