import { updateGalery } from "./updategalery.js";

const listboxContainer = document.getElementById('listbox-container');
const listbox = document.getElementById('listbox');


export function openListbox() {
    listbox.style.setProperty('display', 'block');
    listboxContainer.setAttribute('aria-expanded', 'true');
    hideCurrentListboxOption();
    let selectedOption = listbox.firstElementChild;
    selectedOption.focus();
    window.addEventListener('keydown', handleKeydown, false);
}

export function closeListbox(option) {
    listbox.style.setProperty('display', 'none');
    listboxContainer.setAttribute('aria-expanded', 'false');
    displayCurrentListboxOption(option);
    window.removeEventListener('keydown', handleKeydown, false);
}

function handleKeydown(e) {
    e.preventDefault();
        let selectedOption = document.activeElement;
        selectedOption.setAttribute('aria-selected', 'true');

        if (e.key === 'ArrowUp' || e.key ==='ArrowDown') {
            selectedOption.setAttribute('aria-selected', 'false');
            if (e.key === 'ArrowUp') {
                if (selectedOption.previousElementSibling != null) {
                    selectedOption = selectedOption.previousElementSibling;
                } else {
                    selectedOption = selectedOption.parentNode.lastElementChild;
                }
            } else if (e.key === 'ArrowDown') {
                if ( selectedOption.nextElementSibling != null ) {
                    selectedOption = selectedOption.nextElementSibling
                } else {
                    selectedOption = selectedOption.parentNode.firstElementChild
                }
            }
            selectedOption.setAttribute('aria-selected', 'true');
            selectedOption.focus();
        }
        if (e.key === 'Escape') {
            closeListbox();
        }
        if (e.key === 'Enter') {
            e.stopPropagation();
            handleOption(selectedOption);
        }
}

export function handleOption(option) {
    updateGalery(option.dataset.sort);
    closeListbox(option.dataset.sort);
    changeOptionsOrder(option);
}

function changeOptionsOrder(optionDOM) {
    listbox.insertBefore(optionDOM, listbox.firstElementChild);
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
            result = 'Popularité';
            break;
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