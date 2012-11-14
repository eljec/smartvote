<?php

	/**
	 *  Se encarga de dibujar la pagina, me da los controles
	 */
	class RenderPagina {
		
		public function PaginaPortada_Menu_Usuario()
		{
			$control = '<div class="row">
							<div class="span6 gris bordeRedondoGral zoom animated bounceInLeft" id="usuario">
								<div class="espacioPadin" align="center">
									<h2>Usuarios</h2>
								</div>
                			</div>
                		</div>';
			return $control;    	
		}
		
		public function PaginaPortada_Presentacion_Usuaro_Normal()
		{
			$texto = ' <p>Es una aplicacion que te permite poner en la "nube" tus porpias encuestas y cuestionarios, asi toda la gente puede participar y responderlas.Es muy facil de usar y no te tomara mucho tiempo...</p>';
			return $texto;
		}
	}
	

?>