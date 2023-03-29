import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss'],
})
export class PruebaComponent implements OnInit {
  textoBuscador = "nombre ó numero";
  filtroAux:string = "nombre-numero";
  generations:string[] = ["Generación","1", "2", "3", "4", "5", "6", "7", "8", "9"];
  types:string[] = ["Tipo","Normal","Fire","Water","Grass","Flying","Fighting","Poison"
  ,"Electric","Ground","Rock","Psychic","Ice","Bug","Ghost","Steel","Dragon","Dark","Fairy"];
  constructor(private route:Router) {
   }

  ngOnInit() {
  }

  buscarPokemon(filtro:String,termino:string){
     if(termino!="Generación" && termino!="Tipo" ){
      this.route.navigate(['/buscar',filtro, termino]);
     }
  }

  cambiarFiltro(filtro:string){
     if(filtro == "nombre-numero"){
      this.filtroAux = "nombre-numero";
      this.textoBuscador = "Nombre ó numero";
     }else if(filtro == "generacion"){
      this.filtroAux = "generacion";
     }else{
      this.filtroAux = "tipo";
     }
  }
  

}
