# Attractor
Please see the original at: [Open Processing](https://www.openprocessing.org/sketch/424081).
Which is licensed under [Creative Commons Attribution ShareAlike 3.0](https://creativecommons.org/licenses/by-sa/3.0/). The license is also stored in the git repository for this project.

## Programming Summative 

I will be adapting the attached Original_Attractor.js sketch into a reusable component using JavaScript classes
I will also be adding further additions such as paratmeterisation and an application to edit the sketch in real time through the use of parameterisation and sliders.

# Documentation of Attractor

## Documentation of Original and my Example:

As you can see for the original, all of the particles on the screen are attracted to the mouse position. The strength of this varies on the variable magnetism and the rate of change of speed of the particles depends on the variable deceleration. Furthermore, the colour of the particles depends on the speed at which the particle is moving. In the original's case the colour of the particles changes from a blue colour to more of a white when the particle speeds up.

I have developed from this to include the use of perlin noise in order to make the starting position random when the attraction to the mouse position begins. I have done this with: `const angle = noise(this.particles[i].getXPos() / this.noiseScale, this.particles[i].getYPos() / this.noiseScale) * 2 * Math.PI * this.noiseScale * this.particles[i].getFlip();`, and then adjusted the speed of the particles based on this generated angle; and from the speed, adjusted the position of the particles.
So therefore the particles will now move around the screen based on a random noise seed which is defined in startup. In order to then switch back to the attraction towards the mouse, the user holds the left mouse button down and the particles start to move towards the mouse, and when the user releases the mouse button, the particles start to continue moving randomly but from their new position which is closer to the mouse.
