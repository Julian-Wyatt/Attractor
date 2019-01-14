
let attractor;

function setup() {      // eslint-disable-line no-unused-vars
           
    attractor =  new Simulation({magnetism:10, deceleration:0.95, noiseScale:1500, total:200, radius:3, rate: 0.5});                                  // eslint-disable-line no-undef

}
function draw() {                                                // eslint-disable-line no-unused-vars

    attractor.run();
     
}



document.addEventListener("DOMContentLoaded",function(){
    let totalSlider = document.getElementById("totalSlider");
    function setTotal(event){
        let totalVal = totalSlider.value;
        document.getElementById("totalSliderOut").textContent = (totalVal-1);
        attractor.updateTotalParticles(totalVal);
    }
    totalSlider.addEventListener("input",setTotal);

    let rateSlider = document.getElementById("rateSlider");
    function setRate(event){
        let rateVal = rateSlider.value;
        document.getElementById("rateSliderOut").textContent = rateVal;
        attractor.setRate(rateVal);
    }
    rateSlider.addEventListener("input",setRate);

    let radiusSlider = document.getElementById("radiusSlider");
    function setRadius(event){
        let radiusVal = radiusSlider.value;
        document.getElementById("radiusSliderOut").textContent = radiusVal;
        attractor.updateParticleRadius(radiusVal);

    }
    radiusSlider.addEventListener("input",setRadius);
})
