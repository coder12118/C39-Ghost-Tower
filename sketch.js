var bg, bgImg, bg2, bgImg2;
var climber, climberImg, climberGroup;
var ghost, ghostImg;
var door, doorImg, doorGroup;
var block, blockGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
  bgImg = loadImage("tower.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  doorImg = loadImage("door.png");
  getBackgroundImg();
}

function setup(){
  createCanvas(500, 500);
  
  bg = createSprite(260, 365);
  bg.addImage("bg", bgImg);
  bg.velocityY = 1;
  bg.scale = 0.8;
  
  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3;
  
  doorGroup = new Group();
  climberGroup = new Group();
  blockGroup = new Group();
}



function draw(){
  background("white");
  
  if(gameState === PLAY){
    if(keyDown("left_arrow")){
    ghost.x = ghost.x - 3;
  }
  
  if(keyDown("right_arrow")){
    ghost.x = ghost.x + 3;
  } 
                                                 
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
    ghost.velocityY = ghost.velocityY + 0.8;
    //camera.position.x = 250;
    //camera.position.y = ghost.y-50;
    camera.position.x = bg.x;
    camera.position.y = bg.y;
    
  if (bg.y > 400){
      bg.y = 350;
    }
    
    if(ghost.isTouching(climberGroup)){
      ghost.velocityY = 0;
    } 
    
    if(ghost.isTouching(blockGroup) || ghost.y > 600){
      gameState = END;
    } 
  
  spawnDoor();
  drawSprites();
  }
  
  else if(gameState === END){
    bg.velocityY = 0;
    climberGroup.destroyEach();
    blockGroup.destroyEach();
    doorGroup.destroyEach();
    textSize(20);
    fill("black");
    text("GAME OVER", 300, 300);
  }
  
}

function spawnDoor(){
  if(frameCount%240 === 0){
    door = createSprite(200, -50, 10, 10);
    door.addImage("door", doorImg);
    
    climber = createSprite(200, 10, 10, 10);
    climber.addImage("climber", climberImg);
    
    block = createSprite(200, 15, climber.width, 2);
    
    door.x = Math.round(random(120, 400));
    door.velocityY = 1;
    
    climber.x = door.x;
    climber.velocityY = 1;
    
    block.x = door.x;
    block.velocityY = 1;
    
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
    
    climber.lifetime = 600;
    climberGroup.add(climber);
    
    door.lifetime = 600;
    doorGroup.add(door);
    
    block.lifetime = 600;
    blockGroup.add(block);
    block.debug = true;
    //block.visible = false;
    
  }
  
 async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata")
    var responseJSON = await response.json();
    var dateTime1 = responseJSON.datetime
    var hour = dateTime1.slice(11, 13)
    if(hour>=06 && hour<=19){
        bg = "tower.png";
    }
    else{
        bg = "bg2.jpg";
    }
   bgImg2 = loadImage(bg2)
}
}
