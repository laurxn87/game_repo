import towerWorld from '../entities/towerWorld.js';

export default class towerGame {
    constructor(){
        this.world = null;
    }   

    start(){

        this.world = new towerWorld();
        this.world.start();

        // exit the game with the button
    }
}

var game = new towerGame();
game.start();

