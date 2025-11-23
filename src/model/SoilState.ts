export default class SoilState {
    /** PH/Acidity: float 0 to 14 (plants generally between 5.5 and 7.5) */
    ph: number;
    /** float 0 to 1 */
    moisture: number;
    /** float 0 to 1 */
    aeration: number;
    /** Drainage: float 0 to 1. Impacts how quickly soil dries */
    drainage: number;
    /** Nitrogen: float 0 to 1 */
    nitrogen: number;

    constructor(){
        this.ph = 7;
        this.moisture = 0;
        this.aeration = 0;
        this.drainage = 0;
        this.nitrogen = 0;
    }
}