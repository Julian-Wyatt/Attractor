//https://www.openprocessing.org/sketch/424081
// 引力・斥力モデル - Translation: Attractive force / repulsive force model
/*eslint-disable*/

var num = 1000;
var vx = new Array(num);
var vy = new Array(num);
var x = new Array(num);
var y = new Array(num);
var ax = new Array(num);
var ay = new Array(num);

var magnetism = 10.0; //引力の強さ マイナスにすると斥力になる。 - Translation: Strength of attractive force If it is negative, it becomes repulsive force.
var radius = 1 ; //描画する円の半径 - Translation: Radius of drawing circle
var gensoku = 0.95; // 粒子の移動を減速させる - Translation: Decelerate particle movement

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
    var distance = dist(touchX, touchY, x[i], y[i]); //dist(x1,y1,x2,y2) ２点間の距離を求める関数 - Translation: Function for finding the distance between two points
    //加速度は引力の中心からの距離の二乗に反比例する。 - Translation: The acceleration is inversely proportional to the square of the distance from the center of gravity.
    if(distance > 3){ //あまりマウスに近すぎる場合は加速度を更新しない - Translation: If you are too close to the mouse, do not update the acceleration
      ax[i] = magnetism * (touchX - x[i]) / (distance * distance); 
      ay[i] = magnetism * (touchY - y[i]) / (distance * distance);
    }
    vx[i] += ax[i]; // 1フレームあたりaxだけ速度vxを増加する。- Translation: Increase speed vx by ax per frame.
    vy[i] += ay[i]; // 1フレームあたりayだけ速度vyを増加する. - Translation: Increase spped vy by ay per frame.
    
    vx[i] = vx[i]*gensoku;
    vy[i] = vy[i]*gensoku;
    
    x[i] += vx[i];  // 1フレームあたりvxピクセル進ませる。- Translation: Move forward by v x pixels per frame.
    y[i] += vy[i];  // 1フレームあたりvyピクセル進ませる。- Translation: Move forward by v y pixels per frame.
    
    var sokudo = dist(0,0,vx[i],vy[i]); // 速度のX,Y成分から速度を求める - Translation: Find velocity from X and Y components of velocity
    var r = map(sokudo, 0, 5, 0, 255); //速度に応じた色を計算 - Translation: Calculate colors according to speed
    var g = map(sokudo, 0,5, 64, 255);
    var b = map(sokudo, 0,5, 128, 255);
    fill(r, g, b, 32);
    ellipse(x[i],y[i],radius,radius);
  }
  
  
}