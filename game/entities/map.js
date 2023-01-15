import Entity from './Entity.js';
import mapModel from '../components/mapModel.js';

export default class map extends Entity{
    constructor(parent, name, id){
        super(0,0,0,0,0,0,1,1,1,{},parent,"map");
        this.name = name;
        this.addComponent(new mapModel("",this, "mapModel", "mapModel"));
    }

    start(scene){
        this.components["mapModel"].start(scene);
    }

    // update(){
    //     this.update();
    // }

    // getEntity(){
    //     return this;
    // }
    
    destroy(scene){
        this.components["mapModel"].destroy(scene);
        this.components = {};
        this.parent = null;
        

    }

}