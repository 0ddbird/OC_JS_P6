import { galeryFactory } from '../factories/galery.js';
import { photographerFactory } from '../factories/photographer.js';

export async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

// Append HTML elements to profile.html
export async function displayProfile(photographerArray) {
    const photographerSection = document.getElementById('photographer-section');
    const photographerModel = photographerFactory(photographerArray);
    const userSectionDOM = photographerModel.getUserSectionDOM();
    photographerSection.appendChild(userSectionDOM);
}

export async function displayGalery(galery) {
    const galerySection = document.getElementById('galery-section');

    galery.forEach((mediaObject) => {
        const mediaThumbnail = galeryFactory(mediaObject);
        const mediaThumbnailDOM = mediaThumbnail.getThumbnailDOM();
        galerySection.appendChild(mediaThumbnailDOM);
    })
}

// Widget with price and total likes
export async function displayPrice(photographerArray) {
    const price = photographerArray.price;
    const widget = document.getElementById('widget');
    const priceTag = document.createElement('span');
    priceTag.textContent = `${price}€/jour`;
    widget.appendChild(priceTag);
}

export async function displayLikes(total) {
    const widget = document.getElementById('widget');
    const likeCount = document.createElement('span');
    likeCount.textContent = total + '<3';
    widget.appendChild(likeCount);
}