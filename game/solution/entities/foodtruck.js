import Entity from './Entity.js';
import foodtruckModel from '../components/foodtruckModel.js'
import foodtruckController from '../components/foodtruckController.js'
import followCamera from '../components/followCamera.js'
import collision from '../components/collision.js'
import healthInventory from '../components/healthInventory.js'
import {OBB} from 'OBB'
import * as THREE from 'three';

export default class foodtruck extends Entity{
    constructor(parent, name, id){
        super(0,0,0,0,0,0,1,1,1,{},parent,name);
        this.name = name;
        this.addComponent(new foodtruckModel(this,"foodtruckModel", "foodtruckModel"));
        this.addComponent(new foodtruckController(this,"foodtruckController", "foodtruckController"));
        this.addComponent(new followCamera(this, "followCamera", "followCamera"));
        this.addComponent(new collision(this, "collision", "collision"));
        this.addComponent(new healthInventory(this, "healthInventory", "healthInventory"));

        this.inventory = 0;
        this.isDestroyed = false;
        this.collisionBox;
        this.prevPos = new THREE.Vector3(0,0,0);
        this.prevRot = new THREE.Vector3(0,0,0);
    }

    /* starts all the components 
    * @param scene - the scene to add the model to
    */
    start(scene){
        this.components["foodtruckModel"].start(scene);
        this.components["foodtruckController"].start();
        this.components["followCamera"].start(scene);
        this.components["collision"].start(scene);
        this.components["healthInventory"].start();
    }

    /* updates all the components
    * @param scene - the scene to add the model to
    */
    update(scene){
        if(this.isDestroyed){
            return;
        }  
        this.components["foodtruckController"].update();
        this.components["foodtruckModel"].update(scene);
        this.components["followCamera"].update();
        this.components["collision"].updateTruck();
        if(this.components["collision"].hasCollided()){
            if(this.components["collision"].getCollidingWith().name == "block"){
                // if the truck has collided with a block, reset the truck's position and rotation 
                this.getComponent("foodtruckController").block();
                this.getComponent("healthInventory").removeHealth(0.1); // remove some health
                if(this.components["collision"].getCollidingWith() == null){
                    // in case the you run out of health
                    return;
                }
               this.components["collision"].getCollidingWith().getComponent("collision").resetCollision();
                this.getComponent("collision").resetCollision();
            }
            // if the truck has collided with a food item, pick it up
            else if(this.components["collision"].getCollidingWith().name == "foodItem"){
                this.pickupFoodItem(this.getComponent("collision").getCollidingWith(),scene);
                this.getComponent("collision").resetCollision();
            }
        }
        
    }

    /* picks up a food item
    * @param foodItem - the food item to pick up
    * @param scene - the scene to add the model to
    */
    pickupFoodItem(foodItem, scene){
        // do all the html stuff in here
        this.inventory+=1;
        foodItem.destroy(scene);
        this.getComponent("collision").resetCollision();
        this.getComponent("healthInventory").addInventory();
        this.getComponent("healthInventory").addHealth(5);
    }

    /* destroys the food truck
    * @param scene - the scene to add the model to
    */
    destroy(scene){
        this.components["foodtruckModel"].destroy(scene);
        this.components["foodtruckController"].destroy();
        this.components["followCamera"].destroy(scene);
        this.components["collision"].destroy();
        this.components["healthInventory"].destroy();
        this.isDestroyed = true;
    }

    /* gets the truck's camera
    * @return the truck's camera
    */
    getCamera(){
        return this.components["followCamera"].camera;
    }
    
    /* gets the truck's collision box
    * @return the truck's collision box
    */
    fitTruckToBox(box, offset, scene){
        box = new THREE.BoxGeometry(box.max.x - box.min.x, box.max.y - box.min.y, box.max.z - box.min.z);
        var mesh = new THREE.Mesh(box, new THREE.MeshBasicMaterial({color: 0x000000, wireframe:true}));
        mesh.position.copy(offset);
        mesh.updateMatrix();
        mesh.geometry.applyMatrix4(mesh.matrix);
        mesh.matrix.identity();
        mesh.position.set(0,1.2,0);
        mesh.rotation.set(0,0,0);
        mesh.scale.set(1,1,1);

        this.getComponent("collision").changeCollisionBox(scene, mesh);

    }
}