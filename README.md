# Attractor
Please see the original at [Open Processing](https://www.openprocessing.org/sketch/424081).
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

These 10 parameters, each control different aspects of the particle, some designed for individual particles while others are for all particles. When instantiated, the xPos and yPos are random values between 0 and the height/ width of the screen, whilst the speeds and accelerations need to default to 0, and the colour attributes take a default value of red at the beginning and can be edited by the slider on the HTML page in real time. 

Within the constructor, I assign `this.` versions of the variables to make them individual for every particle, and for size and colour I assign them to the `Particle.prototype.`, so they change for every instance of the particles. I also assign a max life value as a `random(max) + min`. 

#### Check Death Function with Drawing Parameter

The drawing parameter is used to decide when the current life is to be reduced, in my case it is only used when the perlin noise function is active. 
I also check, whether the particle exceeds the limit of the canvas or has less than 0 life span, and will run the respawn function to respawn the particle. 

#### Colour Particle Function with Renderer and speedColour Parameters

This is the first instance where I have compensated for an inputted renderer. Also, the speed colour variable is true when that specific checkbox is checked. 
This function checks whether there is an inputted renderer, and will adjust whether there is or isn't by adding `renderer.` in front of graphics tasks. In addition if the speed colour variable is true, the colour of the particles will be defined due to the original attractor's colouring system, by mapping the speed onto RGB values, and using this in the fill method. 

#### Respawn Method

This does as is described: reassign the current life value, and reassign the x & y positions. These are performed the same way as they would be in the constructor.

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

The constructor for the simulation class takes 9 parameters. Firstly, there is the renderer variable, which allows the programmer to enter a different renderer to use as a graphic, if for example they want a different size image, or want to place the image onto a 3D object like a cube. Next we have the magnetism and deceleration variables, which were used in the original attractor; where magnetism is the strength of attraction to the mouse and the deceleration value is how harshly the particle changes speed when moving towards the mouse. 
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
I then apply generic graphics setup, where I set the canvas' parent to the HTML ID attractor, so I can decide where it is placed in the HTML. I also set the ellipse mode, the background colour and the initial blend mode of the class. All of these are within an if statement which checks whether the renderer is defined or not, and will therefore apply these graphical changes to the renderer rather than to the canvas or vice versa . 

### Draw Method

In the attractor method, I cycle through each particle, and using the getters and setters update the x and y acceleration, speed and position, according to the original script.