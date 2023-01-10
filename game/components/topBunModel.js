import * as THREE from 'three';
import Component from './Component.js';

export default class topBunModel extends Component{
    constructor(parentEntity, name, id){
        super(parentEntity, name, id);
        this.parent = parentEntity;
        this.position = new THREE.Vector3(0,0,0);
        this.rotation = new THREE.Vector3(0,10,0);
        this.falling = false;
        this.velocity = 0;

        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
        this.model = new THREE.Mesh( geometry, material );
        this.model.position.set(0,10,0);



    }

    start(scene, x,z){
        // load a cube for now
        scene.add(this.model);
        this.position = new THREE.Vector3(x,10,z);

    }

    update(){
        if(this.falling){
            var u = this.velocity;
            var a = -5;
            var t = 0.01
            this.velocity = u + a*t; 
            this.position.y = this.position.y + u*t + 0.5*a*t*t;

        }
        // console.log('model pos',this.position);
        this.parent.position = this.position;
        // console.log('model pos',this.position);
        
        if(this.model != null){ 
            this.model.position.x = this.position.x;
            this.model.position.y = this.position.y;
            this.model.position.z = this.position.z;
            this.model.rotation.y = this.rotation.y;
        }

    }

    remove(scene){
        scene.remove(this.model);
    }

    destroy(scene){
        scene.remove(this.model);
        this.model = null;
        this.parent = null;
    }


}