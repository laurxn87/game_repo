import drivingWorld from '../entities/drivingWorld.js';

export default class drivingGame {
    constructor(){
        this.world = null;
    }   

    start(){

        this.world = new drivingWorld();
        this.world.start();
        const pauseButton = document.getElementById("pauseButton");
        pauseButton.addEventListener("click", this.pauseGame);
    }

    pauseGame(){
        // Pause the game
        var old = this.pause;
        this.pause = !old;

        // Change the button text
        var button = document.getElementById("pauseButton");
        if(old){
            button.innerHTML = "Pause";
            this.update();

        }
        else{
            button.innerHTML = "Resume";
        }
    }
}

var game = new drivingGame();
game.start();

