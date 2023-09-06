import Component from "./Component.js";
import * as THREE from "three";

export default class collision extends Component {
    constructor(parentEntity, name, id) {
        super(parentEntity, name, id);
        this.colliding = false;
        this.collidingWith = null;
        this.parent = parentEntity;
        this.collisionMesh;
    }
    
    /* starts the collision box and adds it to the scene
    * @param scene - the scene to add the model to
    */
    start(scene) {
        this.collisionMesh = new THREE.Mesh( new THREE.BoxGeometry(this.parent.scale.x, this.parent.scale.y, this.parent.scale.z), new THREE.MeshBasicMaterial({color: 0x00ff00, transparent: true, opacity: 0.5}));
        this.collisionMesh.name = this.parent.getName() + "CollisionBox";
        this.collisionMesh.position.set(this.parent.position.x, this.parent.position.y, this.parent.position.z);
        this.collisionMesh.rotation.set(this.parent.rotation.x, this.parent.rotation.y, this.parent.rotation.z);
        this.parent.setCollisionBox(this.collisionMesh);
        this.collisionMesh = this.parent.getCollisionBox();
    }
    
    /* updates the collision box position and rotation
    */
    updateFilling() { 
        if(this.collisionMesh == null){
            return null;
        }
        
        this.position = this.parent.position;
        this.scale = this.parent.scale;
        this.collisionMesh.position.set(this.position.x, this.position.y, this.position.z);

        this.collisionMesh.geometry.computeBoundingBox();
        this.collisionMesh.geometry.boundingBox.translate(this.position);
        var childList;
        if(this.parent.name == "tower"){
            // get the other fillings
            childList = this.parent.getParent().getChild("dropper").dropper;
        }
        else if(this.parent.getParent().name == "dropper"){
            // get the tower
            childList = [this.parent.getParent().getParent().getChild("tower")];
        }
        else{
            childList = this.parent.getParent().children;
        }
        for (let i = 0; i < childList.length; i++) {
            let child = childList[i];
            if(child == null){
                return null;
            }
            if (child.getCollisionBox() != null) {
                if(child.getName() != this.parent.getName()){
                    // compute the bounding box of the child
                    child.getCollisionBox().geometry.computeBoundingBox();
                    // translate the bounding box to the child's position
                    child.getCollisionBox().geometry.boundingBox.translate(child.position);
                    if (this.collisionMesh.geometry.boundingBox.intersectsBox(child.getCollisionBox().geometry.boundingBox)) {
                        this.colliding = true;
                        this.collidingWith = child;
                    }
                }
               
            }
        }


    }

    /* updates the collision box position and rotation
    */
    updateTruck(){
        if(this.collisionMesh == null){
            return null;
        }
        this.position = this.parent.position;
        this.rotation = this.parent.rotation;

        this.scale = this.parent.scale;
        this.collisionMesh.position.set(this.position.x, this.position.y, this.position.z);
        this.collisionMesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);

        this.collisionMesh.geometry.computeBoundingBox();
        this.collisionMesh.geometry.boundingBox.translate(this.position);
        for (let i = 0; i < this.parent.getParent().children.length; i++) {
            let child = this.parent.getParent().children[i]; // buildings and foooditems
            if (child.getCollisionBox() != null) {
                if(child.getName() != this.parent.getName()){
                    // compute the bounding box of the child
                    child.getCollisionBox().geometry.computeBoundingBox();
                    // translate the bounding box to the child's poswition
                    child.getCollisionBox().geometry.boundingBox.translate(child.position);
                    if (this.collisionMesh.geometry.boundingBox.intersectsBox(child.getCollisionBox().geometry.boundingBox)) {
                        this.colliding = true;
                        this.collidingWith = child;

                    }
                }
               
            }
        }

    }

    /* destroys the collision box
    * @param scene - the scene to remove the model from
    */
    destroy(scene) {
        this.collisionMesh = null;
        this.parent = null;
        this.collidingWith = null;   
    }

    /* @return - true if the collision box is colliding with another object
    */
    hasCollided() {
        return this.colliding;
    }

    /* @return - the object the collision box is colliding with
    */
    getCollidingWith() {
        return this.collidingWith;
    }

    /* resets the collision box
    */
    resetCollision() {
        this.colliding = false;
        this.collidingWith = null;
    }

    /* set a new collision box
    * @param x - the x dimension of the collision box
    * @param y - the y dimension of the collision box   
    * @param z - the z dimension of the collision box
    */ 
    setCollisionBox(x, y, z) {
        var mesh = new THREE.Mesh(new THREE.BoxGeometry(x, y, z), new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true }));
        this.collisionMesh = mesh;
        this.parent.setCollisionBox(this.collisionMesh);
    }

    /* set a new collision box
    * @param scene - the scene to add the model to
    * @param mesh - the new collision box
    */
    changeCollisionBox(scene, mesh) {
        this.collisionMesh = mesh;
        this.parent.setCollisionBox(this.collisionMesh);
    }

}