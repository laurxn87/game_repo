import * as THREE from 'three';
import Entity from './Entity.js';
import bottomBunModel from '../components/bottomBunModel.js';
import collision from '../components/collision.js';


export default class tower extends Entity{
    
    constructor(parent, name, id){
        super(0,0,0,0,0,0,1,1,1,{},parent,"tower");
        this.name = name;
        this.height = 0;
        this.tower = [];
        this.order = null;
        this.addComponent(new collision(this, "collision", "collision"));
    }

    start(scene, order){
        // Create the bottom bun
        this.addComponent(new bottomBunModel(this, "bottomBunModel", "bottomBunModel"));
        this.components["bottomBunModel"].start(scene);

        // make an order - for now just a random order of food items
        this.order = order;

        this.getComponent("collision").setCollisionBox(1,1,1);
        this.getComponent("collision").start(scene);
    


    }


    update(scene){
        this.getComponent("collision").updateTruck();
        this.getComponent("bottomBunModel").update();

    }

    addFillingToTower(scene, foodItem){
        // add item to the tower
        // reset the food item to the top of the tower
        foodItem.position.y = this.height + 2.01;
        // update the height of the tower
        this.height++;
        this.position.y = this.height + 2.01;  
        // check if the tower is corrrect
        if(this.order[this.height] == foodItem.name){
            if(this.height == this.order.length - 1){
                // the tower is complete
                console.log("Tower complete");
            }
        }else{
            console.log("Game over");
        }
        // update the collision component
        this.components["collision"].changeCollisionBox(scene, foodItem.getCollisionBox());
        console.log(this.getCollisionBox().position.y);
        this.tower.push(foodItem);
    }


    controlTower(direction){
        // move the tower left or right
        if(direction == "left"){
            this.position.x -= 0.2;
        }else if(direction == "right"){
            this.position.x += 0.2;
        }else if(direction == "up"){
            this.position.z -= 0.2;
        }else if(direction == "down"){
            this.position.z += 0.2;
        }else{
            console.log("Invalid direction");
        }
        for(let i = 0; i < this.tower.length; i++){
            this.tower[i].position.x = this.position.x;
            this.tower[i].position.z = this.position.z;
        }
    }

    followMouse(mouseX, mouseY){
        this.position.x = mouseX;
        this.position.z = mouseY;
    }

    destroy(){
        this.components["bottomBunModel"].destroy();
        this.components["collision"].destroy();
    }
}