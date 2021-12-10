import { galeryFactory } from '../factories/galery.js';
import { photographerFactory } from '../factories/photographer.js';
import { getCheckboxState } from './query.js';

export async function displayPhotographers(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
    bufferPhotographers();
    
};

export async function displayProfile(photographer) {
    const photographerSection = document.getElementById('photographer-section');
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

// Photographer widget
export async function createPhotographerWidget() {
    const body = document.getElementsByTagName('body')[0];
    const widget = document.createElement('div');
    widget.setAttribute('id', 'widget');
    const likeCount = document.createElement('span');
    likeCount.setAttribute('id', 'widget__like-count')
    widget.appendChild(likeCount);
    body.appendChild(widget);
}

export async function displayPrice(photographer) {
    const price = photographer.price;
    const widget = document.getElementById('widget');
    const priceTag = document.createElement('span');
    priceTag.textContent = `${price}€/jour`;
    widget.appendChild(priceTag);
}

export async function computeLikes(galery) {
    return galery.reduce((acc, curr) => acc + curr.likes, 0);
}

export async function updatePhotographerWidget(galery) {
    
    const widgetLikes = document.getElementById('widget__like-count');
    widgetLikes.textContent = await computeLikes(galery);
    
}

export async function updateCheckboxState(photographerId) {
    const photographerCheckboxes = getCheckboxState(photographerId);
    if (photographerCheckboxes != undefined) {
        photographerCheckboxes.forEach(checkbox => {
        const selectedCheckbox = document.getElementById(`${checkbox}`)
        selectedCheckbox.setAttribute('checked', true)
    });
    }
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