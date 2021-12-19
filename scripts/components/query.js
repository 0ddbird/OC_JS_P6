const jsonData = await getJsonData();

/**
 * Returns the current photographer ID in profile.html
 * @returns {number} photographerId
 */
export function getPhotographerId() {
    return parseInt(new URLSearchParams(window.location.search).get('id'));
}

/**
 * Fetches the json Data and returns it
 * @returns {promise} resolve is an object with 2 keys, photographers and data.
 */
export async function getJsonData() {
    const response = await fetch('./data/photographers.json');
    return await response.json();
}

/**
 * Gets all photographers objects from the json Data
 * @returns {promise} resolve is an array of photographers objects.
 */
export async function getPhotographers() {
    return jsonData.photographers
}

/**
 * Gets a specific photographer object from json Data
 * @param {number} photographerId 
 * @returns {promise} resolve is an object with the photographer's profile data.
 */
export async function getProfile(photographerId) {
    return jsonData.photographers.find(photographer => photographer.id === photographerId);
}

/**
 * Gets the latest version of the galery in session storage. If none, gets it from the json and saves it in sessionStorage.
 * @param {number} photographerId 
 * @returns {promise} an array of objects (photographer's medias)
 */
export async function getGalery(photographerId) {
    let sessionGalery = await getSessionGalery(photographerId);
    if (!sessionGalery) {
        console.info('No galery in sessionStorage yet. Creating one.')
        sessionGalery = await getInitialGalery(photographerId);
        setSessionGalery(photographerId, sessionGalery);
    }
    return sessionGalery;
};

/**
 * Gets a specific photographer galery in sessionStorage.
 * @param {number} photographerId 
 * @returns {array} of objects (photographer's medias)
 */
export function getSessionGalery(photographerId) {
    return JSON.parse(sessionStorage.getItem(photographerId));
}

/**
 * Gets a specific photographer galery in json Data (on first profile page load for this photographer)
 * @param {number} photographerId 
 * @returns {promise} resolve: an array of objects (photographer's medias)
 */
export async function getInitialGalery(photographerId) {
    const result = jsonData.media.filter(element => element.photographerId === photographerId);
    return await fixMediaTitles(result);
}

/**
 * Sets a specific photographer galery in sessionStorage
 * @param {number} photographerId 
 * @param {array} galery 
 */
export function setSessionGalery(photographerId, galery) {
    sessionStorage.setItem(photographerId, JSON.stringify(galery));
}

/**
 * Creates a title for medias of type "video". Title is made of the file name without any blanks nor extension.
 * @param {array} data 
 * @returns array of objects
 */
async function fixMediaTitles(data) {
    data.forEach(element => {
        if (element.title === undefined) element.title = element.video.replace(/_/g, " ").replace('.mp4', "");
    });
    return data;
}

/**
 * Asserts if the browser supports HTML Templates
 * @returns {boolean}
 */
export function supportsTemplates() {
    return 'content' in document.createElement('template');
}