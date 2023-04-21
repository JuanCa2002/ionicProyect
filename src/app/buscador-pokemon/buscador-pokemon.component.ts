import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Pokemon } from '../models/pokemon';
import { TypePokemon } from '../models/typePokemon';
import { PokemonService } from '../services/pokemon.service';
import { TablaTipo } from '../models/TablaTipos';

@Component({
  selector: 'app-buscador-pokemon',
  templateUrl: './buscador-pokemon.component.html',
  styleUrls: ['./buscador-pokemon.component.scss'],
})
export class BuscadorPokemonComponent implements OnInit {
  cantidadMostrar:number = 10;
  termino:string;
  pokemon:Pokemon;
  type:TypePokemon;
  textoBusqueda:string;
  parametro:string;
  pokemones: Pokemon[] = [];
  encontrado:number =-1;
  pokemonesEncontrados : Pokemon[] = [];
  tablaTipos: TablaTipo = new TablaTipo();
  
  constructor(private activatedRoute:ActivatedRoute, private pokemonService: PokemonService) { }

  ngOnInit() {
    this.pokemonService.getPokemons().subscribe(data=>{
      this.pokemones = data.results;
      this.pokemones = this.getPokemon(this.pokemones);
      this.activatedRoute.params.subscribe(params =>{
        this.termino = params['termino'];
        this.parametro = params['parametro'];
        if(this.parametro == "nombre-numero"){
          this.pokemonesEncontrados = this.getPokemonByNumberOrName(this.termino);
          this.confirmarEncontrados();
        }else if(this.parametro =="generacion"){
          this.showLoading(2000);
          this.pokemonesEncontrados = this.getPokemonByGeneration(this.termino);
          this.encontrado = 1;
        }else{
          this.getPokemonByType(this.termino);
          this.encontrado = 1;
          this.showLoading(2500);
        }
      });
    });
  }

  addMoreAmount(){
    this.cantidadMostrar = this.cantidadMostrar+10;
  }

  confirmarEncontrados(){
     if(this.pokemonesEncontrados.length!=0){
        this.showLoading(1000);
        this.encontrado = 1;
     }else{
       this.encontrado = 0;
     }
  }


  getPokemon(pokemones:Pokemon[]):Pokemon[]{
    for (let index = 0; index < pokemones.length; index++) {
       this.pokemonService.getPokemon(pokemones[index].name).subscribe(
        dataDos =>{
          pokemones[index].image= "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+dataDos.id+".png";
          pokemones[index].id = dataDos.id;
          pokemones[index].types= dataDos.types;
        }
       );
      }
      return pokemones;
  }
  
  confirmType(firstType:string,secondType:string){
    return "linear-gradient("+this.tablaTipos.tablaTipos[firstType].color+" 63%,"+this.tablaTipos.tablaTipos[secondType].color+" 80%)";
  }
  confirmTypeTwo(firstType:string){
    return this.tablaTipos.tablaTipos[firstType].color;
  }

  getPokemonByGeneration(generacion:string):Pokemon[]{
    let pokemonesEncontrados:Pokemon[] = [];
    let number;
    for(let pokemon of this.pokemones){
      let match = pokemon.url.match(/pokemon\/(\d+)/);
      if (match) {
        number = parseInt(match[1]);
        if(number <= 151 && generacion == "1"){
           pokemonesEncontrados.push(pokemon);
        }else if(number>151 && number<=251 && generacion == "2"){
          pokemonesEncontrados.push(pokemon);
        }else if(number>251 && number<=386 && generacion == "3"){
          pokemonesEncontrados.push(pokemon);
        }else if(number>386 && number<=493 && generacion == "4"){
          pokemonesEncontrados.push(pokemon);
        }else if(number>493 && number<=649 && generacion == "5"){
          pokemonesEncontrados.push(pokemon);
        }else if(number>649 && number<=721 && generacion == "6"){
          pokemonesEncontrados.push(pokemon);
        }else if(number>721 && number<=809 && generacion == "7"){
          pokemonesEncontrados.push(pokemon);
        }else if(number>809 && number<=905 && generacion == "8"){
          pokemonesEncontrados.push(pokemon);
        } else if(number>905 && number<=1010 && generacion == "9"){
          pokemonesEncontrados.push(pokemon);
        }
      }
    }
    this.textoBusqueda = "Pokemones de la generacion "+generacion;
    return pokemonesEncontrados;
  }

  showLoading(tiempo:number){
    Swal.fire({
      heightAuto: false,
      title: 'Cargando...',
      showConfirmButton: false,
      timer:tiempo
    }).then();{
      Swal.showLoading()
    };
  }

  getPokemonByType(termino:string){
    let pokemon:Pokemon;
    termino = termino.toLowerCase();
    this.pokemonService.getPokemonsByType(termino).subscribe(dataUno =>{
      for (let i = 0; i < dataUno.pokemon.length; i++) {
          this.pokemonService.getPokemon(dataUno.pokemon[i].pokemon.name).subscribe(data =>{
            if(data.id <=1010){
              let image:string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+data.id+".png";
              pokemon = new Pokemon(data.id, data.name,"https://pokeapi.co/api/v2/pokemon/"+data.id, image, data.types);
              this.pokemonesEncontrados.push(pokemon);
            }
          } );
        }
    });
    this.textoBusqueda = "Pokemones de tipo "+this.tablaTipos.tablaTipos[termino].nombre;
    
  }

  getPokemonByNumberOrName(termino:string):Pokemon[]{
    let pokemonesEncontrados: Pokemon[]=[]
    termino= termino.toLowerCase();
    let number;
    for(let pokemon of this.pokemones){
      let name=pokemon.name.toLowerCase();
      let match = pokemon.url.match(/pokemon\/(\d+)/);
      if (match) {
        number = match[1];
      }
      var valoresAceptados = /^[0-9]+$/;
      if (termino.match(valoresAceptados)){
        if(termino === number){
          pokemonesEncontrados.push(pokemon);
        }
      }else{
        if(name.indexOf(termino)>=0 ){
          pokemonesEncontrados.push(pokemon);
        }
      }
    }
    this.textoBusqueda = "Pokemones encontrados con el termino: "+this.termino;
    return pokemonesEncontrados;
  }

}
