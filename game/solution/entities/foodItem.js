import Entity from './Entity.js';
import foodItemModel from '../components/foodItemModel.js';
import collision from '../components/collision.js';

export default class foodItem extends Entity{
    constructor(parent, name, id, x, y,z){
        super(x,y,z,0,0,0,1,1,1,{},parent,name);
        this.name = name;
        this.addComponent(new foodItemModel(this,"foodItemModel", "foodItemModel"));
        this.addComponent(new collision(this, "collision", "collision"));
    }
    /* starts the model and collision components
    * @param scene - the scene to add the model to
    */
    start(scene){
        this.components["foodItemModel"].start(scene,this.position);
        this.components["collision"].start(scene);
        
    }

    /* updates the model and collision components */
    update(scene){
        this.components["foodItemModel"].update(scene);
        this.components["collision"].update();

        if(this.components["collision"].hasCollided()){
            // destroy the food item if it has collided
            this.destroy();
            this.parent.removeChild(this);
        }
    }

    /* destroys the model and collision components */
    destroy(scene){
        this.components["foodItemModel"].destroy(scene);
        this.components["collision"].destroy();
        this.parent.removeChild(this);
    }

    /* returns the entity */
    getEntity(){
        return this;
    }

    /* returns true if the food item has collided */ 
    collided(){
        this.destroy();
        this.parent.removeEntity(this);

    }
}