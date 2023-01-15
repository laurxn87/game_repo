import towerWorld from '../entities/towerWorld.js';

let world;

export default class towerGame {
    constructor(){
    }   

    start(){
        world = new towerWorld(this, "towerWorld", "towerWorld");
        world.start();
        const pauseButton = document.getElementById("pauseButton");
        pauseButton.addEventListener("click", this.pauseGame);
    }

    pauseGame(){
        world.pauseWorld();
    }

    gameOver(titleString, messageString, scoreString){
        world.destroy();
        world = null;

        // remove the old html 
        var pauseButton = document.getElementById("pauseButton");
        pauseButton.style.display = "none";

        console.log(document.getElementsByClassName("order-ui")[0]);

        console.log(document.getElementsByClassName("order-ui"));

        var orderTitle = document.getElementsByClassName("order-ui")[0].getElementsByClassName("order-ui__title")[0];
        orderTitle.style.display = "none";
        

        var exit = document.getElementById("button2");
        exit.style.display = "none";
        var gameOver = document.getElementById("gameover-screen");
        gameOver.style.display = "block";
        var title = document.getElementsByClassName("screen__title")[0];
        title.innerHTML = titleString;
        var message = document.getElementsByClassName("screen__message")[0];
        message.innerHTML = messageString;
        var score = document.getElementsByClassName("screen__score")[0];
        score.innerHTML = "Score: " + scoreString;

        var button = document.getElementById    ("restart-button");
        button.addEventListener("click", this.restartGame, false);
    }

    restartGame(){
        var gameOver = document.getElementById("gameover-screen");
        gameOver.style.display = "none";
        // put the html back 
        var orderTitle = document.getElementsByClassName("order-ui")[0].getElementsByClassName("order-ui__title")[0];
        orderTitle.style.display = "block";
        var pauseButton = document.getElementById("pauseButton");
        pauseButton.style.display = "block";
        var exit = document.getElementById("button2");
        exit.style.display = "block";
        game = new towerGame();
        game.start();
    }

    
}

var game = new towerGame();
game.start();

