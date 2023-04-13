import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Pokemon } from '../models/pokemon';
import { TypePokemon } from '../models/typePokemon';
import { PokemonService } from '../services/pokemon.service';

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
          this.pokemonesEncontrados = this.getPokemonByGeneration(this.termino);
          this.encontrado = 1;
          this.showLoading(2000);
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
        this.encontrado = 1;
        this.showLoading(1000);
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
    return "linear-gradient("+this.types[firstType].color+" 63%,"+this.types[secondType].color+" 80%)";
  }
  confirmTypeTwo(firstType:string){
    return this.types[firstType].color;
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
    this.textoBusqueda = "Pokemones de tipo "+this.types[termino].nombre;
    
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
    return pokemonesEncontrados;
  }

}
