import html2canvas from 'html2canvas';
import {CanvasToTIFF} from './canvasToTiff';

export const ACTIONS = {
    toObjectURL: 'toObjectURL',
    toDataURL: 'toDataURL',
    toBlob: 'toBlob',
    toArrayBuffer: 'toArrayBuffer',
};

export const anyNodeToTiff = ({nodeId, action, tiffOptions = {dpi: 72}}) => {
    return new Promise((res, rej) => {
        if (!ACTIONS[action]) {
            rej(new Error(`You need to pass correct action. Possible actions: ${Object.keys(ACTIONS).join()}`))
            return;
        }
        if (!nodeId || !document.getElementById(nodeId)) {
            rej(new Error(`You need to pass nodeID and node element should be presented in DOM`));
            return;
        }
        html2canvas(document.getElementById(nodeId))
            .then(function (canvas) {
                CanvasToTIFF.setErrorHandler((err) => {
                    CanvasToTIFF.removeErrorHandler();
                    rej(err);
                });
                CanvasToTIFF[action](canvas, (value) => {
                    CanvasToTIFF.removeErrorHandler();
                    res(value);
                }, tiffOptions)
            })
            .catch((err) => rej(err));
    })
}
