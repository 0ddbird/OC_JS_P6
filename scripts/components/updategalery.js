import { setPhotographerGalery, getPhotographerId, setCheckboxState, getCurrentPhotographerGalery } from './query.js';
import { displayGalery, updateCheckboxState, updatePhotographerWidget } from './display.js';
import { addMediaEventListeners } from '../components/modal_lightbox.js';

export async function updateGalery(sortOption) {

    const photographerId = getPhotographerId();
    const photographerGalery = await getCurrentPhotographerGalery();
    let sortedGalery = await sortGalery(photographerGalery, sortOption);

    displayGalery(sortedGalery);
    bufferMedias();
    updateCheckboxState(photographerId);
    const allArticles = document.querySelectorAll('.media-article');
    addMediaEventListeners(photographerId, allArticles, photographerGalery);

    const likeCheckboxes = [...document.querySelectorAll('.media-article_details_like-module_input')];
    const likeLabels = [...document.querySelectorAll('.media-article_details_like-module_label')];

    likeLabels.forEach(label => {
        label.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    });

    likeCheckboxes.forEach(checkbox => {

        checkbox.addEventListener('click', function (e) {
            e.stopPropagation();
        });

        checkbox.addEventListener('change', async function() {
            const checkboxId = parseInt(this.id);
            const checked = this.checked;
            const matchingMedia = photographerGalery.find(media => media.id === checkboxId);
            const mediaLikesCount = document.getElementById(`${checkboxId}-likes`);
            let mediaLikesCountInt = parseInt(mediaLikesCount.textContent);

            if (checked) {
                matchingMedia.likes += 1;
                mediaLikesCountInt +=1;
                setCheckboxState(photographerId, checkboxId, true);
            } else {
                matchingMedia.likes -=1;
                mediaLikesCountInt -=1;
                setCheckboxState(photographerId, checkboxId, false);
            }
            mediaLikesCount.textContent = mediaLikesCountInt;
            setPhotographerGalery(photographerId, photographerGalery);
            
            updatePhotographerWidget(photographerGalery);
        });
    });
};

async function sortGalery(galery, sortOption) {
    let sortedGalery = galery;
    let sortType = sortOption;

    if (sortType === undefined) {
        sortType = document.getElementById('select').value
    }

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
    let allGaleryMediasDOM = document.querySelectorAll('.media-article_media');

    allGaleryMediasDOM.forEach((media) => {
        media.addEventListener("load", removeLoadingClass(media));
    });

    function removeLoadingClass(media) {
        media.classList.remove('buffer');
    }
}