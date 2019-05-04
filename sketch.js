let player;
let ground; 
let bg;
let groundY;
//vars til spillerbevegelser
let right = false; //går til høyre eller venstre?
let falling = true; //faller?
let canJump = true;

//versjonsnr, for å sjekke om ting blir oppdatert.
let vernr = "0.0.0.2";
//sound vars
let song = [];
// bilder til spiller
let playerWalk = [];
let playerJump = [];
let playerJumpl = [];
let playerWalkl = [];
let playerStatic;
let playerStaticl;
let playerLookDown = [];

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
    playerJumpl[0] = loadImage("imgs/moves/jump1l.png");
    playerJumpl[1] = loadImage("imgs/moves/jump2l.png");
    playerJumpl[2] = loadImage("imgs/moves/jump3l.png");
    playerLookDown[0] = loadImage("imgs/moves/lookdown1.png");
    playerLookDown[1] = loadImage("imgs/moves/lookdown2.png");
    playerStatic = loadImage("imgs/moves/static.png");
    playerStaticl = loadImage("imgs/moves/staticl.png");
    ground= loadImage("imgs/ground.png");
    bg = loadImage("imgs/bg.png");


    //sounds
    song[0] = loadSound("sounds/oasis.mp3");
    song[1] = loadSound("sounds/faster.mp3");
}



// ################ HER ER PLAYER KLASSEN. ALL INFO OG FUNKSJONER.. ###################
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
     this.jumpHeight = 5;
     this.lookCounter=0;
     
    }

    //TYNGDEKRAFT
    gravity(){
        if(this.y<(groundY-50)){
            this.y+=30; 
           // this.img = playerJump[2];
            falling=true;
        }else{
            falling=false;
               //jumprelatert. Må treffe bakken:
                canJump=true;
                 this.jumpCount=0;
        }

        
    }
    //Bare viser spilleren på canvasen
    show(){
        image(this.img,this.x,this.y,this.w,this.h);
    }

    //GÅFUNKSJONEN
    walk(){
        if(right){
        if(this.walkCount<3){
            if(falling){
                this.img = playerJump[2];
            }else{ this.img = playerWalk[this.walkCount];}
        }else{
            this.walkCount=0;
        }
       this.walkCount++;
      this.x+=this.speed;}
      else{
          if(this.walkCount<3){
            if(falling){
                this.img = playerJumpl[2];
            }else{
                this.img = playerWalkl[this.walkCount];}
          }else{
              this.walkCount=0;
            }
             this.walkCount++;
            this.x-=this.speed;}
     
    }
    //HOPPING
    jump(){ 
        console.log(this.jumpCount + ": JUMPCOUNT\n" + this.jumpHeight + ": JUMPHEIGHT");
        if(this.jumpCount < this.jumpHeight){
           
           this.y-=60;
            if(right){
                console.log("joda høyre");
            this.img = playerJump[this.jumpCount % 3];
            }else{
                this.img = playerJumpl[this.jumpCount % 3];
            }
            this.jumpCount++;
        }
        
        
      
        
        
        
        
     
    }
    //LOOK DOWN!
    lookdown(){
        this.img = playerLookDown[this.lookCounter];
        if(this.lookCounter==0){
            this.lookCounter=1;
        }
    }
    //FUNKSJON FOR BARE Å STÅ STILLE OG NULLSTILLE TELLERE OG INSTILLINGER
    static(){
        this.lookCounter=0;
        this.walkCount=0;
        
     
        if(right){
            if(falling){
                this.img = playerJump[2];
            }else{
        this.img = playerStatic;}
    }else{
        if(falling){
            this.img = playerJumpl[2];
        }else{
        this.img = playerStaticl;}
    }
    }

    
}


// #################### SETUP ######################
function setup(){
   createCanvas(windowWidth,windowHeight);
    frameRate(15);
   player = new Player;
    groundY = windowHeight-(windowHeight/3);
    
    song[0].play();
}

// #################### DRAW ######################

function draw(){
// kan bruke scale(0.5); for å få ting til å bli mindre
    background(122,90,18);
image(bg,0,0,windowWidth,windowHeight);

for(i=0;i<(windowWidth/80);i++){ // lager bakgrunnsbildet.
    image(ground,80*i,groundY,80,188);
    }






//####### HER KOMMER KONTROLLENE FOR Å STYRE SPILLERN  ##########////////////
//check all controls:
if(keyIsDown(UP_ARROW)||keyIsDown(LEFT_ARROW)||keyIsDown(RIGHT_ARROW)||keyIsDown(DOWN_ARROW)||mouseIsPressed){

}else{
    player.static();
}
//CONTROLS

//hopp
if(keyIsDown(UP_ARROW)&&canJump){
    
    canJump=false;
}
if(canJump==false){
    player.jump();
}
//console.log(canJump);


//høyre
if(keyIsDown(RIGHT_ARROW)){
    right = true;
    player.walk();
}
//venstre
if(keyIsDown(LEFT_ARROW)){
       right = false;
    player.walk();
}
//ned
if(keyIsDown(DOWN_ARROW) && !keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW)){
    player.lookdown();
}
//muskontroller og mobil
if(mouseIsPressed){
  
    // if(mouseY<player.y){
    //    player.jump();
    // }
    if(mouseX<player.x){
        right = false;
    }else{
        right = true;
    }
   if(abs(player.x-mouseX)>abs(player.y-mouseY)){
    if(mouseX<player.x){
       
        player.walk();
    }else{
       
        player.walk();
    }
   }else{
    if(mouseY<player.y){
        player.jump();
    }else{
       
        player.lookdown();
    }
   }

   

}





//############### OG HER VISES SPILLEREN:


player.show();
player.gravity();




//###############################################
textAlign(CENTER);
fill(0);
text(vernr,windowWidth/2,100)
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);

    groundY = windowHeight-(windowHeight/3);
    player.y=groundY-50;
  }