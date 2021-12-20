import { getCheckboxState } from "../components/likes.js";

/**:
 * Factory function to create and append media articles in profile.html
 */
export function galeryFactory(data) {

    const { photographerId, id, title, image, video, likes, date} = data;
    let link, linkNoExtension, pictureName;

    if (data.hasOwnProperty('image')) {
        pictureName = image.slice(0, -4);
        link = `./assets/photos/${photographerId}/${image}`;
        linkNoExtension = `./assets/photos/${photographerId}/${pictureName}`
    } else if (data.hasOwnProperty('video')) 
    {
        link = `./assets/photos/${photographerId}/${video}`;
    };

    function getThumbnailDOM() {

    /* ============================= HTML element made by getThumbnailDOM() =============================
    |-- ARTICLE                      .media-article
            |-- IMG || VIDEO         .media-article_media
            |-- DIV                  .media-article_details
                |-- SPAN             .media-article_details_title
                |-- DIV              .media-article_details_like-module
                    |-- INPUT        .media-article_details_like-module_input
                    |-- SPAN         .media-article_details_like-module_count
                        |-- LABEL    .media-article_details_like-module_label
                            |-- I    .media-article_details_like-module_label_like-icon + .fas + .fa-heart 
    =====================================================================================================*/

        // ARTICLE
        const article = document.createElement('article');
        article.setAttribute('id', `article-${id}`);
        article.classList.add("media-article");
        

        // MEDIA IMG | VIDEO    
        let articleMedia;

        if (data.hasOwnProperty('image')) {
            articleMedia = document.createElement('img');
            articleMedia.setAttribute('srcset', `${linkNoExtension}-light.jpg 2000w, ${linkNoExtension}.jpg 2560w`);
        } else if (data.hasOwnProperty('video')) {
            articleMedia = document.createElement('video');
            articleMedia.setAttribute('preload','metadata');
            articleMedia.setAttribute('tabindex','-1');
            articleMedia.setAttribute('poster',`./assets/photos/${photographerId}/${title}.jpg`);
        }
        articleMedia.setAttribute("src", `${link}`);
        articleMedia.setAttribute('data-id', `${id}`)
        articleMedia.setAttribute('tabindex', '0');
        articleMedia.classList.add('media-article_media','buffer');
        articleMedia.setAttribute('alt', `${title}, closeup view`);
        // DETAILS DIV
        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('media-article_details');
        
        // DETAILS DIV: TITLE
        const detailsTitle = document.createElement('span');
        detailsTitle.textContent = title;
        detailsTitle.classList.add(`media-article_details_title`);
        detailsTitle.setAttribute('tabindex', '0');

        // LIKE MODULE
        const likeModule = document.createElement('div');
        likeModule.classList.add(`media-article_details_like-module`);
        
        //LIKE MODULE: INPUT
        const likeInput = document.createElement('input');
        likeInput.classList.add('media-article_details_like-module_input');
        likeInput.setAttribute('type', 'checkbox')
        likeInput.setAttribute('aria-label', 'like checkbox')
        likeInput.setAttribute('id', id)
        if (getCheckboxState() != null ){
            const checkBoxState = getCheckboxState().split(',');
            likeInput.checked = checkBoxState.includes(likeInput.id);
        }

        //LIKE MODULE: SPAN 'COUNT'
        const likeCountSpan = document.createElement('span');
        likeCountSpan.setAttribute('id', `${id}-likes`)
        likeCountSpan.classList.add('media-article_details_like-module_count')
        likeCountSpan.textContent = likes;

        // LIKE MODULE: LABEL
        const likeLabel = document.createElement('label');
        likeLabel.setAttribute('for', id);
        likeLabel.classList.add('media-article_details_like-module_label')
        likeLabel.setAttribute('aria-hidden', 'false');

        const iconContainer = document.createElement('div')
        iconContainer.setAttribute('title',"Like")
        iconContainer.setAttribute('role',"img")
        iconContainer.setAttribute('aria-label', 'likes');
        iconContainer.setAttribute('aria-hidden', 'false');

        // LIKE MODULE LABEL: ICON
        const likeLabelIcon = document.createElement('i');
        likeLabelIcon.classList.add('fas', 'fa-heart', '.media-article_details_like-module_label_like-icon')
        /* likeLabelIcon.setAttribute('title',"Like")
        likeLabelIcon.setAttribute('role',"img")
        likeLabelIcon.setAttribute('aria-label', 'likes');
        likeLabelIcon.setAttribute('aria-hidden', 'false'); */

        // APPEND ICON TO LABEL
        iconContainer.appendChild(likeLabelIcon)
        likeLabel.appendChild(iconContainer);

        // APPEND INPUT, SPAN AND LABEL TO DIV 'LIKE MODULE'
        likeModule.appendChild(likeInput);
        likeModule.appendChild(likeCountSpan);
        likeModule.appendChild(likeLabel);
        
        // APPEND TITLE AND LIKE MODULE TO DIV 'DETAILS'
        detailsDiv.appendChild(detailsTitle);
        detailsDiv.appendChild(likeModule);
        
        // APPEND MEDIA AND DIV 'DETAILS' TO ARTICLE
        article.appendChild(articleMedia);
        article.appendChild(detailsDiv);

        return article;
    }
    return {id, likes, date, title, getThumbnailDOM};
}