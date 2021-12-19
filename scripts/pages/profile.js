import { getPhotographerId, getGalery } from '../components/query.js';
import { displayProfile } from '../components/display.js';
import { updateGalery } from '../components/updategalery.js';
import { createWidget } from '../components/widget.js'
import { addStaticDOMListeners } from '../components/events.js';
import { addObserver } from '../components/observer.js';

async function init() {
    const photographerId = getPhotographerId();
    const galery = await getGalery(photographerId);

    displayProfile(photographerId);
    await updateGalery();
    createWidget(photographerId, galery);
    addStaticDOMListeners();
    addObserver();
}
await init();


/* Debug - to remove
window.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') console.log(document.activeElement, e.key);
})
 */