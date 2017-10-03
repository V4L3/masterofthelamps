/** 
 * Created by valentinberger on 26/04/17.
 */

//Redirect Log to Console
//var nodeConsole = require('console');
//var terminal = new nodeConsole.Console(process.stdout, process.stderr);

function displayScore()
{
  let url = 'http://dev.thecell.eu/masterofthelamp/getandsetlist.php?get=1&gameid=2';
  let newTable = document.createElement("TABLE");
  newTable.className = "highscoreTable";

  fetch(url)
  .then(res => res.json())
  .then((out) => {
    
    for (var i = 0; i < out.highscores.length; i++) 
    {
      let newRow = document.createElement("tr");
      let name = document.createElement("td");
      let score = document.createElement("td");
      name.innerHTML = out.highscores[i].name;
      score.innerHTML = out.highscores[i].score;
      newRow.appendChild(name);
      newRow.appendChild(score);
      newTable.appendChild(newRow);
    }

  })

  .catch(err => console.error(err));

  document.getElementById("scorelist").appendChild(newTable);
}