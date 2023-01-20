import Component from './Component.js';
import * as THREE from 'three';

export default class foodtruckController extends Component{
    constructor(parentEntity, name, id){
        super(parentEntity,name, id);
        this.model = null;
        this.speed = 0;
        this.maxSpeed = 0.7;
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


    start(){
        this.model = this.parent.components["foodtruckModel"];
        this.model.position = new THREE.Vector3(0,0,0);
        this.prevPosition = new THREE.Vector3(0,0,0);
        this.prevRotation = new THREE.Vector3(0,0,0);
    }

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
        this.prevPosition = this.model.position;
        this.prevRotation = this.model.rotation;
        // use suvat equations to update the position of the truck
        this.model.position.z += this.speed * Math.cos(this.model.rotation.y);
        this.model.position.x += this.speed * Math.sin(this.model.rotation.y);
        this.model.rotation.y += this.turnSpeed;

    }

    forward(){
        this.accelerating = true;
        this.decelerating = false;
        this.stopping = false;
    }

    backward(){
        this.accelerating = false;
        this.decelerating = true;
        this.stopping = false;
    }

    brake(){
        this.accelerating = false;
        this.decelerating = false;
        this.stopping = true;
    }   

    halt(){
        this.accelerating = false;
        this.decelerating = false;
        this.stopping = false;
        this.stopped = true;
    }  

    turnLeft(){
        this.turningLeft = true;
        this.turningRight = false;
    }

    turnRight(){
        this.turningLeft = false;
        this.turningRight = true;
    }

    stopTurning(){
        this.turningLeft = false;
        this.turningRight = false;
    }

    getSpeed(){
        return this.speed;
    }

    getTurnSpeed(){
        return this.turnSpeed;
    }

    getStopped(){
        return this.stopped;
    }

    destroy(){
        this.model = null;
        this.parent = null;
    }

    block(){
        console.log("blocking");
        this.model.position = this.prevPosition;
        this.model.rotation = this.prevRotation;
    }
}