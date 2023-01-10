// Description: This component loads the foodtruck model and adds it to the scene
import Component from './Component.js';
import * as THREE from 'three';
import { GLTFLoader} from 'GLTFLoader';

let model = null;

export default class foodtruckModel extends Component{
    constructor(parentEntity, name, id){
        super(parentEntity, name, id);
        this.parent = parentEntity;
        this.position = new THREE.Vector3(0,0,0);
        this.rotation = new THREE.Vector3(0,0,0);
    }

    start(scene){
        // Load the model
        var loader = new GLTFLoader();
        loader.load("../models/foodtruck.glb", (loadedModel) => {
            model = loadedModel.scene
            scene.add(model);

        }, undefined, function ( error ) {
            console.error( error );
        }
        );
        this.position = new THREE.Vector3(0,1.2,0);
    }

    update(){
        this.parent.position = this.position;
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





}
