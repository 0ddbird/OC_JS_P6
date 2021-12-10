import { getPhotographerId, setPhotographerGalery, getCurrentPhotographerGalery, getPhotographerProfile, getInitialPhotographerGalery, getCheckboxState } from '../components/query.js';
import { displayProfile, displayPrice, createPhotographerWidget, updatePhotographerWidget, updateCheckboxState} from '../components/display.js';
import { updateGalery } from '../components/updategalery.js';

async function init() {

    const photographerId = getPhotographerId();
    const photographerObject = await getPhotographerProfile(photographerId);

    if (getCurrentPhotographerGalery() === null) {
        const initialPhotographerGalery = await getInitialPhotographerGalery(photographerId);
        await setPhotographerGalery(photographerId, initialPhotographerGalery);
    }
    const photographerGalery = await getCurrentPhotographerGalery(photographerId);
    getCheckboxState()
    displayProfile(photographerObject);
    
    await updateGalery();
    updateCheckboxState(photographerId);
    createPhotographerWidget();
    displayPrice(photographerObject);
    updatePhotographerWidget(photographerGalery);
}

init();

// Add event listener to select in HTML.
document.getElementById('select').addEventListener('change', function() {
    updateGalery(this.value)
});

