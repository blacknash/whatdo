<?php
	class users extends core{
		public function getlist(){
			return $this->db->select("users","name");
		}
	}
?>