import drivingWorld from '../entities/drivingWorld.js';

export default class drivingGame {
    constructor(){
        this.world = null;
    }   

    start(){

        this.world = new drivingWorld();
        this.world.start();

        // exit the game with the button
    }
}

var game = new drivingGame();
game.start();

