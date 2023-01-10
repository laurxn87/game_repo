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
        // add the collision mesh to the scene
        scene.add(this.collisionMesh);
    }
    
    update() { 
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

    destroy(scene) {
        // remove this component's collision mesh from the scene
        scene.remove(this.collisionMesh);
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

    changeCollisionMesh(mesh) {
        this.collisionMesh = mesh;
        this.parent.setCollisionBox(this.collisionMesh);
    }

}