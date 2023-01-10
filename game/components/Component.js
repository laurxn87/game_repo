export default class Component
{
    constructor(parentEntity, name, id)
    {
        this.parent = parentEntity;
        this.name = name;
        this.id = id;

    }

    name(){ return this.constructor.name; }

    start(){

    }

    update(){

    }

    getComponent(id){
        return this;
    }

    getParentEntity(){
        return this.parent;
    }

    destroy(){
        this.parent = null;
    }
}