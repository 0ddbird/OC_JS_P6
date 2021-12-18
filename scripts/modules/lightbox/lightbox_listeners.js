import { getFollowingMedia, closeLightboxModal } from './lightbox.js';

export function addLightboxListeners() {
    const lightboxArrows = [document.getElementById('left-arrow'), document.getElementById('right-arrow')]
    const lightboxCloseButton = document.getElementById('lightbox_modal_close_button');

    lightboxArrows.forEach( arrow => {
        arrow.addEventListener('click', handleLightboxArrowsClick, false);
    })
    lightboxCloseButton.addEventListener('click', handleLightboxCloseButtonClick, false);

    window.addEventListener('keydown', handleLightboxKeydown, false);
}

export function removeLightboxListeners() {
    const lightboxArrows = [document.getElementById('left-arrow'), document.getElementById('right-arrow')]
    const lightboxCloseButton = document.getElementById('lightbox_modal_close_button');

    lightboxArrows.forEach(arrow => {
        arrow.removeEventListener('click', handleLightboxArrowsClick, false);
    })
    lightboxCloseButton.removeEventListener('click', handleLightboxCloseButtonClick, false);
    window.removeEventListener('keydown', handleLightboxKeydown, false)
}

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

function handleLightboxArrowsClick (e) {
    getFollowingMedia(e.target.dataset.directioninput)
}

function handleLightboxCloseButtonClick() {
    closeLightboxModal()
} 

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