export async function addMediaEventListeners(photographerId, articlesDOM, photographerGalery) {
    articlesDOM.forEach((article) => {
        article.addEventListener('click', function() {
            const mediaId = parseInt(this.id.slice(8));
            openLightboxModal(photographerId, mediaId, photographerGalery);
        });
    });
}

function closeLightboxModal() {
    const lightbox = document.getElementById('lightbox_modal');
    lightbox.style.setProperty('display', 'none');
}

function openLightboxModal(photographerId, mediaId, photographerGalery) {
    const galery = photographerGalery;
    const media = galery.find(media => media.id === mediaId);
    const lightbox = document.getElementById('lightbox_modal');
    lightbox.style.setProperty('display', 'flex');

    displayLightboxMedia(photographerId, media, galery);
};

function displayLightboxMedia(photographerId, media, galery) {
/* =============================== HTML element made by getThumbnailDOM() ===============================
|-- MODAL               #lightbox_modal
    |-- DIV             .lightbox_modal_arrow + #left-arrow
    |-- DIV             #lightbox_modal_main
    |   |--IMG/VIDEO    #lightbox_modal_media
    |   |--SPAN         #lightbox_modal_title
    |
    |-- DIV             .lightbox_modal_arrow + #right-arrow
    |-- IMG             #lightbox_modal_close_button
============================================================================================================*/
    const lightbox = document.getElementById('lightbox_modal');
    
    const { title, image, video } = media;
    
    // RESET LIGHTBOX CONTENT
    lightbox.innerHTML = '';

    // LIGHTBOX MAIN
    const mediaMain = document.createElement('div');
    mediaMain.setAttribute('id', 'lightbox_modal_main');

    // LIGHTBOX MAIN: TITLE
    const mediaTitle = document.createElement('span');
    mediaTitle.setAttribute('id', 'lightbox_modal_title');
    mediaTitle.textContent = title;

    // LIGHTBOX MAIN: MEDIA
    let  lightboxMedia, mediaLink;
    if (media.hasOwnProperty('image')) {
        lightboxMedia = document.createElement('img');
        mediaLink = `./assets/photos/${photographerId}/${image}`;
    } else if (media.hasOwnProperty('video')) {
        lightboxMedia = document.createElement('video');
        mediaLink = `./assets/photos/${photographerId}/${video}`;
    };
    lightboxMedia.setAttribute('src', mediaLink);
    lightboxMedia.setAttribute('id', 'lightbox_modal_media');
    

    // LIGHTBOX LEFT ARROW
    const leftArrow = document.createElement('div');
    leftArrow.setAttribute('id','left-arrow');
    leftArrow.classList.add('lightbox_modal_arrow');
    leftArrow.textContent= '<';

    // LIGHTBOX RIGHT ARROW
    const rightArrow = document.createElement('div');
    rightArrow.setAttribute('id','right-arrow');
    rightArrow.classList.add('lightbox_modal_arrow');
    rightArrow.textContent= '>';

    // LIGHTBOX MODAL CLOSE BUTTON
    const lightboxCloseButton = document.createElement('img');
    lightboxCloseButton.setAttribute('src', 'assets/icons/close.svg');
    lightboxCloseButton.setAttribute('id', 'lightbox_modal_close_button');

    //APPEND MEDIA AND TITLE TO MAIN DIV
    mediaMain.appendChild(lightboxMedia);
    mediaMain.appendChild(mediaTitle);

    // APPEND LEFT ARROW, MAIN DIV, RIGHT ARROW AND CLOSE BUTTON TO LIGHTBOX MODAL
    lightbox.appendChild(leftArrow);
    lightbox.appendChild(mediaMain);
    lightbox.appendChild(rightArrow);
    lightbox.appendChild(lightboxCloseButton);


    // MAKE A PROXY TO ITERATE OVER THE ARRAY WITH INDEXES THAT ARE NEGATIVE OR > TO ARRAY LENGTH
    const galeryProxy = new Proxy(galery, {
        get(target, prop) {
            if (!isNaN(prop)) {
                prop = parseInt(prop);
                if (prop < 0) {
                    prop += target.length;
                }
                if (prop === target.length) {
                    prop -= target.length;
                }
            }
            return target[prop];
        }
    });

    // GET ARROW HTML ELEMENTS
    const lightboxLeftArrow = document.getElementById('left-arrow');
    const lightboxRightArrow = document.getElementById('right-arrow');

    //ADD EVENT LISTENERS TO ARROWS
    lightboxLeftArrow.addEventListener('click', () => getPreviousMedia(photographerId, media, galeryProxy));
    lightboxRightArrow.addEventListener('click', () => getNextMedia(photographerId, media, galeryProxy));
    lightboxCloseButton.addEventListener('click', () => closeLightboxModal());
};

function getPreviousMedia(photographerId, media, galery) {
    const mediaId = media.id;
    const thisMediaIndex = getMedia(mediaId, galery);
    const previousMedia = galery[thisMediaIndex - 1];
    displayLightboxMedia(photographerId, previousMedia, galery);
};

function getNextMedia(photographerId, media, galery) {
    const mediaId = media.id;
    const thisMediaIndex = getMedia(mediaId, galery);
    const nextMedia = galery[thisMediaIndex + 1];
    displayLightboxMedia(photographerId, nextMedia, galery);
};

function getMedia(mediaId, galery) {
    return galery.findIndex(media => media.id === mediaId);
};

