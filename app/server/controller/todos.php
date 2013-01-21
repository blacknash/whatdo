<?php
	class todos extends core{
		public function getlist(){
			return $this->db->select("todos","created");
		}

		public function save(){
			$data = $this->getRequestArgs();
			return $this->db->save("todos",$data);
		}
		public function update(){
			$data = $this->getRequestArgs();
			return $this->db->update("todos",$data, array("id"=>$data['id']));
		}
	}
?>