/*eslint-nodef*/
//Particle class in order to define attributes for each unqiue particle
//For example - size, and spawn position
class Particle {

    constructor (xPos, yPos, size,xSpeed,ySpeed,xAccn,yAccn) {

        this.xPos = xPos;
        this.yPos = yPos;
        this.size = size;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.xAccn = xAccn;
        this.yAccn = yAccn;
        this.draw();
        this.color();
        this.flip = Math.round(Math.random()*2) * 2 - 1;
        this.maxLife = random()*10+5;
        this.currLife = this.maxLife;

    }   
    
    draw(){
        ellipse(this.xPos,this.yPos,this.size,this.size);
    }
    color(){

//        let speed = dist(0,0,this.xSpeed,this.ySpeed);

        var red = map(200, 0, 5, 0, 255); 
        var green = map(10, 0,5, 64, 255);
        var blue = map(255, 0,5, 128, 255);

        fill(red, green, blue, 32);
    }
    respawn(){
        this.currLife = this.maxLife;
        this.xPos = random() * (windowWidth+100);
        this.yPos = random() * (windowHeight+200);
    }

}

class Simulation{

    constructor (radius, magnetism, deceleration,total,noiseScale, RATE, mouseX,mouseY){

        this.magnetism = magnetism;
        this.deceleration = deceleration;
        this.radius = radius;
        this.total = total;
        /*
        this.xAccn = new Array(this.total);
        this.xPos = new Array(this.total);
        this.xSpeed = new Array(this.total);
        this.yAccn = new Array(this.total);
        this.yPos = new Array(this.total);
        this.ySpeed = new Array(this.total);
        */
        this.particles = new Array(this.total);
        this.noiseScale = noiseScale;
        
        this.mouseX = mouseX;
        this.mouseY = mouseY;
        this.rate = RATE;
        

        for (let i=0;i<this.total;i++){
            
            this.particles[i] = new Particle(Math.round(Math.random()*(windowWidth+100)),Math.round(Math.random()*(windowHeight+200)),radius,0,0);
        }

        //this.setup()
        //this.draw();
    }


    setup() {

       
        createCanvas(windowWidth+100,windowHeight+200);
        noStroke(); 
        fill(0);
        ellipseMode(RADIUS);
        background(0);
        blendMode(ADD);
        noiseSeed(random()*this.noiseScale*1000*random());
        
    }



    draw(){


        fill(0,0,0);
        
  
        for(let i=0; i<this.total; i++){
            let distance = dist(this.mouseX, this.mouseY, this.particles[i].xPos, this.particles[i].yPos); 

            if(distance > 3){
                this.particles[i].xAccn = this.magnetism * (this.mouseX - this.particles[i].xPos) / (distance * distance); 
                this.particles[i].yAccn = this.magnetism * (this.mouseY - this.particles[i].yPos) / (distance * distance);
            }
            this.particles[i].xSpeed += this.particles[i].xAccn; 
            this.particles[i].ySpeed += this.particles[i].yAccn; 
    
            this.particles[i].xSpeed *= this.deceleration;
            this.particles[i].ySpeed *= this.deceleration;
    
            this.particles[i].xPos += this.particles[i].xSpeed; 
            this.particles[i].yPos += this.particles[i].ySpeed; 

            
            this.particles[i].draw();
            this.particles[i].color();
            smooth();
        }
    //let particle = new Particle(100,100,100,100);
    }

    perlinNoise(){
        
        for (let i=0;i<this.total;i++){
            let angle = noise(this.particles[i].xPos/this.noiseScale,this.particles[i].yPos/this.noiseScale)*2*Math.PI*this.noiseScale*this.particles[i].flip;

            this.particles[i].ySpeed = Math.sin(angle)*this.rate;
            this.particles[i].xSpeed = Math.cos(angle)*this.rate;
            this.particles[i].xPos += this.particles[i].xSpeed; 
            this.particles[i].yPos += this.particles[i].ySpeed; 
            this.particles[i].draw();
            this.particles[i].color();
            this.particles[i].currLife -= 0.05;
            if (this.particles[i].currLife<=0){
                this.particles[i].respawn();
            }
            smooth();

        }




    }

    
        

   
    

}

let attractor


function setup(){
    attractor = new Simulation(1.5,10,0.95,300,800,0.5);
    attractor.setup();

}
function draw(){

    if (mouseIsPressed==false){

        attractor.perlinNoise();

    }
    else {
        attractor.mouseX = mouseX;
        attractor.mouseY = mouseY;
        attractor.draw();
    }
    
     
}
