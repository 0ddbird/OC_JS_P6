import { openContactModal, closeContactModal, submitContactForm } from './contact.js'

export function addFormListener() {
    const form = document.forms["contact-form"];
    form.addEventListener("submit", submitContactForm);
}

export function removeFormListener() {
    const form = document.forms["contact-form"];
    form.removeEventListener("submit", submitContactForm);
}

export function addContactModalListeners() {
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