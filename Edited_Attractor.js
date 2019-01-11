/* eslint no-undef:0*/
/* eslint no-unused-vars:0*/
/* eslint max-classes-per-file:0*/
/* eslint max-len:0*/
/* eslint max-statements:0*/
/* eslint max-params:0*/
/* eslint no-mixed-operators:0*/
/* eslint max-lines:0*/
/* eslint no-magic-numbers: ["error", { "ignore": [0,1,2,5,10,50] }]*/
/* eslint max-lines-per-function:0*/

/*
 * Particle class in order to define attributes for each unqiue particle
 * For example - size, and spawn position
 */


class Particle {

    constructor (xPos, yPos, size, xSpeed, ySpeed, xAccn, yAccn, red, green, blue) {

        this.xPos = xPos;
        this.yPos = yPos;
        this.size = size;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.xAccn = xAccn;
        this.yAccn = yAccn;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.color();
        this.flip = Math.round(Math.random() * 2) * 2 - 1;

        this.maxRandLifeVal = 30;
        this.minLifeVal = 10;
        this.maxLife = random() * this.maxLifeVal + this.minLifeVal;
        this.currLife = this.maxLife;
        this.mainHeight = this.height - 200;
        this.mainWidth = this.width + 100;
        this.maxColour = 255;
        this.alpha = 32;

    }

    checkDeath () {

        this.currLife -= 0.05;
        //console.log("yposition death"+Math.round(this.yPos));
        if (this.currLife <= 0 || this.xPos > windowWidth || this.xPos < 0 || this.yPos > this.mainHeight || this.yPos < 0) {

           // console.log("xposition: "+this.xPos)
            //console.log("yposition:"+this.yPos)
            if (this.yPos > this.mainHeight) {

                console.log("yposition death"+Math.round(this.yPos));

            }
            this.respawn();

        }
        if (this.yPos > this.mainHeight) {

            console.log("yposition"+Math.round(this.yPos));

        }

    }


    color () {

        let speed = dist(0, 0, this.xSpeed, this.ySpeed) * this.maxColour % this.maxColour;

        // fill(255,0,0,32);   set to red

        fill(this.r, this.g, this.b, this.alpha);
        ellipse(this.xPos, this.yPos, this.size, this.size);

    }


    respawn () {

        this.currLife = this.maxLife;
        this.xPos = random() * this.mainWidth;
        this.yPos = random() * this.mainHeight;

    }

}

class Simulation {

    constructor (magnetism, deceleration, noiseScale, mouseX, mouseY) {

        this.runOnce = false;
        this.drawing = false;


        this.height = windowHeight;
        this.width = windowWidth;
        this.mainHeightForSliders = this.height - 100;
        this.mainWidthForSliders = this.width / 2;

        this.mainRate = 0.5;
        this.minRate = 0.25;
        this.maxRate = 1.75;

        this.minRadius = 2;
        this.maxRadius = 10;
        this.mainRadius = 3;
        this.maxColour = 255;
        this.total = 1000;



        this.clearButton = createButton("Clear");
        this.clearButton.position(this.mainWidthForSliders - 500, this.mainHeightForSliders);
        this.clearButton.mousePressed(this.clearButtonFunc);

        this.seedButton = createButton("Randomise Seed");
        this.seedButton.position(this.mainWidthForSliders - 450, this.mainHeightForSliders);
        this.seedButton.mousePressed(this.seedButtonFunc);

        this.rateSlider = createSlider(this.minRate, this.maxRate, this.mainRate, 0);
        this.rateSlider.position(this.mainWidthForSliders - 250, tthis.mainHeightForSliders);

        this.rSlider = createSlider(0, this.maxColour, this.maxColour);
        this.rSlider.position(this.mainWidthForSliders - 50, this.mainHeightForSliders - 50);

        this.gSlider = createSlider(0, this.maxColour, 0);
        this.gSlider.position(this.mainWidthForSliders - 50, this.mainHeightForSliders);

        this.bSlider = createSlider(0, this.maxColour, 0);
        this.bSlider.position(this.mainWidthForSliders - 50, this.mainHeightForSliders + 50);

        this.totalParticlesSlider = createSlider(5, this.total, this.total / 10, 5);
        this.totalParticlesSlider.position(this.mainWidthForSliders + 100, this.mainHeightForSliders);
        this.totalParticlesSlider.style("width", "100px");

        this.radiusSlider = createSlider(this.minRadius, this.maxRadius, this.mainRadius, 0);
        this.radiusSlider.position(this.mainWidthForSliders + 250, this.mainHeightForSliders);
        this.radiusSlider.style("width", "50px");

        this.randomiseColourCheckbox = createCheckbox("Randomise colour on click", false)
        this.randomiseColourCheckbox.position(this.width/2 +350, this.height -100) 
        //this.randomiseColourCheckbox.changed(this.randomCheckEvent);







        this.magnetism = magnetism;
        this.deceleration = deceleration;
        
        
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
        
        

        




        for (let i=0;i<this.total;i++){
            
            this.particles[i] = new Particle(Math.round(Math.random()*(this.width+100)),Math.round(Math.random()*(this.height-200)),this.radiusSlider.value(),0,0);


        }
        console.log(this.height+"\n"+(this.height-200));
    }




    setup() {

       
        createCanvas(this.width,this.height);
        noStroke(); 
        fill(0);
        ellipseMode(RADIUS);
        background(0);
        //white rectangle for buttons and sliders
        fill(255)
        rect(0,this.height-200,this.width,200);
        //can use switch case to change blend mode on button press
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

            if (!this.randomiseColourCheckbox.checked()){

                this.particles[i].r = this.rSlider.value();
                this.particles[i].g = this.gSlider.value();
                this.particles[i].b = this.bSlider.value();
            }
            this.particles[i].color();
        }
    //let particle = new Particle(100,100,100,100);
    }


    perlinNoise(){
        

        
        for (let i=0;i<this.total;i++){
            let angle = noise(this.particles[i].xPos/this.noiseScale,this.particles[i].yPos/this.noiseScale)*2*Math.PI*this.noiseScale*this.particles[i].flip;
            //let temp = this.particles[i].xSpeed;
            //let temp1 = this.particles[i].ySpeed;
            this.particles[i].ySpeed = lerp(this.particles[i].ySpeed,Math.sin(angle)*this.rateSlider.value(),0.4);
            this.particles[i].xSpeed = lerp(this.particles[i].xSpeed,Math.cos(angle)*this.rateSlider.value(),0.4);
            //this.particles[i].xSpeed = Math.cos(angle)*this.rate;
            
            
            //this.particles[i].xPos += lerp(temp,this.particles[i].xSpeed,0.05); 
            //this.particles[i].yPos += lerp(temp1,this.particles[i].ySpeed,0.05); 
            this.particles[i].xPos+=this.particles[i].xSpeed;
            this.particles[i].yPos+=this.particles[i].ySpeed;

            if (!this.randomiseColourCheckbox.checked()){

                this.particles[i].r = this.rSlider.value();
                this.particles[i].g = this.gSlider.value();
                this.particles[i].b = this.bSlider.value();
            }
            this.particles[i].color();
            
            this.particles[i].checkDeath();

            smooth();

        }

    



    }


    run () {

        //black rectangle which also gets trail to fade
        fill(0,0,0,5)
        rect(0,0,this.width,this.height-200)
      
            if (mouseIsPressed==false) {

                this.perlinNoise();

                this.runOnce=false;
            }
            else {
                
                if (mouseY<this.height-200) {

                this.mouseX = mouseX;
                this.mouseY = mouseY;
                
                if (this.randomiseColourCheckbox.checked() && this.runOnce ==false){
                   
                    for ( let i =0; i<this.total; i++ ){
                        this.particles[i].r = Math.round(random(255));
                        this.particles[i].g = Math.round(random(255));
                        this.particles[i].b = Math.round(random(255));
                        this.particles[i].color();
                        console.log('Checking!');
                    }
                    this.runOnce = true;   
                    
                }
                this.draw();
                }
                else{
                    this.perlinNoise();
                }
        
            }


        this.updateTotalParticles();
        this.updatePartcileRadius();

        //console.log(this.total);
    }

   

    clearButtonFunc(){

        fill (0,0,0);
        rect(0,0,windowWidth,windowHeight-200)
        for(let i=0; i<this.total; i++){
            this.particles[i].respawn();
        }

    }

    seedButtonFunc(){
        fill (0,0,0);
        rect(0,0,windowWidth,windowHeight-200)
        noiseSeed(random()* this.noiseScale *1000*random());
    }

    updateTotalParticles(){

        if (this.total<this.totalParticlesSlider.value()){
            for (let i=this.total;i<this.totalParticlesSlider.value();i++){
            
                this.particles[i] = new Particle(Math.round(Math.random()*(this.width+100)),Math.round(Math.random()*(this.height-200)),this.radius,0,0);
    
            }
            this.total = this.totalParticlesSlider.value()
        }
        else if (this.total>this.totalParticlesSlider.value()){

            for (let i=this.total;i>this.totalParticlesSlider.value();i--){
            
                delete this.particles[i];
    
            }
            this.total = this.totalParticlesSlider.value()
        }
    }

    updatePartcileRadius() {
        for (let i =0; i<this.total;i++) {
            this.particles[i].size = this.radiusSlider.value();
        }

    }


    randomCheckEvent () {
        if (this.checked()) {
            // when checked randomise colour with each click
            console.log(this.total);
            console.log(this.runOnce);
            if (this.drawing ==true  && this.runOnce==false){
                for (let i =0;i<this.total;i++){
                    this.particles[i].r = Math.round(random(255));
                    this.particles[i].g = Math.round(random(255));
                    this.particles[i].b = Math.round(random(255));
                    this.particles[i].color();
                    console.log('Checking!');
                }
                this.runOnce = true;
            }
            
          } else {
              // do nothing
            console.log('Unchecking!');
          }
    }
    

   

}



