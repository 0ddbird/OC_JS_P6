import { getPhotographerId, getGalery } from './query.js';
import { displayGalery } from './display.js';
import { addDynamicDOMListeners } from './events.js';
import { displayDOMCheckboxState } from './likes.js';

export async function updateGalery(sortOption) {
    const photographerId = getPhotographerId();
    const photographerGalery = await getGalery(photographerId);
    let sortedGalery = sortGalery(photographerGalery, sortOption);
 
    await displayGalery(sortedGalery);
    bufferMedias();
    displayDOMCheckboxState(photographerId);
    addDynamicDOMListeners(photographerId, photographerGalery);
};

function sortGalery(galery, sortOption) {
    let sortedGalery = galery;

    switch (sortOption) {
        case 'date': {
            let sorted = sortedGalery.sort((a, b) => a.date.localeCompare(b.date)).reverse();
            return sorted;
        }
        case 'title': {
            let sorted = sortedGalery.sort((a, b) => a.title.localeCompare(b.title));
            return sorted;
        }
        case 'popularity':
        default: {
            let sorted = sortedGalery.sort((a, b) => a.likes - b.likes).reverse();
            return sorted;
        }
    }
}

function bufferMedias() {
    let galeryDOM = document.querySelectorAll('.media-article_media');

    galeryDOM.forEach((media) => {
        media.addEventListener("load", removeLoadingClass(media));
    });

    function removeLoadingClass(media) {
        media.classList.remove('buffer');
    }
}