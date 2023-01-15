import * as THREE from 'three';
import Component from './Component.js';

let model = null;

export default class bottomBunModel extends Component{
    constructor(parentEntity, name, id){
        super(parentEntity, name, id);
        this.parent = parentEntity;
        this.position = new THREE.Vector3(0,0,0);
        this.rotation = new THREE.Vector3(0,0,0);
    }

    start(scene){
        // load a cube for now
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        model = new THREE.Mesh( geometry, material );
        model.position.set(0,1,0);
        model.castShadow = true;
        model.receiveShadow = true;
        scene.add(model);
        this.position = new THREE.Vector3(0,1,0);
    }

    update(){
        this.parent.position = this.position;
        this.parent.rotation = this.rotation;
        if(model != null){ 
            model.position.x = this.position.x;
            model.position.z = this.position.z;
            model.rotation.y = this.rotation.y;
        }

    }

    destroy(scene){
        scene.remove(model);
        model = null;
        this.parent = null;
    }
}