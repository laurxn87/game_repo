import Entity from './Entity.js';
import drivingMapModel from '../components/drivingMapModel.js';
import buildingBlock from './buildingBlock.js';

let mapPlan = {
    "block1": {'Size':'2x4', 'Vertical':true, 'Position': {'x':-190, 'z':-80}},  
    "block2": {'Size':'2x4', 'Vertical':true, 'Position': {'x':-130, 'z':-80}},
    "block3": {'Size':'2x4', 'Vertical':true, 'Position': {'x':-70, 'z':-80}},
    "block4": {'Size':'2x3', 'Vertical':false, 'Position': {'x':0, 'z':-100}},
    "block5": {'Size':'2x3', 'Vertical':false, 'Position': {'x':80, 'z':-100}},
    "block6": {'Size':'2x4', 'Vertical':false, 'Position': {'x':170, 'z':-100}},
    "block7": {'Size':'2x3', 'Vertical':false, 'Position': {'x':180, 'z':-60}},
    "block8": {'Size':'2x4', 'Vertical':true, 'Position': {'x':-10, 'z':-20}},
    "block9": {'Size':'2x3', 'Vertical':false, 'Position': {'x':60, 'z':-40}},
    "block10": {'Size':'2x4', 'Vertical':false, 'Position': {'x':-170, 'z':0}},
    "block11": {'Size':'2x3', 'Vertical':false, 'Position': {'x':-80, 'z':0}},
    "block12": {'Size':'2x4', 'Vertical':false, 'Position': {'x':70, 'z':0}},
    "block13": {'Size':'2x4', 'Vertical':false, 'Position': {'x':170, 'z':0}},
    "block14": {'Size':'2x4', 'Vertical':false, 'Position': {'x':-170, 'z':60}},
    "block15": {'Size':'2x4', 'Vertical':false, 'Position': {'x':-90, 'z':60}},
    "block16": {'Size':'2x4', 'Vertical':false, 'Position': {'x':10, 'z':60}},
    "block17": {'Size':'2x3', 'Vertical':false, 'Position': {'x':100, 'z':60}},
    "block18": {'Size':'2x3', 'Vertical':false, 'Position': {'x':180, 'z':60}},
    "block19": {'Size':'2x4', 'Vertical':false, 'Position': {'x':-170, 'z':120}},
    "block20": {'Size':'2x3', 'Vertical':false, 'Position': {'x':-80, 'z':120}},
    "block21": {'Size':'2x4', 'Vertical':false, 'Position': {'x':10, 'z':120}},
    "block22": {'Size':'2x4', 'Vertical':false, 'Position': {'x':90, 'z':120}},
    "block23": {'Size':'2x3', 'Vertical':false, 'Position': {'x':180, 'z':120}},
};


export default class map extends Entity{
    constructor(parent, name, id){
        super(0,0,0,0,0,0,1,1,1,{},parent,"map");
        this.name = name;
        this.addComponent(new drivingMapModel("",this, "drivingMapModel", "drivingMapModel"));
    }

    start(scene){
        this.components["drivingMapModel"].start(scene);
        // make all the building blocks
        for(let i = 1; i <= 23; i++){
            var block = new buildingBlock(this, "block"+i, i, mapPlan["block"+i].Size,mapPlan["block"+i].Vertical, mapPlan["block"+i].Position.x, mapPlan["block"+i].Position.z);
            this.addChild(block);
            // console.log(block);
            block.start(scene);
        }

    }

    // update(){
    //     this.update();
    // }

    // getEntity(){
    //     return this;
    // }
    
    destroy(scene){
        this.components["drivingMapModel"].destroy(scene);
        this.components = {};
        this.parent = null;
        

    }



}