import { getPhotographerId, getGalery } from '../components/query.js';
import { displayProfile } from '../components/display.js';
import { updateGalery } from '../components/updategalery.js';
import { createWidget } from '../components/widget.js'
import { addStaticDOMListeners } from '../components/events.js';

async function init() {
    const photographerId = getPhotographerId();
    const galery = await getGalery(photographerId);

    displayProfile(photographerId);
    await updateGalery();
    createWidget(photographerId, galery);
    addStaticDOMListeners();
}
await init();