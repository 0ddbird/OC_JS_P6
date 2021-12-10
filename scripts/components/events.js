import {updateGalery} from './updategalery.js'

document.getElementById('select').addEventListener('change', function() {
    updateGalery('sessionStorage', this.value);
});

