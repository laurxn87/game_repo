import * as THREE from 'three';

export default class Entity{

    constructor(x,y,z,
        rx,ry,rz,
        sx,sy,sz,
        components,
        parent,
        id
    ){
        this.position = new THREE.Vector3(x,y,z);
        this.rotation = new THREE.Vector3(rx,ry,rz);
        this.scale = new THREE.Vector3(sx,sy,sz);
        this.components = components;
        this.parent = parent; // This is the parent entity.  If this is null, then this is the root entity.
        this.children = []; // This is an array of child entities.
        this.id = id;
        this.collisionBox = null;

    }
    
    getComponent(name){
        return this.components[name];
    }

    getComponents(){
        return this.components;
    }

    addComponent(component){
        this.components[component.name] = component;
    }

    removeComponent(name){
        delete this.components[name];
    }

    addChild(child){
        child.parent = this;
        this.children.push(child);
    }

    removeChild(child){
        child.parent = null;
        this.children.splice(this.children.indexOf(child),1);
    }

    getChildren(){
        return this.children;
    }

    getParent(){
        return this.parent;
    }

    setPos(x,y,z){
        this.position = new THREE.Vector3(x,y,z);
    }

    getPos(){
        return this.position;
    }

    setRotation(x,y,z){
        this.rotation = new THREE.Vector3(x,y,z);
    }

    getRotation(){
        return this.rotation;
    }

    setScale(x,y,z){
        this.scale = new THREE.Vector3(x,y,z);
    }

    getScale(){
        return this.scale;
    }

    setCollisionBox(collisionMesh){
        this.collisionBox = collisionMesh;
        this.collisionBox.position.set(this.position.x, this.position.y, this.position.z);
        this.collisionBox.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    }

    getCollisionBox(){
        return this.collisionBox;
    }

    start(){
        for (var key in this.components){
            this.components[key].entity = this;
            this.components[key].start();
        }
        for (var i = 0; i < this.children.length; i++){
            this.children[i].start();
        }
    }

    update(){
        for (var key in this.components){
            this.components[key].update();
        }
        for (var i = 0; i < this.children.length; i++){
            this.children[i].update();
        }
    }

    destroy(){
        for (var key in this.components){
            this.components[key].destroy();
        }

        for (var i = 0; i < this.children.length; i++){
            this.children[i].destroy();
        }
    }

    getName(){
        return this.id;
    }

}