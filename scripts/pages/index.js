import { photographersArray } from "../components/query.js";
import { displayPhotographers } from '../components/display.js';

/**
 * Main function of index.html
 */
async function indexInit() {
    displayPhotographers(photographersArray); 
};

indexInit();