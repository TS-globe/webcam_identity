statuss = ""
storage = [];



function preload()
{
    set_img = loadImage("dog_cat.jpg")
}

function setup()
{
    canvas = createCanvas(400 , 360)
    canvas.center()
    video = createCapture(VIDEO)
    video.size(400, 360)
    video.hide()
}

function modelLoaded()
{
    console.log("modelLoaded ")
    statuss = "working"

    model_coco.detect(video, gotResult)
}

function gotResult(error,result)
{
    if (error) {

        console.log("error")

    }
    else {

        console.log(result)
        storage = result

    }
}

function draw()
{
    image(video ,0,0, 400,370)
    
    if (statuss != "") {

        red =  random(255)
        blue =  random(255)
        green = random(255)

        for (i = 0; i < storage.length; i++) {

        
        stroke(red, blue, green)
        strokeWeight(1)
        textSize(10)
        text(storage[i].label + " " + floor(storage[i].confidence*100) + "%",storage[i].x+15,storage[i].y+15)

        stroke(red, blue, green)
        strokeWeight(5)
        fill(red, blue, green)
        noFill()
        rect(storage[i].x,storage[i].y,storage[i].width,storage[i].height)
        document.getElementById("status").innerHTML = "Object Detected: "+storage.length

    }
}


    // stroke("white")
    // strokeWeight(1)
    // textSize(10)
    // text("IMAGE : CAT",119,41)
    // stroke("white")
    // strokeWeight(5)
    // fill("red")
    // noFill()
    // rect(120,50,250,250)

}


function start_bt()
{
    model_coco = ml5.objectDetector("cocossd" , modelLoaded)
    document.getElementById("status").innerHTML = "detecting objects. . . . ."
}