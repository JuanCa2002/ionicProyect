export class TablaTipo{
   tablaTipos:any;

   constructor(){
      this.tablaTipos =
         { "bug":
             { 
               nombre:"bug",
               debilContra: ["fairy","fire","flying","ghost","poison","steel","fighting"]
               },
            "poison":{ 
               nombre:"poison",
               debilContra: ["ghost","ground","poison","rock","steel"]
               },
            "dark":{
               nombre:"dark",
               debilContra: ["dark","fairy","fighting"]
            },
            "dragon":{
               nombre:"dragon",
               debilContra:["fairy","steel"]
            },
            "electric":{
               nombre:"electric",
               debilContra:["dragon","electric","grass","ground"]
            },
            "fairy":{
               nombre:"fairy",
               debilContra:["fire","poison","steel"]
            },
            "fighting":{
               nombre:"fighting",
               debilContra:["bug","fairy","flying","ghost","poison","psychic"]
            },
            "fire":{
               nombre:"fire",
               debilContra:["dragon","fire","rock","water"]
            },
            "flying":{
               nombre:"flying",
               debilContra:["electric","rock","steel"]
            },
            "ghost":{
               nombre:"ghost",
               debilContra:["dark","normal"]
            },
            "grass":{
               nombre:"grass",
               debilContra:["bug","dragon","fire","flying","grass","poison","steel"]
            },
            "ground":{
               nombre:"ground",
               debilContra:["bug","flying","grass"]
            },
            "ice":{
               nombre:"ice",
               debilContra:["fire","ice","steel","water"]
            },
            "normal":{
               nombre:"normal",
               debilContra:["ghost","rock","steel"]
            },
            "psychic":{
               nombre: "psychic",
               debilContra:["dark","psychic","steel"]
            },
            "rock":{
               nombre:"rock",
               debilContra:["fighting","ground","steel"]
            },
            "steel":{
               nombre:"steel",
               debilContra:["electric","fire","steel","water","fighting"]
            },
            "water":{
               nombre:"water",
               debilContra:["dragon","grass","water"]
            }
         }
        
   }
}