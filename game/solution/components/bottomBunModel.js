import * as THREE from 'three';
import Component from './Component.js';
import { GLTFLoader } from 'GLTFLoader';

let model = null;
export default class bottomBunModel extends Component{
    constructor(parentEntity, name, id){
        super(parentEntity, name, id);
        this.parent = parentEntity;
        this.position = new THREE.Vector3(0,0,0);
        this.rotation = new THREE.Vector3(0,0,0);
    }

    /* starts the model and adds it to the scene
    * @param scene - the scene to add the model to
    */
    start(scene){
        // Load the model
        var loader = new GLTFLoader();
        loader.load("../../assets/bottomBun.glb", (loadedModel) => {
            model = loadedModel.scene;
            // set the models name
            model.name = "bottomBun";
            scene.add(model);
        }, undefined, function ( error ) {
            console.error( error );
        }
        );
    }

    /* updates the model position and rotation
    */

    update(){
        this.parent.position = this.position;
        this.parent.rotation = this.rotation;
        if(model != null){ 
            model.position.x = this.position.x;
            model.position.z = this.position.z;
            model.rotation.y = this.rotation.y;
        }

    }

    /* destroys the model
    * @param scene - the scene to remove the model from
    */
    destroy(scene){
        scene.remove(model);
        model = null;
        this.parent = null;
    }
}