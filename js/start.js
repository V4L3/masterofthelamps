
//Redirect Log to Console
var nodeConsole = require('console');
var terminal = new nodeConsole.Console(process.stdout, process.stderr);


var startButton = document.getElementById("startbutton");
var nameField = document.getElementById("name");

function nameListener()
{
    startButton.addEventListener('click', getName);
};

function getName()
{
    let tempName = String(nameField.value);
    localStorage.setItem("name", tempName );
}