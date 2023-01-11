import * as THREE from 'three';
import Component from './Component.js';


export default class fillingModel extends Component{
    constructor(parentEntity, name, id){
        super(parentEntity, name, id);
        this.parent = parentEntity;
        this.position = new THREE.Vector3(0,0,0);
        this.rotation = new THREE.Vector3(0,0,0);
        this.falling = false;
        this.velocity = 0;
        this.name = name;
        this.model = null;
    }

    getModel(name){
        if(name == "pattyModel"){
            var geometry = new THREE.BoxGeometry( 1, 1, 1 );
            var material = new THREE.MeshBasicMaterial( {color: 0x00ffff} );
            this.model = new THREE.Mesh( geometry, material )
        }
        else if(name == "cheeseModel"){
            var geometry = new THREE.BoxGeometry( 1, 1, 1 );
            var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
            this.model = new THREE.Mesh( geometry, material );
        }
        else if(name == "lettuceModel"){
            var geometry = new THREE.BoxGeometry( 1, 1, 1 );
            var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
            this.model = new THREE.Mesh( geometry, material );
        }else if(name == "tomatoModel"){
            var geometry = new THREE.BoxGeometry( 1, 1, 1 );
            var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
            this.model = new THREE.Mesh( geometry, material );
        }else if(name == "onionModel"){
            var geometry = new THREE.BoxGeometry( 1, 1, 1 );
            var material = new THREE.MeshBasicMaterial( {color: 0xff00ff} );
            this.model = new THREE.Mesh( geometry, material );
        }else if(name == "topBunModel"){
            var geometry = new THREE.BoxGeometry( 1, 1, 1 );
            var material = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
            this.model = new THREE.Mesh( geometry, material );
        }else{
            console.log("Error: " + name + " is not a valid filling name");
        }
        this.model.castShadow = true;
        this.model.receiveShadow = true;
    }

    start(scene, x, z){
        // load a cube for now
        this.getModel(this.name);
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

        this.parent.position = this.position;

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