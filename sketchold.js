let w;
let h;
let nWidth;
let nHeight;
let s = 100;
let boxnr = 0;
let x;
let y;
let epx;
let epy;
let blx;
let bly;
let counter = 0;
let blyjump = false;
let blycounter=0;
let jumpheight = 6;
let evix = 50;
let eviy = 10;
let speed = 1;
let imgSonic;
let imgSonicJump;
let bane = [];

class bane1 {
    constructor(){
        this.col = random(255);
        this.xval;
        this.yval;
        // this.xval = random(0,nWidth);
        // this.yval = random(0,nHeight);
        this.onoff = false;
        this.speed = random();
       
    }
    make(){
        fill(this.col);
        rect(s * round(this.xval),s * round(this.yval),s,s);
    }
    move() {
        if(this.xval>nWidth){
            this.xval=0;
        }
        if(this.xval<0){
            this.xval=nWidth;
        }
        this.xval-=this.speed;
    }
}
class bane2 {
    constructor(){
        this.col = random(255);
        this.xval = random(0,nWidth);
        this.yval = random(0,nHeight);
        this.onoff = false;
        this.speed = random();
       
    }
    make(){
        fill(this.col);
        rect(s * round(this.xval),s * round(this.yval),s,s);
    }
    move() {
        if(this.xval>nWidth){
            this.xval=0;
        }
        if(this.xval<0){
            this.xval=nWidth;
        }
        this.xval-=this.speed;
        console.log(this.yval);
    }
}
function setup(){
    w = windowWidth;
    h = windowHeight;
    nWidth = w / s;
    nHeight = h / s;
    frameRate(25);
    x = round(random(nWidth));
    y = round(random(nHeight));
    epx = round(random(nWidth));
    epy = round(random(nHeight));
    blx = round(random(nWidth));
    bly = round(random(nHeight));
    // console.log("X OG Y =" + x + " - " + y);
    // console.log(w + " - WIDTH, " + h + " - HEIGHT");
    createCanvas(w,h);
    imgSonic = loadImage("sonic.png");
    imgSonicJump = loadImage("sonicjump.png");
    for(i=0;i<10;i++){
        bane.push( new bane1);
        if(i>0){bane[i].xval=bane[i-1].xval;bane[i].yval=bane[i-1].yval;}else{bane[i].xval=epx;bane[i].yval=epy;}
    }
    

}


function jump(){
    console.log(blycounter + ": blycounter");
   
    if(blycounter < (jumpheight * 2)){
        bly-=1;
        bly -= (jumpheight-(blycounter-2))/10;
     
    }else if(blycounter>(jumpheight*3)){
        
        
      blyjump = false;
      blycounter=0;
        
    }
    blycounter ++;
}
function draw(){

    evix -= speed;
    if((evix == blx)&& (eviy == bly) ){
        // console.log("Dead!");
       speed = 0;
    }else{
        background(0);

    }
    if(blyjump) {
        jump();
    }
    background(0);
    fill(255);
    text("HEIHEIHEI",w/2,50);
    stroke(255);
    for(i=0;i<bane.length;i++){
        bane[i].make();
        bane[i].move();
       
    }

    //rød rect
    fill(255,0,0);
    rect(s * epx,s * epy,s,s);
    //blå rect    
    fill(0,0,255);
    rect(s * x,s * y,s,s);

    //evil dawg
    fill(random(20,200));
    rect(s * evix,s * eviy,s,s);
    //grønn rect;
    if((bly<10)){bly = bly + 1 ;}else{bly=10;} // 1 = tyngdekraft. bytt gjerne ut med en var.
    if((blx == epx) && (bly == epy)){
        bly-=1;
    }
    if((keyIsDown(32)||mouseIsPressed) && blyjump == false){
    blyjump = true;

    }
    if(keyIsDown(RIGHT_ARROW)){
        blx++;
    }
    if(keyIsDown(LEFT_ARROW)){
        blx--;
    }
   
    fill(0,255,0);
    if(!blyjump){image(imgSonic,s*blx,s*bly,100,100);}else{image(imgSonicJump,s*blx,s*bly,100,100);}
    //rect(s * blx,s * bly,s,s);

    //Kode som lager rutenett over hele greia: 
    fill(0,0,0,0);
    for (a = 0; a < nHeight; a ++){
        for ( i = 0; i < nWidth; i++){
            // if (i == x && a == y){
            //     fill(255,0,0);
            // }else if (i == epx && a == epy){
            //     fill(0,255,0);
            // }else{
            //     fill(0);
            // }
          rect(s * i,s * a,s,s);
          boxnr ++;
        
        }
    }
    // console.log(boxnr + " bokser");
    boxnr = 0;
    if(counter % 10 == 0){
    if(x<nWidth-1){if(x>0){x += round(random(2))-1;}else{x+=1;}}else{x-=1;}
    if(y<nHeight-1){if(y>0){ y += round(random(2))-1;}else{y+=1;}}else{y-=1;}
    


    }
    counter ++;
    if(mouseIsPressed){
        // epx=round((mouseX-(nWidth/2))/nWidth);
        // epy=round((mouseY-(nHeight/2))/nHeight);
        epx=round((mouseX-(s/2))/s);
        epy=round((mouseY-(s/2))/s);
        console.log("EPX: " + epx +"\nEPY: " + epy)

    }

}
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	w = windowWidth;
    h = windowHeight;
    nWidth = w / s;
    nHeight = h / s;
    console.log(w + " - WIDTH, " + h + " - HEIGHT");
  }
  