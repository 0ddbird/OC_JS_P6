import { displayPhotographers } from '../components/display.js';
import { getJsonData, getPhotographers } from '../components/query.js';
import { fixJsonAlts } from '../utils/fixjsonalts.js';

/**
 * Init sequence on profile.html load.
 */
async function init() {
    const photographers = await getPhotographers();
    displayPhotographers(photographers); 
};

init();

const jsonData = await getJsonData();
fixJsonAlts(jsonData);