import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function convertImages() {
  try {
    // Path to your images
    const inputPath = join(__dirname, '../src/assets/images/herosectionimg.png');
    const outputWebP = join(__dirname, '../src/assets/images/herosectionimg.webp');
    const outputMobileWebP = join(__dirname, '../src/assets/images/herosectionimg-mobile.webp');

    // Convert to WebP
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputWebP);

    // Create mobile version
    await sharp(inputPath)
      .resize(800, null, {
        withoutEnlargement: true
      })
      .webp({ quality: 80 })
      .toFile(outputMobileWebP);

    console.log('Images converted successfully!');
  } catch (error) {
    console.error('Error converting images:', error);
  }
}

convertImages();