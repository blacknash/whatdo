<?php
class db_mysqli{
	private $source;
	
	public function __construct($config){
		$this->source = mysqli_connect($config['host'],$config['username'],$config['password'],$config['database']);
	}

	public function db_array($query){
		$data = array();
		while($row = mysqli_fetch_assoc($query)){
			array_push($data, $row);
		}
		return $data;
	}

	public function field_correct($fields){
		$_fields = array();
		foreach($fields as $field){
			$field = sprintf("`%s`",$field); 
			array_push($_fields, $field);
		}
		return $_fields;
	}

	public function save($table,$fields){
		$completefields = array();
		$values = array();

		$fields['created'] = date("Y-m-d H:i:s");
		$fields['updated'] = date("Y-m-d H:i:s");

		foreach($fields as $name=>$value){
			array_push($completefields,sprintf("`%s`",$name)); 
			array_push($values,sprintf("'%s'",$value));
		}

		$completefields = implode(",", $completefields);
		$values = implode(",", $values);

		$query = "INSERT INTO {$table}({$completefields}) VALUES({$values})";
		$this->execute($query);
		return $this->source->insert_id;
	}

	public function update($table,$fields,$conditions,$conditionglue = "AND"){
		$condition = array();
		$assoc = array();

		foreach($fields as $field => $value){
			array_push($assoc,sprintf(" `%s`='%s' ",$field,$value));
		}

		foreach($conditions as $field => $value){
			array_push($condition,sprintf(" `%s`='%s' ",$field,$value));
		}

		$assoc = implode(",", $assoc);
		$condition = implode($conditionglue,$condition);

	 $query = "UPDATE {$table} SET {$assoc} WHERE {$condition}";
	 $this->execute($query);
	}

	public function select($table,$conditions = NULL,$order=NULL,$fields = "*"){
		
		if(is_array($fields)){
			$fields = implode(",",$this->field_correct($fields));
		}

		if(!is_null($order)){
			if(is_array($order)){
				$order = implode(",",$this->field_correct($order));
			}else{
				$order = sprintf(" ORDER BY `%s`",$order); 
			}
		}

		$query = "SELECT {$fields} FROM {$table} {$order}";
		$query = $this->execute($query);
		return $this->db_array($query);
	}

	public function execute($query){
		$query = mysqli_query($this->source,$query);
		return $query;
	}
}
?>