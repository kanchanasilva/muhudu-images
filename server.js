const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const sharp = require('sharp');

const app = express();
app.use(cors());
app.use(express.json());

// CONFIGURATION
const BASE_DIR = __dirname;
const SOURCE_FOLDER = path.join(BASE_DIR, 'source_images'); // Put your photos here

// Ensure source folder exists
if (!fs.existsSync(SOURCE_FOLDER)) fs.mkdirSync(SOURCE_FOLDER);

// 1. Serve the UI
app.get('/', (req, res) => {
    res.send(fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8'));
});

// Replace the old app.use('/preview', ...) with this:
app.get('/preview/:filename', async (req, res) => {
    const filePath = path.join(SOURCE_FOLDER, req.params.filename);
    
    try {
        // We resize the image to a 300px thumbnail on-the-fly for the UI
        const buffer = await sharp(filePath)
            .resize(300) 
            .toBuffer();
            
        res.set('Content-Type', 'image/jpeg'); // Standardize for preview
        res.send(buffer);
    } catch (err) {
        res.status(404).send('Image not found');
    }
});

// 3. API: List images
app.get('/api/list', (req, res) => {
    const files = fs.readdirSync(SOURCE_FOLDER)
        .filter(file => /\.(jpg|jpeg|png)$/i.test(file));
    res.json(files);
});

// 4. API: Convert
const WATERMARK_PATH = path.join(BASE_DIR, 'water-mark-logo.png');

app.post('/api/convert', async (req, res) => {
    const { name, selectedImages } = req.body;
    const targetDir = path.join(BASE_DIR, name);

    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);

    // Check if watermark exists
    const hasWatermark = fs.existsSync(WATERMARK_PATH);

    const jsonOutput = await Promise.all(selectedImages.map(async (item, i) => {
        const ext = path.extname(item.fileName);
        const idx = String(i + 1).padStart(2, '0');
        
        const names = {
            main: `00000-${name}-${idx}${ext}`,
            thumb: `thumbnail-${name}-${idx}${ext}`,
            icon: `icon-${name}-${idx}${ext}`
        };

        const src = path.join(SOURCE_FOLDER, item.fileName);

        // 1. Create the Main 1000px image with Watermark
        let mainImageProcessor = sharp(src).resize({ width: 1000 });

        if (hasWatermark) {
            // gravity: 'southeast' puts it in the bottom right automatically
            mainImageProcessor = mainImageProcessor.composite([
                { 
                    input: WATERMARK_PATH, 
                    gravity: 'southeast' 
                }
            ]);
        }
        await mainImageProcessor.toFile(path.join(targetDir, names.main));

        // 2. Create Thumbnail (500px) - No watermark
        await sharp(src)
            .resize({ width: 500 })
            .toFile(path.join(targetDir, names.thumb));

        // 3. Create Icon (100px) - No watermark
        await sharp(src)
            .resize({ width: 100 })
            .toFile(path.join(targetDir, names.icon));

        return {
            image: `${name}/${names.main}`,
            order: parseInt(item.order),
            description: item.description,
            time: item.time
        };
    }));

    fs.writeFileSync(path.join(targetDir, 'data.json'), JSON.stringify(jsonOutput, null, 2));
    res.json({ success: true, path: targetDir });
});

app.listen(8091, () => console.log('App ready at http://localhost:8091'));