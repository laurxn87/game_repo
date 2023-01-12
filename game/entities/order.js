import Entity from "./Entity.js";

export default class order extends Entity {

    constructor(parent, name, id){
        super(0,0,0,0,0,0,1,1,1,{},parent,name);
        this.orderlist = [];
    }

    setItem(slot, itemName){
        const div = document.getElementsByClassName("order-ui")[0].getElementsByClassName("order-ui__list")[0].getElementsByClassName("order-ui__item")[slot];
        const img = document.createElement("img");
        img.src = "../models/"+itemName+"Image.jpg";
        img.style.width = "25%";
        img.style.height = "25%";

        div.appendChild(img);

        this.orderlist[slot] = itemName;  
    }

    clearItem(slot){
        const div = document.getElementsByClassName("order-ui")[0].getElementsByClassName("order-ui__list")[0].getElementsByClassName("order-ui__item")[slot];
        div.removeChild(div.childNodes[0]);
        this.orderlist[slot] = "empty";
    }

    start(list){
        this.orderlist = list;
        // add icons to the html 
        for(var i=0; i<this.orderlist.length;){

            this.setItem(i, this.orderlist[i]);
            i++;
        }
    }


    clear(){
        for(var i=0; i<this.orderlist.length;){
            this.setItem(i, "empty");
            i++;
        }
    }

    next(){ // remove the first item in the orderlist and update the html
        for(var i=0; i<this.orderlist.length-1;){
            this.clearItem(i);
            this.setItem(i, this.orderlist[i+1]);
            i++;
        }
        this.orderlist.shift();
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
        // remove icons from html
        for(var i=0; i<this.orderlist.length; i++){
            const div = document.getElementById("order-"+i);
            div.removeChild(div.childNodes[0]);
        }
    }

}