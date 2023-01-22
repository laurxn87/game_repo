import Component from "./Component.js";
import * as THREE from "three";

export default class healthInventory extends Component {
    constructor(parentEntity, name, id) {
        super(parentEntity, name, id);
        this.parent = parentEntity;
        this.health;
        this.maxHealth;
        this.inventory;
        this.maxInventory;
    }
    
    start() {
        this.health = 100;
        this.maxHealth = 100;
        this.inventory = 0;
        this.maxInventory = 5;
        var healthBar = document.getElementById("health-bar");
        healthBar.style.width = (this.health*2.5) + "%";
        var healthBack = document.getElementById("health-back");
        healthBack.style.width = "200px";
        var inventoryBar = document.getElementById("inventory-bar");
        inventoryBar.style.width = 
        (this.inventory/this.maxInventory)*170 + "%";
        var inventoryBack = document.getElementById("inventory-back");
        inventoryBack.style.width = "200px";
    }
    
    update() {

    }
    
    destroy() {
        this.parent = null;
        // hide the health and inventory bars
        var health = document.getElementById("health");
        health.style.display = "none";
        var healthBar = document.getElementById("health-bar");
        healthBar.style.width = "0%";
        var healthBack = document.getElementById("health-back");
        healthBack.style.width = "0%";
        var inventory = document.getElementById("inventory");
        inventory.style.display = "none";
        var inventoryBar = document.getElementById("inventory-bar");
        inventoryBar.style.width = "0%";
        var inventoryBack = document.getElementById("inventory-back");
        inventoryBack.style.width = "0%";


    }

    addHealth(amount){
        this.health += amount;
        if(this.health > this.maxHealth){
            this.health = this.maxHealth;
        }
        var healthBar = document.getElementById("health-bar");
        healthBar.style.width = (this.health*2.5) + "%";
        console.log("health: " + this.health);
    }

    removeHealth(amount){
        this.health -= amount;
        if(this.health < 0){
            this.parent.getParent().getParent().gameOver("You lost!", "You ran out of health!", this.getScore());
        }

        var healthBar = document.getElementById("health-bar");
        healthBar.style.width = (this.health*2.5) + "%";
        console.log("health: " + this.health);
    }

    addInventory(){ 
        if(this.inventory < this.maxInventory){
            this.inventory += 1;
            var inventoryBar = document.getElementById("inventory-bar");
            inventoryBar.style.width = 
            (this.inventory.length/this.maxInventory)*170 + "%";
            console.log("inventory: " + this.inventory);

        }
        this.parent.getParent().getParent().gameOver("You won!", "You collected all the food!", this.getScore());
    }

    getScore(){
        return this.inventory/this.maxInventory * 100;
    }

    
    }