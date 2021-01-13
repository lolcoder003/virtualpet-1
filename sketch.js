//Create variables here
var dog;
var dogIMG;
var happyDog;
var happyDogIMG;
var database;
var foodS;
var foodStock;
function preload()
{

  //load images here
  dogIMG=loadImage("images/dogImg.png")
  happyDogIMG=loadImage("images/dogImg1.png")
}

function setup() {
  database= firebase.database();
  createCanvas(500, 500);
  dog=createSprite(250,300,150,150);
  dog.addImage(dogIMG);
  dog.scale = 0.4;
  
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() {  
  background(46,136,87);

  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogIMG);
  }
  drawSprites();
  
  fill(255,255,254);
  text ("Food remaining : "+ foodS,200,150);
  stroke("red");
  textSize(17);
  text("Press up arrow key To Feed Max!",130,10,300,20);
  //add styles here

}
function readStock (data){
  foodS = data.val ();
}
function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }


  database.ref("/").update({
    Food:x
  })
}



