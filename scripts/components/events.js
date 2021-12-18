import { openContactModal, closeContactModal } from '../utils/modal_form.js';
import { openListbox, handleOption, closeListbox } from './listbox.js';
import { openLightboxModal } from '../modules/lightbox/lightbox.js';
import { toggleCheckbox } from './likes.js';

export function addDynamicDOMListeners(photographerId, photographerGalery) {
    addMediaListeners();
    addLikesListeners(photographerId, photographerGalery);
}

export function addStaticDOMListeners() {
    addListboxListeners();
    addContactModalListeners();
}

function addListboxListeners() {
    const listboxContainer = document.getElementById('listbox-container');
    const listboxOptions = new Array (
        document.getElementById('listbox-popularity'), 
        document.getElementById('listbox-date'), 
        document.getElementById('listbox-title')
    );

    listboxContainer.addEventListener('click', function() {
        openListbox();
    });
    listboxContainer.addEventListener('keydown', function(e){
        if (e.key === 'Enter' && document.activeElement === listboxContainer) {
            e.stopPropagation();
            openListbox();
        }
    }, true);

    listboxContainer.addEventListener('focusout', function(e) {
        if (!listboxContainer.contains(e.relatedTarget)) {
            closeListbox();
        }
    });

    listboxOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            handleOption(option);
        });
    })
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

export async function addMediaListeners() {
    const articlesDOM = document.querySelectorAll('.media-article');
    articlesDOM.forEach((article) => {
        
        article.addEventListener('click', function(e) {
            const mediaId = parseInt(this.dataset.id);
            openLightboxModal(mediaId);
        });
        article.addEventListener('keypress', function(e) {
            const mediaId = parseInt(this.dataset.id);
            if (e.key ==='Enter') openLightboxModal(mediaId);
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