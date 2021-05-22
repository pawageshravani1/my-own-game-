var PLAY=1;
var END=0;
var gameState=PLAY;


var fruits1,grass1;
var horse,horse_running,ground,groundImg;
var obstacle1, obstacle2,obstacle3,obstacle4;
var crowImg,cloudsImg;
var gameoverImg,gameover,downloadImg,download;
var jumpsound,pointsound,diesound;

function preload(){
  horse_running=loadAnimation("horse.gif");
  
  groundImg=loadImage("ground1.png");
  obstacle1=loadImage("obstacle1.png");
obstacle2=loadImage("obstacle2.png");
obstacle3=loadImage("obstacle3.png");
obstacle4=loadImage("obstacle4.png");
  
  crowImg=loadImage("crow.png");
  cloudsImg=loadImage("cloud.png");
  fruits1=loadImage("basket.png");
  grass1=loadImage("grass.png");
  gameoverImg=loadImage("gameover.png");
  downloadImg=loadImage("download.png");
  //adding the sound
  jumpsound=loadSound("jumpsound.mp3");
  pointsound=loadSound("pointsound.mp3");
  diesound=loadSound("diesound.mp3");
}

function setup() {
  createCanvas(400,400);
  ground=createSprite(200,180,400,20);
  ground.addImage(groundImg);
  ground.scale=0.8
   ground.x = ground.width / 4;
   ground.velocityX=-1

  horse=createSprite(50,280,20,50);
  horse.addAnimation("running",horse_running)
  horse.scale=0.3 ;
  //images of end the game
  gameover=createSprite(200,100);
    gameover.addImage(gameoverImg);
    gameover.scale=0.2;
    gameover.visible=false;
    
  
  download=createSprite(200,200);
  download.addImage(downloadImg);
  download.scale=0.1;
  download.visible=false;
  
  
  
 invisibleGround=createSprite(200,340,400,10);
  invisibleGround.visible=false;
  score=0;
  horse.setCollider("circle",0,0,90);
  
  
  cloudGroup= createGroup();
  obstacleGroup= createGroup();
  crowGroup= createGroup();
  fruitsGroup= createGroup();


}

function draw() {
  background("black");
   
  if(gameState===PLAY){
    //MOVE THE GROUND
   ground.velocityX=-(1+3* score/100);
    
    //DISPLAY THE SCORE
  score=score+Math.round(getFrameRate()/60);
    if(score>0 && score%100===0){
      pointsound.play();
    }
     
   
     if(ground.x<150){
    ground.x=200;
  }
    
    //horse should jump in play state
     if(keyDown("space") && horse.y >= 290){
    horse.velocityY=-10;
       jumpsound.play();
  }
    horse.velocityY=horse.velocityY+0.8   
  //collide to the ground
    horse.collide(invisibleGround);
  //play state only it should spawn
 
  spawncrow();
  spawnclouds();
  spawnobstacles();
  //if obstacle group is touching
   if(obstacleGroup.isTouching(horse)){
      gameState=END;
     diesound.play();
    }
 
 
   
  }
  else if(gameState===END){  
    //game over image or text
    gameover.visible=true;
    download.visible=true;
    //horse to change the image
    ground.velocityX=0;
    horse.velocityY=0;
    //assign lifetime so they never destroy
     obstacleGroup.setLifetimeEach(-1); 
    cloudGroup.setLifetimeEach(-1);
    crowGroup.setLifetimeEach(-1);
    
    //when game will end then all should stop
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    crowGroup.setVelocityXEach(0);

    
    if(mousePressedOver(download)){
      reset();
    }
  }
  
  
  
 
  
 drawSprites();
 textSize(20);
  text("score: "+ score,30,50);
     
  
}
function spawncrow(){
  if(frameCount%60===0){
     var crow=createSprite(600,250,40,10);
    crow.addImage(crowImg)
    crow.y=Math.round(random(100,250))
    crow.scale=0.07  ;
    crow.velocityX=-3;
    //assin lifetime to crows
    crow.lifetime=190;
     //adjust the depth
    crow.depth=horse.depth
    horse.depth=horse.depth+1
    
    //creating group or add the group
    crowGroup.add(crow);
     }
  
}
function spawnclouds(){
  if(frameCount%60===0){
     var clouds=createSprite(600,250,40,10);
    clouds.addImage(cloudsImg)
    clouds.y=Math.round(random(10,250))
    clouds.scale=0.4 ;
    clouds.velocityX=-3;
    //assign lifetime to variable
   clouds.lifetime=190;
     //adjust the depth
    clouds.depth=horse.depth
    horse.depth=horse.depth+1
    cloudGroup.add(clouds);
     }
}

function spawnobstacles(){
 if(frameCount %60===0){
   var obstacle=createSprite( 300,315,10,40);
   obstacle.velocityX=-(6+ score/100);
   
   //random obstacles should come
   var rand=Math.round(random(1,4));
   switch(rand){
     case 1:obstacle.addImage(obstacle1) ;
       obstacle.scale=0.1;
       break;
       case 2:obstacle.addImage(obstacle2);
        obstacle.scale=0.2;
      
       break;
       case 3:obstacle.addImage(obstacle3);
        obstacle.scale=0.4;
      
       break;
       case 4:obstacle.addImage(obstacle4);
        obstacle.scale=0.5;
       break;
       default:break;
   }
   //assign to all obstacles lifetime
   obstacle.lifetime=50;
   obstacleGroup.add(obstacle);   
   obstacle.depth=horse.depth
   horse.depth=horse.depth+1;
  obstacle.setCollider("circle",0,0,50);
   
  
   
 } 
}
function reset(){
  
  gameState=PLAY;
  gameover.visible=false;
  download.visible=false;
  
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  crowGroup.destroyEach();
  ground.velocityX=-(5+3*score/100);
  score=0;
  score=score+Math.round(getFrameRate()/60)
  if(ground.x<150){
    ground.x=200;
  }
}
