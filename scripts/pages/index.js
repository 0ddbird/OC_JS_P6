import { getPhotographers } from "../components/query.js";
import { displayData } from '../components/display.js';

async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers();
    displayData(photographers); 
};

init();