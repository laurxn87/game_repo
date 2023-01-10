import Entity from './Entity.js';
import foodItemModel from '../components/foodItemModel.js';
import collision from '../components/collision.js';

export default class foodItem extends Entity{
    constructor(parent, name, id){
        super(0,0,0,0,0,0,1,1,1,{},parent,name);
        this.name = name;
        this.addComponent(new foodItemModel(this,"foodItemModel", "foodItemModel"));
        this.addComponent(new collision(this, "collision", "collision"));
    }

    start(scene){
        this.components["foodItemModel"].start(scene);
        this.components["collision"].start(scene);
        console.log(this.getCollisionBox());
    }

    update(scene){
        this.components["foodItemModel"].update(scene);
        this.components["collision"].update();

        if(this.components["collision"].hasCollided()){
            console.log("Collided");
            this.destroy();
            this.parent.removeChild(this);
        }
    }

    destroy(){
        this.components["foodItemModel"].destroy();
        this.components["collision"].destroy();
    }

    getEntity(){
        return this;
    }

    collided(){
        this.destroy();
        this.parent.removeEntity(this);

    }
}