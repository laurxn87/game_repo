import Component from './Component.js';
import * as THREE from 'three';

export default class mapModel extends Component{
    constructor(filepath, parentEntity, name, id){
        super(parentEntity, name, id);
        this.model = null;
        this.filepath = filepath;
        this.position = new THREE.Vector3(0,0,0);
        this.parent = parentEntity;
    }
   
    start(scene){
        // this.model = make a model from the filepath
        // create a floor and add it to the scene
        var geometry = new THREE.PlaneGeometry( 100, 100, 32 );
        this.parent.scale = new THREE.Vector3(100,1,100);
        var material = new THREE.MeshBasicMaterial( {color: 0x00ff00, side: THREE.DoubleSide} );
        this.model = new THREE.Mesh( geometry, material );
        this.model.position.set(0,0,0);
        this.model.rotation.x = Math.PI / 2;
        scene.add(this.model);
    }

    destroy(scene){
        scene.remove(this.model);
        this.model = null;
        this.parent = null;
    }

}