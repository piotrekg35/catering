import { Component} from '@angular/core';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})

export class DishesComponent{
  dish_list:Array<Dish>=new Array<Dish>;
  ordered:number=0;
  filtered_name:string="";
  filtered_origin:string="";
  filtered_type:string="";
  filtered_ingridients:string="";
  filtered_price:number=0;
  filtered_rating:number=0;

  constructor(){
    let dishestext:String="Pierogi z mięsem\npolska\nmięsne\nmąka, jajka, mięso, olej, sól, pieprz\n20\n15\nSmaczne\nhttps://static.fajnegotowanie.pl/media/uploads/media_image/original/przepis/7033/pierogi-z-miesem-wieprzowym.jpg,https://www.zajadam.pl/wp-content/uploads/2014/10/Pierogi-z-miesem-3.jpg,https://kulinarnapolska.org/wp-content/uploads/2021/04/pierogi-z-miesem-przepis-2.jpg";
    dishestext+="\nPizza\nwłoska\ndanie główne\nmąka, jajka, pomidory, bazylia, ser, olej, sól, pieprz\n100\n9.99\nWyborna, z kruchym ciastem\nhttps://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg/800px-Eq_it-na_pizza-margherita_sep2005_sml.jpg,https://cdn.galleries.smcloud.net/t/galleries/gf-cgdk-p5yy-aE4f_pizza-pepperoni-z-jalapeno-to-jadl-joe-biden-z-zolnierzami-w-rzeszowie-1920x1080-nocrop.jpg,https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg";
    dishestext+="\nSushi\njapońska\ndanie główne\nryż, ryba, wasabi, szynka, awokado\n25\n9.99\nTradycyjne sushi z wasabi\nhttps://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/0749D9BC-260D-40F4-A07F-54814C4A82B4/Derivates/A73A7793-F3EE-4B90-ABA4-1CC1A0C3E18F.jpg,https://praktykulinarni.com/wp-content/uploads/2020/12/futomaki-tamago-losos-1024x581.jpg,https://www.kikkoman.pl/fileadmin/_processed_/b/0/csm_kikkoman-rezepte-content-gunkan-maki-sushi-1080x720_ff8a45ca89.jpg"
    dishestext+="\nKimchi\nkoreańska\nwegańskie\nkapusta, cebula, papryka, sos pomidorowy\n10\n7.99\nUwaga! Ostre.\nhttps://www.seriouseats.com/thmb/m16sray_HxYpJebVbXMxv906bhk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20210527-baechu-kimchi-vicky-wasik-seriouseats-seriouseats-3-18a2d6d7d1d74a7a82cb13ed350218be.jpg,https://dietetycy.org.pl/wp-content/uploads/2021/11/128799333_m-1600x1068.jpg,https://www.thespruceeats.com/thmb/87wOXD2--GPS9At7gZrYeuKRwvw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/korean-sriracha-kimchi-recipe-2118867-hero-011-f6964d865b6246b180ddb843cdeb132d.jpg"
    dishestext+="\nNaleśniki\namerykańska\nśniadanie\njajka, mąka, masło, syrop klonowy\n100\n5.99\nSyrop klonowy w cenie!\nhttps://realfood.tesco.com/media/images/American-pancakes-LGH-21fbfc2e-6462-4078-92ed-e830f88784be-0-1400x919.jpg,https://glutenfreecuppatea.co.uk/wp-content/uploads/2021/02/gluten-free-american-pancakes-recipe.jpg,https://www.goodfood.com.au/content/dam/images/3/5/d/b/l/image.related.articleLeadwide.620x349.35d9a.png/1496106410360.jpg"
    dishestext+="\nSpaghetti napoli\nwłoska\ndanie główne\nmakaron, sos pomidorowy, bazylia, sos\n50\n8.99\nMagda Gessler poleca!\nhttps://sanremo.com.au/content/uploads/2019/05/Easy-tomato-pasta-4-900x600.jpg,https://kulinarnapolska.org/wp-content/uploads/2021/01/spaghetti-napoli-przepis-jak-zrobic-3.jpg,https://ais.kochbar.de/kbrezept/435538_1137799/1200x1200/spaghetti-napoli-rezept-bild-nr-2.jpg"
    let fields1:Array<String>=dishestext.split("\n");
    for(let i:number=fields1.length/8;i>0;i--){
      let fields:Array<String>=fields1.splice(0,8);
      let links:Array<String>=fields[7].split(",");
      let new_dish:Dish=new Dish(fields[0],fields[1],fields[2],fields[3],fields[4],fields[5],fields[6],links)
      this.dish_list.push(new_dish);
    }
    this.findCheapExp();
  }
  findCheapExp():void{
    if(this.dish_list.length===0)return;
    this.dish_list.forEach(function(d:Dish){d.isCheap=false;d.isExp=false;})
    let sorted_dish_list:Array<Dish>=this.dish_list.slice();
    sorted_dish_list.sort((a,b)=>a.price-b.price);
    let cheap_dish=sorted_dish_list[0];
    cheap_dish.isCheap=true;
    let exp_dish=sorted_dish_list[sorted_dish_list.length-1];
    exp_dish.isExp=true;
  }
  order():void{
    this.ordered++;
  }
  resign():void{
    this.ordered--;
  }
  deleteDish(n:String):void{
    let dish2del:Dish|undefined=this.dish_list.find((a)=>a.name==n);
    if(dish2del===undefined)return;
    let idx:number=this.dish_list.indexOf(dish2del);
    this.dish_list.splice(idx,1);
    this.findCheapExp();
  }
  updateRating(arr:Array<string>):void{
    let dish2up:Dish|undefined=this.dish_list.find((a)=>a.name==arr[0]);
    if(dish2up===undefined)return;
    let n = Number(arr[1]);
    if(!n)return;
    dish2up.rating=n;
    this.findCheapExp();
  }
  addDish(arr:Array<string>){
    let links:Array<String>=arr[7].split(",");
    let new_dish:Dish=new Dish(arr[0],arr[1],arr[2],arr[3],arr[4],arr[5],arr[6],links)
    this.dish_list.push(new_dish);
    this.findCheapExp();
  }
  getFilterString(arr:Array<string>):void{
    this.filtered_name=arr[0];
    this.filtered_origin=arr[1];
    this.filtered_type=arr[2];
    this.filtered_ingridients=arr[3];
    this.filtered_price=Number(arr[4]);
    this.filtered_rating=Number(arr[5]);
  }
}
class Dish{
  name:String="";
  origin:String="";
  type:String="";
  ingridients:String="";
  max_amount:number=0;
  price:number=0;
  description:String="";
  link_to_photos:Array<String>=[];
  isExp:boolean=false;
  isCheap:boolean=false;
  rating:number=0;
  constructor(n:String,o:String,t:String,i:String,m:String,p:String,d:String,l:Array<String>){
    this.name=n;
    this.origin=o;
    this.type=t;
    this.ingridients=i;
    this.max_amount=Number(m);
    this.price=Number(p);
    this.description=d;
    this.link_to_photos=l;
  }
}
