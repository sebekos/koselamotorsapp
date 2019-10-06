import Resizer from 'react-image-file-resizer';

export const dataURLtoBlob = dataurl => {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

export const resizeBulkArray = async pictures => {
    var promises = pictures.map(picture => {
        reSizer(picture);
    });
    await Promise.all(promises)
        .then(results => {
            console.log(results);
            return results;
        })
}

export const reSizer = picture => {
    return new Promise((resolve, reject) => Resizer.imageFileResizer(
        picture,
        500,
        700,
        'JPEG',
        100,
        0,
        uri => {
            var blob = dataURLtoBlob(uri);
            const formData = new FormData();
            formData.append('file', blob)
            console.log(formData);
            resolve(formData);
        },
        'base64'
    ));
}