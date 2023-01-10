import * as THREE from 'three';
import bottomBunModel from '../components/bottomBunModel.js';
import topBunModel from '../components/topBunModel.js';
import pattyModel from '../components/pattyModel.js';
import collision from '../components/collision.js';
import Entity from './Entity.js';

export default class filling extends Entity{
    constructor(parentEntity, name, id){
        super(0,0,0,0,0,0,1,1,1,{},parentEntity, name);
        this.parent = parentEntity;
        this.velocity = 0;
        this.falling = false;
        this.model = "";
        this.caught = false;
        this.clock = new THREE.Clock();
        this.name = name;
        this.addComponent(new collision(this, "collision", "collision"));
 
    }

    start(scene){
        console.log(this.name);

        if(this.name == "topBun"){
            this.model = "topBunModel";
            this.addComponent(new topBunModel(this, "topBunModel", 0));

        }
        else if(this.name == "patty"){
            this.model = "pattyModel";
            this.addComponent(new pattyModel(this, "pattyModel", 0));
        }
        else{
            console.log(this.name, "error - not a valid filling type");
        }
        
        this.getComponent("collision").start(scene);
        this.clock.start();
        this.drop(scene);


    }

    update(){

        this.getComponent(this.model).update();

        this.getComponent("collision").update();
        // if(this.getComponent("collision").hasCollided()){
        //     if(this.getComponent("collision").collidedWith.name == "tower"){
        //         this.falling = false;
        //         this.caught = true;
        //         this.getComponent("collision").resetCollision();
        //     }
        // }
        // if(this.caught){
        //     // follow the parent = tower position
        //     console.log('caught');
        //     this.position.x = this.parent.position.x;
        //     this.position.z = this.parent.position.z;
        // }

    }

    drop(scene){

            // pick a random x, z position that is different
            this.position.x = Math.random() * 10 - 5;
            this.position.z = Math.random() * 10 - 5;

            this.getComponent(this.model).start(scene, this.position.x, this.position.z);
           
            this.falling = true;
            this.getComponent(this.model).falling = true;
            
    }

    destroy(scene){
        this.getComponent(this.model).destroy(scene);
        this.getComponent("collision").destroy(scene);


    }

    reset(){

        this.falling = false;
        this.caught = false;
        this.velocity = 0;
        this.position.y = 10;
        this.getComponent(this.model).position.y = 10;
        this.clock.stop();
        this.clock.start();
    }


}