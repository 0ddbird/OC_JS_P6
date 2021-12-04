import {updateGalery} from './updategalery.js'

document.getElementById('select').addEventListener('change', function() {
    getSelectOption(this.value);
});

function getSelectOption(option) {
    //console.log('getSelectOption ', option);
    updateGalery(undefined, option);
}