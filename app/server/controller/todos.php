<?php
	class todos extends core{
		public function save(){
			$data = $this->getRequestArgs();
			return $this->db->save("todos",$data);
		}
		
		public function update(){
			$data = $this->getRequestArgs();
			return $this->db->update("todos",$data, array("id"=>$data['id']));
		}

		public function getlist(){
			$initweek = date("Y-m-d 00:00:00",strtotime('this week last monday', time()));
			$endweek = date("Y-m-d 00:00:00",strtotime('this week next sunday', time()));
			$conditions = array(
				"glue"=>"OR",
				"created"=>" BETWEEN '{$initweek}' AND '{$endweek}'",
				"status"=>"!='accepted'"
			);
			return $this->db->select("todos",'*',$conditions, "created");
		}

		public function getlistaccepted(){
			$initweek = date("Y-m-d 00:00:00",strtotime('this week last monday', time()));

			$conditions = array(
				"glue"=>"AND",
				"created"=>" < '{$initweek}'",
				"status"=>"='accepted'"
			);

			$todos =$this->db->select("todos","*",$conditions, NULL,"created");
		
			$collection = array();
			foreach($todos as $todo){
				$group = date("WY",strtotime($todo['created']));
				if(!isset($collection[$group])){

					$week = date("W",strtotime($todo['created']));
					$year = date("Y",strtotime($todo['created']));
					
					$timestamp = mktime( 0, 0, 0, 1, 1,  $year ) + ( $week * 7 * 24 * 60 * 60 );
        	$timestamp_for_monday = $timestamp - 86400 * ( date( 'N', $timestamp ) - 1 );
        	$label = date( 'Y-m-d', $timestamp_for_monday );

					$collection[$group]=array(
						'label'=>$label,
						'todos'=>array(),
					);

				}
				array_push($collection[$group]['todos'],$todo);
			}
			return $collection;
		}
	}
?>