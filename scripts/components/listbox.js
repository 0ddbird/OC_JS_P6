import { updateGalery } from "./updategalery.js";

const listBox = document.getElementById('listbox');
const optionPopularity = document.getElementById('listbox-popularity');
const optionDate = document.getElementById('listbox-date');
const optionTitle = document.getElementById('listbox-title');

const options = [optionPopularity, optionDate, optionTitle];

export function openListbox() {
    listBox.style.setProperty('display', 'block');
    hideCurrentListboxOption();

    window.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowUp' || e.key ==='ArrowDown') {
            e.preventDefault();
        }
        if (e.key === 'ArrowDown') {
            optionDate.focus();
        }
    });
     //CLICK ON LISTBOX OPTION TO UPDATE GALERY (SORTED)
    
    document.getElementById('listbox-popularity').addEventListener('click', function(e) {
        e.stopPropagation();
        handleOption('popularity');
    });
    document.getElementById('listbox-date').addEventListener('click', function(e) {
        e.stopPropagation();
        handleOption('date');
    });
    document.getElementById('listbox-title').addEventListener('click', function(e) {
        e.stopPropagation();
        handleOption('title');
    });
}

export function closeListbox(option) {
    listBox.style.setProperty('display', 'none');
    displayCurrentListboxOption(option);
}

export function handleOption(option) {
    updateGalery(option);
    closeListbox(option);
}

export function displayCurrentListboxOption(option) {
    const currentOptionDOM = document.getElementById('listbox-current-option');
    let result;
    switch(option) {
        case 'date':
            result = 'Date';
            break;
        case 'title':
            result = 'Titre';
            break;
        case 'popularity':
        default:
            result = currentOptionDOM.textContent;
    }
    currentOptionDOM.textContent = result;
    currentOptionDOM.style.setProperty('display', 'block');
}

function hideCurrentListboxOption() {
    const currentOptionDOM = document.getElementById('listbox-current-option');
    if (currentOptionDOM != undefined) {
        currentOptionDOM.style.setProperty('display', 'none');
    }
}