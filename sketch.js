var sword, swordImage;
var fruit,fruitImage1,fruitImage2,fruitImage3,fruitImage4;
var monster,monsterImage;
var gameOverImage;
var fruitGroup, monsterGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY ;
var score ;
var knifeSound, gameOverSound;

function preload(){
  swordImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png","alien2.png");
  fruitImage1 = loadImage("fruit1.png");
  fruitImage2 = loadImage("fruit2.png");
  fruitImage3 = loadImage("fruit3.png");
  fruitImage4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
  knifeSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");
  
 
}

function setup(){
  createCanvas(600,600);
  
  fruitGroup = createGroup();
  monsterGroup = createGroup();
  
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.8;
  
  score = 0;
  //sword.debug = true ;
}

function draw(){
  background("lightblue");
  text("score :"+ score,300,15);
 
  if(gameState === PLAY){
    sword.y = World.mouseY;
    sword.x = World.mouseX;
    fruits();
    enemy();
    if(sword.isTouching(fruitGroup)){
      score = score + 1;
      fruitGroup.destroyEach();
      knifeSound.play();
    }
    if(sword.isTouching(monsterGroup)){
      monsterGroup.destroyEach();
      fruitGroup.destroyEach();
      gameOverSound.play();
      gameState = END;
    }
    
  }
  if(gameState === END){
    sword.addImage(gameOverImage);
    sword.scale = 1.2;
    sword.x = 300;
    sword.y = 300;
  }
  
  
  drawSprites();
}

function fruits(){
  if(frameCount % 80 === 0){
    fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;
    x = Math.round(random(1,4));
    if(x === 1){
      fruit.addImage(fruitImage1);
    }
    else if(x === 2){
      fruit.addImage(fruitImage2);
    }
    else if(x === 3){
      fruit.addImage(fruitImage3);
    }
    else {
      fruit.addImage(fruitImage4);
    }
    fruit.y = Math.round(random(30, 570));
    //fruit.debug = true;
    var rand = Math.round(random(1, 2));
    if(rand === 1){
      fruit.x = 0;
      fruit.velocityX = 7 + score/4;
    }
    else {
      fruit.x = 600;
      fruit.velocityX = -(7 + score/4);
    }

    fruit.lifetime = 100;
    fruitGroup.add(fruit);
  }
  
}

function enemy(){
  if(frameCount % 150 === 0){
    monster = createSprite(600,0,20,20);
    monster.addAnimation("moving",monsterImage);
    monster.y = Math.round(random(30,500));
    monster.velocityX = -(8 + score/5);
    monster.lifetime = 100;
    monsterGroup.add(monster);
  }
}
