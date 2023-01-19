import Entity from './Entity.js';
import foodItemModel from '../components/foodItemModel.js';
import collision from '../components/collision.js';

export default class buildingBlock2x3 extends Entity{
    constructor(parent, name, id, vertical, posx, posz){
        super(posx, posy, posz,0,0,0,1,1,1,{},parent,name);
        this.name = name;
        this.addComponent(new buildingModel2x3(this,"buildingModel2x3", id));
        this.addComponent(new collision(this, "collision", id));
    }

    start(scene){
        this.getComponent("buildingModel2x3").start(scene);
        this.components["collision"].start(scene);
        }

    update(scene){
        this.getComponent("buildingModel2x3").update(scene);
        this.components["collision"].update();

        if(this.components["collision"].hasCollided()){

        }
    }

    destroy(scene){
        this.components["foodItemModel"].destroy(scene);
        this.components["collision"].destroy();
        this.parent.removeChild(this);
    }

    getEntity(){
        return this;
    }

    collided(){
        this.destroy();
        this.parent.removeEntity(this);

    }
}