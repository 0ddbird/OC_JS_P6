import { galeryFactory } from '../factories/galery.js';
import { photographerFactory } from '../factories/photographer.js';


/**
 * Appends an article for each photographer to photographer_section in homepage
 * @param {array} photographers array of object (photographers)
 */
export async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

// 
/**
 * Appends HTML elements to the photographer_section in profile.html
 * @param {object} photographer an object with the photographer's data
 */
export async function displayProfile(photographer) {
    const photographerSection = document.getElementById('photographer-section');
    const photographerModel = photographerFactory(photographer);
    const userSectionDOM = photographerModel.getUserSectionDOM();
    photographerSection.appendChild(userSectionDOM);
}

/**
 * Appends HTML elements to galery section in profile.html
 * @param {array} galery an array of objects
 */
export async function displayGalery(galery) {
    const galerySection = document.getElementById('galery-section');

    galery.forEach((mediaObject) => {
        const mediaThumbnail = galeryFactory(mediaObject);
        const mediaThumbnailDOM = mediaThumbnail.getThumbnailDOM();
        galerySection.appendChild(mediaThumbnailDOM);
    })
}

/**
 * Appends and HTML element to a div (widget) with photographer price
 * @param {object} photographer an object with data if a single photographer
 */
export async function displayPrice(photographer) {
    const price = photographer.price;
    const widget = document.getElementById('widget');
    const priceTag = document.createElement('span');
    priceTag.textContent = `${price}€/jour`;
    widget.appendChild(priceTag);
}

/**
 * Appends and HTML element to a div (widget) with photographer total likes
 * @param {number} total an integer: the total amount of likes from the photographer's galery
 */
export async function displayLikes(total) {
    const widget = document.getElementById('widget');
    const likeCount = document.createElement('span');
    likeCount.textContent = total + '<3';
    widget.appendChild(likeCount);
}