import * as THREE from 'three';
import Entity from './Entity.js';
import bottomBunModel from '../components/bottomBunModel.js';
import collision from '../components/collision.js';


export default class tower extends Entity{
    
    constructor(parent, name, id){
        super(0,0,0,0,0,0,1,1,1,{},parent,"tower");
        this.name = name;
        this.height = 0;
        this.tower = [];
        this.order = null; //order object
        this.addComponent(new collision(this, "collision", "collision"));
        this.game_over = false;
    }

    /* starts all the components
    * @param scene - the scene to add the model to
    * @param order - the order to be completed
    */
    start(scene, order){
        // Create the bottom bun
        this.addComponent(new bottomBunModel(this, "bottomBunModel", "bottomBunModel"));
        this.components["bottomBunModel"].start(scene);

        // make an order - for now just a random order of food items
        this.order = order;

        this.getComponent("collision").setCollisionBox(1,1,1);
        this.getComponent("collision").start(scene);
    
    }

    /* updates all the components
    * @param scene - the scene to add the model to
    */

    update(scene){
        this.getComponent("collision").updateFilling();
        this.getComponent("bottomBunModel").update();
    }

    /* adds a food item to the tower
    * @param scene - the scene to add the model to
    * @param foodItem - the food item to be added to the tower
    */
    addFillingToTower(scene, foodItem){
        // add item to the tower
        // reset the food item to the top of the tower
        foodItem.position.y = this.height + 2.01;
        // update the height of the tower
        this.height++;
        this.position.y = this.height + 2.01;  
        // check if the tower is corrrect
        if(this.order.checkNext(foodItem.name)){
            this.order.next();
            if(this.order.empty()){
                this.parent.parent.gameOver("You win!", "You completed the order",100);
                this.game_over = true;  
                return ;
            }
        }else{
            var finalScore = this.order.getScore();          
            this.parent.parent.gameOver("You lose!", "You did not complete the order",finalScore); 
            this.game_over = true;       
            return ;
        }
        // update the collision component if the game is not over
        if(!this.game_over){
            this.components["collision"].changeCollisionBox(scene, foodItem.getCollisionBox());
            this.tower.push(foodItem);
        }
    }

    /* moves the tower left or right or up or down
    * @param direction - the direction to move the tower
    */
    controlTower(direction){
        // move the tower left or right
        if(direction == "left"){
            this.position.x -= 0.3;
        }else if(direction == "right"){
            this.position.x += 0.3;
        }else if(direction == "up"){
            this.position.z -= 0.3;
        }else if(direction == "down"){
            this.position.z += 0.3;
        }else{
            console.log("Invalid direction");
        }
        for(let i = 0; i < this.tower.length; i++){
            this.tower[i].position.x = this.position.x;
            this.tower[i].position.z = this.position.z;
        }
    }

    /* destroys the tower */
    destroy(scene){
        this.components["bottomBunModel"].destroy(scene);
        this.components["collision"].destroy();
    }
}