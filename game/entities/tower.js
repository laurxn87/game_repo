import * as THREE from 'three';
import Entity from './Entity.js';
import bottomBunModel from '../components/bottomBunModel.js';
// import topBunModel from '../components/topBunModel.js';
// import pattyModel from '../components/pattyModel.js';
import collision from '../components/collision.js';
import filling from './filling.js';


export default class tower extends Entity{
    
    constructor(parent, name, id){
        super(0,0,0,0,0,0,1,1,1,{},parent,"tower");
        this.name = name;
        this.height = 0;
        this.tower = [];
        this.order = null;
        this.fillings = [];
        this.addComponent(new collision(this, "collision", "collision"));
        this.clock = new THREE.Clock();
        this.dropper = [];
        this.interval = -1;
        this.counter = 0;
    }

    start(scene, order){
        // Create the bottom bun
        this.addComponent(new bottomBunModel(this, "bottomBunModel", "bottomBunModel"));
        this.components["bottomBunModel"].start(scene);

        // make an order - for now just a random order of food items
        this.order = order;
        this.clock.start();
        this.interval = 0;
        this.fillings = ["topBun", "patty"];

    }


    update(scene){
        // update the position of the tower
        // this.components["bottomBunModel"].update();

        const totalSecs = Math.round(this.clock.getElapsedTime());

        if(totalSecs % 2 == 0 && totalSecs != this.interval){
            this.interval = totalSecs;
            var rand = Math.floor(Math.random() * this.fillings.length);
            var fi = new filling(this, this.fillings[rand], this.counter);
            fi.start(scene);
            this.dropper.push(fi);
            this.counter++;


        }

        this.components["collision"].update();
        
        // // check for a collision
        // if(this.components["collision"].hasCollided()){
        //     // get the food item
        //     let foodItem = this.components["collision"].collidedWith;
        //     this.components['collision'].resetCollision();
        //     // check if the food item is the next item in the order
        //     if(foodItem.name == this.order[this.height]){
        //         this.addFillingsToTower(foodItem);
        //     }else{
        //         // stop the game
        //         console.log("Game Over");
        //     }
        // }

        // update the food items
        for(let i = 0; i < this.dropper.length; i++){
            // console.log(this.dropper[i].name);
            this.dropper[i].update(scene);
            if(this.dropper[i].position.y < -1){
                this.dropper[i].destroy(scene);
                this.dropper.splice(i, 1);
            }
        }

    }

    addFillingToTower(foodItem){
        // add item to the tower
        this.tower.push(foodItem);
        // reset the food item to the top of the tower
        foodItem.position.y = this.height + 1;
        // update the height of the tower
        this.height++;
        // check if the tower is complete
        if(this.height == this.order.length){
            console.log("You Win!");
        }
        // update the collision component
        this.components["collision"].changeCollisionBox(this.tower[this.height-1].components["collision"].collisionBox);
    }

    followMouse(mouse){
        // follow the mouse
        this.position.x = mouse.x;
        this.position.z = mouse.y;
    }

}