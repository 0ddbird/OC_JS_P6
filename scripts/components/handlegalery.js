import { displayGalery } from './display.js';

/**
 * Displays and updates the galery in profile.html.
 * @param {array} galery an array of objects (medias).
 */
export async function handleGalery(galery, sortOption) {
    const sortedGalery = await sortGalery(galery);
    await displayGalery(sortedGalery);
}

/**
 * Sorts the galery
 * @param {array} galery an array containing the medias to display.
 * @returns {array} a sorted array.
 */
async function sortGalery(galery, sortOption) {

    let sortedGalery = galery;

    switch (sortOption) {
        case 'Date': return sortedGalery.sort((a, b) => a.date.localeCompare(b.date));
        case 'Titre': return sortedGalery.sort((a, b) => a.title - b.title);
        case 'Popularité':
        default: return sortedGalery.sort((a, b) => a.likes - b.likes);
    }
}