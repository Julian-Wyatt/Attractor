# Attractor
Please see the original at: [Open Processing](https://www.openprocessing.org/sketch/424081).
Which is licensed under [Creative Commons Attribution ShareAlike 3.0](https://creativecommons.org/licenses/by-sa/3.0/). The license is also stored in the git repository for this project.

## Programming Summative 

I will be adapting the attached Original_Attractor.js sketch into a reusable component using JavaScript classes
I will also be adding further additions such as paratmeterisation and an application to edit the sketch in real time through the use of parameterisation and sliders.

# Documentation of Attractor

## Documentation of Original and My Example:

As you can see for the original, all of the particles on the screen are attracted to the mouse position. The strength of this varies on the variable magnetism and the rate of change of speed of the particles depends on the variable deceleration. Furthermore, the colour of the particles depends on the speed at which the particle is moving. In the original's case the colour of the particles changes from a blue colour to more of a white when the particle speeds up.

I have developed from this to include the use of perlin noise in order to make the starting position random when the attraction to the mouse position begins. I have done this with: `const angle = noise(this.particles[i].getXPos() / this.noiseScale, this.particles[i].getYPos() / this.noiseScale) * 2 * Math.PI * this.noiseScale * this.particles[i].getFlip();`, and then adjusted the speed of the particles based on this generated angle; and from the speed, adjusted the position of the particles.
So therefore the particles will now move around the screen based on a random noise seed which is defined in startup. In order to then switch back to the attraction towards the mouse, the user holds the left mouse button down and the particles start to move towards the mouse, and when the user releases the mouse button, the particles start to continue moving randomly but from their new position which is closer to the mouse.

My example is found when openning index.html, this consists of a small set of instructions, similar to those above, the canvas/ image from renderer and a selection of sliders, buttons and checkboxes.
I have used html input elements in order to incorporate the Document Object Model, which allows for the interaction between these html components and the attributes found in the main javascript classes. Through inspecting my html page, you can see that I have 3 buttons, 8 sliders, and 2 checkboxes. For my 3 buttons, I have one to clear the current display in order to make it easier for the user to interact with the display. Another button to update the noise seed, which is used to calculate angles and velocities for the perlin noise. The final button changes the blend mode in order for the user to change how the particles on the screen interact with the canvas. For example, they can add, blend, show difference, between colours, along with a few more. 
3 of my sliders are used to adapt different speed/ rate related variables in my javascript which I will explain later. One alters the total particles, another alters the size of the particles and the final 3 alter the rgb values for every particle.
The two checkboxes are used to activate perset colour functions, one which keeps the original attractor change colour on speed, and the other which randomly changes the colour of every particle after every click of the canvas. 