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

    /* starts the model and adds it to the scene
    * @param scene - the scene to add the model to
    */
    start(scene){
        // Load the model
        var loader = new GLTFLoader();
        loader.load("../../assets/foodtruck.glb", (loadedModel) => {
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

    /* updates the model position and rotation
    */
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

    /* destroys the model
    * @param scene - the scene to remove the model from
    */
    destroy(scene){
        scene.remove(model);
        model = null;
        this.parent = null;
    }

    /* gets the collision box of the model
    * @param scene - the scene to add the collision box to  
    */
    getCollisionBox(scene){
        var box = new THREE.Box3().setFromObject(model);
        var offset = box.getCenter(new THREE.Vector3());
        offset.y = box.max.y;
        this.position.y = offset.y;
        this.parent.fitTruckToBox(box, offset,scene);
    }

}
