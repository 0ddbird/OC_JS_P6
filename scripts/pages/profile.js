// Get Photographer ID from URL.
function getPhotographerId() {
    return parseInt(new URLSearchParams(window.location.search).get('id'))
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
    const photographerSection = document.getElementById('photographer-section')
    const photographerModel = photographerFactory(photographerObject)
    const userSectionDOM = photographerModel.getUserSectionDOM()
    photographerSection.appendChild(userSectionDOM)
}

async function displayGalery(galeryObject) {
    const galerySection = document.getElementById('galery-section')
    galeryObject.forEach((mediaObject) => {
        const mediaThumbnail = galeryFactory(mediaObject)
        const mediaThumbnailDOM = mediaThumbnail.getThumbnailDOM()
        galerySection.appendChild(mediaThumbnailDOM)
    })
}

async function displayPrice(photographerObject) {
    const price = photographerObject.price
    const widget = document.getElementById('widget')
    const priceTag = document.createElement('span')
    priceTag.textContent = `${price}€/jour`
    widget.appendChild(priceTag)
}

async function computeLikes(galeryObject) {
    return Object.values(galeryObject).reduce((acc, {likes}) => acc + likes, 0)
}

async function displayLikes(total) {
    const widget = document.getElementById('widget')
    const likeCount = document.createElement('span')
    likeCount.textContent = total + '<3';
    widget.appendChild(likeCount)
}

// Main function of profile.html
async function init() {
    const response = await fetch('./data/photographers.json')
    const data = await response.json()

    const photographer = await getPhotographer(data)
    const galery = await getGalery(data)

    displayProfile(photographer)
    displayPrice(photographer)
    displayGalery(galery)
    displayLikes(await computeLikes(galery))
}

init()