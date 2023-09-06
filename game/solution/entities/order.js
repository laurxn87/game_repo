import Entity from "./Entity.js";

export default class order extends Entity {

    constructor(parent, name, id) {
        super(0, 0, 0, 0, 0, 0, 1, 1, 1, {}, parent, name);
        this.orderlist = [];
        this.orderLength;
        this.score;
        this.name = name;
    }

    /* starts the order 
        @param slot - the slot to add the item image to
        @param itemName - the name of the item to add
    */
    setItem(slot, itemName) {
        const div = document.getElementsByClassName("order-ui")[0].getElementsByClassName("order-ui__list")[0].getElementsByClassName("order-ui__item")[slot];
        const img = document.createElement("img");
        img.src = "../../assets/" + itemName + "Image.jpg";
        img.style.width = "50%";
        img.style.height = "50%";
        img.style.border = "2px solid #e22b77";
        img.style.borderRadius = "50%";
        div.appendChild(img);
        this.orderlist[slot] = itemName;
    }

    /* clears the order
    * @param slot - the slot to clear
    */
    clearItem(slot) {
        const div = document.getElementsByClassName("order-ui")[0].getElementsByClassName("order-ui__list")[0].getElementsByClassName("order-ui__item")[slot];
        if (div != undefined) {
            div.innerHTML = "";
        }
    }

    /* starts the order     
    * @param list - the list of items to add to the order
    */
    start(list) {
        this.orderlist = list;
        this.score = 0;
        this.orderLength = list.length;
        // add icons to the html 
        for (var i = 0; i < this.orderlist.length;) {
            this.clearItem(i);
            this.setItem(i, this.orderlist[i]);
            i++;
        }
    }

    /* clears the order */
    clear() {
        for (var i = 0; i < this.orderlist.length + 1;) {
            this.clearItem(i);
            i++;
        }
    }

    /* updates the order by shifting down */
    next() {
        this.score++;
        console.log(this.orderlist);
        this.orderlist = this.orderlist.slice(1);
        for (var i = 0; i < this.orderlist.length;) {
            this.clearItem(i);
            this.setItem(i, this.orderlist[i]);
            i++;
        }
        this.clearItem(this.orderLength - this.score - 1);
    }

    /* checks if the next item in the order is the same as the item passed in
    * @param itemName - the name of the item to check
    */
    checkNext(itemName) {
        if (this.orderlist[0] == itemName) {
            return true;
        }
        return false;
    }

    /* checks if the order is empty */
    empty() {
        if (this.orderlist.length == 0) {
            return true;
        }
        return false;
    }

    /* destroys the order */
    destroy() {
        this.clear();
    }

    /* gets the score of the order */
    getScore() {
        return Math.floor((this.score / this.orderLength) * 100);
    }

}