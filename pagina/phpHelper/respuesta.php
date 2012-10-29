<?php
class Respuesta
{
    public $tipo;
    public $desc;

    function __construct($tipo,$desc){
     $this->tipo=$tipo;
     $this->desc=$desc;
    }

    // Get

    function getTipo(){
      	 return $this->tipo;
   	}

    function getDesc(){
      	 return $this->desc;
   	}
}
?>