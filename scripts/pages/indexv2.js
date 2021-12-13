import { displayPhotographers } from '../components/display.js';
import {getPhotographers} from '../components/query.js';

async function indexInit() {
    const photographers = await getPhotographers();
    
    const photographerSection = document.querySelector('.photographer_section');
    const template = document.getElementById('photographer-template');
    //let content = template.content.cloneNode(true);
    //console.log(content);
    const docFragment = document.createDocumentFragment();
    const fetchedTemplate = await fetchTemplate();
    docFragment.innerHTML = fetchedTemplate;
    console.log(docFragment);
    photographerSection.appendChild(docFragment);

    /* photographerSection.appendChild(document.getElementById('photographer-template').content.cloneNode(true));
    photographerSection.appendChild(document.getElementById('photographer-template').content.cloneNode(true));
    photographerSection.appendChild(document.getElementById('photographer-template').content.cloneNode(true)); */
};

indexInit();

async function fetchTemplate() {
    const template = await fetch('../templates/photographer.html');
    return template.text()
}

