import towerWorld from '../entities/towerWorld.js';

let world;

export default class towerGame {
    constructor() {
    }

    /*
    *   This function is called when the game starts
    *   It will create the world and add the pause button
    *   It will also add the event listener for the pause button
    */
    start() {
        world = new towerWorld(this, "towerWorld", "towerWorld");
        world.start();
        const pauseButton = document.getElementById("pauseButton");
        pauseButton.addEventListener("click", this.pauseGame);
    }

    /*
    *   This function is called when the pause button is clicked
    *   It will pause the game
    */
    pauseGame() {
        world.pauseWorld();
    }

    /*
    *   This function is called when the game is over
    *   It will remove the world and add the game over screen
    *   It will also add the event listener for the restart button
    *   @param titleString - the title of the game over screen
    *   @param messageString - the message of the game over screen
    *   @param scoreString - the score of the game over screen
    */
    gameOver(titleString, messageString, scoreString) {
        world.destroy();
        world = null;

        // remove the old html 
        var pauseButton = document.getElementById("pauseButton");
        pauseButton.style.display = "none";
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

        var button = document.getElementById("restart-button");
        button.addEventListener("click", this.restartGame, false);
    }

    /*
    *   This function is called when the restart button is clicked
    *   It will remove the game over screen and restart the game
    *   It will also add back the old event listeners
    */
    restartGame() {
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

