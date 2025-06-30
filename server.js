const express = require('express');
const fs = require('fs');
const path = require('path');
const { generateAllContent, ensureDataDirectory } = require('./generate-content');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('.'));

// Ensure data directory exists
ensureDataDirectory();

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// API Routes for data management
app.get('/api/news', (req, res) => {
    try {
        const newsPath = path.join(__dirname, 'data', 'news.json');
        if (fs.existsSync(newsPath)) {
            const news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
            res.json(news);
        } else {
            res.json([]);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to load news data' });
    }
});

app.post('/api/news', (req, res) => {
    try {
        const newsPath = path.join(__dirname, 'data', 'news.json');
        const newsItem = {
            ...req.body,
            id: Date.now(),
            date: req.body.date || new Date().toISOString().split('T')[0]
        };

        let news = [];
        if (fs.existsSync(newsPath)) {
            news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
        }

        news.unshift(newsItem);
        fs.writeFileSync(newsPath, JSON.stringify(news, null, 2), 'utf8');

        res.json({ success: true, item: newsItem });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save news item' });
    }
});

app.delete('/api/news/:id', (req, res) => {
    try {
        const newsPath = path.join(__dirname, 'data', 'news.json');
        if (fs.existsSync(newsPath)) {
            let news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
            news = news.filter(item => item.id !== parseInt(req.params.id));
            fs.writeFileSync(newsPath, JSON.stringify(news, null, 2), 'utf8');
        }
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete news item' });
    }
});

app.get('/api/weeknotes', (req, res) => {
    try {
        const weeknotesPath = path.join(__dirname, 'data', 'weeknotes.json');
        if (fs.existsSync(weeknotesPath)) {
            const weeknotes = JSON.parse(fs.readFileSync(weeknotesPath, 'utf8'));
            res.json(weeknotes);
        } else {
            res.json([]);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to load weeknotes data' });
    }
});

app.post('/api/weeknotes', (req, res) => {
    try {
        const weeknotesPath = path.join(__dirname, 'data', 'weeknotes.json');
        const weeknote = {
            ...req.body,
            id: Date.now(),
            date: req.body.date || new Date().toISOString().split('T')[0]
        };

        let weeknotes = [];
        if (fs.existsSync(weeknotesPath)) {
            weeknotes = JSON.parse(fs.readFileSync(weeknotesPath, 'utf8'));
        }

        weeknotes.unshift(weeknote);
        fs.writeFileSync(weeknotesPath, JSON.stringify(weeknotes, null, 2), 'utf8');

        res.json({ success: true, item: weeknote });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save weeknote' });
    }
});

app.delete('/api/weeknotes/:id', (req, res) => {
    try {
        const weeknotesPath = path.join(__dirname, 'data', 'weeknotes.json');
        if (fs.existsSync(weeknotesPath)) {
            let weeknotes = JSON.parse(fs.readFileSync(weeknotesPath, 'utf8'));
            weeknotes = weeknotes.filter(item => item.id !== parseInt(req.params.id));
            fs.writeFileSync(weeknotesPath, JSON.stringify(weeknotes, null, 2), 'utf8');
        }
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete weeknote' });
    }
});

// Generate content endpoint
app.post('/api/generate', (req, res) => {
    try {
        generateAllContent();
        res.json({ success: true, message: 'Content generated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate content' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📝 Admin panel available at http://localhost:${PORT}/admin`);
    console.log(`🌐 Website available at http://localhost:${PORT}`);
}); 