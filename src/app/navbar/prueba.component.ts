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
  types:any = [
      {
      nombre:"Tipo",
      nombreOriginal:"Tipo",
      color:"#EE8130"
      },
       {
       nombre:"Fuego",
       nombreOriginal:"Fire",
       color:"#EE8130"
       },
      {
      nombre:"Hierba",
      nombreOriginal:"Grass",
      color:"#7AC74C"
      },
      {
      nombre:"Normal",
      nombreOriginal:"Normal",
      color:"#A8A77A"
      },
      {
      nombre:"Agua",
      nombreOriginal:"Water",
      color:"#6390F0"
      },
    {
      nombre:"Electrico",
      nombreOriginal:"Electric",
      color:"#F7D02C"
    },
    {
      nombre:"Hielo",
      nombreOriginal:"Ice",
      color:"#96D9D6"
    },
    {
      nombre:"Lucha",
      nombreOriginal:"Fighting",
      color:"#C22E28"
    },
    {
      nombre:"Veneno",
      nombreOriginal:"Poison",
      color:"#A33EA1"
    },
    {
      nombre:"Tierra",
      nombreOriginal:"Ground",
      color:"#E2BF65"
    },
    {
      nombre:"Volador",
      nombreOriginal:"Flying",
      color:"#A98FF3"
    },
    {
      nombre:"Psiquico",
      nombreOriginal:"Psychic",
      color:"#F95587"
    },
    {
      nombre:"Bicho",
      nombreOriginal:"Bug",
      color:"#A6B91A"
    },
    {
      nombre:"Roca",
      nombreOriginal:"Rock",
      color:"#B6A136"
    },
    {
      nombre:"Fantasma",
      nombreOriginal:"Ghost",
      color:"#735797"
    },
    {
      nombre:"Dragon",
      nombreOriginal:"Dragon",
      color:"#6F35FC"
    },
    {
      nombre:"Siniestro",
      nombreOriginal:"Dark",
      color:"#705746"
    },
    {
      nombre:"Acero",
      nombreOriginal:"Steel",
      color:"#B7B7CE"
    },
    {
      nombre:"Hada",
      nombreOriginal:"Fairy",
      color:"#D685AD"
    }   
  ]
  generations:string[] = ["Generación","1", "2", "3", "4", "5", "6", "7", "8", "9"];
  constructor(private route:Router) {
   }

  ngOnInit() {
  }

  buscarPokemon(termino:string){
     if(termino!="Generación" && termino!="Tipo"){
      this.route.navigate(['/buscar',this.filtro, termino]);
     }
  }


  

}
