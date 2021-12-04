/**
 * Creates medias objects with methods to display them.
 * @param {array} data and array of objects.
 * @returns {object} an object with 4 keys and 2 methods.
 */

export function galeryFactory(data) {

    const { photographerId, id, title, image, video, likes, date} = data;
    let link;

    if ( data.hasOwnProperty('image') ) {
        link = `./assets/photos/${photographerId}/${image}`;
    } else if ( data.hasOwnProperty('video') ) 
    {
        link = `./assets/photos/${photographerId}/${video}`;
    };

    function getThumbnailDOM() {

        // Create new article
        const article = document.createElement('article');
        article.classList.add("picture-article");

        if ( data.hasOwnProperty('image') ) {
            // Build picture
            const thumbnail = document.createElement('img');
            thumbnail.setAttribute("src", link);
            article.appendChild(thumbnail);
        }

        if ( data.hasOwnProperty('video') ) {
            const video = document.createElement('video');
            const source = document.createElement('source');
            source.setAttribute('src', link);
            video.appendChild(source);
            article.appendChild(video);
        }

        //Build title
        const h3 = document.createElement('h3');
        h3.textContent = title;
        h3.classList.add("picture__title");
        article.appendChild(h3);


        const mediaLikes = document.createElement('span');
        mediaLikes.textContent = likes;
        article.appendChild(mediaLikes);


        return article;
    }
    return {id, likes, date, title, getThumbnailDOM};
}