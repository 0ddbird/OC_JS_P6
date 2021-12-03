import { displayGalery } from './display.js';

export async function handleGalery(galery) {
    const sortedGalery = await sortGalery(galery);
    await displayGalery(sortedGalery);
}

async function sortGalery(galery) {
    // cas 'titre' : trier par ordre alphabétique des valeurs pour la clé "Title"
    let sortedByTitle = galery;
    sortedByTitle.sort((a, b) => a.title - b.title);

    // Cas 'date' : trier par valeur décroissante pour la clé "Date"
    let sortedByDate = galery;
    sortedByDate.sort((a, b) => a.date.localeCompare(b.date));

    // Cas 'popularité" : trier par valeurs décroissantes pour la clé "Likes"
    let sortedByPopularity = galery;
    sortedByPopularity.sort((a, b) => a.likes - b.likes);

    /* console.log('title', sortedByTitle);
    console.log('date', sortedByDate);
    console.log('popularity', sortedByPopularity);
 */
    return galery;
}