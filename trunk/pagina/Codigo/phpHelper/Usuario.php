<?php
	
	//include("SmartVoteDB.php");
	
	 class Usuario  
	 {
		private $user_name;
		private $base;
		
		function __construct($name) 
		{
			$this->user_name = $name;
			$this->base = new SmartVoteDB();
		}
		
		public function getCategoriaUsuario()
		{
			try{
				
				return $this->base->getCategoriaUsuario($this->user_name);
				
			}catch(Exception $e)
			{
				throw new Exception();
			}
		}
		
		public function getPermisosUsuarios()
		{
			try{
				
				return $this->base->getPermisosUsuario($this->user_name);
				
			}catch(Exception $e)
			{
				throw new Exception();
			}
		}
	}
	
?>