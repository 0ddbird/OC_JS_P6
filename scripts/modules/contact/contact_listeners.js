import { openContactModal, closeContactModal, submitContactForm } from './contact.js'

/**
 * Adds contact form Submit Event Listener
 */
export function addFormListener() {
    const form = document.forms["contact-form"];
    form.addEventListener("submit", submitContactForm);
}

/**
 * Removes contact form Submit Event Listener
 */
export function removeFormListener() {
    const form = document.forms["contact-form"];
    form.removeEventListener("submit", submitContactForm);
}


/**
 * Adds contact modal Event Listeners : contact button in profile.html, close button in modal, Escape keydown to close the modal.
 */
export function addContactModalListeners() {
    document.getElementById('contact-me_button').addEventListener('click', async function() {
        openContactModal();
    });
    document.getElementById('contact-modal_close-button').addEventListener('click', function () {
        closeContactModal();
    });

    window.addEventListener('keydown', function (e) {
        e.stopPropagation();
        if (e.key === 'Escape') closeContactModal();
    });
}