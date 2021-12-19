import { galeryFactory } from '../factories/galery.js';
import { photographerFactory } from '../factories/photographer.js';
import { getProfile } from './query.js';

/**
 * Appends photographers articles in the in index.html DOM
 * @param {array} photographers 
 */
export async function displayPhotographers(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
    bufferPhotographers();
};

/**
 * Appends the photographer profile data to profile.html
 * @param {number} photographerId 
 */
export async function displayProfile(photographerId) {
    const photographerSection = document.getElementById('photographer-section');
    const photographer = await getProfile(photographerId)
    const photographerModel = photographerFactory(photographer);
    const userSectionDOM = photographerModel.getUserSectionDOM();
    photographerSection.appendChild(userSectionDOM); 
}

/**
 * Appends the photographer medias to index.html on first load.
 * @param {array} galery 
 */
export async function displayGalery(galery) {
    const galerySection = document.getElementById('galery-section');
    galerySection.innerHTML='';

    galery.forEach((mediaObject) => {
        const mediaThumbnail = galeryFactory(mediaObject);
        const mediaThumbnailDOM = mediaThumbnail.getThumbnailDOM();
        galerySection.appendChild(mediaThumbnailDOM);
    })
}

/**
 * Adds an event listener to each article to remove a class that hides them before they're loaded.
 */
function bufferPhotographers() {
    let allPhotographersDOM = document.querySelectorAll('.photographer-article__picture');
    allPhotographersDOM.forEach((photographerPicture) => {
        photographerPicture.addEventListener("load", removeLoadingClass(photographerPicture));
    });

    function removeLoadingClass(domElement) {
        domElement.classList.remove('buffer');
    }
}