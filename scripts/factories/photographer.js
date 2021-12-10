export function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `./assets/photographers/${portrait}`;

    function getUserCardDOM() {
        // Create new article
        const url = `./profile.html?id=${id}`;
        const link = document.createElement( 'a' );
        link.setAttribute('href', url)

        const article = document.createElement( 'article' );
        article.classList.add("photographer-article")

        // Build profile picture element
        const img = document.createElement( 'img' );
        img.classList.add("photographer-article__picture");
        img.setAttribute("src", picture)
        
        // Build title element with Name
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.classList.add("photographer-article__name")
        
        // Build City, Country element
        const locationSpan = document.createElement( 'span' );
        locationSpan.textContent = city + ', ' + country;
        locationSpan.classList.add("photographer-article__location")

        // Build tagline
        const taglineSpan = document.createElement( 'span' );
        taglineSpan.textContent = tagline;
        taglineSpan.classList.add("photographer-article__tagline")

        // Build price
        const priceSpan = document.createElement( 'span' );
        priceSpan.textContent = price + "€/jour";
        priceSpan.classList.add("photographer-article__price")

        //Append elements to article
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(locationSpan);
        article.appendChild(taglineSpan);
        article.appendChild(priceSpan);

        // append article to link
        link.appendChild(article)
        return link;
    }

    function getUserSectionDOM() {
        const profile = document.createDocumentFragment();

        // Build profile picture element
        const img = document.createElement( 'img' );
        img.classList.add("photographer-section__picture")
        img.setAttribute("src", picture)

        const profileDiv = document.createElement('div');
        profileDiv.classList.add('photographer-section__profile');

        // Build title element with Name
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.classList.add("photographer-section__profile-name")

        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('photographer-section__profile-details');

        // Build City, Country element
        const locationSpan = document.createElement( 'span' );
        locationSpan.textContent = city + ', ' + country;
        locationSpan.classList.add("photographer-section__profile-details-location")
 
        // Build tagline
        const taglineSpan = document.createElement( 'span' );
        taglineSpan.textContent = tagline;
        taglineSpan.classList.add("photographer-section__profile-details-tagline")

/*         // Build price
        const priceSpan = document.createElement( 'span' );
        priceSpan.textContent = price + "€/jour";
        priceSpan.classList.add("photographer-section__price")
 */
        const contactButton = document.createElement('button');
        contactButton.textContent = "Contactez-moi";
        contactButton.classList.add('contact_button');
        contactButton.setAttribute('onclick', "displayModal()");

        
        detailsDiv.appendChild(locationSpan);
        detailsDiv.appendChild(taglineSpan);
        profileDiv.appendChild(h2);
        profileDiv.appendChild(detailsDiv);
        profile.appendChild(profileDiv);
        //profile.appendChild(priceSpan);
        profile.appendChild(contactButton);
        profile.appendChild(img);

        return profile
    }
    // A quoi sert de retourner name et picture ?
    return {name, picture, getUserCardDOM, getUserSectionDOM }
}