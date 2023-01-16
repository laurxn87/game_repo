import Entity from './Entity.js';
import foodtruckModel from '../components/foodtruckModel.js'
import foodtruckController from '../components/foodtruckController.js'
import followCamera from '../components/followCamera.js'
import collision from '../components/collision.js'
import {OBB} from 'OBB'

export default class foodtruck extends Entity{
    constructor(parent, name, id){
        super(0,0,0,0,0,0,1,1,1,{},parent,name);
        this.name = name;
        this.addComponent(new foodtruckModel(this,"foodtruckModel", "foodtruckModel"));
        this.addComponent(new foodtruckController(this,"foodtruckController", "foodtruckController"));
        // this.addComponent(new followCamera(this, "followCamera", "followCamera"));
        this.addComponent(new collision(this, "collision", "collision"));
        this.inventory = 0;
        this.isDestroyed = false;
        this.collisionBox;

    }

    start(scene){
        this.components["foodtruckModel"].start(scene);
        this.components["foodtruckController"].start();
        // increment the angle by the turnspeed or something 
        // this.components["followCamera"].start(scene);
        this.components["collision"].start(scene);

    }

    update(scene){
        if(this.isDestroyed){
            return;
        }        var orderTitle = document.getElementsByClassName("order-ui")[0].getElementsByClassName("order-ui__title")[0];
        orderTitle.style.display = "block";
        this.components["foodtruckController"].update();
        this.components["foodtruckModel"].update(scene);
        // this.components["followCamera"].update();
        this.components["collision"].update();
        if(this.components["collision"].hasCollided()){
            this.components["collision"].resetCollision()
            this.inventory += 1;
            console.log("Inventory: " + this.inventory);
        }
        
    }

    destroy(scene){
        this.components["foodtruckModel"].destroy(scene);
        this.components["foodtruckController"].destroy();
        // this.components["followCamera"].destroy();
        this.components["collision"].destroy();
        this.isDestroyed = true;
    }

    getCamera(){
        // return this.components["followCamera"].camera;
    }

    getCollisionBox(){
        // using obb collision box 
        var colBox = new OBB(this.position, 



    }
    
    

}