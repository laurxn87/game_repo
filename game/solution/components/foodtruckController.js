import Component from './Component.js';
import * as THREE from 'three';

export default class foodtruckController extends Component{
    constructor(parentEntity, name, id){
        super(parentEntity,name, id);
        this.model = null;
        this.speed = 0;
        this.maxSpeed = 0.6;
        this.acceleration = 0.002;
        this.deceleration = 0.003;
        this.turnSpeed = 0.01;
        this.maxTurnSpeed = 0.1;
        this.turnAcceleration = 0.0015;
        this.turnDeceleration = 0.003;
        this.turning = false;
        this.turningLeft = false;
        this.turningRight = false;
        this.accelerating = false;
        this.decelerating = false;
        this.stopping = false;
        this.stopped = false;
        this.turnRadius = 0.5;
        this.prevPosition;
        this.prevRotation;
    }

    /* starts the model and adds it to the scene
    */
    start(){
        this.model = this.parent.components["foodtruckModel"];
        this.model.position = new THREE.Vector3(20,0,20);
        this.prevPosition = new THREE.Vector3(0,0,0);
        this.prevRotation = new THREE.Vector3(0,0,0);
    }

    /* updates the model position and rotation
    * uses suvat equations to update the position of the truck
    */
    update(){   
        if(this.stopped){
            this.speed = 0;
            this.turnSpeed = 0;
        }
        else{
            if(this.accelerating){
                this.speed += this.acceleration;
                if(this.speed > this.maxSpeed){
                    this.speed = this.maxSpeed;
                }
            }
            else if(this.decelerating){
                this.speed -= this.deceleration;
                if(this.speed < -this.maxSpeed){
                    this.speed = -this.maxSpeed;
                }
            }
            else if(this.stopping){
                if(this.speed > 0.01){
                    // use a quadratic function to slow down the truck
                    this.speed -= this.speed * this.speed;
                }
                else if(this.speed < -0.01){
                    // use a quadratic function to slow down the truck
                    this.speed += this.speed * this.speed;
                }else{
                    this.speed = 0;
                }

            }
            else{
                // if the truck is not accelerating, decelerating, or stopping, it should be at a constant speed
                if(this.speed > this.maxSpeed){
                    this.speed = this.maxSpeed;
                }
                else if(this.speed < -this.maxSpeed){
                    this.speed = -this.maxSpeed;
                }
            }

            if(this.turningLeft){
                this.turnSpeed += this.turnAcceleration;
                if(this.turnSpeed < -this.maxTurnSpeed){
                    this.turnSpeed = -this.maxTurnSpeed;
                }
            }
            else if(this.turningRight){
                this.turnSpeed -= this.turnAcceleration;
                if(this.turnSpeed > this.maxTurnSpeed){
                    this.turnSpeed = this.maxTurnSpeed;
                }
            }
            else{
                if(this.turnSpeed > 0.01){
                    // use a quadratic function to slow down the truck
                    this.turnSpeed -= 3* this.turnSpeed * this.turnSpeed;
                }
                else if(this.turnSpeed < -0.01){
                    // use a quadratic function to slow down the truck
                    this.turnSpeed += 3*this.turnSpeed * this.turnSpeed;
                }else{
                    this.turnSpeed = 0;
                }
            }
        }
        this.prevPosition = new THREE.Vector3(this.model.position.x, this.model.position.y, this.model.position.z);
        this.prevRotation = this.model.rotation;
        // use suvat equations to update the position of the truck
        this.model.position.z += this.speed * Math.cos(this.model.rotation.y);
        this.model.position.x += this.speed * Math.sin(this.model.rotation.y);
        this.model.rotation.y += this.turnSpeed;
        // check if the truck is out of bounds
        if(this.model.position.x < -230 || this.model.position.x > 230 || this.model.position.z < -145 || this.model.position.z > 155){
            this.block();
        }
    }

    /* sets the truck to accelerate
    */
    forward(){
        this.accelerating = true;
        this.decelerating = false;
        this.stopping = false;
    }

    /* sets the truck to decelerate
    */
    backward(){
        this.accelerating = false;
        this.decelerating = true;
        this.stopping = false;
    }

    /* sets the truck to slow down
    */
    brake(){
        this.accelerating = false;
        this.decelerating = false;
        this.stopping = true;
    }   

    /* sets the truck to stop
    */
    halt(){
        this.accelerating = false;
        this.decelerating = false;
        this.stopping = false;
        this.stopped = true;
    }  

    /* sets the truck to turn left
    */
    turnLeft(){
        this.turningLeft = true;
        this.turningRight = false;
    }

    /* sets the truck to turn right
    */
    turnRight(){
        this.turningLeft = false;
        this.turningRight = true;
    }

    /* sets the truck to stop turning
    */
    stopTurning(){
        this.turningLeft = false;
        this.turningRight = false;
    }

    /* returns the speed of the truck
    */
    getSpeed(){
        return this.speed;
    }

    /* returns the turn speed of the truck
    */
    getTurnSpeed(){
        return this.turnSpeed;
    }

    /* returns the position of the truck
    */
    getStopped(){
        return this.stopped;
    }

    /* destroys the truck
    */
    destroy(){
        this.model = null;
        this.parent = null;
    }

    /* blocks the truck from moving
    */
    block(){
        this.model.position = this.prevPosition;
        this.model.rotation = this.prevRotation;
    }
}