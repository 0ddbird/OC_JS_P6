import { displayGalery } from './display.js';

/**
 * Displays and updates the galery in profile.html.
 * @param {array} galery an array of objects (medias).
 */
export async function updateGalery(galery, sortOption) {
    let galeryArray = galery;

    if (galeryArray === undefined) {
        galeryArray = JSON.parse(sessionStorage.getItem('galery'));
        //console.log('sessionStorage galeryArray', galeryArray);
    }

    const sortedGalery = await sortGalery(galeryArray, sortOption);
    displayGalery(sortedGalery);
}

/**
 * Sorts the galery
 * @param {array} galery an array containing the medias to display.
 * @returns {array} a sorted array.
 */
async function sortGalery(galery, sortOption) {
    let sortedGalery = galery;
    let sortType = sortOption;

    if (sortType === undefined) {
        sortType = document.getElementById('select').value
    }

    switch (sortOption) {
        case 'date': {
            let sorted = sortedGalery.sort((a, b) => a.date.localeCompare(b.date)).reverse();
            //console.log('sorted by date', sorted);
            return sorted;
        }
        case 'title': {
            let sorted = sortedGalery.sort((a, b) => a.title.localeCompare(b.title));
            //console.log('sorted by title', sorted);
            return sorted;
        }
        case 'popularity':
        default: {
            let sorted = sortedGalery.sort((a, b) => a.likes - b.likes).reverse();
            //console.log('sorted by popularity', sorted);
            return sorted;
        }
    }
}