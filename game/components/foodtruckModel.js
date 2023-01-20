// Description: This component loads the foodtruck model and adds it to the scene
import Component from './Component.js';
import * as THREE from 'three';
import { GLTFLoader} from 'GLTFLoader';

let model = null;

export default class foodtruckModel extends Component{
    constructor(parentEntity, name, id){
        super(parentEntity, name, id);
        this.parent = parentEntity;
        this.position = new THREE.Vector3(0,1.2,0);
        this.rotation = new THREE.Vector3(0,0,0);
    }

    start(scene){
        // Load the model
        var loader = new GLTFLoader();
        loader.load("../models/foodtruck.glb", (loadedModel) => {
            model = loadedModel.scene;
            // set the models name
            model.name = "foodtruck";
            scene.add(model);
            this.getCollisionBox(scene);

        }, undefined, function ( error ) {
            console.error( error );
        }
        );
    }

    update(){
        this.parent.position.x = this.position.x;
        this.parent.position.z = this.position.z;
        this.parent.rotation = this.rotation;

        if(model != null){ 
            model.position.x = this.position.x;
            model.position.y = this.position.y;
            model.position.z = this.position.z;
            model.rotation.y = this.rotation.y;
        }

    }

    destroy(scene){
        scene.remove(model);
        model = null;
        this.parent = null;
    }

    getCollisionBox(scene){
        var box = new THREE.Box3().setFromObject(model);
        var offset = box.getCenter(new THREE.Vector3());
        offset.y = box.max.y;
        this.position.y = offset.y;
        this.parent.fitTruckToBox(box, offset,scene);
    }

}
