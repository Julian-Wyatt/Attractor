/* eslint no-undef:0*/
/* eslint no-unused-vars:0*/
/* eslint max-classes-per-file:0*/
/* eslint max-len:0*/
/* eslint max-statements:0*/
/* eslint max-params:0*/
/* eslint no-mixed-operators:0*/
/* eslint max-lines:0*/
/* eslint no-magic-numbers:0*/
/* eslint max-lines-per-function:0*/
/* eslint no-plusplus:0*/
/* eslint id-length:0*/

/*
 * Particle class in order to define attributes for each unqiue particle
 * For example - size, and spawn position
 */


class Particle {

    constructor ({xPos, yPos, size, xSpeed, ySpeed, xAccn, yAccn, red, green, blue}) {

        this.xPos = xPos;
        this.yPos = yPos;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.xAccn = xAccn;
        this.yAccn = yAccn;
        this.red = red;
        this.green = green;
        this.blue = blue;

        this.flip = Math.round(Math.random() * 2) * 2 - 1;

        this.maxRandLifeVal = 20;
        this.minLifeVal = 10;
        this.maxLife = random(this.maxRandLifeVal) + this.minLifeVal;
        this.currLife = this.maxLife;
        this.mainHeight = windowHeight;
        this.mainWidth = windowWidth;
        this.maxColour = 255;
        this.alpha = 32;




    }

    checkDeath () {

        this.currLife -= 0.05;
        // Console.log("yposition death"+Math.round(this.yPos));
        if (this.currLife <= 0 || this.xPos > windowWidth || this.xPos < 0 || this.yPos + 10 > this.mainHeight-200 || this.yPos < 0) {

            this.respawn();

        }


    }


    colorParticle () {

        const speed = dist(0, 0, this.xSpeed, this.ySpeed) * this.maxColour % this.maxColour;

        // Fill(255,0,0,32);   set to red

        fill(this.r, this.g, this.b, this.alpha);
        ellipse(this.xPos, this.yPos, this.size, this.size);


    }


    respawn () {

        this.currLife = random(this.maxLifeVal) + this.minLifeVal;
        this.xPos = random(this.mainWidth);
        this.yPos = random(this.mainHeight-200);

    }



    getXPos () {
        return this.xPos;
    }

    setXPos (value) {
        this.xPos = value;
    }

    getYPos () {
        return this.yPos;
    }

    setYPos (value) {
        this.yPos = value;
    }

    getXSpeed () {
        return this.xSpeed;
    }

    setXSpeed (value) {
        this.xSpeed = value;
    }

    getYSpeed () {
        return this.ySpeed;
    }

    setYSpeed (value) {
        this.ySpeed = value;
    }

    getXAccn () {
        return this.xAccn;
    }

    setXAccn (value) {
        this.xAccn = value;
    }

    getYAccn () {
        return this.yAccn;
    }

    setYAccn (value) {
        this.yAccn = value;
    }

    getRed() {
        return this.r;
    }

    setRed (value) {
        this.r = value;
    }

    getGreen () {
        return this.g;
    }

    setGreen (value) {
        this.g = value;
    }

    getBlue() {
        return this.b;
    }

    setBlue (value) {
        this.b = value;
    }

    



}







class Simulation {

    constructor ({magnetism, deceleration, noiseScale, mouseX, mouseY, renderer, total, radius, rate}) {


        

        this.runOnce = false;
        this.drawing = false;

        this.height = windowHeight;
        this.width = windowWidth;
        this.mainHeightForSliders = this.height - 100;
        this.mainWidthForSliders = this.width / 2;

        this.rate = rate;

        this.minRadius = 2;
        this.maxRadius = 10;
        this.radius = radius;
        this.maxColour = 255;

        this.total = total;
        

        this.clearButton = createButton("Clear");
        this.clearButton.position(this.mainWidthForSliders - 600, this.mainHeightForSliders);
        this.clearButton.mousePressed(this.clearButtonFunc);

        this.blendButton = createButton("Change Blend Mode");
        this.blendButton.position(this.mainWidthForSliders - 525, this.mainHeightForSliders);
        this.blendButton.mousePressed(this.changeBlendMode);

        this.seedButton = createButton("Randomise Seed");
        this.seedButton.position(this.mainWidthForSliders - 400, this.mainHeightForSliders);
        this.seedButton.mousePressed(this.seedButtonFunc);

        this.rSlider = createSlider(0, this.maxColour, this.maxColour);
        this.rSlider.position(this.mainWidthForSliders - 50, this.mainHeightForSliders - 50);

        this.gSlider = createSlider(0, this.maxColour, 0);
        this.gSlider.position(this.mainWidthForSliders - 50, this.mainHeightForSliders);

        this.bSlider = createSlider(0, this.maxColour, 0);
        this.bSlider.position(this.mainWidthForSliders - 50, this.mainHeightForSliders + 50);


        this.randomiseColourCheckbox = createCheckbox("Randomise colour on click", false);
        this.randomiseColourCheckbox.position(this.mainWidthForSliders + 350, this.mainHeightForSliders);
        this.randomiseColourCheckbox.changed(this.randomCheckEvent);


        this.magnetism = magnetism;
        this.deceleration = deceleration;

        this.particles = new Array(this.total);
        this.noiseScale = noiseScale;

        this.mouseX = mouseX;
        this.mouseY = mouseY;

        this.blendChange = 0;

        this.setup();


        for (let particle = 0; particle < this.total; particle += 1) {

            this.particles[particle] = new Particle({xPos: Math.round(Math.random() * this.width), yPos: Math.round(Math.random() * (this.mainHeightForSliders - 100)), size: this.radius, xSpeed:0, ySpeed:0, xAccn: 0, yAccn: 0, r: this.rSlider.value(), g: this.gSlider.value(), b: this.gSlider.value()});


        }

    }

    


    setup () {


        this.canvas = createCanvas(this.width*3/4, this.height);
        this.canvas.parent("attractor");

        noStroke();
        fill(0);
        ellipseMode(RADIUS);
        background(0);
        // White rectangle for buttons and sliders
        fill(this.maxColour);
        rect(0, this.mainHeightForSliders - 100, this.width, 200);
        
        // Can use switch case to change blend mode on button press
        blendMode(BLEND);

        noiseSeed(random() * 10000);

    }


    draw () {


        for (let i = 0; i < this.total; i++) {

            const distance = dist(this.mouseX, this.mouseY, this.particles[i].xPos, this.particles[i].yPos);

            if (distance > 3) {

                this.particles[i].xAccn = this.magnetism * (this.mouseX - this.particles[i].xPos) / (distance * distance);
                this.particles[i].yAccn = this.magnetism * (this.mouseY - this.particles[i].yPos) / (distance * distance);

            }
            this.particles[i].xSpeed += this.particles[i].xAccn;
            this.particles[i].ySpeed += this.particles[i].yAccn;

            this.particles[i].xSpeed *= this.deceleration;
            this.particles[i].ySpeed *= this.deceleration;

            this.particles[i].xPos += this.particles[i].xSpeed;
            this.particles[i].yPos += this.particles[i].ySpeed;

            if (!this.randomiseColourCheckbox.checked()) {

                this.particles[i].r = this.rSlider.value();
                this.particles[i].g = this.gSlider.value();
                this.particles[i].b = this.bSlider.value();

            }
            this.particles[i].colorParticle();

        }


    }


    perlinNoise () {


        for (let i = 0; i < this.total; i++) {

            const angle = noise(this.particles[i].xPos / this.noiseScale, this.particles[i].yPos / this.noiseScale) * 2 * Math.PI * this.noiseScale * this.particles[i].flip;

            this.particles[i].ySpeed = lerp(this.particles[i].ySpeed, Math.sin(angle) * this.rate, 0.4);
            this.particles[i].xSpeed = lerp(this.particles[i].xSpeed, Math.cos(angle) * this.rate, 0.4);

            this.particles[i].xPos += this.particles[i].xSpeed;
            this.particles[i].yPos += this.particles[i].ySpeed;

            if (!this.randomiseColourCheckbox.checked()) {


                this.particles[i].r = this.rSlider.value();
                this.particles[i].g = this.gSlider.value();
                this.particles[i].b = this.bSlider.value();

            }
            this.particles[i].colorParticle();

            this.particles[i].checkDeath();

            smooth();

        }


    }


    run () {


        // Black rectangle which also gets trail to fade

        fill(0, 0, 0, 5);
        rect(0, 0, this.width, this.height - 200);

        if (mouseIsPressed === false) {

            this.perlinNoise();

            this.runOnce = false;

        } else if (mouseY < this.height - 200) {

            this.mouseX = mouseX;
            this.mouseY = mouseY;

            if (this.randomiseColourCheckbox.checked() && this.runOnce === false) {

                for (let i = 0; i < this.total; i++) {

                    this.particles[i].r = Math.round(random(this.maxColour));
                    this.particles[i].g = Math.round(random(this.maxColour));
                    this.particles[i].b = Math.round(random(this.maxColour));
                    this.particles[i].colorParticle();
                    // Console.log('Checking!');

                }
                this.runOnce = true;

            }
            this.draw();

        } else {

            this.perlinNoise();

        }
        
    }

    clearButtonFunc () {

        fill(0, 0, 0);
        rect(0, 0, windowWidth, windowHeight - 200);
        for (let i = 0; i < this.total; i++) {

            this.particles[i].respawn();

        }

    }

    seedButtonFunc () {

        fill(0, 0, 0);
        rect(0, 0, windowWidth, windowHeight - 200);
        noiseSeed(random() * 10000);

    }

    updateTotalParticles (value) {
        value --;
        if (this.total < value) {

            for (let i = this.total; i < value; i++) {

                this.particles[i] = new Particle({xPos: Math.round(Math.random() * this.width), yPos: Math.round(Math.random() * (this.mainHeightForSliders - 100)), size: this.radiusSlider.value(), xSpeed:0, ySpeed:0, xAccn: 0, yAccn: 0, r: this.rSlider.value(), g: this.gSlider.value(), b: this.gSlider.value()});

            }

            this.total = value;


        } else if (this.total > value) {

            for (let i = this.total; i > value; i--) {

                delete this.particles[i];

            }
            this.total = value;

        }

    }

    updateParticleRadius (value) {

        Particle.size = (value);

    }


    randomCheckEvent () {

        if (this.checked()) {

            // When checked randomise colour with each click
            if (this.drawing === true && this.runOnce === false) {

                for (let i = 0; i < this.total; i++) {

                    this.particles[i].r = Math.round(random(this.maxColour));
                    this.particles[i].g = Math.round(random(this.maxColour));
                    this.particles[i].b = Math.round(random(this.maxColour));
                    this.particles[i].colorParticle();
                    // Console.log('Checking!');

                }
                this.runOnce = true;

            }

        } else {

            // Do nothing

        }

    }

    changeBlendMode () {

        this.blendChange++;
        
        switch (this.blendChange % 14) {

        default:
            blendMode(BLEND);
            break;
        case 1:
            blendMode(ADD);
            break;
        case 2:
            blendMode(DARKEST);
            break;
        case 3:
            blendMode(LIGHTEST);
            break;
        case 4:
            blendMode(DIFFERENCE);
            break;
        case 5:
            blendMode(EXCLUSION);
            break;
        case 6:
            blendMode(MULTIPLY);
            break;
        case 7:
            blendMode(SCREEN);
            break;
        case 8:
            blendMode(REPLACE);
            break;
        case 9:
            blendMode(OVERLAY);
            break;
        case 10:
            blendMode(HARD_LIGHT);
            break;
        case 11:
            blendMode(SOFT_LIGHT);
            break;
        case 12:
            blendMode(DODGE);
            break;
        case 13:
            blendMode(BURN);
            break;

        }

    }



    getTotal () {
        return this.total;
    }

    setTotal (value) {
        this.total = value;
    }

    getMagnetism () {
        return this.magnetism;
    }

    setMagnetism (value) {
        this.magnetism = value;
    }

    getDeceleration () {
        return this.deceleration;
    }

    setDeceleration (value) {
        this.deceleration = value;
    }

    getRadius () {
        return this.radius;
    }

    setRadius (value) {
        this.radius = value;
    }

    getRate () {
        return this.rate;
    }

    setRate (value) {
        this.rate = value;
    }

    getRed() {
        return this.r;
    }

    setRed (value) {
        this.r = value;
    }

    getGreen () {
        return this.g;
    }

    setGreen (value) {
        this.g = value;
    }

    getBlue() {
        return this.b;
    }

    setBlue (value) {
        this.b = value;
    }



}

