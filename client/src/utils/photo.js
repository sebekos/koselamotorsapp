import Resizer from 'react-image-file-resizer';

export const reSizer = picture => {
    return new Promise((resolve, reject) => Resizer.imageFileResizer(
        picture,
        500,
        700,
        'JPEG',
        100,
        0,
        res => {
            const formData = new FormData();
            formData.append('file', res)
            resolve(formData);
        },
        'blob'
    ));
}

export const bulkResize = async pictures => {
    return new Promise (async (resolve, reject) => {
        await Promise.all(pictures.map(picture => {
            return new Promise((resolve, reject) => resolve(reSizer(picture)));
        }))
        .then(results => {
            resolve(results);
        })
    });
}