<?php
	include("lib/utils.php");
	include("lib/core.php");
	
	class index extends core{

		public function __construct(){
			parent::startApp();
			parent::showReplication();
		}
	}
	new index();
?>