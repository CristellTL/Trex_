var trex ,trex_running;
var ground;
var groundImg;
var invisibleGround;
var obstacle1,obstacle2, obstacle3, obstacle4, obstacle5, obstacle6; 
var dado;
var score = 0;
var gameState = "play";

function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImg = loadImage("ground2.png");
  cloudImg = loadImage ("cloud.png");
  obstacle1= loadImage("obstacle1.png");
  obstacle2= loadImage("obstacle2.png");
  obstacle3= loadImage("obstacle3.png");
  obstacle4= loadImage("obstacle4.png");
  obstacle5= loadImage("obstacle5.png");
  obstacle6= loadImage("obstacle6.png");
}

function setup(){
  createCanvas(600,200)
  trex = createSprite(50, 160, 20, 40);
  trex.addAnimation("running",trex_running);
  trex.scale = 0.5;
 
  ground = createSprite(200, 170, 400,20);
  ground.addImage(groundImg);
  ground.x = ground.width/2;

  invisibleGround = createSprite(200, 180, 400, 10);
  invisibleGround.visible = false;

  //var numAleatorio = Math.round(random(0,10));
  //console.log(numAleatorio);
}

function draw(){
  background(180);
  text("Puntuación: " + Math.round(score), 450, 50);
  
  if(gameState === "play"){
    ground.velocityX = -4;
    score += 1/10;

    if(keyDown("space") && trex.y>130){
      trex.velocityY = -10;
    }

    if(ground.x<0){
      ground.x = ground.width/2;
    }

    trex.velocityY = trex.velocityY + 0.8;

    spawnObstacles();
    spawnClouds();
  }

  if(gameState === "end"){
    ground.velocityX = 0;
  }

  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds(){
  if(frameCount%60===0){
    var cloud = createSprite(600, 50, 40, 20);
    cloud.y = Math.round(random(10, 120));
    cloud.velocityX = -3; 
    cloud.addImage(cloudImg);
    cloud.scale = 0.5;
    trex.depth = cloud.depth + 1;
    cloud.lifetime = 210;
  }
}

function spawnObstacles(){
  if(frameCount%60 === 0){
    var obstacle = createSprite(700, 160, 20, 40);
    obstacle.velocityX= -4;
    //Colocar la imagen 
    dado = Math.round(random(1,6));

    switch(dado){
      case 1: obstacle.addImage(obstacle1); break;
      case 2: obstacle.addImage(obstacle2); break;
      case 3: obstacle.addImage(obstacle3); break;
      case 4: obstacle.addImage(obstacle4); break;
      case 5: obstacle.addImage(obstacle5); break;
      case 6: obstacle.addImage(obstacle6); break;
    }
    
    obstacle.scale =0.5;
    obstacle.lifetime= 200;
  }
}