import Component from './Component.js';
import * as THREE from 'three';

export default class foodtruckController extends Component{
    constructor(parentEntity, name, id){
        super(parentEntity,name, id);
        this.model = null;
        this.speed = 0;
        this.maxSpeed = 0.3;
        this.acceleration = 0.0015;
        this.deceleration = 0.0015;
        this.turnSpeed = 0.01;
        this.maxTurnSpeed = 0.1;
        this.turnAcceleration = 0.0005;
        this.turnDeceleration = 0.0005;
        this.turning = false;
        this.turningLeft = false;
        this.turningRight = false;
        this.accelerating = false;
        this.decelerating = false;
        this.stopping = false;
        this.stopped = false;
    }


    start(){

        this.model = this.parent.components["foodtruckModel"];
        this.model.position = new THREE.Vector3(0,1.2,0);
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
                if(this.speed > 0){
                    this.speed -= this.deceleration;
                }
                else if(this.speed < 0){
                    this.speed += this.deceleration;
                }
            }

            if(this.turningLeft){
                this.turnSpeed += this.turnAcceleration;
                if(this.turnSpeed > this.maxTurnSpeed){
                    this.turnSpeed = this.maxTurnSpeed;
                    // update the rotation of the truck
                }
            }
            else if(this.turningRight){
                this.turnSpeed -= this.turnAcceleration;
                if(this.turnSpeed < -this.maxTurnSpeed){
                    this.turnSpeed = -this.maxTurnSpeed;
                }
            }
            else{
                if(this.turnSpeed > 0){
                    this.turnSpeed -= this.turnDeceleration;
                }
                else if(this.turnSpeed < 0){
                    this.turnSpeed += this.turnDeceleration;
                }
            }
        }

        this.model.position.x += this.speed * Math.sin(this.model.rotation.y);
        this.model.position.z += this.speed * Math.cos(this.model.rotation.y);
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
}