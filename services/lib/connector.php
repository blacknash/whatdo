<?php
class connector{
	public $db = "HOLA";
	
	public function __construct($driver = 'mysqli'){
		include(WHATDO_BASE_DIR."config.php");		
		include(WHATDO_DRIVERS_DIR.$driver.".php");
		$driverName = "db_".$driver;
		$this->db = new $driverName($database[$driver]);
	}
}
?>