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
  
  pokemones:Pokemon[];
  types:TypePokemon[];
  constructor(private pokemonService:PokemonService) {
    this.getPokemons();
  }
    getPokemons(){
      this.pokemonService.getPokemons().subscribe(data =>{
        this.pokemones = data.results;
        this.getPokemon(this.pokemones);
        console.log(this.pokemones);
        //this.pokemones = this.asignarDescripcionPokemon(this.pokemones);
       });
    }

    /**asignarDescripcionPokemon(pokemones:Pokemon[]):Pokemon[]{
      for (let index = 0; index < pokemones.length; index++) {
        this.pokemonService.getPokemonDescription(pokemones[index].name).subscribe(
          data =>{
            for (let j = 0; j < data.flavor_text_entries.length; j++) {
              if(data.flavor_text_entries[j].language.name == 'es'){
                pokemones[index].description =data.flavor_text_entries[j].flavor_text;
                break;
              }
            }
          }
        );
        
      }
      return pokemones;
    }**/

    getPokemon(pokemones:Pokemon[]){
      for (let index = 0; index < pokemones.length; index++) {
         this.pokemonService.getPokemon(pokemones[index].name).subscribe(
          dataDos =>{
            for (let j = 0; j< dataDos.types.length; j++) {
               this.pokemones[index].id = dataDos.id;
               pokemones[index].image= "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+dataDos.id+".png";
               this.pokemones[index].typesPokemon= dataDos.types;
             }
          }
         );
        }
    }


   

}
