import { Component, Type } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import {  TypePokemon } from '../models/typePokemon';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  cantidadMostrar:number = 10;
  typos: any[] =[
    {
      type:{
        name:""
      }
    }
  ]
  types:any = { 
  "fire":{
     nombre:"Fuego",
     color:"#EE8130"
     },
  "grass":{
    nombre:"Hierba",
    color:"#7AC74C"
  },
  "normal":{
    nombre:"Normal",
    color:"#A8A77A"
  },
  "water":{
    nombre:"Agua",
    color:"#6390F0"
  },
  "electric":{
    nombre:"Electrico",
    color:"#F7D02C"
  },
  "ice":{
    nombre:"Hielo",
    color:"#96D9D6"
  },
  "fighting":{
    nombre:"Lucha",
    color:"#C22E28"
  },
  "poison":{
    nombre:"Veneno",
    color:"#A33EA1"
  },
  "ground":{
    nombre:"Tierra",
    color:"#E2BF65"
  },
  "flying":{
    nombre:"Volador",
    color:"#A98FF3"
  },
  "psychic":{
    nombre:"Psiquico",
    color:"#F95587"
  },
  "bug":{
    nombre:"Bicho",
    color:"#A6B91A"
  },
  "rock":{
    nombre:"Roca",
    color:"#B6A136"
  },
  "ghost":{
    nombre:"Fantasma",
    color:"#735797"
  },
  "dragon":{
    nombre:"Dragon",
    color:"#6F35FC"
  },
  "dark":{
    nombre:"Siniestro",
    color:"#705746"
  },
  "steel":{
    nombre:"Acero",
    color:"#B7B7CE"
  },
  "fairy":{
    nombre:"Hada",
    color:"#D685AD"
  }   
}
  pokemones:Pokemon[] = [];
  constructor(private pokemonService:PokemonService) {
  }
  ngOnInit(){
    this.getPokemons();
  }
    getPokemons(){
      this.pokemonService.getPokemons().subscribe(data =>{
        this.pokemones = data.results;
        this.loadValueDefault();
        this.getPokemon(this.pokemones);
       });
    }

    confirmType(firstType:string,secondType:string){
      return "linear-gradient("+this.types[firstType].color+" 63%,"+this.types[secondType].color+" 80%)";
    }
    confirmTypeTwo(firstType:string){
      if(this.types[firstType]!= undefined){
        return this.types[firstType].color;
      }
      return "white";
    }

    loadValueDefault(){
      for (let i = 0; i < this.pokemones.length; i++) {
         this.pokemones[i].types = this.typos;
        
      }
    }
    addMoreAmount(){
      this.cantidadMostrar = this.cantidadMostrar+10;
    }
    getPokemon(pokemones:Pokemon[]){
      for (let index = 0; index < pokemones.length; index++) {
         this.pokemonService.getPokemon(pokemones[index].name).subscribe(
          dataDos =>{
            for (let j = 0; j< dataDos.types.length; j++) {
               this.pokemones[index].id = dataDos.id;
               this.pokemones[index].types = dataDos.types;
               this.pokemones[index].image= "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+dataDos.id+".png";
             }
          }
         );
        }
    }

    


   

}
