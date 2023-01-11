import Entity from "./Entity.js";

export default class order extends Entity {

    constructor(parent, name, id){
        super(0,0,0,0,0,0,1,1,1,{},parent,name);
        this.orderlist = [];
    }

    setItem(slot, itemName){
        const div = document.getElementsByClassName("order-ui")[0].getElementsByClassName("order-ui__list")[0].getElementsByClassName("order-ui__item")[slot];
        // const img = document.createElement("img");

        // img.src = "../models/"+itemName+"Image.jpg";
        // img.style.width = "100%";
        // img.style.height = "100%";
        // div.appendChild(img);

        this.orderlist[slot] = itemName;  
    }

    start(list){
        // this.orderlist = list;
        // // add icons to the html 
        // for(var i=0; i<this.orderlist.length;){
        //     this.setItem(i, this.orderlist[i]);
        // }
    }

    update(list){
        for(var i=0; i<this.orderlist.length; i++){
            if(this.orderlist[i] != list[i]){
                this.setItem(i, list[i]);
            }
        }

        this.orderlist = list;
    }

    destroy(){
        // remove icons from html
        for(var i=0; i<this.orderlist.length; i++){
            const div = document.getElementById("order-"+i);
            div.removeChild(div.childNodes[0]);
        }
    }

}