import { Component, Type } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import {  TypePokemon } from '../models/typePokemon';
import { PokemonService } from '../services/pokemon.service';
import { TablaTipo } from '../models/TablaTipos';

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
  tablaTipos: TablaTipo = new TablaTipo();
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
      return "linear-gradient("+this.tablaTipos.tablaTipos[firstType].color+" 63%,"+this.tablaTipos.tablaTipos[secondType].color+" 80%)";
    }
    confirmTypeTwo(firstType:string){
      if(this.tablaTipos.tablaTipos[firstType]!= undefined){
        return this.tablaTipos.tablaTipos[firstType].color;
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
