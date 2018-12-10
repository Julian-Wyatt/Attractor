/*eslint no-undef:0*/

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

        this.color();
        this.flip = Math.round(Math.random()*2) * 2 - 1;
        this.maxLife = random()*30+10;
        this.currLife = this.maxLife;
        
        
    }   

    checkDeath(){
        this.particles[i].currLife -= 0.05;
        if (this.particles[i].currLife<=0 ){
            this.particles[i].respawn();
        }
    }

    

    color(){

        let speed = (dist(0,0,this.xSpeed,this.ySpeed)*255)%255;


        //Parameterise
        
        var red = map(speed*random(), speed*random(), speed*random(), speed*random(), 255); 
        var green = map(speed*random(),speed*random(),speed*random(), speed*random(), 255);
        var blue = map(speed*random(), speed*random(),speed*random(), speed*random(), 255);
        
     
        
        //fill(red*random()*255, green*random()*255, blue*random()*255, 60);

    
        fill(255,0,0,32)
        ellipse(this.xPos,this.yPos,this.size,this.size);
       
    }
    respawn(){
        this.currLife = this.maxLife;
        this.xPos = random() * (windowWidth+100);
        this.yPos = random() * (windowHeight-100);
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
        this.height = windowHeight+100;
        this.width = windowWidth;

        for (let i=0;i<this.total;i++){
            
            this.particles[i] = new Particle(Math.round(Math.random()*(this.width+100)),Math.round(Math.random()*(this.height-200)),radius,0,0);
        }

        /*
        this.rslider = createSlider(0, 255, 100);
        this.rSlider.position(20, 20);
        this.gSlider = createSlider(0, 255, 0);
        this.gSlider.position(20, 50);
        this.bSlider = createSlider(0, 255, 255);
        this.bSlider.position(20, 80);
        //this.setup()
        //this.draw();
        */
    }


    setup() {

       
        createCanvas(this.width,this.height+100);
        noStroke(); 
        fill(0);
        ellipseMode(RADIUS);
        background(0);
        blendMode(BLEND);   
        noiseSeed(random()*this.noiseScale*1000*random());
       // this.sliders();
    }



    draw(){


        //fill(0,0,0);
        
  
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


            this.particles[i].color();
        }
    //let particle = new Particle(100,100,100,100);
    }

    perlinNoise(){
        
        for (let i=0;i<this.total;i++){
            let angle = noise(this.particles[i].xPos/this.noiseScale,this.particles[i].yPos/this.noiseScale)*2*Math.PI*this.noiseScale*this.particles[i].flip;
            //let temp = this.particles[i].xSpeed;
            //let temp1 = this.particles[i].ySpeed;
            this.particles[i].ySpeed = lerp(this.particles[i].ySpeed,Math.sin(angle)*this.rate,0.4);
            this.particles[i].xSpeed = lerp(this.particles[i].xSpeed,Math.cos(angle)*this.rate,0.4);
            //this.particles[i].xSpeed = Math.cos(angle)*this.rate;
            
            
            //this.particles[i].xPos += lerp(temp,this.particles[i].xSpeed,0.05); 
            //this.particles[i].yPos += lerp(temp1,this.particles[i].ySpeed,0.05); 
            this.particles[i].xPos+=this.particles[i].xSpeed;
            this.particles[i].yPos+=this.particles[i].ySpeed;
            this.particles[i].color();
            
            smooth();

        }

    



    }


    run (){
        background(0,0,0,4)
       
        if (mouseIsPressed==false){

            this.perlinNoise();
    
        }
        else {
            this.mouseX = mouseX;
            this.mouseY = mouseY;
            this.draw();
        }
        
    }

    sliders(){
        
    }
    
        

   
    

}

let attractor


function setup(){                                               // eslint-disable-line no-unused-vars
    attractor = new Simulation(1.5,10,0.95,100,800,0.5);
    attractor.setup();

}
function draw(){                                                // eslint-disable-line no-unused-vars

    attractor.run();
     
}
