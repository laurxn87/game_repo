// load model to threejs

import * as THREE from 'three';
import { GLTFLoader } from 'GLTFLoader';

let scene, camera, renderer, canvas;
class test {
    constructor() {}

    start() {
        // Get the canvas
        const canvas = document.getElementById("gl-canvas");

        // Create the scene
        scene = new THREE.Scene();
        
        const aspect = window.innerWidth / window.innerHeight;
        // Create the camera
        camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );
        camera.position.set(10, 10, 10);
        camera.lookAt(0,0,0);

        // Create the renderer
        renderer = new THREE.WebGLRenderer({canvas});

        // Set the size
        renderer.setSize( window.innerWidth, window.innerHeight );

        // Set the background color
        renderer.setClearColor( 0x000000, 1 );

        // add lighting
        var light = new THREE.AmbientLight( 0x404040 ); // soft white light
        scene.add( light );

        var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
        scene.add( directionalLight );


        // add the model 
        var loader = new GLTFLoader();
        loader.load("../models/foodtruck.glb", function ( gltf ) {
            gltf.scene.position.set(0,0,1);
            gltf.scene.scale.set(1,1,1);
            console.log(scene)
            scene.add(gltf.scene);
            console.log(gltf.scene)
            console.log("success");
        }, undefined, function ( error ) {
            console.error( error );
        } );

        // render
        renderer.render(scene, camera);
    }

    update() {
        renderer.render(scene, camera);
    }


}

// run the code
const t = new test();
t.start();

// update the code
function animate() {
    requestAnimationFrame(animate);
    t.update();
}

animate();
