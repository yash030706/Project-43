var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana, foodGroup;
var banana_img;
var obstacle, obstacle_img, obstacleGroup;
var score = 0;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  banana_img = loadImage("banana.png");
  obstacle_img = loadImage("stone.png");

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
  if(keyDown("space")&& player.y >150) {
    player.velocityY = -5;
}
    player.velocityY = player.velocityY + 0.8; 
    player.collide(ground);
    spawnFood();
    spawnobstacle();

    if(foodGroup.isTouching(player)){
      foodGroup.destroyEach();
      score = score + 2;
      player.scale = player.scale + 0.01
    }
  }
    

  drawSprites();
  stroke("white");
  textSize(20);
  fill("Black");
  text("Score :" + score,40,50);
  if(obstacleGroup.isTouching(player)){
    gameState = END;
  }
  else if(gameState === END){
    backgr.velocityX = 0;
    player.visible =false;
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    textSize(30);
    fill(255);
    text("Game Over!",300,220)
  }
}

function spawnFood(){
  if(frameCount%120 === 0){
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.addImage(banana_img);
    banana.scale = 0.05;
    banana.velocityX = -4;
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    foodGroup.add(banana);
  }
}

function spawnobstacle(){
  if(frameCount%80 === 0){
    obstacle = createSprite(600,340,40,10);
    obstacle.y = Math.round(random(220,340));
    obstacle.addImage(obstacle_img);
    obstacle.scale = 0.2;
    obstacle.velocityX = -4;
    obstacle.lifetime = 300;
    obstacle.depth = obstacle.depth + 1;
    obstacleGroup.add(obstacle);
  }
}