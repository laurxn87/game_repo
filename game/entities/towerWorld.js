import * as THREE from 'three';
import Entity from './Entity.js';
import map from './map.js';
import tower from './tower.js';
import {OrbitControls} from 'OrbitControls';

let camera, controls, scene, renderer, canvas;
let mapCam;
let t;

export default class towerWorld extends Entity{
    constructor(){
        super(0,0,0,0,0,0,1,1,1,{},null,"towerworld");

        this.map = null;
        // this.tower = null;
        this.fillings = ["patty", "topBun"];
        this.height = 0;
        this.order = [];
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

        // make an order - for now just a random order of food items
        for (let i = 0; i < 1; i++) {
            this.order.push(this.fillings[Math.floor(Math.random() * this.fillings.length)]);
        }

        // Create the tower
        t = new tower(this, "tower", "tower");
        t.start(scene, this.order);

        // Add the event listeners
        window.addEventListener( 'resize', this.onWindowResize, false );
        window.addEventListener( 'mousemove', this.onMouseMove, false );

        // Start the game loop
        this.update();


    }

    update(){
        this.map.update();
        t.update(scene);
        renderer.render( scene, camera );
        requestAnimationFrame(this.update.bind(this));
    }

    onWindowResize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );

        controls.update();
    }

    onMouseMove(event){
        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
        var mouse = new THREE.Vector2();
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        t.followMouse(mouse);
    }
}