function setup(){
    canvas = createCanvas(400,400)
    canvas.position(525,200)
    canvas.background("black")
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}
function clearCanvas(){
    background("black")
}
function preload(){
    classifier = ml5.imageClassifier("DoodleNet")
}
function draw(){

strokeWeight(13);

stroke(0);
if (mouseIsPressed){
    line(pmouseX,pmouseY,mouseX,mouseY);
}
}

function classifyCanvas(){
    classifier.classify(canvas, gotResult);

}

function gotResult(error, result){
    if(error){
        console.error(error);
    }
    console.log(result);
    document.getElementById('label').innerHTML = "Label:" + result[0].label;
    document.getElementById('confidence').innerHTML = "Confidence: " + Math.round(result[0].confidence * 100) + "%";
    utterThis - new SpeechSynthesisUtterance(result[0].label);
    synth.speak(utterThis);
}