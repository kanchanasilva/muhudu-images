const sharp = require('sharp');

let inputImagePath = 'navy-reef-trincomalee-01.jpg';
let width = 500;

async function createThumbnail() {

    try {
        await sharp(inputImagePath)
            .resize({ width })
            .toFile(`thumbnail-${inputImagePath}`);

        console.log(`thumbnail-${inputImagePath} created successfully!`);
    } catch (error) {
        console.error('Error generating thumbnail:', error);
    }
}

createThumbnail();