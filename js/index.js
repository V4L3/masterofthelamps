/** 
 * Created by valentinberger on 26/04/17.
 */

//Redirect Log to Console
//var nodeConsole = require('console');
//var terminal = new nodeConsole.Console(process.stdout, process.stderr);

//Sound
window.audioObject = new Audio('../electron/sound/blackpanther.mp3');
window.audioObject.volume = 0.5;
window.audioObject.loop = true;
window.audioObject.play();

window.scoreSound = new Audio('../electron/sound/scoresound.wav');
window.scoreSound.volume = 0.5;
window.scoreSound.loop = false;


window.failSound = new Audio('../electron/sound/failsound.wav');
window.failSound.volume = 1;
window.failSound.loop = false;


//Global Variables
var actor = document.getElementById("actor");
var lostScreen = document.getElementById("lostscreen");
var left = false;
var right = false;
var up = false;
var down = false;
var speed = 400; 
var gamespeed = 40;  
var failed = 0;
var spawn_x = 600;
var spawn_y = 350;
var circleArray = [];
var initDelay = 0;
var moveRight = true;
var counter = 0;
var random_x = false;
var random_y = false;
var score = 0;
var incrOffset = 0;
var incrTopOffset = 0;
var scoreSent = false;
var failprotection = 0;

function keyListener()
{
    window.addEventListener('keydown', moveSelection);
    window.addEventListener('keyup', moveSelectionRelease);
};

function sendScore()
{
    let username = localStorage.getItem("name");
    let actualDate = new Date().toISOString();
    let tempUrl = "http://dev.thecell.eu/masterofthelamp/getandsetlist.php?set=1&gameid=2&score=" + score + "&name=" + username + "&date=" + actualDate + "";    
    httpGet(tempUrl);
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
}

function moveSelection(evt)
{
    switch (evt.keyCode) 
    {
        case 37:
        left = true;
        break;
        case 39:
        right = true;
        break;
        case 38:
        up = true;
        break;
        case 40:
        down = true;
        break;
    }
}

function moveSelectionRelease(evt)
{
    switch (evt.keyCode) 
    {
        case 37:
        left = false;
        break;
        case 39:
        right = false;
        break;
        case 38:
        up = false;
        break;
        case 40:
        down = false;
        break;
    }
}



function spawner()
{
    counter++;
    if (counter % 3 === 0) 
    {
        random_x = Math.random() >= 0.5;
        random_y = Math.random() >= 0.5;
        //console.log(random_x);
        //console.log(random_y);
    }

    if (counter >=20 && speed >= 100) 
    {
        speed -= 1;
        //terminal.log(speed);
        //onsole.log(parseInt(speed/100))
    }

    //collisionDetection();
    
    if (initDelay < 11) 
    {
        initDelay++
        spawn_x = spawn_x + 10
    }
    else
    {
        if(random_x)
        {
            //console.log("left")
            spawn_x = parseInt(circleArray[circleArray.length-1].style.left) - 50;
        }

        if(!random_x)
        {
            //console.log("right")
            spawn_x = parseInt(circleArray[circleArray.length-1].style.left) + 50;
        }

        if (random_y) 
        {
            //console.log("down")
            spawn_y = parseInt(circleArray[circleArray.length-1].style.top) + 10;
        }

        if(!random_y )
        {
            //console.log("up")
            spawn_y = parseInt(circleArray[circleArray.length-1].style.top) - 10;
        }

        collisionDetection2();
        circleArray.shift().remove()
    }
    


    let newCircle = document.createElement("div");
    newCircle.className = "circle";
    newCircle.style.left = spawn_x + "px";
    newCircle.style.top = spawn_y + "px";
    newCircle.style.animationDuration = speed/100 + "s";
    newCircle.style.backgroundColor = "background-color: rgb(255,255,255,1.0)";
    //terminal.log(speed/100);
    circleArray.push(newCircle);
    gamebox.appendChild(newCircle);
    //console.log(circleArray);
    //console.log(circleArray.length);
}

function collisionDetection(){

    let collisionElement = circleArray[0];

    let rect1 = actor.getBoundingClientRect();
    let rect2 = collisionElement.getBoundingClientRect();

    var overlap = !(rect1.right < rect2.left || 
                rect1.left > rect2.right || 
                rect1.bottom < rect2.top || 
                rect1.top > rect2.bottom);

    console.log(overlap);

     if(overlap) 
    { 
        score += 1
        window.scoreSound.play();
    }
    else
    {
        failed++
        window.failSound.play();
        failprotection = 10;
    }

    if(failed > 5) 
    {   
        //youLoose(); 
    };

}

function collisionDetection2 ()
{

    let collisionElement = circleArray[0];
    let circleRight = parseInt(collisionElement.style.left) + 210 ;
    let circleLeft = parseInt(collisionElement.style.left);
    let circleTop = parseInt(collisionElement.style.top);
    let circleBottom = parseInt(collisionElement.style.top) + 210;
    //collisionElement.style.backgroundColor = "rgb(155,155,155,1.0)";
    var overlapping = !(690 > circleRight ||
                        390 > circleBottom ||
                         circleLeft > 800 ||
                        circleTop > 500)

    if(overlapping) 
    { 
        score += 1
        window.scoreSound.play();
        failprotection--;
    }
    else
    {
        failed++
        window.failSound.play();
    };


    if(failed > 5) 
    {   
        youLoose(); 
    };

}

function collisionDetection3(){

    let collisionElement = circleArray[0];

            let charHeight = 50;
            let charWidth = 50;
            let charLeft = 700;
            let charTop = 400;
            let collTop = parseInt(collisionElement.style.top);
            let collLeft = parseInt(collisionElement.style.left);
            let halfCollHeight = 50;
            let halfCollWidth = 50;

            let charMidX = charLeft + (charWidth / 2);
            let charMidY = charTop + (charHeight / 2);
            let collMidY = collTop - halfCollHeight;
            let collMidX = collLeft - halfCollWidth;

            //let xBetween = (Math.max(collMidX, charMidX) - Math.min(collMidX, charMidX));
            //let yBetween = (Math.max(collMidY, charMidY) - Math.min(collMidY, charMidY));
            let xBetween = Math.abs(collMidX - charMidX);
            let yBetween = Math.abs(collMidY - charMidY);

            var marker = document.createElement("img");
                marker.src = "../img/intro.png";
                marker.style.left = collMidX  + "px";
                marker.style.top = collMidY + "px";
                marker.className = "marker";
                document.getElementById("gamebox").appendChild(marker);    


            if(Math.sqrt(xBetween * xBetween + yBetween * yBetween) <= 180)
            { 
                score += 1
                window.scoreSound.play();
            }
            else
            {
                failed++
                window.failSound.play();
                failprotection = 10;
            }
}

function gameLoop(){
    
    if(right)
    {
        actor.style.transform = "rotate(45deg)";      
        //moveCircleRight();
        incrOffset = 20; 

        for(div in circleArray)
        {
            incrOffset = incrOffset - 1;
            circleArray[div].style.left = parseInt(circleArray[div].style.left) - incrOffset + 'px';
        } 
    }

    if(!right && !left)
    {
        incrOffset = 0;
        actor.style.transform = "rotate(0deg)";
    }

    if(left)
    {
        actor.style.transform = "rotate(-45deg)";
        incrOffset = 20; 
        for(div in circleArray)
        {
                incrOffset = incrOffset - 1;
                circleArray[div].style.left = parseInt(circleArray[div].style.left) + incrOffset + 'px';
        }   
    }

    if(down)
    {
        actor.style.transform = "rotateX(45deg)";
        incrTopOffset = 20; 

        for(div in circleArray)
        {
                incrTopOffset = incrTopOffset - 1;
                circleArray[div].style.top = parseInt(circleArray[div].style.top) - incrTopOffset + 'px';
        }   
    }

    if(up)
    {
        actor.style.transform = "rotateX(-45deg)";
        incrTopOffset = 20; 
        
        for(div in circleArray)
        {
                incrTopOffset = incrTopOffset - 1;
                circleArray[div].style.top = parseInt(circleArray[div].style.top) + incrTopOffset + 'px';
        }   
    }

    if(!up && !down)
    {
        incrTopOffset = 0;
    }

    document.getElementById("scorecount").innerHTML = String(score);
    document.getElementById("missed").innerHTML = String(failed);
}

function youLoose()
{
    speed = 0;
    gamespeed = 0;

    /*for(var i = 0; i < circleArray.length; i++)
    {
        circleArray.pop().remove();
    }
    lostscreen.style.display = "block";*/
    if (!scoreSent)
    {
     sendScore(); 
     scoreSent = true;  
    }

    setTimeout( function(){window.location.assign("lost.html")}, 0 );
}

//Set Loops for Spawner and Movement
setInterval(gameLoop, gamespeed);
setInterval(spawner, speed);