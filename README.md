# Attractor
Please see the original at [Open Processing](https://www.openprocessing.org/sketch/424081), which is a fork of "Attractor 0" by Masaki Yamabe. (Please see the original I've edited for translations).
Which is licensed under [Creative Commons Attribution ShareAlike 3.0](https://creativecommons.org/licenses/by-sa/3.0/). The license is also stored in the git repository for this project.

## Programming Summative 

I will be adapting the attached Original_Attractor.js sketch into a reusable component using JavaScript classes
I will also be adding further additions such as parameterisation and an application to edit the sketch in real time through the use of parameterisation and sliders.

# Documentation of Attractor

## Documentation of Original and My Example:

### Original

As you can see for the original, all of the particles on the screen are attracted to the mouse position. The strength of this varies on the variable magnetism and the rate of change of speed of the particles depends on the variable deceleration. Furthermore, the colour of the particles depends on the speed at which the particle is moving. In the original's case, the colour of the particles changes from a blue colour to more of a white when the particle speeds up.

### Development

I have developed from this to include the use of Perlin noise in order to make the starting position random when the attraction to the mouse position begins. I have done this with: `const angle = noise(this.particles[i].getXPos() / this.noiseScale, this.particles[i].getYPos() / this.noiseScale) * 2 * Math.PI * this.noiseScale * this.particles[i].getFlip();`, and then adjusted the speed of the particles based on this generated angle; and from the speed, adjusted the position of the particles.
So, therefore, the particles will now move around the screen based on a random noise seed which is defined in the startup. In order to then switch back to the attraction towards the mouse, the user holds the left mouse button down and the particles start to move towards the mouse, and when the user releases the mouse button, the particles start to continue moving randomly but from their new position which is closer to the mouse.

### index.html

My example is found when opening index.html, this consists of a small set of instructions, similar to those above, the canvas/ image from renderer and a selection of sliders, buttons and checkboxes.
I have used HTML input elements in order to incorporate the Document Object Model, which allows for the interaction between these HTML components and the attributes found in the main javascript classes. Through inspecting my HTML page, you can see that I have 3 buttons, 8 sliders, and 2 checkboxes. For my 3 buttons, I have one to clear the current display in order to make it easier for the user to interact with the display. Another button to update the noise seed, which is used to calculate angles and velocities for the Perlin noise, with an output text field to display what the current noise seed is. The final button changes the blend mode in order for the user to change how the particles on the screen interact with the canvas, along with an output text field for the user to see what the current blend mode is. For example, the blend mode can add, blend, show difference, between colours, and a couple more things. 
3 of my sliders are used to adapt different speed/ rate related variables in my javascript which I will explain later. One alters the total particles, another alters the size of the particles and the final 3 alter the RGB values for every particle.
The two checkboxes are used to activate preset colour functions, one which keeps the original attractor change colour on speed, and the other which randomly changes the colour of every particle after every click of the canvas. 

Index.js contains the code to link the HTML to my main simulation class, which is linked from my HTML as below:
```html
        <script src="Edited_Attractor.js"></script>
        <script src="index.js"></script>
```

It's from index.js where I instantiate my simulation class and add all my event listeners. See below where I instantiate and add one event listener: 

```javascript
        let attractor;

        function setup() {

            attractor =  new Simulation({magnetism:10, deceleration:0.95, noiseScale:1500, total:200, radius:3, rate: 0.5, r:255, g:0, b:0});
            document.getElementById("seedOut").textContent = Math.round(attractor.getNoiseSeed());
 

        }

        function draw() { 

            attractor.run();
     
        } 

        document.addEventListener("DOMContentLoaded",function(){
        
        let totalSlider = document.getElementById("totalSlider");
        function setTotal(event){
            let totalVal = totalSlider.value;
            document.getElementById("totalSliderOut").textContent = (totalVal-1);
            attractor.updateTotalParticles(totalVal--);
        }
        totalSlider.addEventListener("input",setTotal);

        }
```

As you can see, the event listener is added when the page is loaded, and this function finds the total slider, and when it is moved the setTotal function is ran due to `totalSlider.addEventListener("input",setTotal);`. ie when the slider value is changed, it runs the function which finds the output HTML tag and places what the new value is -1 and runs the update total particles function from the simulation class with this new total value.

# Methods and Parameters

## Edited_Atttractor.js

My Edited_Attractor.js file includes 2 classes, which have getters and setters to send variable data to each other and through to index.js to be displayed on the page.

## Particle class

### Constructor

My particle class has a constructor, which enables the programmer to set default values when an object from the class is instantiated. I list my constructor variables as a set; seen below: 

```javascript

    constructor ({xPos, yPos, size, xSpeed, ySpeed, xAccn, yAccn, red, green, blue})

```
This means that when a new particle is created, you can list which variables you chose to assign, as obviously most are changed at runtime so don't necessarily need to be assigned on construction. (red, green, blue for example). 

These 10 parameters, each control different aspects of the particle, some designed for individual particles while others are for all particles. When instantiated, the xPos and yPos are random values between 0 and the height/ width of the screen, whilst the speeds and accelerations need to default to 0 (with the || attribute), and the colour attributes take a default value of red at the beginning and can be edited by the slider on the HTML page in real time. 

Within the constructor, I assign `this.` versions of the variables to make them individual for every particle, and for size and colour I assign them to the `Particle.prototype.`, so they change for every instance of the particles. I also assign a max life value as a `random(max) + min`. 

#### Check Death Function with Attracting Parameter

The attracting parameter is used to decide when the current life is to be reduced, in my case it is only used when the Perlin noise function is active. 
I also check, whether the particle exceeds the limit of the canvas or has less than 0 life span, and will run the respawn function to respawn the particle. 

#### Colour Particle Function with Renderer and speedColour Parameters

This is the first instance where I have compensated for an inputted renderer. Also, the speed colour variable is true when that specific checkbox is checked. 
This function checks whether there is an inputted renderer, and will adjust whether there is or isn't by adding `renderer.` in front of graphics tasks. In addition, if the speed colour variable is true, the colour of the particles will be defined due to the original attractor's colouring system, by mapping the speed onto RGB values and using this in the fill method. 

#### Respawn Method

This does as is described: reassign the current life value and reassign the x & y positions. These are performed the same way as they would be in the constructor.

#### Particle Class Getters and Setters

I will underline the general gist rather than explaining each getter and setter. See the getter and setter below to use the x position of the particle:
```javascript 
    getXPos () {

        return this.xPos;

    }

    setXPos (value) {

        this.xPos = value;

    }
```
Generally, the getter function will return the requested variable, with `return var;` and the setter will require a parameter that will be used to update the variable, which is updated by `this.var = value;`.

## Simulation Class 

### Constructor

The constructor for the simulation class takes 9 parameters. Firstly, there is the renderer variable, which allows the programmer to enter a different renderer to use as a graphic, if for example they want a different size image, or want to place the image onto a 3D object like a cube. Next, we have the magnetism and deceleration variables, which were used in the original attractor; where magnetism is the strength of attraction to the mouse and the deceleration value is how harshly the particle changes speed when moving towards the mouse. 
During the constructor, I check whether the renderer is defined and alter the `this.height` and `this.width` depending on renderer height/width or window width/height. I also create all of the particles with the script below: 

```javascript
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
```
As I mentioned earlier, I reference each parameter for making the particle as set using `"xSpeed: 0"`, and according to all eslint rules, the code should be laid out such that all of the parameters are in line on different lines, so I have laid it out like this and it makes it more readable.
I then apply generic graphics setup, where I set the canvas' parent to the HTML ID attractor, so I can decide where it is placed in the HTML. I also set the ellipse mode, the background colour and the initial blend mode of the class. All of these are within an if statement which checks whether the renderer is defined or not, and will, therefore, apply these graphical changes to the renderer rather than to the canvas or vice versa. 

### Attractor Method

In the attractor method, I cycle through each particle and using the getters and setters update the x and y acceleration, speed and position, according to the original script.
This is done by calculating the distance between the mouse and the particle, which if it is larger than 3, the acceleration values will be varied according to the magnetic field strength (the variable magnetism), how far away the particle is from the mouse, which is inversely proportional to the distance squared. 
```javascript 
this.particles[i].setXAccn(this.magnetism * (this.mouseX - this.particles[i].getXPos()) / (distance * distance));
``` 
The x and y speeds are then incremented by the acceleration value and multiplied by the deceleration value.

I then update the RGB values of each particle, if the randColour checkbox isn't ticked, and then run the colour particle and check death methods, so that the particles are displayed to the screen every frame.

### Perlin Noise Method

 This is fairly similar to the attractor method, but instead of calculating the distance between the mouse and particle for every particle, I calculate an angle, based on the output of the noise, the noise scale (predefined by myself as 1500, in order to get a smoother seed and less erratic movement), 2 pi and `this.particles[i].flip`, which turns the particle around if it spawns/ moves into a dead zone in the seed. 
 I then interpolate the velocities between the current speed and the cosine/sine of the angle multiplied by the rate; which moves closer to the value by 40% every frame.
 Finally update the position based on the particles' new speed, like with the attractor method. While also updating the colour, and running the check death method the same as the attractor method.

 ## Run/ Draw method

 I then have the run method (aka the draw method), which is called every frame. Firstly it checks whether the renderer is undefined or not and draws a black rectangle with a low alpha value, which makes the particles look like they appear to fade. 

 The method then checks whether the mouse is not pressed and runs the Perlin Noise function and assigns runOnce to false (I will explain what this does later). If the mouse is pressed, it updates the mouseX and mouseY values and then checks whether the random colour checkbox is pressed, and runOnce is false, so it will update the colours of all of the particles so that each one is different. The this.runOnce is then used to make sure it only runs once rather than every frame the mouse button is held down.
 After those checks, the attractor method is run when the mouse is down.
 The final check for the function is that if the renderer is assigned then it will update the image it is placed on. 

 ### Clear Button Function

 As with most of the other renderer checks, I have this section twice, so that the renderer can be defined. This clears the canvas, by changing the blend mode back to default, and draws a new rect over the canvas, and respawns all of the particles. 

 ```javascript
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
 ```

 ### Random Seed Button Function

This randomises the noise seed by a factor of 100000 with `noiseSeed(random() * 100000)` and returns the rounded value of this to be displayed on the screen. with `return Math.round(this.noiseSeed)`

### Update Total Particles Function

This takes in a parameter of value, which is the current slider value for total particles, which is sent across when the event is triggered (which is defined as when the slider changes). I then find out whether the current number of particles on the screen is too little/ too big, by finding which is bigger.
If I need to make more particles I: 
```javascript
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

```
use the for loop from the current total up to the new total value and instantiate more each particle through each loop.
If I need to remove particles I:
``` javascript
        else if (this.total > value) {

            for (let i = this.total; i > value; i--) {

                delete this.particles[i];

            }
            this.total = value;

        }
```
Which loops from total to the new total, and deletes each instance of a particle between the two values.

### Random Check Event Method 

This only happens once when the run method switches from Perlin noise to attracting functions and when the random colour checkbox is ticked (hence the name of the function). The function uses a for loop to cycle through each particle and randomly generates an RGB value for the particle. Then finally sets the runOnce variable to true to stop trying to re-randomise the colour on the next frame. 
```javascript
        // When checked randomise colour with each click
        for (let i = 0; i < this.total; i++) {

            this.particles[i].setRed(Math.round(random(this.maxColour)));
            this.particles[i].setGreen(Math.round(random(this.maxColour)));
            this.particles[i].setBlue(Math.round(random(this.maxColour)));

        }

        this.runOnce = true;
```
### Change Blend Mode Function

The last main method is used to cycle through the blend mode for the canvas. This is done through incrementing `this.blendChange`, after each click of the button and using a switch statement to check which `this.blendChange` value corresponds to which blendMode. I also return the name of the current blend mode in order for index.js to receive this and copy that text to the HTML page in order to display to the user what the current blend mode is. 
As previously mentioned I have to account for this.renderer's parameter so I have a simple if statement which checks this and if it is defined it will do `this.renderer.blendMode` instead: 

```javascript
        else {

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
```
### Getters and Setters

The final section for this class and script are the getters and setters for each variable, which are in the same form as above, however some change the `Particle.prototype` value, so that it changes for every Particle. 