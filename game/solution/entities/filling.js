import * as THREE from 'three';
import fillingModel from '../components/fillingModel.js';
import collision from '../components/collision.js';
import Entity from './Entity.js';

export default class filling extends Entity {
    constructor(parentEntity, name, id) {
        super(0, 0, 0, 0, 0, 0, 1, 1, 1, {}, parentEntity, name);
        this.parent = parentEntity;
        this.velocity = 0;
        this.falling = false;
        this.model = "";
        this.caught = false;
        this.noUpdate = false;
        this.clock = new THREE.Clock();
        this.name = name;
        this.addComponent(new collision(this, "collision", "collision"));
    }

    /* This function is called when the filling starts
        * It will start the model and collision components 
        * @param scene - the scene to add the model to
        */
    start(scene) {
        if (this.name == "topBun") {
            this.model = "topBunModel";
            this.addComponent(new fillingModel(this, "topBunModel", 0));
            this.getComponent("collision").setCollisionBox(1, 1, 0.6);

        }
        else if (this.name == "patty") {
            this.model = "pattyModel";
            this.addComponent(new fillingModel(this, "pattyModel", 0));
            this.getComponent("collision").setCollisionBox(1, 1, 0.4);
        }
        else if (this.name == "cheese") {
            this.model = "cheeseModel";
            this.addComponent(new fillingModel(this, "cheeseModel", 0));
            this.getComponent("collision").setCollisionBox(1, 1, 0.2);
        }
        else if (this.name == "lettuce") {
            this.model = "lettuceModel";
            this.addComponent(new fillingModel(this, "lettuceModel", 0));
            this.getComponent("collision").setCollisionBox(1, 1, 0.4);
        }
        else if (this.name == "tomato") {
            this.model = "tomatoModel";
            this.addComponent(new fillingModel(this, "tomatoModel", 0));
            this.getComponent("collision").setCollisionBox(1, 1, 0.2);
        }
        else if (this.name == "onion") {
            this.model = "onionModel";
            this.addComponent(new fillingModel(this, "onionModel", 0));
            this.getComponent("collision").setCollisionBox(1, 1, 0.2);
        }

        else {
            console.log(this.name, "error - not a valid filling type");
        }

        this.getComponent("collision").start(scene);
        this.clock.start();
        this.drop(scene);

    }

    /* This function is called when the filling is updated
    * It will update the model and collision components
    * @param scene - the scene to add the model to
    */
    update(scene) {
        this.getComponent(this.model).update();

        this.getComponent("collision").updateFilling();
        var tower = null;
        if (this.getComponent("collision").hasCollided()) {
            if (this.getComponent("collision").collidingWith.name == "tower") {
                tower = this.getComponent("collision").collidingWith;
                this.falling = false;
                this.caught = true;
                this.getComponent("collision").resetCollision();
            }
        }
        if (this.caught) {
            if (this.noUpdate) {
                return;
            }
            // follow the parent = tower position
            tower.addFillingToTower(scene, this);
            this.getComponent(this.model).falling = false;
            this.noUpdate = true;
        }

    }

    /* This function is called when the filling is dropped
    * It will drop the model and collision components somewhere random
    * @param scene - the scene to add the model to
    */
    drop(scene) {
        // pick a random x, z position that is different
        this.position.x = Math.random() * 10 - 5;
        this.position.z = Math.random() * 10 - 5;
        this.getComponent(this.model).start(scene, this.position.x, this.position.z);
        this.falling = true;
        this.getComponent(this.model).falling = true;
    }

    /* This function is called when the filling is destroyed
    * It will destroy the model and collision components
    * @param scene - the scene to add the model to
    */
    destroy(scene) {
        this.getComponent(this.model).destroy(scene);
        this.getComponent("collision").destroy(scene);
    }

    /* This function is called when the filling is reset
    * It will reset the model and collision components
    */
    reset() {
        this.falling = false;
        this.caught = false;
        this.velocity = 0;
        this.position.y = 10;
        this.getComponent(this.model).position.y = 10;
        this.clock.stop();
        this.clock.start();
    }


}