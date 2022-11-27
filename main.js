objectDetector="";

var img = "";
objects = [];
status = "";
video = "";

function preload()
{
}

function setup()
{
    canvas = createCanvas(500, 450);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(500, 450);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById('status').innerHTML = "Status : Detecting Objects";
}

function modelLoaded()
{
    status = true;
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    objects = results
}

function draw()
{
    image(video, 0, 0, 500, 450);
    x = (windowWidth - width) / 2;
    y = (windowHeight - height) / 2;
    y = y + 45
    x = x - 30
    canvas.position(x, y);

    if(status != "")
    {
        r = random(255);
        b = random(255);
        g = random(255);

        objectDetector.detect(video, gotResult);

        for(var i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ objects.length;
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(255, 0, 0)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }
}