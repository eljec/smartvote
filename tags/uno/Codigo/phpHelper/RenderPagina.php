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
		
		public function PaginaEncuesta_AltaEncuesta_Control_Programa()
		{
			$control = '<li class="active"><a href="#partePrograma" data-toggle="tab"> Programa</a></li>';
			
			return $control;
		}
		
		public function PaginaEncuesta_BajaEncuesta_Control_Programa()
		{
			$control = '<td><div id="listaPrograma_BajaEncusta"></div></td>';
			
			return $control;
		}
		
		public function PaginaEncuesta_AltaEncuesta_Content_Control_Programa()
		{
			$control = ' <div class="tab-pane active" id="partePrograma">
							<div class="negro bordeRedondoGral">
								<h3 align="center">Seleccion Programa</h3>
							</div>
							<div align="center">
								<div id="alertaProgramas" class="alert ocultar TamAlerta"></div>
							</div>
							<div align="center" style="height: 300px;">
								<br>
								<div id="listaPrograma"></div>
							</div>
						</div>';
			return $control;
		}
	}
	

?>