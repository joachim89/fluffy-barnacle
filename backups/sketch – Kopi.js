let player;
let ground; 
let grnd = [];
let grndHit = [];

let bg;
let groundY;
let hitName;
let pressed;
//vars til spillerbevegelser
let right = false; //går til høyre eller venstre?
let falling = true; //faller?
let canJump = true;
let jump = false;
let pogo = false;

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
let enemy = [];
let enemyl = [];
let rock = [];

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

    rock[0] = loadImage("imgs/grnd/rock1.png");
    rock[1] = loadImage("imgs/grnd/rock2.png");
    rock[2] = loadImage("imgs/grnd/rock3.png");

    bg = loadImage("imgs/bg.png");

    enemy[0] = loadImage("imgs/enemies/ball1.png");
    enemy[1] = loadImage("imgs/enemies/ball2.png");
    enemy[2] = loadImage("imgs/enemies/ball3.png");
    enemy[3] = loadImage("imgs/enemies/ball4.png");
    enemyl[0] = loadImage("imgs/enemies/ball1l.png");
    enemyl[1] = loadImage("imgs/enemies/ball2l.png");
    enemyl[2] = loadImage("imgs/enemies/ball3l.png");
    enemyl[3] = loadImage("imgs/enemies/ball4l.png");


    //sounds
    song[0] = loadSound("sounds/oasis.mp3");
    song[1] = loadSound("sounds/faster.mp3");
}

// GROUND
class Ground {
    constructor(){
        this.x=random(windowWidth/81)*81;
        this.y=random(windowHeight);
        this.hit;
        this.id;
        this.type=0;
       
    }
    checkCollision(){
        image(rock[this.type],this.x,this.y+50,81,100);
        if(this.type==0){this.pluss=30;this.minus=0;}else if(this.type==2){this.minus=30;this.pluss=0;}else{this.pluss=0;this.minus=0;}
        if( player.y<(this.y+50)   &&   
            player.y>(this.y-1)      && 
            player.x>(this.x-40+this.pluss)   && 
            player.x<(this.x+40-this.minus)  
            ){
                fill(255,0,0,80);
                this.hit=true;
                hitName = this.id;
                player.ny = 0;
                player.vy = 0;
                
                //player.y-=30; // husk å endre til gravity
                player.y = this.y ;
                rect(this.x,this.y+50,81  ,100);
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
     this.y = 100;
     this.w = 100;
     this.h = 100;
     this.jumpHeight = 18;
     this.lookCounter=0;
     this.vx=0;
     this.vy=0;
     this.nx=0;
     this.ny=0;
     this.maxVelocity=40;
     this.friction = 0.5;
     this.fallspeed = 10;;
    }

    //TYNGDEKRAFT
    gravity(){
        if(falling){
            this.ny = this.fallspeed;
            this.fallspeed +=3;
            if(this.vx <0){
                this.img = playerJumpl[1];
            }else{
                this.img = playerJump[1];
            }
            
        }else{
            this.fallspeed = 10;
            this.jumpCount = 0;
            canJump=true;
        }

    }


    //Bare viser spilleren på canvasen
    show(){
        player.move();
        player.gravity();
        image(this.img,this.x,this.y,this.w,this.h);
        if(pogo){
            player.pogo();
        }
    }

    //GÅFUNKSJONEN
    move(dir){
    if(jump){
        player.jump();
    }
     this.vx += this.nx;
     this.vy += this.ny;

     this.vx *= this.friction;
     this.vy *= this.friction;

     this.x += this.vx;
     this.y += this.vy;
     if(dir=="right"){
        player.nx =15;
     }else if (dir=="left"){
        player.nx =-15;
     }else{
         player.nx=0;
     }
     if(this.vx<-1.9 && this.vy>-2){
        this.img = playerWalkl[this.walkCount % 3];
       
     }else if(this.vx>1.9 && this.vy<2){

        this.img = playerWalk[this.walkCount % 3];
     }else if(!pressed && !pogo){
         if(this.vx<0 ){this.img = playerStaticl;}else{this.img = playerStatic;}
     }
     this.walkCount++;
     
    }
    //HOPPING
    jump(){ 
        this.jumpHeight=18;
       // console.log("JUMP: " + this.jumpCount);
        if(this.jumpCount<this.jumpHeight){
            player.ny = -(this.jumpHeight-this.jumpCount)*1.7;
            this.jumpCount++;
        }
        if(this.vx<-1.9){
            this.img = playerJump[0];
           
         }else if(this.vx>1.9){
    
            this.img = playerJumpl[0];
         }
         this.jumpCount++;
         if(this.jumpCount>this.jumpHeight){
             console.log("NOT JUMPING ANYMORE!");
             jump=false;
         }
         
    }

    // POGOSTICK! 
    pogo(){
        this.jumpHeight=30;


        if(this.jumpCount<this.jumpHeight){
            player.ny = -(this.jumpHeight-this.jumpCount)*1.7;
            this.jumpCount++;
        }
        if(this.vx<-1.9){
            this.img = playerPogol[0];
           
         }else if(this.vx>1.9){
            this.img = playerPogo[0];
         }
         this.jumpCount++;
     
         
    }

    //LOOK DOWN!
    lookdown(){
        console.log("lookdown");
        this.img = playerLookDown[this.lookCounter];
        if(this.lookCounter==0){
            this.lookCounter=1;
        }
    }

      //LOOK UP!
      lookup(){
        console.log("lookdown");
        this.img = playerLookUp;
    }
    //FUNKSJON FOR BARE Å STÅ STILLE OG NULLSTILLE TELLERE OG INSTILLINGER
    static(){
    

    }
    
}

class Enemy {
    constructor(){
        this.x=800;
        this.y=300;
        this.jmpy=0;
        this.counter=0;
        this.speed = 5;
        this.img = enemy[0];
        this.left=false;
    }
    move(){
        if(this.x>player.x){
            this.left=true;
            this.x-=this.speed;
        }else{
            this.left=false;
            this.x+=this.speed;
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
        grnd[i].id = i;
        grnd[i].type=i % 3;
        if(i<15){
        grnd[i].y= 200 + round((i-1)/3)*20; // +(i*10);
        grnd[i].x= 0 +(i*81);
    }else{
        grnd[i].y= 600 //-(i*2);
        grnd[i].x= -800 +(i*81);
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
    falling = false;
}else{
    falling = true;
}





//####### HER KOMMER KONTROLLENE FOR Å STYRE SPILLERN  ##########////////////
//check all controls:
if(keyIsDown(UP_ARROW)||keyIsDown(LEFT_ARROW)||keyIsDown(RIGHT_ARROW)||keyIsDown(DOWN_ARROW)||keyIsDown(17)||keyIsDown(16)||mouseIsPressed){
    pressed = true;
}else{
  if(!falling){player.static();}
  pressed = false;
}

//CONTROLS

//hopp
if(keyIsDown(17)&&canJump){
    jump=true;
}
//console.log(canJump);

//TOGGLE POGO
if(keyIsDown(16)){
  if(!pogo){
      pogo=true;
  }else{
      pogo=false;
  }

}

//høyre og venstre
if(keyIsDown(RIGHT_ARROW)){
    player.move("right");
}else if(keyIsDown(LEFT_ARROW)){
    player.move("left")
}else{
    player.move("0");
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
       
        player.move();
    }else{
       
        player.move();
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
fill(255);
text("Du står på brikke nr: " + String(hitName),windowWidth/2,150);


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