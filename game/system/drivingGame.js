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
        console.log("Game Over");
        world.destroy();

        // remove the old html 
        var pauseButton = document.getElementById("pauseButton");
        pauseButton.style.display = "none";
        var exit = document.getElementById("button2");
        exit.style.display = "none";

        console.log(document.getElementsByClassName("order-ui")[0]);

        console.log(document.getElementsByClassName("order-ui"));

        var orderTitle = document.getElementsByClassName("order-ui")[0].getElementsByClassName("order-ui__title")[0];
        orderTitle.style.display = "none";
        


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
}

var game = new drivingGame();
game.start();

