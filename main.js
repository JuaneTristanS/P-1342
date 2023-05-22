stat = "";
object = [];
song="";

function preload() {
    song = loadSound("alarm.mp3");
}

function setup() {
    canvas = createCanvas(800, 450);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(800, 450);
    video.hide();

    objects = ml5.objectDetector('cocossd', ModelLoaded);
    document.getElementById("status").innerHTML = "Searching for Baby...";
}

function ModelLoaded() {
    console.log("The model has been initialised");
    

    stat = true;
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        object = results;
    }
}

function draw() {
    image(video, 0, 0, 800, 450);

    if (stat != "") {

        objects.detect(video, gotResults);

        r = random(255);
        g = random(255);
        b = random(255);

        song.play();

        for (i = 0; i < object.length; i++) {

            fill(r, g, b);
            percent = Math.floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 10, object[i].y + 10);
            noFill();
            stroke(r, g, b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);

            document.getElementById("status").innerHTML = " STATUS : Baby Detected";
            document.getElementById("numbers").innerHTML = "Baby has been found";

        }
    }


}
