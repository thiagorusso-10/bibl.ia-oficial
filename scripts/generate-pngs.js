const fs = require('fs');
const svg2img = require('svg2img');
const path = require('path');

const convert = (width, height) => {
    const svgPath = path.join(__dirname, '..', 'public', 'icons', `icon-${width}.svg`);
    const pngPath = path.join(__dirname, '..', 'public', 'icons', `icon-${width}x${height}.png`);

    svg2img(svgPath, { width, height }, (error, buffer) => {
        if (error) {
            console.error(`Error converting ${width}:`, error);
        } else {
            fs.writeFileSync(pngPath, buffer);
            console.log(`Successfully generated ${pngPath}`);
        }
    });
};

convert(192, 192);
convert(512, 512);
