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
    constructor(parent, name, id){
        super(0,0,0,0,0,0,1,1,1,{},parent,name);
        this.map = null;
        this.fooditems = [];
        this.pause = false;
        this.clock = new THREE.Clock();
        this.timeLeft;
        this.prevTime;
        this.parent =  parent;
    }

    formatTimeLeft(timeLeft){
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        if(seconds < 10){
            seconds = "0" + seconds;
        }
        return minutes + ":" + seconds;
    }

    start(){
        this.clock.start();
        this.timeLeft = 1;
        this.prevTime = this.timeLeft;
        const timer = document.getElementById("timer");
        timer.style.display = "block";
        timer.innerHTML = "Time Left: " + this.formatTimeLeft(this.timeLeft);
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
        if(this.pause){
            return;
        }

        this.timeLeft = this.prevTime - Math.floor(this.clock.getElapsedTime());
        const timer = document.getElementById("timer");
        timer.innerHTML = "Time Left: " + this.formatTimeLeft(this.timeLeft);
        //   if the time runs out, end the game
        if(this.timeLeft <= 0){
            this.parent.gameOver();
        }
        if(!this.pause){
            ft.update(scene);
            this.map.update();
            this.fooditems.forEach((fooditem) => {
                fooditem.update();
            });
    
            renderer.render(scene, camera);
            requestAnimationFrame(this.update.bind(this));
        }
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

    pauseWorld(s){
        // Pause the game
        var old = this.pause;
        this.pause = !old;

        // Change the button text
        var button = document.getElementById("pauseButton");
        if(old){
            this.timeLeft = this.prevTime;
            button.innerHTML = "Pause";
            this.clock.start();
            this.update();

        }
        else{
            button.innerHTML = "Resume";
            this.prevTime = this.timeLeft;
        }
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

    destroy(){
        this.pause = true;
        // remove event listeners
        window.removeEventListener( 'resize', this.onWindowResize, false );
        window.removeEventListener( 'keydown', this.onKeyDown, false );
        window.removeEventListener( 'keyup', this.onKeyDown, false );
        renderer.clear();
        camera = null;
        renderer =null;
        canvas = null;
        controls = null;
        mapCam = null;

        this.removeChild(ft);
        this.removeChild(this.map);

        this.map.destroy(scene);
        this.map = null;

        ft.destroy(scene);
        ft = null;

        scene = null;
        this.parent = null;
        console.log("destroyed");

        // remove the timer
        const timer = document.getElementById("timer");
        timer.style.display = "none";


    }


}