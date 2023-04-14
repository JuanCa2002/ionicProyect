export class TablaTipo{
   tablaTipos:any;

   constructor(){
      this.tablaTipos =
         { "bug":
             { 
               nombre:"Bicho",
               color:"#A6B91A",
               debilContra: ["fairy","fire","flying","ghost","poison","steel","fighting"]
               },
            "poison":{ 
               nombre:"Veneno",
               color:"#A33EA1",
               debilContra: ["ghost","ground","poison","rock","steel"]
               },
            "dark":{
               nombre:"Siniestro",
               color:"#705746",
               debilContra: ["dark","fairy","fighting"]
            },
            "dragon":{
               nombre:"Dragon",
               color:"#6F35FC",
               debilContra:["fairy","steel"]
            },
            "electric":{
               nombre:"Electrico",
               color:"#F7D02C",
               debilContra:["dragon","electric","grass","ground"]
            },
            "fairy":{
               nombre:"Hada",
               color:"#D685AD",
               debilContra:["fire","poison","steel"]
            },
            "fighting":{
               nombre:"Lucha",
               color:"#C22E28",
               debilContra:["bug","fairy","flying","ghost","poison","psychic"]
            },
            "fire":{
               nombre:"Fuego",
               color:"#EE8130",
               debilContra:["dragon","fire","rock","water"]
            },
            "flying":{
               nombre:"Volador",
               color:"#A98FF3",
               debilContra:["electric","rock","steel"]
            },
            "ghost":{
               nombre:"Fantasma",
               color:"#735797",
               debilContra:["dark","normal"]
            },
            "grass":{
               nombre:"Hierba",
               color:"#7AC74C",
               debilContra:["bug","dragon","fire","flying","grass","poison","steel"]
            },
            "ground":{
               nombre:"Tierra",
               color:"#E2BF65",
               debilContra:["bug","flying","grass"]
            },
            "ice":{
               nombre:"Hielo",
               color:"#96D9D6",
               debilContra:["fire","ice","steel","water"]
            },
            "normal":{
               nombre:"Normal",
               color:"#A8A77A",
               debilContra:["ghost","rock","steel"]
            },
            "psychic":{
               nombre: "Psiquico",
               color:"#F95587",
               debilContra:["dark","psychic","steel"]
            },
            "rock":{
               nombre:"Roca",
               color:"#B6A136",
               debilContra:["fighting","ground","steel"]
            },
            "steel":{
               nombre:"Acero",
               color:"#B7B7CE",
               debilContra:["electric","fire","steel","water","fighting"]
            },
            "water":{
               nombre:"Agua",
               color:"#6390F0",
               debilContra:["dragon","grass","water"]
            }
         }
        
   }
}