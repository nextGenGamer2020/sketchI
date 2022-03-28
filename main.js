dataset = ["Mouse", "Apple", "Keyboard", "computer", "book", "pencil", "light", "plate", "clock", "bus", "car"]
randomNumber = Math.floor((Math.random()*dataset.length)+1)
console.log(dataset[randomNumber])
sketch = dataset[randomNumber]
document.getElementById("sketchName").innerHTML = "Sketch to be drawn: "+sketch
timerCounter = 0
timerCheck = ""
drawSketch = ""
answer = ""
score = 0
function setup(){
    canvas = createCanvas(400,400)
    canvas.position(525,200)
    canvas.background("white")
    canvas.mouseReleased(classifyCanvas);
    
}
function updateCanvas(){
    background("white")
    randomNumber = Math.floor((Math.random()*dataset.length)+1)
    console.log(dataset[randomNumber])
    sketch = dataset[randomNumber]
    document.getElementById("sketchName").innerHTML = "Sketch to be drawn: "+sketch
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
checkSketch()
    if(drawSketch == sketch){
        answer ="set"
        score ++
        document.getElementById("score").innerHTML = "Score: "+score
    }
}




function classifyCanvas(){
    classifier.classify(canvas, gotResult);

}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    drawSketch = results[0].label
    document.getElementById('label').innerHTML = "Label:" + results[0].label;
    document.getElementById('confidence').innerHTML = "Confidence: " + Math.round(results[0].confidence * 100) + "%";
}

function checkSketch(){
    timerCounter++
    document.getElementById("timer").innerHTML = "Timer: "+timerCounter
    console.log(timerCounter)
    if(timerCounter>500){
        timerCounter = 0
        timerCheck = "Completed"
    }
    if(timerCheck == "Completed" || answer == "set"){
        timerCheck = ""
        answer = ""
        updateCanvas()
    }
}
