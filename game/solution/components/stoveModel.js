import Component from './Component.js';
import * as THREE from 'three';
import { GLTFLoader} from 'GLTFLoader';

export default class stoveModel extends Component{
    constructor(filepath, parentEntity, name, id){
        super(parentEntity, name, id);
        this.model = null;
        this.filepath = filepath;
        this.position = new THREE.Vector3(0,0,0);
        this.parent = parentEntity;
    }
   
    /* starts the model and adds it to the scene
    * @param scene - the scene to add the model to
    */
    start(scene){
        // Load the model
        var loader = new GLTFLoader();
        loader.load("../../assets/stove.glb", (loadedModel) => {
            this.model = loadedModel.scene;
            // set the models name
            this.model.name = "stove";
            this.model.rotation.y = -Math.PI/2;
            this.model.scale.set(7,7,7);
            this.model.position.set(0,-10,0);
            scene.add(this.model);
        }, undefined, function ( error ) {
            console.error( error );
        }
        );
    }

    /* destroys the model   
    * @param scene - the scene to remove the model from
    */
    destroy(scene){
        scene.remove(this.model);
        this.model = null;
        this.parent = null;
    }

}