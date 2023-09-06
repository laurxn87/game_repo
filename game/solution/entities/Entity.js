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
    /* returns the component with the given name
    * @param name - the name of the component to return
    * @return the component with the given name
    */ 
    getComponent(name){
        return this.components[name];
    }

    /* returns all the components
    * @return all the components
    */
    getComponents(){
        return this.components;
    }

    /* adds a component to the entity
    * @param component - the component to add
    */
    addComponent(component){
        this.components[component.name] = component;
    }

    /* removes a component from the entity
    * @param name - the name of the component to remove
    */
    removeComponent(name){
        delete this.components[name];
    }

    /* adds a child entity to this entity
    * @param child - the child entity to add
    */

    addChild(child){
        child.parent = this;
        this.children.push(child);
    }

    /* removes a child entity from this entity
    * @param child - the child entity to remove
    */
    removeChild(child){
        child.parent = null;
        this.children.splice(this.children.indexOf(child),1);
    }

    /* gets all the child entities of this entity   
    */
    getChildren(){
        return this.children;
    }

    /* gets the child entity with the given name
    * @param name - the name of the child entity to get
    * @return the child entity with the given name
    * @return null if no child entity with the given name exists
    */     
    getChild(name){
        for (var i = 0; i < this.children.length; i++){
            if (this.children[i].name == name){
                return this.children[i];
            }
        }
        return null;
    }

    /* gets the parent entity of this entity
    * @return the parent entity of this entity
    * @return null if this entity has no parent
    */ 
    getParent(){
        return this.parent;
    }

    /* sets the position of this entity
    * @param x - the x position
    * @param y - the y position
    * @param z - the z position
    */
    setPos(x,y,z){
        this.position = new THREE.Vector3(x,y,z);
    }

    /* gets the position of this entity
    * @return the position of this entity
    */
    getPos(){
        return this.position;
    }

    /* sets the rotation of this entity
    * @param x - the x rotation
    * @param y - the y rotation
    * @param z - the z rotation
    */ 
    setRotation(x,y,z){
        this.rotation = new THREE.Vector3(x,y,z);
    }

    /* gets the rotation of this entity
    * @return the rotation of this entity
    */
    getRotation(){
        return this.rotation;
    }

    /* sets the scale of this entity
    * @param x - the x scale
    * @param y - the y scale
    * @param z - the z scale
    */ 
    setScale(x,y,z){
        this.scale = new THREE.Vector3(x,y,z);
    }

    /* gets the scale of this entity
    * @return the scale of this entity
    */
    getScale(){
        return this.scale;
    }

    /* sets the collision box of this entity
    * @param collisionMesh - the collision box of this entity
    */  
    setCollisionBox(collisionMesh){
        this.collisionBox = collisionMesh;
        this.collisionBox.position.set(this.position.x, this.position.y, this.position.z);
        this.collisionBox.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    }

    /* gets the collision box of this entity
    * @return the collision box of this entity
    */
    getCollisionBox(){
        return this.collisionBox;
    }

    /* this function is called when the enitity is created
    */
    start(){
        for (var key in this.components){
            this.components[key].entity = this;
            this.components[key].start();
        }
        for (var i = 0; i < this.children.length; i++){
            this.children[i].start();
        }
    }

    /* this function is called every frame
    */
    update(){
        for (var key in this.components){
            this.components[key].update();
        }
        for (var i = 0; i < this.children.length; i++){
            this.children[i].update();
        }
    }

    /* this function is called when the entity is destroyed
    */
    destroy(){
        for (var key in this.components){
            this.components[key].destroy();
        }

        for (var i = 0; i < this.children.length; i++){
            this.children[i].destroy();
        }
    }

    /* gets the name of this entity
    * @return the name of this entity
    */
    getName(){
        return this.name;
    }

}