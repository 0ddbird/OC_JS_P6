function galeryFactory(data) {

    let objectData;
    let link;

    if (data.hasOwnProperty('image')) {
        objectData = { photographerId, id, title, image, likes, date, price } = data;
        link = `./assets/photos/${photographerId}/${image}`;
    } else if (data.hasOwnProperty('video')) {
        objectData = { photographerId, id, video, likes, date, price } = data;
        link = `./assets/photos/${photographerId}/${video}`;
    }

    function getThumbnailDOM() {

        // Create new article
        const article = document.createElement( 'article' );
        article.classList.add("picture-article")

        if (data.hasOwnProperty('image')) {
            // Build picture
            const thumbnail = document.createElement( 'img' );
            thumbnail.setAttribute("src", link)
            article.appendChild(thumbnail);

            //Build title
            const h3 = document.createElement( 'h3' );
            h3.textContent = title;
            h3.classList.add("picture__title")
            article.appendChild(h3);
        }

        if (data.hasOwnProperty('video')) {
            const video = document.createElement( 'video' )
            const source = document.createElement( 'source' )
            source.setAttribute('src', link)
            video.appendChild(source)
            article.appendChild(video)
        }

        const likesCount = document.createElement( 'span' );
        likesCount.textContent = likes;
        article.appendChild(likesCount);

        const pictureDate = document.createElement( 'span' );
        pictureDate.textContent = date;
        article.appendChild(pictureDate);

        const picturePrice = document.createElement( 'span' );
        picturePrice.textContent = price;
        article.appendChild(picturePrice);

        return article;
    }
    return {id, getThumbnailDOM}
}