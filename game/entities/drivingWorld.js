import foodtruck from './foodtruck.js';
import map from './map.js';
import foodItem from './foodItem.js';
import Entity from './Entity.js';
import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { GLTFLoader} from 'GLTFLoader';


let camera, controls, scene, renderer, canvas;
let mapCam;
let ft;
export default class drivingWorld 
extends Entity{
    constructor(){
        super(0,0,0,0,0,0,1,1,1,{},null,"drivingworld");
        this.map = null;
        this.fooditems = [];
    }

    start(){
    // Get the canvas
        const canvas = document.getElementById("gl-canvas");

        // Create the scene
        scene = new THREE.Scene();
        
        const aspect = window.innerWidth / window.innerHeight;
        // Create the camera
        camera = new THREE.PerspectiveCamera( 75, this.aspect, 0.1, 1000 );
        camera.position.set(10, 10, 10);
        camera.lookAt(0,0,0);
        mapCam = camera;
        // Create the renderer
        renderer = new THREE.WebGLRenderer({canvas});

        // Set the size
        renderer.setSize( window.innerWidth, window.innerHeight );

        // Set the background color
        renderer.setClearColor( 0x000000, 1 );

        // add lighting
        var light = new THREE.AmbientLight( 0x404040 ); // soft white light
        scene.add( light );

        var directionalLight = new THREE.DirectionalLight( 0xffffff, 10.0 );
        directionalLight.position.set( 0, 1, 0 );
        scene.add( directionalLight );

        // Create the controls
        controls = new OrbitControls(camera, renderer.domElement );

        // Create the map
        this.map = new map(this,"map", "map");
        this.map.start(scene);
        this.addChild(this.map);

        // Create the foodtruck
        ft = new foodtruck(this, "foodtruck", "foodtruck");
        ft.start(scene);
        this.addChild(ft);

        // Create the food item
        // var fooditem = new foodItem(this, "foodItem", "foodItem");
        // fooditem.start(scene);
        // this.addChild(fooditem);
        // this.fooditems.push(fooditem);



        // render
        renderer.render(scene, camera);

        // Add the event listeners
        window.addEventListener( 'resize', this.onWindowResize );
        window.addEventListener( 'keydown', this.controlFoodtruck );
        window.addEventListener('keyup', this.stopControlFoodtruck);

        // Start the update loop
        this.update(scene);
    }

    update(){   
        ft.update();
        this.map.update();
        this.fooditems.forEach((fooditem) => {
            fooditem.update();
        });

        renderer.render(scene, camera);
        requestAnimationFrame(this.update.bind(this));
    }

    getFoodtruck(){
        return ft;
    }

    getMap(){
        return this.map;
    }

    switchCamera(){
        console.log("switching camera");
        if (camera == ft.getCamera()){
            camera = this.map.getCamera();
        } else {
            camera = ft.getCamera();
        }
    }   

    onWindowResize() {
        const aspect = window.innerWidth / window.innerHeight;

        camera.aspect = aspect;

        camera.updateProjectionMatrix();
    
        renderer.setSize( window.innerWidth, window.innerHeight );
    
        controls.update();

    
    }

    controlFoodtruck(event){
        // change to lowercase if needed    
        var key = event.key.toLowerCase();
        switch(key){
            case 'w':
                ft.getComponent("foodtruckController").backward();
                break;
            case 's':
                ft.getComponent("foodtruckController").forward();
                break;
            case 'a':   
                ft.getComponent("foodtruckController").turnLeft();
                break;
            case 'd':
                ft.getComponent("foodtruckController").turnRight();
                break;
            case ' ':
                ft.getComponent("foodtruckController").brake();
                break;
            case 'c':
                if (camera == ft.getCamera()){
                    camera = mapCam;
                } else {
                    camera = ft.getCamera();
                }
                break;
            default:
                break;
        }
    }

    stopControlFoodtruck(event){
        switch(event.key){
            case 'a':
                ft.getComponent("foodtruckController").stopTurning();
                break;
            case 'd':
                ft.getComponent("foodtruckController").stopTurning();
                break;
            case 'w':
                ft.getComponent("foodtruckController").brake();
                break;
            case 's':
                ft.getComponent("foodtruckController").brake();
                break;
            default:
                break;
        }
    }

}