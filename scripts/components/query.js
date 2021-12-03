export const data = await getData();
export const id = await getPhotographerId();

/**
 * Fetch json file and returns JS object.
 * @returns {object} an object containing 2 keys, photographers and media
 */
async function getData() {
    const response = await fetch('./data/photographers.json');
    return await response.json();
}

/**
 * Get a list of photographers
 * @returns {array} Returns an array of objects (photographers).
 */
export async function getPhotographers() {
    const data = await getData()
    return data.photographers
}

/**
 * Find a single photographer object in an array.
 * @param {array} data array containing multiple objects.
 * @param {number} id  id of the photographer.
 * @returns {number} returns a single object matching the photographer ID.
 */
export async function getPhotographer(data, id) {
    return data.photographers.find(photographer => photographer.id === id);
}

/**
 * Get the photographer ID from the variable in URL.
 * @returns {number} returns an integer: the photographer ID.
 */
async function getPhotographerId() {
    return parseInt(new URLSearchParams(window.location.search).get('id'));
}

/**
 * Fetch galery content data in object
 * @param {array} data an object containing 2 keys: photographers and media.
 * @param {number} id  id of the photographer.
 * @returns {array} returns and array containing multiple objects that match the photographer ID.
 */
export async function getGalery(data, id) {
    const result = data.media.filter(element => element.photographerId === id);
    return await fixTitles(result);
}

/**
 * Fix missing title for videos
 * @param {array} data an array of objects (medias)
 * @returns {array} an array of objects (medias) with fixed title value.
 */
async function fixTitles(data) {
    data.forEach(element => {
        if (element.title === undefined) {
            element.title = element.video.replace(/_/g, " ").replace('.mp4', "");
        }
    });
    return data;
}