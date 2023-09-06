import * as THREE from 'three';
import filling from './filling.js';
import Entity from './Entity.js';

let timer;
export default class dropper extends Entity {

    constructor(parent, name, id) {
        super(0, 0, 0, 0, 0, 0, 1, 1, 1, {}, parent, "dropper");
        this.name = name;
        this.order = null;
        this.fillings = [];
        this.clock = new THREE.Clock();
        this.dropper = [];
        this.interval = -1;
        this.counter = 0;
        this.testFilling = null;
        this.timeLeft;
        this.prevTime;
        this.pause = false;

    }

    /* helper function to format the time left
    * @param timeLeft - the time left in seconds
    * @return a string of the time left in the format "mm:ss"
    */
    formatTimeLeft(timeLeft) {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return minutes + ":" + seconds;
    }

    /* This function is called when the game starts
    * It will start the model and collision components
    * @param scene - the scene to add the model to  
    */
    start(scene) {
        this.clock.start();
        this.interval = 0;
        this.prevTime = 90;
        this.fillings = ["topBun", "patty", "cheese", "lettuce", "tomato", "onion"];
        this.timeLeft = 90;
        const timer = document.getElementById("timer");
        timer.style.display = "block";
        timer.innerHTML = "Time Left: " + this.formatTimeLeft(this.timeLeft);
    }

    /* This function is called every frame
    * It will update the collision component and timer and the fillings in the dropper
    */
    update(scene) {
        this.timeLeft = this.prevTime - Math.round(this.clock.getElapsedTime());
        // check if the time is up
        if (this.timeLeft < 0) {
            var score = this.parent.getChild("order").getScore();
            this.parent.parent.gameOver("You Lose! Better luck next time", "You ran out of time!"
                , score);
        }
        const timer = document.getElementById("timer");
        timer.innerHTML = "Time Left: " + this.formatTimeLeft(this.timeLeft);

        const totalSecs = Math.round(this.clock.getElapsedTime());
        if (totalSecs % 1 == 0 && totalSecs != this.interval) {
            // add a new filling every second
            this.interval = totalSecs;
            var rand = Math.floor(Math.random() * this.fillings.length);
            var fi = new filling(this, this.fillings[rand], this.counter);
            fi.start(scene);
            this.dropper.push(fi);
            this.counter++;
        }

        // update the fillings
        for (var i = 0; i < this.dropper.length; i++) {
            this.dropper[i].update(scene);
            if (this.dropper.length == 0) {
                return;
            }
            // check if the filling is off the screen
            if (this.dropper[i].position.y < -1) {
                this.dropper[i].destroy(scene);
                this.dropper.splice(i, 1);
            }
        }
    }

    /* This function is called when the game is paused
    * It will pause the timer and the fillings
    */
    pauseTimer() {
        this.pause = true;
        this.prevTime = this.timeLeft;
    }

    /* This function is called when the game is resumed
    * It will resume the timer and the fillings
    */
    resumeTimer() {
        this.pause = false;
        this.clock.start();
    }

    /* This function is called when the game is over
    * It will destroy the timer and the fillings
    * @param scene - the scene to remove the model from
    */
    destroy(scene) {
        for (var i = 0; i < this.dropper.length; i++) {
            this.dropper[i].destroy(scene);
        }
        // remove the timer
        const timer = document.getElementById("timer");
        timer.style.display = "none";
        this.dropper = [];
    }

}