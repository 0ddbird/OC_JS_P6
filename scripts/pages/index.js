import { displayPhotographers } from '../components/display.js';
import {getPhotographers} from '../components/query.js';

async function indexInit() {
    const photographers = await getPhotographers();
    displayPhotographers(photographers); 
};

indexInit();