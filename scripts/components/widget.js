import { getProfile } from "./query.js";

export async function createWidget(photographerId, galery) {
    // FIND BODY DOM
    const photographer = await getProfile(photographerId);
    const body = document.getElementsByTagName('body')[0];
    const price = photographer.price;

    // CREATE WIDGET DIV
    const widget = document.createElement('aside');
    widget.setAttribute('id', 'widget');
    // CREATE LIKE COUNT SPAN
    const likeCount = document.createElement('span');
    likeCount.setAttribute('id', 'widget__like-count')

    const priceTag = document.createElement('span');
    priceTag.textContent = `${price}€/jour`;
    //APPEND LIKE SPAN TO WIDGET
    widget.appendChild(likeCount);
    widget.appendChild(priceTag);
    body.appendChild(widget);
    updateWidget(galery)
}

export async function updateWidget(galery) {
    const widgetLikes = document.getElementById('widget__like-count');
    widgetLikes.textContent = galery.reduce((acc, curr) => acc + curr.likes, 0);
}