import towerWorld from '../entities/towerWorld.js';

let world;

export default class towerGame {
    constructor(){
    }   

    start(){
        world = new towerWorld();
        world.start();
        const pauseButton = document.getElementById("pauseButton");
        pauseButton.addEventListener("click", this.pauseGame);

    }

    pauseGame(){
        world.pauseWorld();
    }

    gameOver(){
        world.gameOver();
        // make a pop up window
        // ask if they want to play again
        // if yes, restart the game
        // if no, go back to the main menu

    }
}

var game = new towerGame();
game.start();

