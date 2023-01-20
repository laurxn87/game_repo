import Component from './Component.js';
import * as THREE from 'three';
import { GLTFLoader} from 'GLTFLoader';

let model = null;

export default class drivingMapModel extends Component{
    constructor(filepath, parentEntity, name, id){
        super(parentEntity, name, id);
        this.model = null;
        this.filepath = filepath;
        this.position = new THREE.Vector3(0,0,0);
        this.parent = parentEntity;
        this.horizontal;
    }
   
    start(scene){
        var loader = new GLTFLoader();
        loader.load("../models/drivingMap.glb", (loadedModel) => {
            model = loadedModel.scene;
            // set the models name
            model.name = "drivingMap";

            // scale the model
            model.scale.x = 200;
            model.scale.y = 200;
            model.scale.z = 200;
            scene.add(model);
            var size = new THREE.Box3().setFromObject(model).getSize(new THREE.Vector3());


        }, undefined, function ( error ) {
            console.error( error );
        }
        );
    }

    destroy(scene){
        scene.remove(this.model);
        this.model = null;
        this.parent = null;
    }

}