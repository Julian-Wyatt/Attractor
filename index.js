
let attractor;

function setup() {      // eslint-disable-line no-unused-vars
           
    attractor =  new Simulation({magnetism:10, deceleration:0.95, noiseScale:1500, total:200, radius:3, rate: 0.5});                                  // eslint-disable-line no-undef

}
function draw() {                                                // eslint-disable-line no-unused-vars

    attractor.run();
     
}