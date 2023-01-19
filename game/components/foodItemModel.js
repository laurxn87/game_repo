import Component from "./Component.js";
import * as THREE from "three";

let model = null;

export default class foodItemModel extends Component {
    constructor(parentEntity, name, id) {
        super(parentEntity, name, id);
        // this.filepath = "assets/models/foodItem.glb";
        this.parent = parentEntity;
        this.position = new THREE.Vector3(0,0,0);

    }
    
    start(scene) {
        // this.model = make a model from the filepath
        // create a floor and add it to the scene
        // var loader = new THREE.GLTFLoader();
        // loader.load(this.filepath, (loadedModel) => {
        //     this.model = loadedModel.scene;
        //     scene.add(this.model);
        // }

        // );

        // make a blue sphere
        var geometry = new THREE.SphereGeometry( 1, 32, 32 );
        var material = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
        model = new THREE.Mesh( geometry, material );
        model.position.set(60,1,-40);
        scene.add(model);
        this.position = new THREE.Vector3(-10,1,-10);
        this.parent.position = this.position;
    }

    update(scene) {
        // model.position.x = this.position.x;
        // model.position.y = this.position.y;
        // model.position.z = this.position.z;

    }

    destroy(scene) {
        scene.remove(model);
        model = null;
        // remove entity from the parents children

        this.parent = null;
    }

}
