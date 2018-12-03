
//Particle class in order to define attributes for each unqiue particle
//For example - size, and spawn position
class Particle {

    constructor (xPos, yPos, size) {

        this.xPos = xPos;
        this.yPos = yPos;
        this.size = size;
        
    }   
    
    draw(){
        ellipse(this.xPos,this.yPos,this.size,this.size);
    }

}

class Simulation{

    constructor (radius, magnetism, deceleration,total){
        this.magnetism = magnetism;
        this.deceleration = deceleration;
        this.radius = radius;
        this.total = total;
        let xAccn = new Array(this.total),
            xPos = new Array(this.total),
            xSpeed = new Array(this.total),
            yAccn = new Array(this.total),
            yPos = new Array(this.total),
            ySpeed = new Array(this.total)
            

        for (let i=0;i<this.total;i++){
            xPos[i] = random(width);
            yPos[i] = random(height);
            xSpeed[i] = 0;
            ySpeed[i] = 0;
            xAccn[i] = 0;
            yAccn[i] = 0;
        }

        this.setup()
        this.draw()
    }


    setup() {


        createCanvas(windowWidth,windowHeight);
        noStroke(); 
        fill(0);
        ellipseMode(RADIUS);
        background(0);
        blendMode(ADD);

    }



    draw(){


        fill(0,0,0);
        rect(100,100,width,height);
  
        for(var i=0; i<this.total; i++){
            var distance = dist(mouseX, mouseY, this.xPos[i], this.yPos[i]); 

            if(distance > 3){
                this.xAccn[i] = this.magnetism * (mouseX - this.xPos[i]) / (distance * distance); 
                this.yAccn[i] = this.magnetism * (mouseY - this.yPos[i]) / (distance * distance);
            }
            this.xSpeed[i] += this.xAccn[i]; 
            this.ySpeed[i] += this.yAccn[i]; 
    
            this.xSpeed[i] *= this.deceleration;
            this.ySpeed[i] *= this.deceleration;
    
            this.xPos[i] += this.xSpeed[i]; 
            this.yPos[i] += this.ySpeed[i]; 
    
            var speed = dist(0,0,this.xSpeed[i],this.ySpeed[i]); 
            var red = map(speed, 0, 5, 0, 255); 
            var green = map(speed, 0,5, 64, 255);
            var blue = map(speed, 0,5, 128, 255);
            fill(red, green, blue, 32);
            ellipse(this.xPos[i],this.yPos[i],this.radius,this.radius);
        }
    //let particle = new Particle(100,100,100,100);
    }

}