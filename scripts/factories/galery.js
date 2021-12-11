import { getCheckboxState } from "../components/query.js";

export function galeryFactory(data) {

    const { photographerId, id, title, image, video, likes, date} = data;
    
    let link, pictureName, srcSetLink;

    if (data.hasOwnProperty('image')) {
        link = `./assets/photos/${photographerId}/${image}`;
        pictureName = image.slice(0, -4);
        srcSetLink = `./assets/photos/${photographerId}/${pictureName}-light.jpg`;
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
            
            articleMedia.setAttribute('srcset', `${srcSetLink} 2000w, ${link} 2500w`);
        } else if (data.hasOwnProperty('video')) {
            articleMedia = document.createElement('video');
            articleMedia.setAttribute('preload','metadata');
            articleMedia.setAttribute('poster',`./assets/posters/${title}.jpg`);
        }
        articleMedia.setAttribute("src", srcSetLink);
        
        articleMedia.classList.add('media-article_media','buffer');
        articleMedia.setAttribute('alt', `${title}, closeup view`);
        // DETAILS DIV
        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('media-article_details');
        
        // DETAILS DIV: TITLE
        const detailsTitle = document.createElement('span');
        detailsTitle.textContent = title;
        detailsTitle.classList.add(`media-article_details_title`);

        // LIKE MODULE
        const likeModule = document.createElement('div');
        likeModule.classList.add(`media-article_details_like-module`);
        
        //LIKE MODULE: INPUT
        const likeInput = document.createElement('input');
        likeInput.classList.add('media-article_details_like-module_input');
        likeInput.setAttribute('type', 'checkbox')
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

        // LIKE MODULE LABEL: ICON
        const likeLabelIcon = document.createElement('i');
        likeLabelIcon.classList.add('fas', 'fa-heart', '.media-article_details_like-module_label_like-icon')
        likeLabelIcon.setAttribute('aria-label', 'likes');

        // APPEND ICON TO LABEL
        likeLabel.appendChild(likeLabelIcon);

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

