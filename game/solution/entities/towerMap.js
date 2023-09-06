import Entity from './Entity.js';
import stoveModel from '../components/stoveModel.js';

export default class towerMap extends Entity{
    constructor(parent, name, id){
        super(0,0,0,0,0,0,1,1,1,{},parent,"map");
        this.name = name;
        this.addComponent(new stoveModel("",this, "stoveModel", "stoveModel"));
    }

    /* starts the stove mdoel
    * @param scene - the scene to add the model to
    */
    start(scene){
        this.components["stoveModel"].start(scene);
    }

    /*destroys the stove model
    * @param scene - the scene to remvove the model from
    */
    destroy(scene){
        this.components["stoveModel"].destroy(scene);
        this.components = {};
        this.parent = null;
        

    }

}