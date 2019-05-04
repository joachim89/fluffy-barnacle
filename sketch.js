let player;
let ground; 
let bg;
// bilder til spiller
let playerWalk = [];
let playerJump = [];
let playerWalkl = [];
let playerStatic;
function preload () {
    playerWalk[0] = loadImage("imgs/moves/walk1.png");
    playerWalk[1] = loadImage("imgs/moves/walk2.png");
    playerWalk[2] = loadImage("imgs/moves/walk3.png");
    playerWalk[4] = loadImage("imgs/moves/walk4.png");
    playerWalkl[0] = loadImage("imgs/moves/walk1l.png");
    playerWalkl[1] = loadImage("imgs/moves/walk2l.png");
    playerWalkl[2] = loadImage("imgs/moves/walk3l.png");
    playerWalkl[4] = loadImage("imgs/moves/walk4l.png");
    playerJump[0] = loadImage("imgs/moves/jump1.png");
    playerJump[1] = loadImage("imgs/moves/jump2.png");
    playerJump[2] = loadImage("imgs/moves/jump3.png");
    playerStatic = loadImage("imgs/moves/static.png");
    ground= loadImage("imgs/ground.png");
    bg = loadImage("imgs/bg.png");
}

class Player {
    constructor(){
     this.walkCount = 0;
     this.jumpCount = 0;
     this.img = playerStatic;
     this.x = random(windowWidth);
     this.y = 400;
     this.w = 100;
     this.h = 100;
     this.speed = 20;
     
    }
    gravity(){
        if(this.y<580){this.y+=10;}
        
    }
    show(){
        image(this.img,this.x,this.y,this.w,this.h);
    }
    walk(right){
        if(right){
        if(this.walkCount<3){
            this.img = playerWalk[this.walkCount];
        }else{
            this.walkCount=0;
        }
       this.walkCount++;
      this.x+=this.speed;}
      else{
          if(this.walkCount<3){
                this.img = playerWalkl[this.walkCount];
          }else{
              this.walkCount=0;
            }
             this.walkCount++;
            this.x-=this.speed;}
     
    }
    jump(){
        if(this.jumpCount<3){
            this.img = playerJump[this.jumpCount];
        }else{
           this.jumpCount=0;
        }
        this.y-=15;
        this.jumpCount++;
        
     
    }
    static(){
        this.img = playerStatic;
    }

    
}
function setup(){
   createCanvas(windowWidth,windowHeight);
    frameRate(15);
   player = new Player;
    

}


function draw(){
background(122,90,18);
image(bg,0,0,windowWidth,windowHeight);
for(i=0;i<25;i++){
    image(ground,80*i,600,80,188);
    }
    
player.show();
player.gravity();




//####### HER KOMMER KONTROLLENE FOR Å STYRE SPILLERN  ##########////////////
//check all controls:
if(keyIsDown(UP_ARROW)||keyIsDown(LEFT_ARROW)||keyIsDown(RIGHT_ARROW)||keyIsDown(DOWN_ARROW)){

}else{
    player.static();
}
//CONTROLS

if(keyIsDown(UP_ARROW)){
    player.jump();
}

if(keyIsDown(RIGHT_ARROW)){
    player.walk(true);
}
if(keyIsDown(LEFT_ARROW)){
    player.walk(false);
}

if(mouseIsPressed){
  
    // if(mouseY<player.y){
    //    player.jump();
    // }
   

    if(mouseX<player.x){
        player.walk(false);
    }else{
        player.walk(true);
    }

}

//###############################################
}