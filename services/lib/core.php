<?php

define("DS", DIRECTORY_SEPARATOR);
define("WHATDO_BASE_DIR",  dirname(dirname(__FILE__)).DS);
define("WHATDO_DRIVERS_DIR",WHATDO_BASE_DIR."lib/drivers".DS);
define("WHATDO_CONTROLLER_DIR",WHATDO_BASE_DIR."controller".DS);

include("lib/connector.php");

class core extends connector{
	
	private $classname = "", $action = "", $format = "";
	private $object = NULL;
	public $data = NULL;

	public function startApp(){
		$this->checkWhatDo();
		$classfile = WHATDO_CONTROLLER_DIR.$this->classname.".php";
		if(file_exists($classfile)){
			include($classfile);
			$this->object = new ReflectionClass("{$this->classname}");
				if($this->object->hasMethod($this->action)){
				$this->object= new $this->classname;
				$this->data = $this->object->{$this->action}();
			}
		}
	}

	public function showReplication(){
		switch ($this->format) {
			case 'json':
				print json_encode($this->data);
			break;
			case 'ajax':
				printf("%s",$this->data);
			break;
		}
	}

	public function getAppArgs(){
		if(!isset($_GET['service'])){
			die("");
		}
		return explode("/",$_GET['service']);
	}

	public function getRequestArgs(){
		$data = file_get_contents("php://input");
		$obj = get_object_vars(json_decode($data));
		return $obj;
	}

	private function checkWhatDo(){
		$args = $this->getAppArgs();
		list($this->classname,$this->action) = $args;
		if(preg_match("/./", $this->action)){
			list($this->action,$this->format) = explode(".",$this->action);
		}
	}

}
?>