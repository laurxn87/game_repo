import Component from './Component.js';
import * as THREE from 'three';
import { GLTFLoader} from 'GLTFLoader';

// let model = null;

export default class buildingBlockModel extends Component{
    constructor(filepath, parentEntity, name, id ){
        super(parentEntity, name, id);
        this.model = null;
        this.filepath = filepath;
        this.position = new THREE.Vector3(0,0,0);
        this.parent = parentEntity;
        this.horizontal;
    }
   
    start(scene, size,vertical, posx, posz){


        // make a 2x3 box for the map
        var geometry;
        if(size == '2x3'){
            var loader = new GLTFLoader();
            loader.load("../models/2x3block.glb", (loadedModel) => {
            this.model = loadedModel.scene;
            console.log("2x3");
            // scale the model
            this.model.scale.x = 200;
            this.model.scale.y = 200;
            this.model.scale.z = 200;
            this.model.position.set(posx,0.1,posz);
            if(vertical){
                this.model.rotation.y = Math.PI/2;
            }

            scene.add(this.model);


        }, undefined, function ( error ) {
            console.error( error );
        }
        );
        }
        else if(size == '2x4'){
            var loader = new GLTFLoader();
            loader.load("../models/2x4block.glb", (loadedModel) => {
            this.model = loadedModel.scene;

            // scale the model
            this.model.scale.x = 200;
            this.model.scale.y = 200;
            this.model.scale.z = 200;
            this.model.position.set(posx,0.1,posz);
            if(vertical){
                this.model.rotation.y = Math.PI/2;
            }

            scene.add(this.model);

            }, undefined, function ( error ) {
            console.error( error );
            }
            );
        }
        else{
            console.error("Invalid size for building block");
        }
    }

    destroy(scene){
        scene.remove(this.model);
        this.model = null;
        this.parent = null;
    }

}