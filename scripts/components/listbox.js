import { updateGalery } from "./updategalery.js";

const listboxContainer = document.getElementById('listbox-container');
const listbox = document.getElementById('listbox');

/**
 * Expand Listbox container to show sorting options. Adds keyboard Event Listeners.
 */
export function openListbox() {
    listbox.style.setProperty('display', 'block');
    listboxContainer.setAttribute('aria-expanded', 'true');
    hideCurrentListboxOption();
    let selectedOption = listbox.firstElementChild;
    selectedOption.focus();
    window.addEventListener('keydown', handleKeydown, false);
}

/**
 * Hides listbox options, sorts the galery according to the chosen option, remove the keyboard Event Listeners.
 * @param {*} option 
 */
export function closeListbox(option) {
    listbox.style.setProperty('display', 'none');
    listboxContainer.setAttribute('aria-expanded', 'false');
    displayCurrentListboxOption(option);
    window.removeEventListener('keydown', handleKeydown, false);
}

/**
 * Listbox keyboard navigation ArrowUp, ArrowDown, Home, End, Escape and Enter.
 * @param {event} e event handling to prevent up and down arrows to scroll in the window.
 */
function handleKeydown(e) {
    e.preventDefault();
        let selectedOption = document.activeElement;
        selectedOption.setAttribute('aria-selected', 'true');
    
        if (e.key === 'ArrowUp' || e.key ==='ArrowDown' || e.key === 'Home' || e.key === 'End') {
            selectedOption.setAttribute('aria-selected', 'false');
            if (e.key === 'ArrowUp') {
                if (selectedOption.previousElementSibling != null) {
                    selectedOption = selectedOption.previousElementSibling;
                } else {
                    selectedOption = selectedOption.parentNode.lastElementChild;
                }
            } else if (e.key === 'ArrowDown') {
                if ( selectedOption.nextElementSibling != null ) {
                    selectedOption = selectedOption.nextElementSibling;
                } else {
                    selectedOption = selectedOption.parentNode.firstElementChild;
                }
            } else if (e.key === 'Home') {
                selectedOption = selectedOption.parentNode.firstElementChild;
            } else if (e.key === 'End') {
                selectedOption = selectedOption.parentNode.lastElementChild;
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

/**
 * Updates the photographer's galery according to chosen option, closes listbox and updates the last option in folded listbox.
 * @param {element} option 
 */
export function handleOption(option) {
    updateGalery(option.dataset.sort);
    closeListbox(option.dataset.sort);
    changeOptionsOrder(option);
}

/**
 * Swap listbox options order to display the last one selected first.
 * @param {element} optionDOM 
 */
function changeOptionsOrder(optionDOM) {
    listbox.insertBefore(optionDOM, listbox.firstElementChild);
}

/**
 * Displays the current listbox option in folded listbox.
 * @param {element} option 
 */
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

/**
 * Hides current sorting option span when listbox is expanded. 
 */
function hideCurrentListboxOption() {
    const currentOptionDOM = document.getElementById('listbox-current-option');
    if (currentOptionDOM != undefined) {
        currentOptionDOM.style.setProperty('display', 'none');
    }
}