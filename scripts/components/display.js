import { galeryFactory } from '../factories/galery.js';
import { photographerFactory } from '../factories/photographer.js';
import { getProfile } from './query.js';

export async function displayPhotographers(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
    bufferPhotographers();
};

export async function displayProfile(photographerId) {
    const photographerSection = document.getElementById('photographer-section');
    const photographer = await getProfile(photographerId)
    const photographerModel = photographerFactory(photographer);
    const userSectionDOM = photographerModel.getUserSectionDOM();
    photographerSection.appendChild(userSectionDOM); 
}

export async function displayGalery(galery) {
    const galerySection = document.getElementById('galery-section');
    galerySection.innerHTML='';

    galery.forEach((mediaObject) => {
        const mediaThumbnail = galeryFactory(mediaObject);
        const mediaThumbnailDOM = mediaThumbnail.getThumbnailDOM();
        galerySection.appendChild(mediaThumbnailDOM);
    })
}

function bufferPhotographers() {
    let allPhotographersDOM = document.querySelectorAll('.photographer-article__picture');
    allPhotographersDOM.forEach((photographerPicture) => {
        photographerPicture.addEventListener("load", removeLoadingClass(photographerPicture));
    });

    function removeLoadingClass(domElement) {
        domElement.classList.remove('buffer');
    }
}