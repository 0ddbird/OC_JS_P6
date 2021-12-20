import { getProfile } from "./query.js";

/**
 * Creates and appends a widget displaying total likes and fees for a photographer
 * @param {number} photographerId 
 * @param {array} galery 
 */
export async function createWidget(photographerId, galery) {
    // FIND BODY DOM
    const photographer = await getProfile(photographerId);
    const main = document.getElementsByTagName('main')[0];
    const sort = document.getElementById('sort');
    const price = photographer.price;

    // CREATE WIDGET DIV
    const widget = document.createElement('aside');
    widget.setAttribute('id', 'widget');
    widget.setAttribute('tabindex', '0');
    // CREATE LIKE COUNT SPAN
    const likeCount = document.createElement('span');
    likeCount.setAttribute('id', 'widget__like-count')

    const priceTag = document.createElement('span');
    priceTag.textContent = `${price}€/jour`;
    //APPEND LIKE SPAN TO WIDGET
    widget.appendChild(likeCount);
    widget.appendChild(priceTag);
    main.insertBefore(widget, sort);
    updateWidget(galery)
}

/**
 * Sums up all likes in galery medias and updates the widget DOM Element
 * @param {array} galery 
 */
export async function updateWidget(galery) {
    const widgetLikes = document.getElementById('widget__like-count');
    widgetLikes.textContent = galery.reduce((acc, curr) => acc + curr.likes, 0);
}