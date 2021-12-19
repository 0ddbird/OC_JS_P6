import { getFollowingMedia, closeLightboxModal } from './lightbox.js';

/**
 * Adds Lightbox Event Listeners to arrows DOM elements, and Event Listener for keyboard navigation
 */
export function addLightboxListeners() {
    const lightboxArrows = [document.getElementById('left-arrow'), document.getElementById('right-arrow')]
    const lightboxCloseButton = document.getElementById('lightbox_modal_close_button');

    lightboxArrows.forEach( arrow => {
        arrow.addEventListener('click', handleLightboxArrowsClick, false);
    })
    lightboxCloseButton.addEventListener('click', handleLightboxCloseButtonClick, false);

    window.addEventListener('keydown', handleLightboxKeydown, false);
}

/**
 * Removes Event Listeners from arrows DOM elements, and Event Listener for keyboard navigation.
 */
export function removeLightboxListeners() {
    const lightboxArrows = [document.getElementById('left-arrow'), document.getElementById('right-arrow')]
    const lightboxCloseButton = document.getElementById('lightbox_modal_close_button');

    lightboxArrows.forEach(arrow => {
        arrow.removeEventListener('click', handleLightboxArrowsClick, false);
    })
    lightboxCloseButton.removeEventListener('click', handleLightboxCloseButtonClick, false);
    window.removeEventListener('keydown', handleLightboxKeydown, false)
}

/**
 * Calls getFollowingMedia function and gives it the slide direction.
 * @param {event} e 
 */
function handleLightboxArrowsClick (e) {
    getFollowingMedia(e.target.dataset.directioninput)
}

/**
 * Event Listener named function that calls closeLightboxModal.
 */
function handleLightboxCloseButtonClick() {
    closeLightboxModal()
} 

/**
 * Event Listener named function that allows keyboard navigation in lightbox
 * @param {event} e 
 */
function handleLightboxKeydown(e) {
    const lightboxArrows = [document.getElementById('left-arrow'), document.getElementById('right-arrow')]
    const leftArrow = document.getElementById('left-arrow');
    const rightArrow = document.getElementById('right-arrow')
    const lightboxCloseButton = document.getElementById('lightbox_modal_close_button');
    let direction;
        if (e.key === 'ArrowLeft') {
            direction = 'previous'
            getFollowingMedia(direction)
        } else if (e.key === 'ArrowRight') {
            direction = 'next'
            getFollowingMedia(direction)
        } else if (e.key === 'Escape') {
            closeLightboxModal();
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
        } else if (e.key === 'Enter') {
            if (document.activeElement === leftArrow || document.activeElement === rightArrow) {
                getFollowingMedia(e.target.dataset.directioninput)
            } 
            if (document.activeElement === lightboxCloseButton) {
                closeLightboxModal();
            }
        } else if (e.key === 'Tab' && document.activeElement === lightboxCloseButton) {
            const lightboxModal = document.getElementById('lightbox_modal');
            lightboxModal.focus();
        }

};