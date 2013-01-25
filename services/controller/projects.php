<?php
	class projects extends core{
		public function getlist(){
			return $this->db->select("projects");
		}
	}
?>