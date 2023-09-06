import * as THREE from 'three';
import Component from './Component.js';
import { GLTFLoader} from 'GLTFLoader';


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
        this.filePath = null;
    }

    /* get the file path of the model based on the name
    * @param name - the name of the model 
    */
    getModel(name){
        if(name == "pattyModel"){
            this.filePath = "../../assets/patty.glb";
        }
        else if(name == "cheeseModel"){
            this.filePath = "../../assets/cheese.glb";
        }
        else if(name == "lettuceModel"){
            this.filePath = "../../assets/lettuce.glb";
        }else if(name == "tomatoModel"){
            this.filePath = "../../assets/tomato.glb";
        }else if(name == "onionModel"){
            this.filePath = "../../assets/onion.glb";
        }else if(name == "topBunModel"){
            this.filePath = "../../assets/topBun.glb";
        }else{
            console.log("Error: " + name + " is not a valid filling name");
        }
    }

    /* starts the model and adds it to the scene
    * @param scene - the scene to add the model to
    * @param x - the x position of the model
    * @param z - the z position of the model
    */
    start(scene, x, z){
        this.getModel(this.name);
        var loader = new GLTFLoader();
        loader.load(this.filePath, (loadedModel) => {
            // set the models name
            loadedModel.scene.name = this.name;
            this.model = loadedModel.scene;
            this.model.scale.set(0.5,0.5,0.5);
            this.model.castShadow = true;
            this.model.receiveShadow = true;
            this.model.position.set(x, 15, z);

            scene.add(this.model);
        }, undefined, function ( error ) {
            console.error( error );
        }
        );     
        this.position = new THREE.Vector3(x, 15, z);
    }

    /* updates the model position and rotation
    */
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

    /*removes the model from the scene
    * @param scene - the scene to remove the model from
    */
    remove(scene){
        scene.remove(this.model);
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