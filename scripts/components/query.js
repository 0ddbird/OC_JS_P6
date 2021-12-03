export async function getPhotographers() {
    let response = await fetch('./data/photographers.json');
    let data = await response.json();
    return data.photographers;
}

export async function getData() {
    const response = await fetch('./data/photographers.json');
    return await response.json();
}

// Get Photographer ID from URL.
export async function getPhotographerId() {
    return parseInt(new URLSearchParams(window.location.search).get('id'));
}

// Fetch photographer data in object : returns a single object matching the photographer ID
export async function getPhotographer(data, id) {
    return data.photographers.find(photographer => photographer.id === id);
}

// Fetch galery content data in object : returns multiple objects matching the photographer ID
export async function getGalery(data, id) {
    let result = data.media.filter(element => element.photographerId === id);
    //Fix missing title for videos
    result.forEach(element => {
        if (element.title === undefined) {
            element.title = element.video.replace(/_/g, " ").replace('.mp4', "");
        }
    });
    return result;
}