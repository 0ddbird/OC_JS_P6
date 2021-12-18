import { addFormListener, removeFormListener } from './contact_listeners.js';
import { getProfile, getPhotographerId } from '../../components/query.js';

export async function openContactModal() {
    const contactModal = document.getElementById('contact_modal');
    contactModal.style.setProperty('display', 'flex');
    contactModal.focus();
    const contactModalTitle  = document.getElementById('contact_modal_title');
    const photographerProfile = await getProfile(getPhotographerId());
    const photographerName = photographerProfile.name;
    contactModalTitle.textContent = `Contactez-moi ${photographerName}`;
    addFormListener();
};

export function closeContactModal() {
    const contactModal = document.getElementById('contact_modal');
    contactModal.style.setProperty('display', 'none');
    document.getElementById('contact-me_button').focus();
    removeFormListener();
};

export function submitContactForm(e) {
    e.preventDefault();
    e.stopPropagation();
    const firstNameInputDOM = document.getElementById('contact-first-name');
    const lastNameInputDOM = document.getElementById('contact-last-name');
    const emailInputDOM = document.getElementById('contact-email');
    const messageInputDOM = document.getElementById('contact-message');
    
    if(firstNameInputDOM.value !='' 
    && lastNameInputDOM.value != ''
    && emailInputDOM.value != ''
    && messageInputDOM.value != '') {
        console.log(`Bonjour ${firstNameInputDOM.value} ${lastNameInputDOM.value}\n
        Votre message a bien été envoyé au photographe.\n
        Veuillez retrouver votre message ci-dessous :\n
        \"${messageInputDOM.value}\"\n
        Une copie de ce message vous sera envoyée à\n
        ${emailInputDOM.value}`);
        document.forms['contact-form'].reset()
        closeContactModal();
    }

}