const jsonData = await getJsonData();
let allCheckboxStates = [];
export const photographersArray = await getPhotographersArray();

export function getPhotographerId() {
    return parseInt(new URLSearchParams(window.location.search).get('id'));
} 

// Index.html and profile.html
export async function getJsonData() {
    const response = await fetch('./data/photographers.json');
    return await response.json();
}

//Index.html
export async function getPhotographersArray() {
    const data = await getJsonData()
    return data.photographers
}

//Profile.html
export async function getPhotographerProfile(photographerId) {
    return jsonData.photographers.find(photographer => photographer.id === photographerId);
}

export async function getInitialPhotographerGalery(photographerId) {
    const result = jsonData.media.filter(element => element.photographerId === photographerId);
    return await fixMediaTitles(result);
}

export function getCurrentPhotographerGalery() {
    return JSON.parse(sessionStorage.getItem(getPhotographerId()));
}

async function fixMediaTitles(data) {
    data.forEach(element => {
        if (element.title === undefined) {
            element.title = element.video.replace(/_/g, " ").replace('.mp4', "");
        }
    });
    return data;
}

export async function setPhotographerGalery(photographerId, galery) {
    sessionStorage.setItem(photographerId, JSON.stringify(galery));
}

export function setCheckboxState(photographerId, checkboxId, checked) {
    if(checked === true) {
        allCheckboxStates.push(checkboxId);
    } else {
        let indexOfId = allCheckboxStates.indexOf(checkboxId);
        allCheckboxStates.splice(indexOfId, 1);
    }
    sessionStorage.setItem(`${photographerId}-checkboxes`, allCheckboxStates);
}

export function getCheckboxState(photographerId) {
    if (sessionStorage.getItem(`${photographerId}-checkboxes`)) {

        return [...sessionStorage.getItem(`${photographerId}-checkboxes`).split(',')];
    }
}

