// Get Photographer ID from URL.
function getPhotographerId() {
    return parseInt(new URLSearchParams(window.location.search).get('id'));
}

// Fetch photographer data in object : returns a single object matching the photographer ID
async function getPhotographer(data) {
    return data.photographers.find(photographer => photographer.id === getPhotographerId())
}

// Fetch galery content data in object : returns multiple objects matching the photographer ID
async function getGalery(data) {
    return data.media.filter(element => element.photographerId === getPhotographerId())
}

// Append HTML elements to profile.html

async function displayProfile(photographerObject) {
    const photographerSection = document.getElementById('photographer-section');
    const photographerModel = photographerFactory(photographerObject)
    const userSectionDOM = photographerModel.getUserSectionDOM();
    photographerSection.appendChild(userSectionDOM);
}

async function displayGalery(galeryObject) {
    const galerySection = document.getElementById('galery-section');
    galeryObject.forEach((mediaObject) => {
        const mediaThumbnail = galeryFactory(mediaObject);
        const mediaThumbnailDOM = mediaThumbnail.getThumbnailDOM();
        galerySection.appendChild(mediaThumbnailDOM)
    })
}

// Main function of profile.html
async function init() {
    const response = await fetch('./data/photographers.json')
    const data = await response.json()

    displayProfile(await getPhotographer(data));
    displayGalery(await getGalery(data));
}

init();