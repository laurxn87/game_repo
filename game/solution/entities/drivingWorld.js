import foodtruck from './foodtruck.js';
import drivingMap from './drivingMap.js';
import foodItem from './foodItem.js';
import Entity from './Entity.js';
import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';


let camera, controls, scene, renderer, canvas;
let mapCam;
let ft;

export default class drivingWorld
    extends Entity {
    constructor(parent, name, id) {
        super(0, 0, 0, 0, 0, 0, 1, 1, 1, {}, parent, name);
        this.map = null;
        this.fooditems = [];
        this.pause = false;
        this.clock = new THREE.Clock();
        this.timeLeft;
        this.prevTime;
        this.parent = parent;
    }

    /* helper function to format the time left
    * @param timeLeft - the time left in seconds
    */
    formatTimeLeft(timeLeft) {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return minutes + ":" + seconds;
    }

    /* This function is called when the game starts
    * It will start the map and foodtruck and the timer
    * It will also create the scene and camera
    */

    start() {
        this.clock.start();
        this.timeLeft = 90;
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
        camera = new THREE.PerspectiveCamera(75, this.aspect, 0.1, 1000);
        camera.position.set(0, 360, 0);
        camera.lookAt(0, 0, 0);
        mapCam = camera;
        // Create the renderer
        renderer = new THREE.WebGLRenderer({ canvas });

        // Set the size
        renderer.setSize(window.innerWidth, window.innerHeight);
        // Set the background color
        renderer.setClearColor(0x728FCE, 1);
        // add lighting
        var light = new THREE.AmbientLight(0x404040, 0.3); // soft white light
        scene.add(light);
        var directionalLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
        directionalLight1.position.set(50, 200, 0);
        scene.add(directionalLight1);
        var directionalLight2 = new THREE.DirectionalLight(0xffffff, 2.5);
        directionalLight2.position.set(-50, 200, 0);
        scene.add(directionalLight2);

        // Create the controls
        controls = new OrbitControls(camera, renderer.domElement);
        // Create the map
        this.map = new drivingMap(this, "drivingMap", "drivingMap");
        this.map.start(scene);
        this.addChild(this.map);

        // Create the foodtruck
        ft = new foodtruck(this, "foodtruck", "foodtruck");
        ft.start(scene);
        this.addChild(ft);

        var choices = [];
        for (let i = 1; i <= 5; i++) {
            // random number between 1 and 36
            var rand = Math.floor(Math.random() * 36) + 1;
            while (choices.includes(rand)) {
                rand = Math.floor(Math.random() * 36) + 1;
            }
            choices.push(rand);
        }
        var junctions = this.map.junct;

        for (let i = 0; i < choices.length; i++) {
            // Create the food item
            var fooditem = new foodItem(this, "foodItem", "foodItem", junctions["junct" + choices[i]].x, junctions["junct" + choices[i]].y, junctions["junct" + choices[i]].z);
            fooditem.start(scene);
            this.addChild(fooditem);
            this.fooditems.push(fooditem);
        }

        // render
        renderer.render(scene, camera);
        camera = ft.getCamera();

        // Add the event listeners
        window.addEventListener('resize', this.onWindowResize);
        window.addEventListener('keydown', this.controlFoodtruck);
        window.addEventListener('keyup', this.stopControlFoodtruck);
        // Start the update loop
        this.update(scene);
    }

    /* This function is called at every frame
    * It will update the map, foodtruck, and fooditems
    * It will also check if the time has run out
    */
    update() {
        if (this.pause) {
            return;
        }

        this.timeLeft = this.prevTime - Math.floor(this.clock.getElapsedTime());
        const timer = document.getElementById("timer");
        timer.innerHTML = "Time Left: " + this.formatTimeLeft(this.timeLeft);
        //   if the time runs out, end the game
        if (this.timeLeft <= 0) {
            var score = ft.getComponent("healthInventory").getScore();
            this.parent.gameOver("You Lost!", "Time ran out!", score);
        }
        // check if the objects are null before updating, because they 
        // can be destroyed in the middle of this sequence
        if (!this.pause) {
            if (ft == null) {
                return;
            }
            ft.update(scene);
            if (this.map == null) {
                return;
            }
            this.map.update();
            if (this.fooditems == null) {
                return;
            }
            this.fooditems.forEach((fooditem) => {
                fooditem.update();
            });
            renderer.render(scene, camera);
            requestAnimationFrame(this.update.bind(this));
        }
    }

    /* Returns the foodtruck object
    */
    getFoodtruck() {
        return ft;
    }

    /* Returns the map object
    */
    getMap() {
        return this.map;
    }

    /* switches the camera between the foodtruck and the map
    */
    switchCamera() {
        if (camera == ft.getCamera()) {
            camera = this.map.getCamera();
        } else {
            camera = ft.getCamera();
        }
    }

    /* This function is called when the window is resized
    * It will update the camera and renderer
    */
    onWindowResize() {
        const aspect = window.innerWidth / window.innerHeight;
        camera.aspect = aspect;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        controls.update();
    }

    /* This function is called when the pause button is pressed
    * It will pause the game and change the button text
    */
    pauseWorld() {
        // Pause the game
        var old = this.pause;
        this.pause = !old;
        // Change the button text
        var button = document.getElementById("pauseButton");
        if (old) {
            this.timeLeft = this.prevTime;
            button.innerHTML = "Pause";
            this.clock.start();
            this.update();
        }
        else {
            button.innerHTML = "Resume";
            this.prevTime = this.timeLeft;
        }
    }


    /* This function is called when a key is pressed
    * It will call the foodtruck's control function
    * @param event the key event
    */
    controlFoodtruck(event) {
        if (ft == null) {
            return;
        }
        // change to lowercase if needed    
        var key = event.key.toLowerCase();
        switch (key) {
            case 'w':
                ft.getComponent("foodtruckController").backward();
                break;
            case 'W':
                ft.getComponent("foodtruckController").backward();
                break;
            case 's':
                ft.getComponent("foodtruckController").forward();
                break;
            case 'S':
                ft.getComponent("foodtruckController").forward();
                break;
            case 'a':
                ft.getComponent("foodtruckController").turnLeft();
                break;
            case 'A':
                ft.getComponent("foodtruckController").turnLeft();
                break;
            case 'd':
                ft.getComponent("foodtruckController").turnRight();
                break;
            case 'D':
                ft.getComponent("foodtruckController").turnRight();
                break;
            case ' ':
                ft.getComponent("foodtruckController").brake();
                break;
            case 'c':
                if (camera == ft.getCamera()) {
                    camera = mapCam;
                    camera.name = "mapCam";
                } else {
                    camera = ft.getCamera();
                    camera.name = "ftCam";
                }
                controls = new OrbitControls(camera, renderer.domElement);
                break;
            case 'C':
                if (camera == ft.getCamera()) {
                    camera = mapCam;
                    camera.name = "mapCam";
                } else {
                    camera = ft.getCamera();
                    camera.name = "ftCam";
                }
                controls = new OrbitControls(camera, renderer.domElement);
                break;

            default:
                break;
        }
    }

    stopControlFoodtruck(event) {
        if (ft == null) {
            return;
        }

        switch (event.key) {
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
            case 'A':
                ft.getComponent("foodtruckController").stopTurning();
                break;
            case 'D':
                ft.getComponent("foodtruckController").stopTurning();
                break;
            case 'W':
                ft.getComponent("foodtruckController").brake();
                break;
            case 'S':
                ft.getComponent("foodtruckController").brake();
                break;
            default:
                break;
        }
    }

    /* This function is called when the game is over
    * It will remove all the objects from the scene and remove the event listeners
    */
    destroy() {
        this.pause = true;
        // remove event listeners
        window.removeEventListener('keydown', this.onKeyDown, false);
        window.removeEventListener('keyup', this.onKeyDown, false);
        renderer.clear();
        renderer.setClearColor((138, 43, 226), 1);
        camera = null;
        renderer = null;
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
        // remove the timer
        const timer = document.getElementById("timer");
        timer.style.display = "none";
    }
}