
let attractor

function setup(){      
           
    attractor =  new Simulation(1.5,10,0.95,100,800,0.5);                                  // eslint-disable-line no-unused-vars
    attractor.setup();

}
function draw(){                                                // eslint-disable-line no-unused-vars

    attractor.run();
     
}