img="";
var status1="";
object=[];

function preload(){
  img=loadImage("dog_cat.jpg");
}

function setup(){
    canvas=createCanvas(370,420);
    canvas.center();
    object_detector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Object Detecting";
    video=createCapture(VIDEO);
    video.hide();
}

function modelLoaded(){
  console.log("Model Loaded");
  status1=true;
  
}

function gotResult(error,results){
  if (error){
    console.error(error);
  }
  else{
    console.log(results);
    object=results;
  }
}

function draw(){
    image(video,0,0,370,420);
    
    //fill("#FF0000");
    //text("Dog",40,75);
    //noFill();
    //stroke('#000000');
    //rect(30,60,450,350);
    
    if(status1!=""){
      r=random(255);
      g=random(255);
      b=random(255);
      
      object_detector.detect(video,gotResult);
      for(i=0;i<object.length;i++){
      document.getElementById("status").innerHTML="Status: Object Detected";
      fill(r,g,b);
      percent=floor(object[i].confidence*100);
      text(object[i].label+""+percent+"%",object[i].x+15,object[i].y+15);
      noFill();
      stroke('#000000');
      rect(object[i].x,object[i].y,object[i].width,object[i].height);
      document.getElementById("note").innerHTML="No. of objects detected are: "+object.length;
      }
    }
}