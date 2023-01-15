import Component from "./Component.js";
import * as THREE from "three";

export default class collision extends Component {
    constructor(parentEntity, name, id) {
        super(parentEntity, name, id);
        this.colliding = false;
        this.collidingWith = null;
        this.parent = parentEntity;
        this.collisionMesh = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true }));
    }
    
    start(scene) {
        this.parent.setCollisionBox(this.collisionMesh);
        this.collisionMesh = this.parent.getCollisionBox();
    }
    
    updateTruck() { 
        if(this.collisionMesh == null){
            return null;
        }
        this.position = this.parent.position;
        this.rotation = this.parent.rotation;
        this.scale = this.parent.scale;
        this.collisionMesh.position.set(this.position.x, this.position.y, this.position.z);

        this.collisionMesh.geometry.computeBoundingBox();
        this.collisionMesh.geometry.boundingBox.translate(this.position);

        for (let i = 0; i < this.parent.getParent().children.length; i++) {
            let child = this.parent.getParent().children[i];
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

    updateFilling(){
        if(this.collisionMesh == null){
            return null;
        }
        this.position = this.parent.position;
        this.rotation = this.parent.rotation;
        this.scale = this.parent.scale;
        this.collisionMesh.position.set(this.position.x, this.position.y, this.position.z);

        this.collisionMesh.geometry.computeBoundingBox();
        this.collisionMesh.geometry.boundingBox.translate(this.position);

        for (let i = 0; i < this.parent.getParent().getParent().children.length; i++) {
            let child = this.parent.getParent().getParent().children[i];
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

    destroy(scene) {

        this.collisionMesh = null;
        this.parent = null;
        this.collidingWith = null;



    }

    hasCollided() {
        return this.colliding;
    }

    getCollidingWith() {
        return this.collidingWith;
    }

    resetCollision() {
        this.colliding = false;
        this.collidingWith = null;
    }

    setCollisionBox(x, y, z) {
        var mesh = new THREE.Mesh(new THREE.BoxGeometry(x, y, z), new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true }));
        this.collisionMesh = mesh;
        this.parent.setCollisionBox(this.collisionMesh);
    }



    changeCollisionBox(scene, mesh) {
        scene.remove(this.collisionMesh);
        this.collisionMesh = mesh;
        this.parent.setCollisionBox(this.collisionMesh);

    }

}