import {setSessionGalery} from './query.js';
import {updateWidget} from './widget.js';

let allCheckboxStates = [];

export function displayDOMCheckboxState(photographerId) {
    const photographerCheckboxes = getCheckboxState(photographerId);
    if ( photographerCheckboxes ) {
        photographerCheckboxes.forEach(checkbox => {
        const selectedCheckbox = document.getElementById(`${checkbox}`);
        selectedCheckbox.setAttribute('checked', true);
        });
    }
}

export function getCheckboxState(photographerId) {
    const photographerCheckbox = sessionStorage.getItem(`${photographerId}-checkboxes`);
    if (photographerCheckbox) return [...sessionStorage.getItem(`${photographerId}-checkboxes`).split(',')];
}

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

export function setCheckboxState(photographerId, checkboxId, checked) {
    if (checked === true) {
        allCheckboxStates.push(checkboxId);
    } else {
        let indexOfId = allCheckboxStates.indexOf(checkboxId);
        allCheckboxStates.splice(indexOfId, 1);
    }
    sessionStorage.setItem(`${photographerId}-checkboxes`, allCheckboxStates);
}