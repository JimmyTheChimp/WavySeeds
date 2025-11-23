export default class PlantState {
    /** Plant Species */
    species: string;
    /** Growth Stage */
    stage: integer;

    constructor(){
        this.species = "None";
        this.stage = 0;
    }
}