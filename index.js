let attractor;

function setup() {      // eslint-disable-line no-unused-vars
           
    attractor =  new Simulation({magnetism:10, deceleration:0.95, noiseScale:1500, total:200, radius:3, rate: 0.5, r:255, g:0, b:0});                                  // eslint-disable-line no-undef

}
function draw() {                                                // eslint-disable-line no-unused-vars

    attractor.run();
     
}



document.addEventListener("DOMContentLoaded",function(){

    let clearBtn = document.getElementById("clearButton");
    function callClear () {
        attractor.clearButtonFunc();
    }
    clearBtn.addEventListener("click",callClear)

    let randomiseBtn = document.getElementById("randomiseButton");
    function callRandom () {
        let x = attractor.seedButtonFunc();
        document.getElementById("seedOut").textContent = x;
    }
    randomiseBtn.addEventListener("click",callRandom)

    let blendBtn = document.getElementById("blendButton");
    function callBlend() {
        let name = attractor.changeBlendMode();
        document.getElementById("blendOut").textContent = name;
    }
    blendBtn.addEventListener("click",callBlend)

    let totalSlider = document.getElementById("totalSlider");
    function setTotal(event){
        let totalVal = totalSlider.value;
        document.getElementById("totalSliderOut").textContent = (totalVal-1);
        attractor.updateTotalParticles(totalVal--);
    }
    totalSlider.addEventListener("input",setTotal);

    let rateSlider = document.getElementById("rateSlider");
    function setRate(event){
        let rateVal = rateSlider.value;
        document.getElementById("rateSliderOut").textContent = rateVal;
        attractor.setRate(rateVal);
    }
    rateSlider.addEventListener("input",setRate);

    let magSlider = document.getElementById("magSlider");
    function setMag(event){
        let magVal = magSlider.value;
        document.getElementById("magSliderOut").textContent = magVal;
        attractor.setMagnetism(magVal);
    }
    magSlider.addEventListener("input",setMag);

    let decSlider = document.getElementById("decSlider");
    function setDec(event){
        let decVal = decSlider.value;
        document.getElementById("decSliderOut").textContent = decVal;
        attractor.setDeceleration(decVal);
    }
    decSlider.addEventListener("input",setDec);





    let radiusSlider = document.getElementById("radiusSlider");
    function setRadius(event){
        let radiusVal = radiusSlider.value;
        document.getElementById("radiusSliderOut").textContent = radiusVal;
        attractor.setRadius(radiusVal);

    }
    radiusSlider.addEventListener("input",setRadius);


    let redSlider = document.getElementById("redSlider");
    function setRed(event){
        let redVal = redSlider.value;
        document.getElementById("redSliderOut").textContent = redVal;
        attractor.setRed(redVal);
    }
    redSlider.addEventListener("input",setRed);

    let greenSlider = document.getElementById("greenSlider");
    function setGreen(event){
        let greenVal = greenSlider.value;
        document.getElementById("greenSliderOut").textContent = greenVal;
        attractor.setGreen(greenVal);
    }
    greenSlider.addEventListener("input",setGreen);

    let blueSlider = document.getElementById("blueSlider");
    function setBlue(event){
        let blueVal = blueSlider.value;
        document.getElementById("blueSliderOut").textContent = blueVal;
        attractor.setBlue(blueVal);

    }
    blueSlider.addEventListener("input",setBlue);


    let randomCheckbox = document.getElementById("randColour");
    
    function setRandColour(event){
        attractor.setRandColour(randomCheckbox.checked);
        
    }
    randomCheckbox.addEventListener("change",setRandColour);



})
