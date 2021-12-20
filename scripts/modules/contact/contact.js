import { addFormListener, removeFormListener } from './contact_listeners.js';
import { getProfile, getPhotographerId } from '../../components/query.js';

/**
 * Displays contact modal and sets focus on it. Sets photographer name to contact modal. Adds form Event Listener
 */
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

/**
 * Hides contact modal and sets focus to contact button. Removes form Event Listener.
 */
export function closeContactModal() {
    const contactModal = document.getElementById('contact_modal');
    contactModal.style.setProperty('display', 'none');
    document.getElementById('contact-me_button').focus();
    removeFormListener();
};

/** 
 * Submits contact form and console.log the input content.
 */
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
        console.log(`%cBonjour %c${firstNameInputDOM.value} ${lastNameInputDOM.value},\n%cVotre message a bien été envoyé au photographe.\nVeuillez retrouver votre message ci-dessous :\n%c\"${messageInputDOM.value}\"\n%cUne copie de ce message vous sera envoyée à\n%c${emailInputDOM.value}`,
         'line-height: 3em; font-size: 14px;','color: #D3573C; font-style: italic; font-weight: bold; line-height: 3em; font-size: 14px;', 'color: #FFF', 'color: #D3573C; font-size: 14px; font-style: italic; line-height: 3em;', 'color: #FFF', 'color: black; font-style: italic; font-weight: bold; background: white; font-size: 14px; line-height: 3em; border: 1px solid white;');
        document.forms['contact-form'].reset()
        closeContactModal();
    }

}