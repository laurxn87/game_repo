import Component from './Component.js';
import * as THREE from 'three';
import { GLTFLoader} from 'GLTFLoader';

export default class buildingBlockModel extends Component{
    constructor(filepath, parentEntity, name, id ){
        super(parentEntity, name, id);
        this.model = null;
        this.filepath = filepath;
        this.position = new THREE.Vector3(0,0,0);
        this.parent = parentEntity;
        this.horizontal;
    }
   
    /* starts the model and adds it to the scene
    * @param scene - the scene to add the model to
    * @param size - the size of the building block
    * @param vertical - if the building block is vertical or not
    * @param posx - the x position of the building block
    * @param posz - the z position of the building block
    */
    start(scene, size,vertical, posx, posz){
        // make a 2x3 box for the map
        var geometry;
        if(size == '2x3'){
            var loader = new GLTFLoader();
            loader.load("../../assets/2x3block.glb", (loadedModel) => {
            this.model = loadedModel.scene;;
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
            loader.load("../../assets/2x4block.glb", (loadedModel) => {
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

    /* destroys the model
    * @param scene - the scene to remove the model from
    */
    destroy(scene){
        scene.remove(this.model);
        this.model = null;
        this.parent = null;
    }

}