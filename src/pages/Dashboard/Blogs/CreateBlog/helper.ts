import axios from 'axios';
import { Quill } from 'react-quill';

export const extractBase64ImagesAndSequence = (htmlString: string) => {
    const base64Images: Array<{
        tag: string;
        base64Rep: string;
        type: string;
    }> = [];

    const imgTags = htmlString.match(/<img[^>]+src="data:image\/[^">]+"/g);
    if (imgTags) {
        imgTags.forEach((tag) => {
            const base64Rep = tag.match(/src="(data:image\/[^">]+)"/);

            if (base64Rep !== null) {
                const type = base64Rep[1]
                    .split(';')[0]
                    .split(':')[1]
                    .split('/')[1];
                base64Images.push({ tag, base64Rep: base64Rep[1], type });
            }
        });
    }

    const sequence = base64Images.map((image, index) => ({
        index: index.toString(),
        type: image.type,
    }));

    return { base64Images, sequence };
};

export const quillModules = {
    toolbar: {
        container: [
            [{ header: '1' }, { header: '2' }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link', 'image'], //add video to this if required...
            ['clean'],
            [{ align: [] }],
        ],
    },
    imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize', 'Toolbar'],
    },
};

export const uploadFile = (file: Blob, url: string) => {
    return axios.put(url, file, {
        headers: {
            'Content-Type': file.type,
        },
    });
};

export const uploadAllFiles = async (files: Blob[], urls: Array<string>) => {
    try {
        const uploadPromises = files.map((file, index) =>
            uploadFile(file, urls[index])
        );

        await Promise.all(uploadPromises);
    } catch (error) {
        console.error('Error uploading files:', error);
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getImagesAsFiles = (deltas: any): Array<Blob> => {
    const images: Array<string> = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deltas.ops?.forEach((op: { insert: { image: any } }) => {
        if (op.insert && op.insert.image) {
            images.push(op.insert.image);
        }
    });

    const baseToBlog = (base64: string, mimeType: string) => {
        const byteCharacters = atob(base64);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        return new Blob(byteArrays, { type: mimeType });
    };
    const isValidImageFormat = (image: string) => {
        const base64ImageRegex =
            /^data:image\/(png|jpeg|jpg|gif|bmp|webp);base64,[A-Za-z0-9+/]+={0,2}$/;
        return base64ImageRegex.test(image);
    };

    const files = [];
    for (let image of images) {
        if (!isValidImageFormat(image)) {
            console.log(image);
            console.log('InvalidFormat');
            continue;
        }

        const mimeType = image.split(';')[0].split(':')[1];
        const prefixIndex = image.indexOf(';base64,');
        if (prefixIndex !== -1) {
            image = image.slice(prefixIndex + 8);
        }
        files.push(baseToBlog(image, mimeType));
    }

    return files;
};
