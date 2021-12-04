import { getPhotographersArray } from "../components/query.js";
import { displayData } from '../components/display.js';

/**
 * Main function of index.html
 */
async function indexInit() {
    const photographers = await getPhotographersArray();
    displayData(photographers); 
};

indexInit();