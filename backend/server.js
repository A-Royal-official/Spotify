// server.js (ESM)
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path, { dirname } from 'path';
import fs from 'fs';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 5000;

// __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Folder to save downloaded music
const MUSIC_DIR = path.join(__dirname, 'music');

// Make sure the music folder exists
if (!fs.existsSync(MUSIC_DIR)) {
    fs.mkdirSync(MUSIC_DIR, { recursive: true });
}

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: false }));

// Download endpoint
app.post('/download', (req, res) => {
    const url = req.body.url;

    if (!url) {
        return res.status(400).send('No URL provided');
    }

    // Use spawn for Windows-safe command execution
    const yt = spawn('yt-dlp', [
        '-f', 'bestaudio',
        '--extract-audio',
        '--audio-format', 'mp3',
        '--audio-quality', '0',
        '-o', path.join(MUSIC_DIR, '%(title)s.%(ext)s'),
        url
    ]);

    yt.stdout.on('data', data => console.log(data.toString()));
    yt.stderr.on('data', data => console.error(data.toString()));

    yt.on('error', (err) => {
        console.error('Spawn error:', err);
        res.status(500).send('yt-dlp not found. Please install yt-dlp first.');
    });

    yt.on('close', code => {
        if (code === 0) {
            console.log('Download complete!');
            res.send('Download complete!');
        } else {
            console.error(`yt-dlp exited with code ${code}`);
            res.status(500).send('Error downloading');
        }
    });
});

// Endpoint to list downloaded songs
app.get('/songs', (req, res) => {
    fs.readdir(MUSIC_DIR, (err, files) => {
        if (err) return res.status(500).send('Error reading music folder');
        res.json(files);
    });
});

// Serve downloaded files
app.use('/music', express.static(MUSIC_DIR));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

