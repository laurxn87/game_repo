import Entity from './Entity.js';
import collision from '../components/collision.js';
import buildingBlockModel from '../components/buildingBlockModel.js';


export default class buildingBlock extends Entity{
    constructor(parent, name, id, size, vertical, posx, posz){
        super(posx,0, posz,0,0,0,1,1,1,{},parent,name);
        this.name = name;
        this.size = size;
        this.vertical = vertical;
        this.posx = posx;
        this.posz = posz;
        if(this.size == '2x3'){
            this.setScale(40,10,60);
        }
        else if(this.size == '2x4'){
            this.setScale(40,10,80);
        }
        if(!this.vertical){
            this.setRotation(0,Math.PI/2,0);
        }


        this.addComponent(new buildingBlockModel("",this,"buildingBlockModel", id));
        this.addComponent(new collision(this, "collision", id));

    }

    start(scene){
        this.components["buildingBlockModel"].start(scene,this.size, this.vertical, this.posx, this.posz);
        this.components["collision"].start(scene);
        }

    update(scene){
        this.components["collision"].update();

        if(this.components["collision"].hasCollided()){
            console.log("hit building block");
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