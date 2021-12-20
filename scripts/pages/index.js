import { displayPhotographers } from '../components/display.js';
import { getPhotographers } from '../components/query.js';


/**
 * Init sequence on profile.html load.
 */
async function init() {
    const photographers = await getPhotographers();
    displayPhotographers(photographers); 
};

init();

