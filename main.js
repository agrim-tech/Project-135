status="";
objects=[];
function setup(){
    c=createCanvas(480,330);
    c.center();
    video=createCapture(VIDEO);
    video.size(480,330);
    video.hide();
}
function draw(){
    image(video,0,0,480,330);
    if(status != ""){
        objectDetector.detect(video,gotResults);
        for (i = 0; i < objects.length; i++) {
            percent=Math.floor(objects[i].confidence*100);
            fill("#252525");
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke("#252525");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label == object_name){
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("result").innerHTML ="Object Mentioned Found";
                synth=window.speechSynthesis;
                utterThis=new SpeechSynthesisUtterance(object_name+" Found");
                synth.speak(utterThis);
            }else{
                document.getElementById("result").innerHTML ="Object Mentioned Not Found";
            }
        }
    }
}
function start(){
    document.getElementById("status").innerHTML="Status - Detecting Objects";
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    object_name = document.getElementById("objectname").value;
}
function modelLoaded(){
    status=true;
    console.log("Model Is Loaded");
}
function gotResults(error,results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        objects=results;
    }
}