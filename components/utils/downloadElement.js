import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

export const downloadImageAsPNG = (node, data = {}) => {

    toPng(node, { height: data.height, width: data.width, pixelRatio: 5 })
        .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            const link = document.createElement('a')
            link.href = dataUrl
            link.download = 'json_studio_chart_view.png'
            link.click()
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });

}

export const downloadImageAsJPEG = (node, data = {}) => {

    toJpeg(node, { backgroundColor: "white", canvasHeight: data.height, canvasWidth: data.width, pixelRatio: 5 })
        .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            const link = document.createElement('a')
            link.href = dataUrl
            link.download = 'json_studio_chart_view.jpeg'
            link.click()
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });

}

export const downloadImageAsSVG = (node, data = {}) => {

    toSvg(node, { backgroundColor: "white", canvasHeight: data.height, canvasWidth: data.width, pixelRatio: 5 })
        .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            const link = document.createElement('a')
            link.href = dataUrl
            link.download = 'json_studio_chart_view.svg'
            link.click()
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });

}