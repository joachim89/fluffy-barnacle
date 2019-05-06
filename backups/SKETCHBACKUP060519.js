let player;
let ground; 
let grnd = [];
let grndHit = [];
let bg;
let groundY;
//vars til spillerbevegelser
let right = false; //går til høyre eller venstre?
let falling = true; //faller?
let canJump = true;
let pogo = false;
let canPogo;
//versjonsnr, for å sjekke om ting blir oppdatert.
let vernr = "0.0.0.3";
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
let playerLookUp;
let playerPogo = [];
let playerPogol = [];

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
    playerLookUp = loadImage("imgs/moves/lookup.png")
    playerStatic = loadImage("imgs/moves/static.png");
    playerStaticl = loadImage("imgs/moves/staticl.png");
    playerPogo[0] = loadImage("imgs/moves/pogo1.png");
    playerPogo[1] = loadImage("imgs/moves/pogo2.png");
    playerPogol[0] = loadImage("imgs/moves/pogo1l.png");
    playerPogol[1] = loadImage("imgs/moves/pogo2l.png");
    ground= loadImage("imgs/ground.png");
    bg = loadImage("imgs/bg.png");


    //sounds
    song[0] = loadSound("sounds/oasis.mp3");
    song[1] = loadSound("sounds/faster.mp3");
}

// GROUND
class Ground {
    constructor(){
        this.x=random(windowWidth/80)*80;
        this.y=random(windowHeight);
        this.hit;
       
    }
    checkCollision(){
        image(ground,this.x,this.y,80,188);
        if( player.y<(this.y+188)   &&   
            player.y>(this.y)      && 
            player.x>(this.x-40)   && 
            player.x<(this.x+40)   ){
                fill(255,0,0,80);
                this.hit=true;
                player.static();
                //player.y-=30; // husk å endre til gravity
                player.y = this.y ;
                rect(this.x,this.y,80,188);
        }else{
            this.hit=false;
        }
    }
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
     this.yVelocity=3;
     this.maxVelocity=40;
    }

    //TYNGDEKRAFT
    gravity(){
        // if(this.y<(groundY-50)){
        //     this.y+=30;  // husk å endre i checkcollision og.
        //    // this.img = playerJump[2];
        //     falling=true;
        // }else{
        //     falling=false;
        //        //jumprelatert. Må treffe bakken:
        //         canJump=true;
        //          this.jumpCount=0;
        // }
        if(falling){
            this.y+= this.yVelocity;
            console.log(this.yVelocity);
            if(this.yVelocity < this.maxVelocity){this.yVelocity*=1.3;}
        }else{
            canJump=true;
            this.jumpCount=0;
            this.yVelocity =3;

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

    // POGOSTICK! 
    pogo(){
        player.jump();
        if(right){
            this.img = playerPogo[0];
        }else{
            this.img = playerPogol[0];
        }
        this.jumpHeight=12;
    }

    //LOOK DOWN!
    lookdown(){
        this.img = playerLookDown[this.lookCounter];
        if(this.lookCounter==0){
            this.lookCounter=1;
        }
    }

      //LOOK UP!
      lookup(){
        this.img = playerLookUp;
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
    frameRate(20);
   player = new Player;
    groundY = windowHeight-(windowHeight/3);
    for(i=0;i<30;i++){
        grnd.push(new Ground);
        if(i<15){
        grnd[i].y= 200; // +(i*10);
        grnd[i].x= 0 +(i*80);
    }else{
        grnd[i].y= 600 //-(i*2);
        grnd[i].x= -300 +(i*80);
    }
    }
    song[0].play();
}






// #################### DRAW ######################

function draw(){
// kan bruke scale(0.5); for å få ting til å bli mindre
    background(122,90,18);
image(bg,0,0,windowWidth,windowHeight);
noStroke();

// for(i=0;i<(windowWidth/80);i++){ // lager bakgrunnsbildet rett bortover.
//     image(ground,80*i,groundY,80,188);
// }

for(i=0;i<grnd.length;i++){ // lager bakgrunnsbildet.
  grnd[i].checkCollision();
  grndHit[i]=grnd[i].hit;

}
if(grndHit.includes(true)){
    console.log("HIT");
    falling = false;;
}else{falling= true;}





//####### HER KOMMER KONTROLLENE FOR Å STYRE SPILLERN  ##########////////////
//check all controls:
if(keyIsDown(UP_ARROW)||keyIsDown(LEFT_ARROW)||keyIsDown(RIGHT_ARROW)||keyIsDown(DOWN_ARROW)||keyIsDown(17)||keyIsDown(16)||mouseIsPressed){

}else{
    if(!falling){
    player.static();
    canPogo = true;
}
}
//CONTROLS

//hopp
if(keyIsDown(17)&&canJump){
    
    canJump=false;
}
if(canJump==false){
    player.jump();
}
//console.log(canJump);

//TOGGLE POGO
if(keyIsDown(16)&&canPogo){
    canPogo = false;
  if(!pogo){
      pogo=true;
  }else{
    pogo=false;
    player.jumpHeight = 5;
  }
}
if(pogo){
    player.pogo();
}

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
//se opp
if(keyIsDown(UP_ARROW) && !keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW) && !keyIsDown(DOWN_ARROW)){
    player.lookup();
}
//ned
if(keyIsDown(DOWN_ARROW) && !keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW) && !keyIsDown(UP_ARROW)){
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