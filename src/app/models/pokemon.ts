export class Pokemon{
   id:number;
   weight: number = 0;
   height: number = 0;
   name:string = "";
   url:string  ="";
   image:string = "";
   description:string ="";
   types:any[] = [];

   constructor(id:number, name:string, url:string, image:string,types:any[],description?:string, weight?:number,height?:number){
      this.name = name;
      this.id = id;
      this.url = url;
      this.image = image;
      this.types = types;
      if(description){
         this.description = description;
      }
      if(weight){
         this.weight = weight;
      }
      if(height){
         this.height = height;
      }
   }


}