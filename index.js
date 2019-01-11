
let attractor

function setup() {      // eslint-disable-line no-unused-vars
           
    attractor =  new Simulation(10, 0.95, 1500);                                  // eslint-disable-line no-undef

}
function draw() {                                                // eslint-disable-line no-unused-vars

    attractor.run();
     
}