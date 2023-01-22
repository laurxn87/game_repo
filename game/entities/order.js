import Entity from "./Entity.js";

export default class order extends Entity {

    constructor(parent, name, id){
        super(0,0,0,0,0,0,1,1,1,{},parent,name);
        this.orderlist = [];
        this.orderLength;
        this.score;
        this.name = name;
    }

    setItem(slot, itemName){
        console.log("setting item ", itemName," in ", slot);
        if(this.orderlist[slot] != "empty"){
            // this.clearItem(slot);
        }
    
        const div = document.getElementsByClassName("order-ui")[0].getElementsByClassName("order-ui__list")[0].getElementsByClassName("order-ui__item")[slot];
        const img = document.createElement("img");
        img.src = "../models/"+itemName+"Image.jpg";
        img.style.width = "50%";
        img.style.height = "50%";
        img.style.border = "2px solid #e22b77";
        img.style.borderRadius = "50%";

        div.appendChild(img);

        this.orderlist[slot] = itemName;  
    }

    clearItem(slot){
        const div = document.getElementsByClassName("order-ui")[0].getElementsByClassName("order-ui__list")[0].getElementsByClassName("order-ui__item")[slot];
        div.innerHTML = "";

    }

    start(list){
        this.orderlist = list;
        this.score = 0;
        this.orderLength = list.length;
        // add icons to the html 
        for(var i=0; i<this.orderlist.length;){

            this.setItem(i, this.orderlist[i]);
            i++;
        }
    }


    clear(){
        for(var i=0; i<this.orderlist.length+1;){
            this.clearItem(i);
            i++;
        }
    }

    next(){ // remove the first item in the orderlist and update the html

        this.score++;  
        console.log(this.orderlist);
        this.orderlist = this.orderlist.slice(1);
        for(var i=0; i<this.orderlist.length;){
            this.clearItem(i);
            this.setItem(i, this.orderlist[i]);
            i++;
        }
        this.clearItem(this.orderLength - this.score - 1);
    }

    checkNext(itemName){
        if(this.orderlist[0] == itemName){
            return true;
        }
        return false;
    }

    empty(){
        if(this.orderlist.length == 0){
            return true;
        }
        return false;
    }

    destroy(){
        this.clear();
    }

    getScore(){
        return Math.floor((this.score/this.orderLength)*100);  
    }

}