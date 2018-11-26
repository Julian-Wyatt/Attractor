
var num = 1000;
var vx = new Array(num);
var vy = new Array(num);
var x = new Array(num);
var y = new Array(num);
var ax = new Array(num);
var ay = new Array(num);

var magnetism = 10.0; 
var radius = 1 ; 
var gensoku = 0.95; 

function setup(){
  createCanvas(windowWidth,windowHeight);
  noStroke(); 
  fill(0);
  ellipseMode(RADIUS);
  background(0);
  blendMode(ADD);
  
  for(var i =0; i< num; i++){
    x[i] = random(width);
    y[i] = random(height);
    vx[i] = 0;
    vy[i] = 0;
    ax[i] = 0;
    ay[i] = 0;
  }
}


function draw(){
  fill(0,0,0);
  rect(0,0,width,height);
  
  for(var i=0; i<num; i++){
    var distance = dist(touchX, touchY, x[i], y[i]); 

    if(distance > 3){
      ax[i] = magnetism * (touchX - x[i]) / (distance * distance); 
      ay[i] = magnetism * (touchY - y[i]) / (distance * distance);
    }
    vx[i] += ax[i]; 
    vy[i] += ay[i]; 
    
    vx[i] = vx[i]*gensoku;
    vy[i] = vy[i]*gensoku;
    
    x[i] += vx[i]; 
    y[i] += vy[i]; 
    
    var sokudo = dist(0,0,vx[i],vy[i]); 
    var r = map(sokudo, 0, 5, 0, 255); 
    var g = map(sokudo, 0,5, 64, 255);
    var b = map(sokudo, 0,5, 128, 255);
    fill(r, g, b, 32);
    ellipse(x[i],y[i],radius,radius);
  }
  
}