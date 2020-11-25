import {anyNodeToTiff, ACTIONS} from '../src';

const button = document.getElementById('button');
button.addEventListener('click', () => {
    anyNodeToTiff({nodeId: 'clone-me', action: ACTIONS.toObjectURL})
        .then((url) => {
            window.location.href = url;
        })
        .catch(err => {
            console.log(err)
        })
})
