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
    bufferMedias();

    // ADD EVENT LISTENER TO SELECT INPUT
    document.getElementById('select').addEventListener('change', function() {
        updateGalery(this.value)
    });

    // ADD EVENT LISTENER TO CONTACT BUTTON
    document.getElementById('contact-me_button').addEventListener('click', async function() {
        openContactModal();
    });

    // ADD EVENT LISTENER TO CLOSE MODAL BUTTON
    document.getElementById('contact-modal_close-button').addEventListener('click', function () {
        closeContactModal();
    });


    async function openContactModal() {
        const contactModal = document.getElementById('contact_modal');
        contactModal.style.setProperty('display', 'flex');
        const contactModalTitle  = document.getElementById('contact_modal_title');
        const photographerProfile = await getPhotographerProfile(getPhotographerId());
        const photographerName = photographerProfile.name;
        contactModalTitle.textContent = `Contactez-moi ${photographerName}`;
    };

    function closeContactModal() {
        const contactModal = document.getElementById('contact_modal');
        contactModal.style.setProperty('display', 'none');
    }

    
}

await init();

function bufferMedias() {
    let allGaleryMediasDOM = document.querySelectorAll('.media-article_media');

    allGaleryMediasDOM.forEach((media) => {
        media.addEventListener("load", removeLoadingClass(media));
    });

    function removeLoadingClass(media) {
        media.classList.remove('buffer');
    }
}
