const jsonData = await getJsonData();

export function getPhotographerId() {
    return parseInt(new URLSearchParams(window.location.search).get('id'));
}

export async function getJsonData() {
    const response = await fetch('./data/photographers.json');
    return await response.json();
}

export async function getPhotographers() {
    return jsonData.photographers
}

export async function getProfile(photographerId) {
    return jsonData.photographers.find(photographer => photographer.id === photographerId);
}

export async function getGalery(photographerId) {
    let sessionGalery = await getSessionGalery(photographerId);
    if (!sessionGalery) {
        console.error('No session galery yet')
        sessionGalery = await getInitialGalery(photographerId);
        setSessionGalery(photographerId, sessionGalery);
    }
    return sessionGalery;
};

export function getSessionGalery(photographerId) {
    return JSON.parse(sessionStorage.getItem(photographerId));
}

export async function getInitialGalery(photographerId) {
    const result = jsonData.media.filter(element => element.photographerId === photographerId);
    //console.log('getInitialGalery', result);
    return await fixMediaTitles(result);
}

export async function setSessionGalery(photographerId, galery) {
    //console.log('setPhotographerGalery', photographerId, galery);
    sessionStorage.setItem(photographerId, JSON.stringify(galery));
}

async function fixMediaTitles(data) {
    data.forEach(element => {
        if (element.title === undefined) {
            element.title = element.video.replace(/_/g, " ").replace('.mp4', "");
        }
    });
    //console.log('fixMediaTitles', data);
    return data;
}

export function supportsTemplates() {
    return 'content' in document.createElement('template');
}