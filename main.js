input_value="";
status1="";
objects=[];
function disappear(){
document.getElementById("input_thing").style.visibility="hidden";
}
disappear();
function appear(){
if(document.getElementById("please").innerHTML == "Press here to make the input disappear"){
document.getElementById("input_thing").style.visibility="hidden";
document.getElementById("please").innerHTML="Press here to make the input appear";
document.getElementById("please").style.color="red";
}
else{
document.getElementById("input_thing").style.visibility="visible";
document.getElementById("please").innerHTML="Press here to make the input disappear";
document.getElementById("please").style.color="green";
}
}
function preload(){
}
function setup(){
canvas = createCanvas(190, 190);
canvas.position(650, 400);
video= createCapture(VIDEO);
video.hide();
}
function start(){
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("statusofmodel").innerHTML = "Status: Detecting objects";
input_value = document.getElementById("input_thing").value;
}
function modelLoaded(){
console.log("Model Loaded!");
status1 = true;
}
function draw(){
image(video, 0, 0, 190, 190);
if(status1 != ""){
objectDetector.detect(video, gotResult);
for (i=0; i < objects.length; i++){
fill('#FF0000');
percent = floor(objects[i].confidence * 100);
text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
noFill();
stroke('#FF0000');
rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
if (objects[i].label == input_value){
video.stop();
objectDetector.detect(gotResult);
document.getElementById("statusoffound").innerHTML="Object found";
synth= window.speechSynthesis;
utterthis= new SpeechSynthesisUtterance("Object found");
synth.speak(utterthis);
}
else{
document.getElementById("statusoffound").innerHTML="Object not found";
}
}
}
}
function gotResult(error, results){
if(error){
console.log(error);
}
console.log(results);
objects=results;
}