import { TypePokemon } from "./typePokemon";



export class Pokemon{
   id:number;
   name:string = "";
   url:string  ="";
   image:string = "";
   description:string ="";
   types:any[] = [];

   constructor(id:number, name:string, url:string, image:string,types:any[],description?:string){
      this.name = name;
      this.id = id;
      this.url = url;
      this.image = image;
      this.types = types;
      if(description){
         this.description = description;
      }
   }


}