import * as THREE from 'three';
import filling from './filling.js';
import Entity from './Entity.js';

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
    }

    start(scene){
        this.clock.start();
        this.interval = 0;
        this.fillings = ["topBun", "patty", "cheese", "lettuce", "tomato", "onion"];

        // this.testFilling = new filling(this, "topBun", 0);
        // this.testFilling.start(scene);
        // this.dropper.push(this.testFilling);
        // this.counter++;

    }

    update(scene){
        const totalSecs = Math.round(this.clock.getElapsedTime());

        if(totalSecs % 2 == 0 && totalSecs != this.interval){
            this.interval = totalSecs;
            var rand = Math.floor(Math.random() * this.fillings.length);
            var fi = new filling(this, this.fillings[rand], this.counter);
            fi.start(scene);
            this.dropper.push(fi);
            this.counter++;
        }



        for(var i = 0; i < this.dropper.length; i++){
            this.dropper[i].update(scene)
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

        this.dropper = [];
    }


}