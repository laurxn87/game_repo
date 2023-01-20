import Component from "./Component.js";
import * as THREE from "three";

export default class collision extends Component {
    constructor(parentEntity, name, id) {
        super(parentEntity, name, id);
        this.colliding = false;
        this.collidingWith = null;
        this.parent = parentEntity;
        this.collisionMesh = new THREE.Mesh(new THREE.BoxGeometry(this.parent.scale.x,this.parent.scale.y,this.parent.scale.z), new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true }));
        this.collisionMesh.name = this.parent.name + "Collision";
    }
    
    start(scene) {
        this.parent.setCollisionBox(this.collisionMesh);
        this.collisionMesh = this.parent.getCollisionBox();
        this.collisionMesh.position.set(this.parent.position.x, this.parent.position.y, this.parent.position.z);
        this.collisionMesh.rotation.set(this.parent.rotation.x, this.parent.rotation.y, this.parent.rotation.z);
    }
    
    updateFilling() { 
        if(this.collisionMesh == null){
            return null;
        }
        this.position = this.parent.position;
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
            let child = this.parent.getParent().children[i];
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
        // scene.remove(this.collisionMesh);
        this.collisionMesh = mesh;
        this.parent.setCollisionBox(this.collisionMesh);


    }

    intersection(mesh1, mesh2) {
        var box1 = mesh1.geometry.boundingBox;
        var box2 = mesh2.geometry.boundingBox;

        var min1 = box1.min;
        var max1 = box1.max;

        var min2 = box2.min;
        var max2 = box2.max;

        var minx1 = min1.x;
        var miny1 = min1.y;
        var minz1 = min1.z;

        var maxx1 = max1.x;
        var maxy1 = max1.y;
        var maxz1 = max1.z;

        var minx2 = min2.x;
        var miny2 = min2.y;
        var minz2 = min2.z;

        var maxx2 = max2.x;
        var maxy2 = max2.y;
        var maxz2 = max2.z;

        if(maxx1 < minx2 || minx1 > maxx2 || maxy1 < miny2 || miny1 > maxy2 || maxz1 < minz2 || minz1 > maxz2){
            return false;
        }
        return true;
    }


}