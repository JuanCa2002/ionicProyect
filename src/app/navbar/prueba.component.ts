import { Component, OnInit } from '@angular/core';
import { NgSelectOption } from '@angular/forms';
import { Router } from '@angular/router';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';
import { filter } from 'rxjs';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss'],
})
export class PruebaComponent implements OnInit {
  textoBuscador = "nombre ó numero";
  filtro:string ="seleccionar"; 
  generations:string[] = ["Generación","1", "2", "3", "4", "5", "6", "7", "8", "9"];
  types:string[] = ["Tipo","Normal","Fire","Water","Grass","Flying","Fighting","Poison"
  ,"Electric","Ground","Rock","Psychic","Ice","Bug","Ghost","Steel","Dragon","Dark","Fairy"];
  constructor(private route:Router) {
   }

  ngOnInit() {
  }

  buscarPokemon(termino:string){
     console.log(this.filtro)
     if(termino!="Generación" && termino!="Tipo"){
      this.route.navigate(['/buscar',this.filtro, termino]);
     }
  }


  

}
