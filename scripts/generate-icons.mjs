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

    // PWA manifest icons
    await sharp(inputImagePath).resize(192, 192).toFile(path.join(outputDir, 'icon-192x192.png'));
    await sharp(inputImagePath).resize(512, 512).toFile(path.join(outputDir, 'icon-512x512.png'));

    // Next.js standard App Icons
    await sharp(inputImagePath).resize(512, 512).toFile(path.join(appRoot, 'icon.png'));
    await sharp(inputImagePath).resize(180, 180).toFile(path.join(appRoot, 'apple-icon.png'));

    console.log('All icons generated successfully!');
}

processIcons().catch(err => {
    console.error('Error generating icons:', err);
    process.exit(1);
});
