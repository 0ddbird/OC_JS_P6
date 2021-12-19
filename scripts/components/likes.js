import {setSessionGalery} from './query.js';
import {updateWidget} from './widget.js';

let allCheckboxStates = [];

/**
 * Sets the input checkbox checked attribute to true in profile.html
 * @param {number} photographerId 
 */
export function displayDOMCheckboxState(photographerId) {
    const photographerCheckboxes = getCheckboxState(photographerId);
    if ( photographerCheckboxes ) {
        photographerCheckboxes.forEach(checkbox => {
        const selectedCheckbox = document.getElementById(`${checkbox}`);
        selectedCheckbox.setAttribute('checked', true);
        });
    }
}

/**
 * Gets the ids of medias liked in a specific photographer galery
 * @param {number} photographerId 
 * @returns {array} array of strings (media ids)
 */
export function getCheckboxState(photographerId) {
    const photographerCheckbox = sessionStorage.getItem(`${photographerId}-checkboxes`);
    if (photographerCheckbox) return [...sessionStorage.getItem(`${photographerId}-checkboxes`).split(',')];
}

/**
 * Updates the number of likes for a media depending on its like checkbox is checked or not.
 * Saves the value in the sessionStorage photographer galery
 * Updates the photographer profile widget (total Likes)
 * @param {Element} checkbox 
 * @param {number} photographerId 
 * @param {array} photographerGalery 
 */
export function toggleCheckbox(checkbox, photographerId, photographerGalery) {
    const checkboxId = parseInt(checkbox.id);
    const checked = checkbox.checked;
    const matchingMedia = photographerGalery.find(media => media.id === checkboxId);
    const mediaLikesCount = document.getElementById(`${checkboxId}-likes`);
    let mediaLikesCountInt = parseInt(mediaLikesCount.textContent);

    if (checked) {
        matchingMedia.likes += 1;
        mediaLikesCountInt +=1;
        setCheckboxState(photographerId, checkboxId, true);
    } else {
        matchingMedia.likes -=1;
        mediaLikesCountInt -=1;
        setCheckboxState(photographerId, checkboxId, false);
    }
    mediaLikesCount.textContent = mediaLikesCountInt;
    setSessionGalery(photographerId, photographerGalery);
    updateWidget(photographerGalery);
}

/**
 * Stores the checked checkbox ids in sessionStorage (key: photographer id, value: an array of strings)
 * @param {number} photographerId 
 * @param {string} checkboxId 
 * @param {boolean} checked 
 */
export function setCheckboxState(photographerId, checkboxId, checked) {
    if (checked === true) {
        allCheckboxStates.push(checkboxId);
    } else {
        let indexOfId = allCheckboxStates.indexOf(checkboxId);
        allCheckboxStates.splice(indexOfId, 1);
    }
    sessionStorage.setItem(`${photographerId}-checkboxes`, allCheckboxStates);
}