import * as THREE from 'three';
import Entity from './Entity.js';
import map from './towerMap.js';
import tower from './tower.js';
import {OrbitControls} from 'OrbitControls';
import dropper from './dropper.js';
import order from './order.js';
import towerMap from './towerMap.js';

let camera, controls, scene, renderer, canvas;
let mapCam;
let birdCam;
let t; // tower
let d; // dropper
let o; // order

export default class towerWorld extends Entity{
    constructor(parent, name, id){
        super(0,0,0,0,0,0,1,1,1,{},null,"towerworld");

        this.map = null;
        // this.tower = null;
        this.fillings = ["patty", "topBun", "cheese", "lettuce", "tomato", "onion"];
        this.height = 0;
        this.order = [];

        this.pause = false;
        this.parent = parent;
    }


    /* starts the tower world
    */
    start(){
        // Get the canvas
        const canvas = document.getElementById("gl-canvas");

        // Create the scene
        scene = new THREE.Scene();
        
        const aspect = window.innerWidth / window.innerHeight;
        // Create the camera
        camera = new THREE.PerspectiveCamera( 75, this.aspect, 0.1, 1000 );
        camera.position.set(0, 20, 20);
        camera.lookAt(0,0,0);
        mapCam = camera;

        birdCam = new THREE.PerspectiveCamera( 75, this.aspect, 0.1, 1000 );
        birdCam.position.set(0, 20, 0);
        birdCam.lookAt(0,0,0);

        // Create the renderer
        renderer = new THREE.WebGLRenderer({canvas});
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

        // Set the size
        renderer.setSize( window.innerWidth, window.innerHeight );

        // Set the background color
        renderer.setClearColor( 0x1f1137, 1 );

        // add lighting
        var light = new THREE.AmbientLight( 0xffffff);
        scene.add( light );
    
        var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
        directionalLight.position.set( 0, 300, -300 );
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 1024;  // default
        directionalLight.shadow.mapSize.height = 1024; // default
        directionalLight.shadow.camera.near = 0.5;       // default
        directionalLight.shadow.camera.far = 500;      // default
        directionalLight.shadowCameraVisible = true;
        scene.add( directionalLight );
        var directionalLight2 = new THREE.DirectionalLight( 0xffffff, 2 );
        directionalLight2.position.set( 0, 300, 300 );

        directionalLight2.castShadow = true;
        directionalLight2.shadow.mapSize.width = 1024;  // default
        directionalLight2.shadow.mapSize.height = 1024; // default
        directionalLight2.shadow.camera.near = 0.5;       // default
        directionalLight2.shadow.camera.far = 500;      // default
        directionalLight2.shadowCameraVisible = true;
        scene.add( directionalLight2 );

        // Create the controls
        controls = new OrbitControls(camera, renderer.domElement );

        // Create the map
        this.map = new towerMap(this,"map", "map");
        this.map.start(scene);
        this.addChild(this.map);

        // make an order - for now just a random order of food items
        for (let i = 0; i < 5; i++) {
            this.order.push(this.fillings[Math.floor(Math.random() * this.fillings.length)]);
        }

        // Create the order
        o = new order(this, "order", "order");
        o.start(this.order);
        this.addChild(o);
        // Create the tower
        t = new tower(this, "tower", "tower");
        t.start(scene, o);
        this.addChild(t);
        // Create the dropper
        d = new dropper(this, "dropper", "dropper");
        d.start(scene);
        this.addChild(d);

        // Add the event listeners
        window.addEventListener( 'resize', this.onWindowResize, false );
        window.addEventListener( 'keydown', this.onKeyDown, false );

        // Start the game loop
        this.update();
    }

    /* updates the tower world every frame
    */
    update(){
        if(this.pause){
            return;
        };
        // Update the components
        this.map.update();
        t.update(scene);
        if(!this.pause && d!=null){
            d.update(scene);
        }
        if(!this.pause){
            renderer.render( scene, camera );
            requestAnimationFrame(this.update.bind(this));
        }
    }

    /* event listener for window resize
    */
    onWindowResize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );

        controls.update();
    }

    /* event listener for key down
    */
    onKeyDown(event){
        switch(event.key){
            case 'w':
                t.controlTower("up");
                break;
            case 's':
                t.controlTower("down");
                break;
            case 'a':
                t.controlTower("left");
                break;
            case 'd':
                t.controlTower("right");
                break;
            case 'W':
                t.controlTower("up");
                break;
            case 'S':
                t.controlTower("down");
                break;
            case 'A':
                t.controlTower("left");
                break;
            case 'D':
                t.controlTower("right");
                break;
            case 'c':
                if(camera == mapCam){
                    camera = birdCam;
                }
                else{
                    camera = mapCam;
                }
                break;
            case 'C':
                if(camera == mapCam){
                    camera = birdCam;
                }
                else{
                    camera = mapCam;
                }
                break;
            default:
                break;
        }
    }
    /* pauses the game
    */
    pauseWorld(){
        // Pause the game
        var old = this.pause;
        this.pause = !old;

        // Change the button text
        var button = document.getElementById("pauseButton");
        if(old){
            d.resumeTimer();
            button.innerHTML = "Pause";
            this.update();
        }
        else{
            d.pauseTimer();
            button.innerHTML = "Resume";
        }
    }

    /* destroys the tower world
    */
    destroy(){
        this.pause = true;
        // Remove the event listeners
        window.removeEventListener( 'keydown', this.onKeyDown, false );

        renderer.clear();
        renderer.setClearColor((138, 43, 226), 1);

        // Remove the camera
        camera = null;
        // Remove the renderer
        renderer = null;
        // Remove the canvas
        canvas = null;
        // Remove the controls
        controls = null;
        // Remove the map camera
        mapCam = null;

        // Remove the children
        this.removeChild(this.map);
        this.removeChild(t);
        this.removeChild(d);
        this.removeChild(o);

        // Remove the map
        this.map.destroy(scene);
        this.map = null;

        // Remove the tower
        t.destroy(scene);
        t = null;
        // Remove the dropper
        d.destroy(scene);
        d = null;
        // Remove the order
        o.destroy();
        o = null;
        // Remove the scene
        scene = null;
        // Remove the parent
        this.parent = null;
    }
}