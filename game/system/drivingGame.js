import drivingWorld from '../entities/drivingWorld.js';

let world;
export default class 
drivingGame {
    constructor(){
        world = null;
    }   

    start(){

        world = new drivingWorld(this, "drivingWorld", "drivingWorld");
        world.start();
        const pauseButton = document.getElementById("pauseButton");
        pauseButton.addEventListener("click", this.pauseGame);
    }

    pauseGame(){
        world.pauseWorld();
    }

    gameOver(titleString, messageString, scoreString){
        world.destroy();

        // remove the old html 
        var pauseButton = document.getElementById("pauseButton");
        pauseButton.style.display = "none";
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
        var pauseButton = document.getElementById("pauseButton");
        pauseButton.style.display = "block";
        var exit = document.getElementById("button2");
        exit.style.display = "block";
        game = new drivingGame();
        game.start();
    }


}

var game = new drivingGame();
game.start();

