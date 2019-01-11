
let attractor

function setup() {      // eslint-disable-line no-unused-vars
           
    attractor =  new Simulation(10, 0.95, 600);                                  // eslint-disable-line no-undef
    attractor.setup();

}
function draw() {                                                // eslint-disable-line no-unused-vars

    attractor.run();
     
}