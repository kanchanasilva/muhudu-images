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

// 2. Serve the images so the UI can preview them
app.use('/preview', express.static(SOURCE_FOLDER));

// 3. API: List images
app.get('/api/list', (req, res) => {
    const files = fs.readdirSync(SOURCE_FOLDER)
        .filter(file => /\.(jpg|jpeg|png)$/i.test(file));
    res.json(files);
});

// 4. API: Convert
app.post('/api/convert', async (req, res) => {
    const { name, selectedImages } = req.body;
    const targetDir = path.join(BASE_DIR, name);

    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);

    const jsonOutput = await Promise.all(selectedImages.map(async (item, i) => {
        const ext = path.extname(item.fileName);
        const idx = String(i + 1).padStart(2, '0');
        
        const names = {
            main: `00000-${name}-${idx}${ext}`,
            thumb: `thumbnail-${name}-${idx}${ext}`,
            icon: `icon-${name}-${idx}${ext}`
        };

        const src = path.join(SOURCE_FOLDER, item.fileName);

        await sharp(src).resize({ width: 1000 }).toFile(path.join(targetDir, names.main));
        await sharp(src).resize({ width: 500 }).toFile(path.join(targetDir, names.thumb));
        await sharp(src).resize({ width: 100 }).toFile(path.join(targetDir, names.icon));

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