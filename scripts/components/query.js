/**
 * Fetch json file and returns JS object.
 * @returns {object} an object containing 2 keys, photographers and media
 */
export async function getJsonData() {
    const response = await fetch('./data/photographers.json');
    return await response.json();
}
/**
 * Get the photographer ID from the variable in URL.
 * @returns {number} returns an integer: the photographer ID.
 */
export async function getPhotographerId() {
    return parseInt(new URLSearchParams(window.location.search).get('id'));
}
/**
 * Get a list of photographers
 * @returns {array} Returns an array of objects (photographers).
 */
export async function getPhotographersArray() {
    const data = await getJsonData()
    return data.photographers
}
/**
 * Find a single photographer object in an array.
 * @param {array} data array containing multiple objects.
 * @param {number} id  id of the photographer.
 * @returns {number} returns a single object matching the photographer ID.
 */
export async function getPhotographerObject(data, photographerId) {
    return data.photographers.find(photographer => photographer.id === photographerId);
}
/**
 * Fetch galery content data in object
 * @param {array} data an object containing 2 keys: photographers and media.
 * @param {number} id  id of the photographer.
 * @returns {array} returns and array containing multiple objects that match the photographer ID.
 */
export async function getGaleryArray(data, photographerId) {
    const result = data.media.filter(element => element.photographerId === photographerId);
    return await fixMediaTitles(result);
}
/**
 * Fix missing title for videos
 * @param {array} data an array of objects (medias)
 * @returns {array} an array of objects (medias) with fixed title value.
 */
async function fixMediaTitles(data) {
    data.forEach(element => {
        if (element.title === undefined) {
            element.title = element.video.replace(/_/g, " ").replace('.mp4', "");
        }
    });
    return data;
}