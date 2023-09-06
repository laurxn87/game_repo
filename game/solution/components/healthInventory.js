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
    
    /* starts the health and inventory bars
    */
    start() {
        this.health = 100;
        this.maxHealth = 100;
        this.inventory = 0;
        this.maxInventory = 5;
        var health = document.getElementById("health");
        health.style.display = "block";
        var healthBar = document.getElementById("health-bar");
        healthBar.style.width = (this.health*2.25) + "%";
        var healthBack = document.getElementById("health-back");
        healthBack.style.width = "200px";
        var inventory = document.getElementById("inventory");
        inventory.style.display = "block";
        var inventoryBar = document.getElementById("inventory-bar");
        inventoryBar.style.width = 
        (this.inventory/this.maxInventory)*150 + "%";
        var inventoryBack = document.getElementById("inventory-back");
        inventoryBack.style.width = "200px";
    }
    
    /* destroys the health and inventory bars
    */
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

    /* adds health to the player
    */
    addHealth(amount){
        this.health += amount;
        if(this.health > this.maxHealth){
            this.health = this.maxHealth;
        }
        var healthBar = document.getElementById("health-bar");
        healthBar.style.width = (this.health*2.25) + "%";
    }

    /* removes health from the player
    */
    removeHealth(amount){
        this.health -= amount;
        if(this.health < 0){
            this.parent.getParent().getParent().gameOver("You lost!", "You ran out of health!", this.getScore());
        }

        var healthBar = document.getElementById("health-bar");
        healthBar.style.width = (this.health*2.25) + "%";
    }

    /* adds inventory item to the player
    */
    addInventory(){ 
        if(this.inventory < this.maxInventory){
            this.inventory += 1;
            var inventoryBar = document.getElementById("inventory-bar");
            inventoryBar.style.width = 
            (this.inventory/this.maxInventory)*150 + "%";

        }
        // check if the player has won
        if(this.inventory == this.maxInventory){
            this.parent.getParent().getParent().gameOver("You won!", "You collected all the food!", this.getScore());
        }
    }

    /* returns the score of the player
    */
    getScore(){
        return this.inventory/this.maxInventory * 100;
    }
    }