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
 * DOES NOT WORK. Is supposed to do the same thing as both functions above, but triggers event listeners on creation.
 */
export function toggleLightboxListeners(option) {
    const lightboxArrows = [document.getElementById('left-arrow'), document.getElementById('right-arrow')]
    const lightboxCloseButton = document.getElementById('lightbox_modal_close_button');
    let eventMethod = (element) => element[`${option}EventListener`]
    lightboxArrows.forEach(arrow => {
        eventMethod(arrow)('click', handleLightboxArrowsClick(arrow), false);
    })
    eventMethod(lightboxCloseButton)('click', handleLightboxCloseButtonClick, false);
    eventMethod(window)('keydown', handleLightboxKeydown, false)
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
    e.preventDefault();
    let direction;
        if (e.key === 'ArrowLeft') {
            direction = 'previous'
            getFollowingMedia(direction)
        } else if (e.key === 'ArrowRight') {
            direction = 'next'
            getFollowingMedia(direction)
        } else if (e.key === 'Escape') {
            closeLightboxModal();
        }

};