import Entity from './Entity.js';
import drivingMapModel from '../components/drivingMapModel.js';
import buildingBlock from './buildingBlock.js';

// positions of all the building blocks
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

// positions of all the junctions
let junct = {
    'junct1':{'x': -220, 'y': 0, 'z': -130},
    'junct2':{'x': -160, 'y': 0, 'z': -130},
    'junct3':{'x': -120, 'y': 0, 'z': -130},
    'junct4':{'x': -60, 'y': 0, 'z': -130},
    'junct5':{'x': 20, 'y': 0, 'z': -130},
    'junct6':{'x': 100, 'y': 0, 'z': -130},
    'junct7':{'x': 220, 'y': 0, 'z': -130},
    'junct8':{'x': -40, 'y': 0, 'z': -70},
    'junct9':{'x': 20, 'y': 0, 'z': -70},
    'junct10':{'x': 40, 'y': 0, 'z': -70},
    'junct11':{'x': 120, 'y': 0, 'z': -70},
    'junct12':{'x': -220, 'y': 0, 'z': -30},
    'junct13':{'x': -160, 'y': 0, 'z': -30},
    'junct14':{'x': -120, 'y': 0, 'z': -30},
    'junct15':{'x': -40, 'y': 0, 'z': -30},
    'junct16':{'x': 120, 'y': 0, 'z': -30},
    'junct17':{'x': 220, 'y': 0, 'z': -30},
    'junct18':{'x': -220, 'y': 0, 'z': 30},
    'junct19':{'x': -120, 'y': 0, 'z': 30},
    'junct20':{'x': -40, 'y': 0, 'z': 30},
    'junct21':{'x': 20, 'y': 0, 'z': 30},
    'junct22':{'x': 60, 'y': 0, 'z': 30},
    'junct23':{'x': 120, 'y': 0, 'z': 30},
    'junct24':{'x': 140, 'y': 0, 'z': 30},
    'junct25':{'x': 220, 'y': 0, 'z': 30},
    'junct26':{'x': -220, 'y': 0, 'z': 90},
    'junct27':{'x': -120, 'y': 0, 'z': 90},
    'junct28':{'x': -40, 'y': 0, 'z': 90},
    'junct29':{'x': 60, 'y': 0, 'z': 90},
    'junct30':{'x': 140, 'y': 0, 'z': 90},
    'junct31':{'x': 220, 'y': 0, 'z': 90},
    'junct32':{'x': -220, 'y': 0, 'z': 150},
    'junct33':{'x': -120, 'y': 0, 'z': 150},
    'junct34':{'x': -400, 'y': 0, 'z': 150},
    'junct35':{'x': 140, 'y': 0, 'z': 150},
    'junct36':{'x': 220, 'y': 0, 'z': 150}
};


export default class drivingMap extends Entity{
    constructor(parent, name, id){
        super(0,0,0,0,0,0,1,1,1,{},parent,"map");
        this.name = name;
        this.addComponent(new drivingMapModel("",this, "drivingMapModel", "drivingMapModel"));
        this.id = id;
        this.parent = parent;
        this.name = name;
        this.junct = junct;
    }

    /*
    *   start the map
    *  @param scene - the scene to add the map to
    */
    start(scene){
        this.components["drivingMapModel"].start(scene);
        // make all the building blocks
        for(let i = 1; i <= 23; i++){
                var block = new buildingBlock(this, "block", i, mapPlan["block"+i].Size,mapPlan["block"+i].Vertical, mapPlan["block"+i].Position.x, mapPlan["block"+i].Position.z);
                this.parent.addChild(block);
                block.start(scene);   
        }
    }
    
    /*
    * destroy the map
    * @param scene - the scene to remove the map from
    */   
    destroy(scene){
        this.components["drivingMapModel"].destroy(scene);
        this.components = {};
        this.parent = null;
        

    }



}