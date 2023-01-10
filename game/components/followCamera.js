import Component from './Component.js';
import * as THREE from 'three';

export default class followCamera extends Component{
    constructor(parentEntity, name, id ){
        super(parentEntity, name, id);
        this.camera = null;
        this.target = parentEntity;
        this.cameraOffset = new THREE.Vector3(0,2,5);
    }

    start(scene){
        // make a new camera
        this.camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
        // set the camera position to just behind the entity position
        this.camera.position.set(this.target.position.x, this.target.position.y+3, this.target.position.z+3);

        // set the camera to look at the entity
        this.camera.lookAt(this.target.position.x, this.target.position.y, this.target.position.z);

        // add the camera to the scene
        scene.add(this.camera);

    }

    update(){
        // update the camera position
        // x axis rotation angle
        let angle = this.target.rotation.y;
        // rotation in the x axis
        this.camera.position.x = this.target.position.z + this.cameraOffset.z * Math.cos(angle) - this.cameraOffset.x * Math.sin(angle);
        // rotation in the z axis
        this.camera.position.z = this.target.position.x + this.cameraOffset.x * Math.sin(angle) + this.cameraOffset.z * Math.cos(angle);

        // rotation in the y axis
        this.camera.position.y = this.target.position.y + this.cameraOffset.y;

        // update the camera to look at the entity
        this.camera.lookAt(this.target.position.x, this.target.position.y, this.target.position.z);
    }

    setTarget(target){
        this.target = target;
    }

    getCamera(){
        return this.camera;
    }

    destroy(){
        this.target = null;
        scene.remove(this.camera);
    }

    

}