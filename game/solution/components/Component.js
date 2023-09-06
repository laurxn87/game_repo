export default class Component
{
    constructor(parentEntity, name, id)
    {
        this.parent = parentEntity;
        this.name = name;
        this.id = id;
    }

    /* return the name of the component
    */
    name(){ return this.constructor.name; }

    /* starts the component
    */
    start(){}

    /* updates the component
    */
    update(){}

    /* returns the component with the given id
    * @param id - the id of the component to return
    */
    getComponent(id){
        return this;
    }

    /* returns the parent entity
    */
    getParentEntity(){
        return this.parent;
    }

    /* destroys the component
    */
    destroy(){
        this.parent = null;
    }
}