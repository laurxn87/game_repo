import drivingWorld from '../entities/drivingWorld.js';

let world;
export default class
    drivingGame {
    constructor() {
        world = null;
    }

    /*
    *   This function is called when the game starts
    *   It will create the world and add the pause button
    *       It will also add the event listener for the pause button
    */
    start() {
        // create the world
        world = new drivingWorld(this, "drivingWorld", "drivingWorld");
        world.start();
        // add the pause button
        const pauseButton = document.getElementById("pauseButton");
        pauseButton.addEventListener("click", this.pauseGame);
    }

    /*
    *   This function is called when the pause button is clicked
    *   It will pause the game
    */
    pauseGame() {
        // pause the world
        world.pauseWorld();
    }

    /* 
    *   This function is called when the game is over
    *   It will display the game over screen
    *   @param titleString - the title of the game over screen
    *   @param messageString - the message of the game over screen
    *   @param scoreString - the score of the game over screen
    */
    gameOver(titleString, messageString, scoreString) {
        // destroy the world
        world.destroy();

        // remove the old html 
        var pauseButton = document.getElementById("pauseButton");
        pauseButton.style.display = "none";
        var exit = document.getElementById("button2");
        exit.style.display = "none";

        // add the new html
        var gameOver = document.getElementById("gameover-screen");
        gameOver.style.display = "block";
        var title = document.getElementsByClassName("screen__title")[0];
        title.innerHTML = titleString;
        var message = document.getElementsByClassName("screen__message")[0];
        message.innerHTML = messageString;
        var score = document.getElementsByClassName("screen__score")[0];
        score.innerHTML = "Score: " + scoreString;

        var button = document.getElementById("restart-button");
        button.addEventListener("click", this.restartGame, false);


    }

    /*
    *   This function is called when the restart button is clicked
    *   It will restart the game
    */
    restartGame() {
        // remove the old html
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

