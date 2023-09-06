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
   
    /* starts the model and adds it to the scene
    * @param scene - the scene to add the model to
    */
    start(scene){
        var loader = new GLTFLoader();
        loader.load("../../assets/drivingMap.glb", (loadedModel) => {
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

    /* updates the model position and rotation
    */
    destroy(scene){
        scene.remove(this.model);
        this.model = null;
        this.parent = null;
    }

}