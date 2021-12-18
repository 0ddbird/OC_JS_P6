import { addContactModalListeners } from '../modules/contact/contact_listeners.js';
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

export async function addMediaListeners() {
    const mediaDOM = document.querySelectorAll('.media-article_media');

    mediaDOM.forEach((media) => {
        
        media.addEventListener('click', function(e) {
            const mediaId = parseInt(this.dataset.id);
            openLightboxModal(mediaId);
        });
        media.addEventListener('keypress', function(e) {
            const mediaId = parseInt(this.dataset.id);
            if (e.key ==='Enter') openLightboxModal(mediaId);
        }, true);
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
        checkbox.addEventListener('keydown', async function (e) {
            if (e.key === 'Enter') {
                if(this.checked) {
                    this.checked = false;
                } else {
                    this.checked = true;
                }
                toggleCheckbox(this, photographerId, photographerGalery);
            }
        })
    });
}