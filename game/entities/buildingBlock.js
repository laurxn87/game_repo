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
        if(this.size == '2x3' && this.vertical){
            this.setScale(40,10,60);
        }
        else if(this.size == '2x4' && this.vertical){
            this.setScale(40,10,80);
        }
        else if(this.size == '2x3' && !this.vertical){
            this.setScale(60,10,40);
        }   
        else if(this.size == '2x4' && !this.vertical){
            this.setScale(80,10,40);
        }
        else{
            console.error("Invalid size for building block");
        }
        


        this.addComponent(new buildingBlockModel("",this,"buildingBlockModel", id));
        this.addComponent(new collision(this, "collision", id));

    }

    start(scene){
        this.components["buildingBlockModel"].start(scene,this.size, this.vertical, this.posx, this.posz);
        this.components["collision"].start(scene);
        }

    update(scene){
        this.components["collision"].updateTruck();

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