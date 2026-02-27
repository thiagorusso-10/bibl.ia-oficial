import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputImagePath = 'C:\\Users\\thiago.russo\\Downloads\\icone-novo.png.png';
const outputDir = path.join(__dirname, '../public/icons');
const appRoot = path.join(__dirname, '../app');

async function processIcons() {
    console.log('Generating icons from:', inputImagePath);

    // Ensure directories exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Flatten with black background to prevent iOS from adding white borders to transparent PNGs
    const processImage = (size, dest) =>
        sharp(inputImagePath)
            .resize(size, size)
            .flatten({ background: '#000000' })
            .toFile(dest);

    await processImage(192, path.join(outputDir, 'icon-192x192.png'));
    await processImage(512, path.join(outputDir, 'icon-512x512.png'));
    await processImage(512, path.join(appRoot, 'icon.png'));
    await processImage(180, path.join(appRoot, 'apple-icon.png'));

    console.log('All icons generated successfully!');
}

processIcons().catch(err => {
    console.error('Error generating icons:', err);
    process.exit(1);
});
