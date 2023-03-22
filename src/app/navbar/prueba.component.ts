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
  generations:string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  types:string[] = ["Normal","Fire","Water","Grass","Flying","Fighting","Poison"
  ,"Electric","Ground","Rock","Psychic","Ice","Bug","Ghost","Steel","Dragon","Dark","Fairy"];
  constructor(private route:Router) { }

  ngOnInit() {
   
  }

  buscarPokemon(termino:String,filtro:string){
    console.log(termino);
     this.route.navigate(['/buscar',termino, filtro]);
  }

  cambiarTextoBuscador(filtro:string){
     if(filtro == "nombre-numero"){
      this.filtroAux = "nombre-numero";
      this.textoBuscador = "Nombre ó numero";
      console.log(this.textoBuscador);
     }else if(filtro == "generacion"){
      this.filtroAux = "generacion";
      this.textoBuscador = "Generación";
      console.log(this.textoBuscador);
     }else{
      this.filtroAux = "tipo";
      this.textoBuscador = "Tipo";
      console.log(this.textoBuscador);
     }
  }
  

}
