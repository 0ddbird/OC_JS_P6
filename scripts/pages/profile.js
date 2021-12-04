import { getJsonData, getPhotographerObject, getGaleryArray, getPhotographerId } from '../components/query.js';
import { displayProfile, displayPrice, displayLikes } from '../components/display.js';
import { updateGalery } from '../components/updategalery.js';
import { computeLikes } from '../components/widget.js';
import { storeCurrentData } from '../components/storage.js';

/**
 * Main function of profile.html
 */
async function profileInit() {
    const jsonData = await getJsonData();
    const photographerId = await getPhotographerId();
    const photographer = await getPhotographerObject(jsonData, photographerId);
    const galery = await getGaleryArray(jsonData, photographerId);
    let totalLikes = await computeLikes(galery);

    displayProfile(photographer);
    displayPrice(photographer);
    updateGalery(galery);
    displayLikes(totalLikes);
    storeCurrentData(galery);
}

profileInit();