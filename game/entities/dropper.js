import * as THREE from 'three';
import filling from './filling.js';
import Entity from './Entity.js';

let timer;
export default class dropper extends Entity{

    constructor(parent, name, id){
        super(0,0,0,0,0,0,1,1,1,{},parent,"dropper");
        this.name = name;
        this.order = null;
        this.fillings = [];
        this.clock = new THREE.Clock();
        this.dropper = [];
        this.interval = -1;
        this.counter = 0;
        this.testFilling = null;
        this.timeLeft;

    }

    formatTimeLeft(timeLeft){
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        if(seconds < 10){
            seconds = "0" + seconds;
        }
        return minutes + ":" + seconds;
    }

    start(scene){
        this.clock.start();
        this.interval = 0;
        this.fillings = ["topBun", "patty", "cheese", "lettuce", "tomato", "onion"];
        this.timeLeft = 90;
        const timer = document.getElementById("timer");
        timer.style.display = "block"; 
        timer.innerHTML = "Time Left: " + this.formatTimeLeft(this.timeLeft);
    }


    update(scene){
        this.timeLeft = 90 - Math.round(this.clock.getElapsedTime());
        if(this.timeLeft < 0){
            this.parent.parent.gameOver("You Lose! Better luck next time","You ran out of time!"
            ,this.parent.getChildren("order").getScore());
        }

        const timer = document.getElementById("timer");
        timer.innerHTML = "Time Left: " + this.formatTimeLeft(this.timeLeft);

        const totalSecs = Math.round(this.clock.getElapsedTime());
        if(totalSecs % 1 == 0 && totalSecs != this.interval){
            this.interval = totalSecs;
            var rand = Math.floor(Math.random() * this.fillings.length);
            var fi = new filling(this, this.fillings[rand], this.counter);
            fi.start(scene);
            this.dropper.push(fi);
            this.counter++;
        }


        for(var i = 0; i < this.dropper.length; i++){
            this.dropper[i].update(scene);
            if(this.dropper.length == 0){
                return ;
            }
            if(this.dropper[i].position.y < -1){
                this.dropper[i].destroy(scene);
                this.dropper.splice(i, 1);
            }
        }
    }

    destroy(scene){
        for(var i = 0; i < this.dropper.length; i++){
            this.dropper[i].destroy(scene);
        }
        // remove the timer
        const timer = document.getElementById("timer");
        timer.style.display = "none";

        this.dropper = [];
    }


}