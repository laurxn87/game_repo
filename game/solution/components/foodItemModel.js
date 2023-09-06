import Component from "./Component.js";
import * as THREE from "three";
import { GLTFLoader} from 'GLTFLoader';

var fillings = ["cheese", "lettuce", "tomato", "onion", "patty", "topBun"];
export default class foodItemModel extends Component {
    constructor(parentEntity, name, id) {
        super(parentEntity, name, id);
        this.filepath = "";
        this.model = null;
        this.parent = parentEntity;
        this.position = new THREE.Vector3(0,0,0);
        this.type = "";

    }

    /* starts the model and adds it to the scene
    * @param scene - the scene to add the model to
    * @param position - the position to place the model
    */
    start(scene, position){
        this.type = fillings[Math.floor(Math.random() * fillings.length)];
        this.filepath = "../../assets/" + this.type + ".glb";
        var loader = new GLTFLoader();
        loader.load(this.filepath, (loadedModel) => {
            // set the models name
            loadedModel.scene.name = this.type;
            this.model = loadedModel.scene;
            this.model.castShadow = true;
            this.model.receiveShadow = true;
            this.model.position.set(position.x, 2, position.z);
            this.model.rotation.y = Math.random() * Math.PI;
            this.model.rotation.x = Math.PI/2;
            this.model.scale.set(2,2,2);
            scene.add(this.model);

        }, undefined, function ( error ) {
            console.error( error );
        }
        );
    }

    /* destroys the model and removes it from the scene
    * @param scene - the scene to remove the model from
    */
    destroy(scene) {
        scene.remove(this.model);
        this.model = null;
        // remove entity from the parents children
        this.parent = null;
    }

}
