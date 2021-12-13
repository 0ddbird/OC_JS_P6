import { openContactModal, closeContactModal } from '../utils/modal_form.js';
import { openListbox, closeListbox } from './listbox.js';
import { openLightboxModal } from '../utils/modal_lightbox.js';
import { toggleCheckbox } from './likes.js';

export function addDynamicDOMListeners(photographerId, photographerGalery) {
    addMediaListeners(photographerId, photographerGalery);
    addLikesListeners(photographerId, photographerGalery);
}

export function addStaticDOMListeners() {
    addListboxListeners();
    addContactModalListeners();
}

function addListboxListeners() {
    document.getElementById('listbox-container').addEventListener('click', function() {
        openListbox();
    });
    document.getElementById('listbox-container').addEventListener('keydown', function(e) {
        const key = e.key;
        if (key === 'Enter') {
            openListbox();
        }
    });
    document.getElementById('listbox-container').addEventListener('focusout', function(e) {
        const hasActiveChildren = document.getElementById('listbox-container').contains(document.activeElement);
        if(!hasActiveChildren) {
            closeListbox();
        }
    });
}

function addContactModalListeners() {
    document.getElementById('contact-me_button').addEventListener('click', async function() {
        openContactModal();
    });
    document.getElementById('contact-modal_close-button').addEventListener('click', function () {
        closeContactModal();
    });
    window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeContactModal();
    });
}

export async function addMediaListeners(photographerId, photographerGalery) {
    const articlesDOM = document.querySelectorAll('.media-article');
    articlesDOM.forEach((article) => {
        
        article.addEventListener('click', function() {
            const mediaId = parseInt(this.id.slice(8));
            openLightboxModal(photographerId, mediaId, photographerGalery);
        });
        article.addEventListener('keypress', function(e) {
            const mediaId = parseInt(this.id.slice(8)); 
            if (e.key ==='Enter') openLightboxModal(photographerId, mediaId, photographerGalery);
        });
    });
}

export function addLikesListeners(photographerId, photographerGalery) {
    const likeCheckboxes = [...document.querySelectorAll('.media-article_details_like-module_input')];
    const likeLabels = [...document.querySelectorAll('.media-article_details_like-module_label')];

    likeLabels.forEach(label => {
        label.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    });

    likeCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('click', function (e) {
            e.stopPropagation();
        });
        checkbox.addEventListener('change', async function() {
            toggleCheckbox(this, photographerId, photographerGalery);
        });
    });
}