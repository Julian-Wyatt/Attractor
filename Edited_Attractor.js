/* eslint no-undef:0*/
/* eslint no-undefined:0*/
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
/* eslint sort-keys:0*/
/* eslint no-lonely-if:0*/
/* eslint complexity:0*/
/* eslint no-else-return:0*/

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

        Particle.prototype.r = red;
        Particle.prototype.g = green;
        Particle.prototype.b = blue;

        this.flip = Math.round(Math.random() * 2) * 2 - 1;

        this.maxRandLifeVal = 20;
        this.minLifeVal = 10;
        this.maxLife = random(this.maxRandLifeVal) + this.minLifeVal;
        this.currLife = this.maxLife;
        this.mainHeight = windowHeight;
        this.mainWidth = windowWidth;
        this.maxColour = 255;
        this.alpha = 32;

        Particle.prototype.size = size;


    }

    checkDeath (drawing) {

        if (drawing) {

            this.currLife -= 0.05;

        }

        // Console.log("yposition death"+Math.round(this.yPos));
        if (this.currLife <= 0 || this.xPos > this.mainWidth || this.xPos < 0 || this.yPos + 10 > this.mainHeight - 200 || this.yPos < 0) {

            this.respawn();

        }


    }


    colorParticle (renderer, speedColour) {

        if (renderer === undefined) {

            if (speedColour) {

                const speed = dist(0, 0, this.xSpeed, this.ySpeed);
                this.Vr = map(speed, 0, 5, 0, 255);
                this.Vg = map(speed, 0, 5, 64, 255);
                this.Vb = map(speed, 0, 5, 128, 255);
                fill(this.Vr, this.Vg, this.Vb, 32);
                ellipse(this.xPos, this.yPos, this.size, this.size);


            } else {

                fill(this.r, this.g, this.b, this.alpha);
                ellipse(this.xPos, this.yPos, this.size, this.size);

            }


        } else {

            if (speedColour) {

                const speed = dist(0, 0, this.xSpeed, this.ySpeed);
                this.Vr = map(speed, 0, 5, 0, 255);
                this.Vg = map(speed, 0, 5, 64, 255);
                this.Vb = map(speed, 0, 5, 128, 255);
                renderer.fill(this.Vr, this.Vg, this.Vb, 32);
                renderer.ellipse(this.xPos, this.yPos, this.size, this.size);

            } else {

                const speed = dist(0, 0, this.xSpeed, this.ySpeed);
                this.Vr = map(speed, 0, 5, 0, 255);
                this.Vg = map(speed, 0, 5, 64, 255);
                this.Vb = map(speed, 0, 5, 128, 255);
                renderer.fill(this.Vr, this.Vg, this.Vb, 32);
                renderer.ellipse(this.xPos, this.yPos, this.size, this.size);

                renderer.fill(this.r, this.g, this.b, this.alpha);
                renderer.ellipse(this.xPos, this.yPos, this.size, this.size);

            }


        }

    }


    respawn () {

        this.currLife = random(this.maxLifeVal) + this.minLifeVal;
        this.xPos = random(this.mainWidth);
        this.yPos = random(this.mainHeight - 200);

    }

    getFlip () {

        // Dont need set this.flip as it is assigned on particle instantiation and shouldn't be changed
        return this.flip;

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

    getRed () {

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

    getBlue () {

        return this.b;

    }

    setBlue (value) {

        this.b = value;

    }


}


class Simulation {

    constructor ({magnetism, deceleration, noiseScale, mouseX, mouseY, renderer, total, radius, rate, r, g, b}) {

        this.renderer = renderer;

        this.runOnce = false;
        this.drawing = false;

        if (this.renderer === undefined) {

            this.height = windowHeight - 300;
            this.width = windowWidth;

        } else {

            this.height = this.renderer.height;
            this.width = this.renderer.width;

        }

        this.rate = rate;

        this.radius = radius;
        this.maxColour = 255;

        this.r = r;
        this.g = g;
        this.b = b;

        this.total = total;

        this.randColour = false;

        this.magnetism = magnetism;
        this.deceleration = deceleration;

        this.particles = new Array(this.total);
        this.noiseScale = noiseScale;

        this.mouseX = mouseX;
        this.mouseY = mouseY;

        this.blendChange = 0;

        this.speedColour = false;

        for (let particle = 0; particle < this.total; particle++) {

            this.particles[particle] = new Particle({"xPos": Math.round(Math.random() * this.width),
                "yPos": Math.round(Math.random() * this.height),
                "size": this.radius,
                "xSpeed": 0,
                "ySpeed": 0,
                "xAccn": 0,
                "yAccn": 0,

                "red": 255,
                "green": 0,
                "blue": 0});


        }

        this.noiseSeed = 0;
        this.setup();

    }


    setup () {

        if (this.renderer === undefined) {

            this.canvas = createCanvas(this.width * 2 / 3, this.height);
            this.canvas.parent("attractor");

            noStroke();
            fill(0);
            ellipseMode(RADIUS);
            background(0);
            blendMode(BLEND);

        } else {


            this.canvas = createCanvas(this.width * 2 / 3, this.height);
            this.canvas.parent("attractor");
            this.renderer.noStroke();
            this.renderer.fill(0);
            this.renderer.ellipseMode(RADIUS);
            this.renderer.background(0);
            this.renderer.blendMode(BLEND);


        }
        this.noiseSeed = random() * 100000;
        noiseSeed(this.noiseSeed);


    }

    draw () {

        this.drawing = true;

        for (let i = 0; i < this.total; i++) {

            const distance = dist(this.mouseX, this.mouseY, this.particles[i].getXPos(), this.particles[i].getYPos());

            if (distance > 3) {

                this.particles[i].setXAccn(this.magnetism * (this.mouseX - this.particles[i].getXPos()) / (distance * distance));
                this.particles[i].setYAccn(this.magnetism * (this.mouseY - this.particles[i].getYPos()) / (distance * distance));

            }
            this.particles[i].setXSpeed(this.particles[i].getXSpeed() + this.particles[i].getXAccn());
            this.particles[i].setYSpeed(this.particles[i].getYSpeed() + this.particles[i].getYAccn());

            this.particles[i].setXSpeed(this.particles[i].getXSpeed() * this.deceleration);
            this.particles[i].setYSpeed(this.particles[i].getYSpeed() * this.deceleration);

            this.particles[i].setXPos(this.particles[i].getXPos() + this.particles[i].getXSpeed());
            this.particles[i].setYPos(this.particles[i].getYPos() + this.particles[i].getYSpeed());


            if (!this.randColour) {

                this.particles[i].setRed(this.r);
                this.particles[i].setGreen(this.g);
                this.particles[i].setBlue(this.b);

            }

            this.particles[i].colorParticle(this.renderer, this.speedColour);
            this.particles[i].checkDeath(true);

        }


    }


    perlinNoise () {


        for (let i = 0; i < this.total; i++) {

            const angle = noise(this.particles[i].getXPos() / this.noiseScale, this.particles[i].getYPos() / this.noiseScale) * 2 * Math.PI * this.noiseScale * this.particles[i].getFlip();

            this.particles[i].setXSpeed(lerp(this.particles[i].getXSpeed(), Math.cos(angle) * this.rate, 0.4));
            this.particles[i].setYSpeed(lerp(this.particles[i].getYSpeed(), Math.sin(angle) * this.rate, 0.4));

            this.particles[i].setXPos(this.particles[i].getXPos() + this.particles[i].getXSpeed());
            this.particles[i].setYPos(this.particles[i].getYPos() + this.particles[i].getYSpeed());


            if (!this.randColour) {

                this.particles[i].setRed(this.r);
                this.particles[i].setGreen(this.g);
                this.particles[i].setBlue(this.b);

            }

            this.particles[i].colorParticle(this.renderer, this.speedColour);

            this.particles[i].checkDeath(false);

            smooth();

        }


    }


    run () {

        // Black rectangle which also gets trail to fade

        if (this.renderer === undefined) {

            fill(0, 0, 0, 5);
            rect(0, 0, this.width, this.height + 100);

        } else {

            this.renderer.fill(0, 0, 0, 5);
            this.renderer.rect(0, 0, this.width, this.height);

        }

        if (mouseIsPressed === false) {

            this.perlinNoise();

            this.runOnce = false;

        } else if (mouseY < this.height + 100) {

            this.mouseX = mouseX;
            this.mouseY = mouseY;

            if (this.randColour === true && this.runOnce === false) {

                for (let i = 0; i < this.total; i++) {

                    this.particles[i].colorParticle(this.renderer, this.speedColour);
                    // Console.log('Checking!');

                }
                if (this.randColour) {

                    this.randomCheckEvent();

                }
                this.runOnce = true;

            }
            this.draw();


        } else {

            this.perlinNoise();

        }

        if (this.renderer !== undefined) {

            image(this.renderer, 0, 0);

        }

    }

    clearButtonFunc () {

        if (this.renderer === undefined) {

            blendMode(BLEND);
            fill(0, 0, 0);
            rect(0, 0, this.width, this.height + 100);
            for (let i = 0; i < this.total; i++) {

                this.particles[i].respawn();

            }

        } else {

            this.renderer.blendMode(BLEND);
            this.renderer.fill(0, 0, 0);
            this.renderer.rect(0, 0, this.width, this.Height);
            for (let i = 0; i < this.total; i++) {

                this.particles[i].respawn();

            }

        }

    }


    seedButtonFunc () {

        if (this.renderer === undefined) {

            blendMode(BLEND);
            fill(0, 0, 0);
            rect(0, 0, this.width, this.height + 100);
            this.noiseSeed = random() * 100000;
            noiseSeed(this.noiseSeed);

            return Math.round(this.noiseSeed);

        } else {

            this.renderer.blendMode(BLEND);
            this.renderer.fill(0, 0, 0);
            this.renderer.rect(0, 0, this.width, this.height);
            this.noiseSeed = random() * 100000;
            noiseSeed(this.noiseSeed);

            return Math.round(this.noiseSeed);

        }

    }

    updateTotalParticles (value) {


        if (this.total < value) {

            for (let i = this.total; i < value; i++) {


                this.particles[i] = new Particle({"xPos": Math.round(Math.random() * this.width),
                    "yPos": Math.round(Math.random() * this.height),
                    "xSpeed": 0,
                    "ySpeed": 0,
                    "xAccn": 0,
                    "yAccn": 0,

                    "red": this.r,
                    "green": this.g,
                    "blue": this.b,
                    "size": this.radius});

            }

            this.total = value;


        } else if (this.total > value) {

            for (let i = this.total; i > value; i--) {

                delete this.particles[i];

            }
            this.total = value;

        }

    }

    randomCheckEvent () {

        // When checked randomise colour with each click
        if (this.drawing === true && this.runOnce === false) {

            for (let i = 0; i < this.total; i++) {

                this.particles[i].setRed(Math.round(random(this.maxColour)));
                this.particles[i].setGreen(Math.round(random(this.maxColour)));
                this.particles[i].setBlue(Math.round(random(this.maxColour)));
                this.particles[i].colorParticle(this.renderer, this.speedColour);
                // Console.log('Checking!');

            }

            this.runOnce = true;

        }

    }

    changeBlendMode () {

        this.blendChange++;
        if (this.renderer === undefined) {

            switch (this.blendChange % 12) {

            default:
                blendMode(BLEND);
                return "Blend";
            case 1:
                blendMode(ADD);
                return "Add";
            case 2:
                blendMode(LIGHTEST);
                return "Lightest";
            case 3:
                blendMode(DIFFERENCE);
                return "Difference";
            case 4:
                blendMode(EXCLUSION);
                return "Exclusion";
            case 5:
                blendMode(MULTIPLY);
                return "Multiply";
            case 6:
                blendMode(SCREEN);
                return "Screen";
            case 7:
                blendMode(OVERLAY);
                return "Overlay";
            case 8:
                blendMode(HARD_LIGHT);
                return "Hard Light";
            case 9:
                blendMode(SOFT_LIGHT);
                return "Soft Light";
            case 10:
                blendMode(DODGE);
                return "Dodge";
            case 11:
                blendMode(BURN);
                return "Burn";

            }

        } else {

            switch (this.blendChange % 12) {

            default:
                this.renderer.blendMode(BLEND);
                return "Blend";
            case 1:
                this.renderer.blendMode(ADD);
                return "Add";
            case 2:
                this.renderer.blendMode(LIGHTEST);
                return "Lightest";
            case 3:
                this.renderer.blendMode(DIFFERENCE);
                return "Difference";
            case 4:
                this.renderer.blendMode(EXCLUSION);
                return "Exclusion";
            case 5:
                this.renderer.blendMode(MULTIPLY);
                return "Multiply";
            case 6:
                this.renderer.blendMode(SCREEN);
                return "Screen";
            case 7:
                this.renderer.blendMode(OVERLAY);
                return "Overlay";
            case 8:
                this.renderer.blendMode(HARD_LIGHT);
                return "Hard Light";
            case 9:
                this.renderer.blendMode(SOFT_LIGHT);
                return "Soft Light";
            case 10:
                this.renderer.blendMode(DODGE);
                return "Dodge";
            case 11:
                this.renderer.blendMode(BURN);
                return "Burn";

            }

        }

    }

    getNoiseSeed () {

        return this.noiseSeed;

    }

    setRandColour (value) {

        this.randColour = value;

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
        Particle.prototype.size = value;

    }

    getRate () {

        return this.rate;

    }

    setRate (value) {

        this.rate = value;

    }

    getRed () {

        return this.r;

    }

    setRed (value) {

        this.r = value;
        Particle.prototype.r = value;

    }

    getGreen () {

        return this.g;

    }

    setGreen (value) {

        this.g = value;
        Particle.prototype.g = value;

    }

    getBlue () {

        return this.b;

    }

    setBlue (value) {

        this.b = value;
        Particle.prototype.b = value;

    }

    setRenderer (value) {

        this.renderer = value;

    }

    getRenderer () {

        return this.renderer;

    }

    setSpeedColour (value) {

        this.speedColour = value;

    }

    getSpeedColour () {

        return this.speedColour;

    }

}

