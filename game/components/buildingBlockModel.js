import Component from './Component.js';
import * as THREE from 'three';
import { GLTFLoader} from 'GLTFLoader';

let model = null;

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
        // var loader = new GLTFLoader();
        // loader.load("../models/drivingMap.glb", (loadedModel) => {
        //     model = loadedModel.scene;
        //     // set the models name
        //     model.name = "drivingMap";

        //     // scale the model
        //     model.scale.x = 200;
        //     model.scale.y = 200;
        //     model.scale.z = 200;
        //     scene.add(model);
        //     var size = new THREE.Box3().setFromObject(model).getSize(new THREE.Vector3());
        //     console.log(size);


        // }, undefined, function ( error ) {
        //     console.error( error );
        // }
        // );

        // make a 2x3 box for the map
        var geometry;
        if(size == '2x3'){
            geometry = new THREE.BoxGeometry( 40, 50, 60 );
        }
        else if(size == '2x4'){
            geometry = new THREE.BoxGeometry( 40,50, 80 );
        }
        else{
            console.error("Invalid size for building block");
        }
        var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        this.model = new THREE.Mesh( geometry, material );
        this.model.position.set(posx,0.1,posz);
        if(!vertical){
            this.model.rotation.y = Math.PI/2;
        }
        scene.add(this.model);
    }

    destroy(scene){
        scene.remove(this.model);
        this.model = null;
        this.parent = null;
    }

}