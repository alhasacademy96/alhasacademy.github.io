const fs = require('fs');
const path = require('path');

// Configuration
const config = {
    siteUrl: 'https://alhasacademy96.github.io/alhasacademy.github.io',
    author: 'alhasacademy@gmail.com (Ibrahim Alhas)',
    copyright: 'Copyright © 2025 Ibrahim Alhas'
};

// Helper function to format date for RSS
function formatRSSDate(dateString) {
    const date = new Date(dateString);
    return date.toUTCString();
}

// Helper function to format date for display
function formatDisplayDate(dateString) {
    const date = new Date(dateString);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

// Generate RSS feed
function generateRSSFeed(items, feedType) {
    const now = new Date();
    const lastBuildDate = now.toUTCString();
    
    let rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="${config.siteUrl}/rss-style.xsl"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>Ibrahim Alhas - ${feedType === 'news' ? 'News &amp; Updates' : 'Weeknotes'}</title>
        <link>${config.siteUrl}/${feedType === 'news' ? '' : '#weeknotes'}</link>
        <description>${feedType === 'news' ? 'Latest updates, news, and projects from Ibrahim Alhas' : 'Weekly reflections, updates, and thoughts from Ibrahim Alhas on research, projects, and life'}</description>
        <language>en-us</language>
        <lastBuildDate>${lastBuildDate}</lastBuildDate>
        <copyright>${config.copyright}</copyright>
        <atom:link href="${config.siteUrl}/${feedType === 'news' ? 'rss.xml' : 'weeknotes-rss.xml'}" rel="self" type="application/rss+xml" />
`;

    items.forEach(item => {
        const pubDate = formatRSSDate(item.date);
        const guid = feedType === 'news' 
            ? `${config.siteUrl}/#news-${item.date.replace(/-/g, '-')}`
            : `${config.siteUrl}/#weeknotes-${item.date.replace(/-/g, '-')}`;
        
        const categories = item.categories && item.categories.length > 0 
            ? item.categories.map(cat => `        <category>${cat}</category>`).join('\n')
            : '';

        rssContent += `
        <item>
            <title>${item.title}</title>
            <link>${feedType === 'news' ? config.siteUrl + '/#news' : config.siteUrl + '/#weeknotes'}</link>
            <description>${feedType === 'news' ? item.content : `<![CDATA[\n${item.content}\n        ]]>`}</description>
            <pubDate>${pubDate}</pubDate>
            <guid isPermaLink="false">${guid}</guid>
            <author>${config.author}</author>
${categories}
        </item>`;
    });

    rssContent += `
    </channel>
</rss>`;

    return rssContent;
}

// Generate HTML content for news section
function generateNewsHTML(newsItems) {
    if (!newsItems || newsItems.length === 0) {
        return `
                <div class="news-item">
                    <div class="news-header">
                        <div class="news-date">No recent news</div>
                        <div class="news-line"></div>
                    </div>
                    <div class="news-content">
                        Check back soon for updates!
                    </div>
                </div>`;
    }

    return newsItems.map(item => {
        const displayDate = formatDisplayDate(item.date);
        return `
                <div class="news-item">
                    <div class="news-header">
                        <div class="news-date">${displayDate}</div>
                        <div class="news-line"></div>
                    </div>
                    <div class="news-content">
                        ${item.content}
                    </div>
                </div>`;
    }).join('');
}

// Generate HTML content for weeknotes section
function generateWeeknotesHTML(weeknotesItems) {
    if (!weeknotesItems || weeknotesItems.length === 0) {
        return `
                <div class="news-item">
                    <div class="news-header">
                        <div class="news-date">No weeknotes yet</div>
                        <div class="news-line"></div>
                    </div>
                    <div class="news-content">
                        Weekly reflections will appear here soon!
                    </div>
                </div>`;
    }

    return weeknotesItems.map(item => {
        const displayDate = formatDisplayDate(item.date);
        return `
                <div class="news-item">
                    <div class="news-header">
                        <div class="news-date">${displayDate}</div>
                        <div class="news-line"></div>
                    </div>
                    <div class="news-content">${item.content}</div>
                </div>`;
    }).join('');
}

// Update the main index.html file
function updateIndexHTML(newsItems, weeknotesItems) {
    try {
        // Read the current index.html
        const indexPath = path.join(__dirname, 'index.html');
        let htmlContent = fs.readFileSync(indexPath, 'utf8');

        // Generate new content
        const newsHTML = generateNewsHTML(newsItems);
        const weeknotesHTML = generateWeeknotesHTML(weeknotesItems);

        // Replace the news section
        const newsSectionRegex = /<section id="news" class="section">[\s\S]*?<h1>So, what's been happening\?<\/h1>[\s\S]*?<\/section>/;
        const newsSectionReplacement = `<section id="news" class="section">
                <h1>So, what's been happening?</h1>${newsHTML}
            </section>`;
        
        htmlContent = htmlContent.replace(newsSectionRegex, newsSectionReplacement);

        // Replace the weeknotes section
        const weeknotesSectionRegex = /<section id="weeknotes" class="section">[\s\S]*?<h1>Weeknotes<\/h1>[\s\S]*?<\/section>/;
        const weeknotesSectionReplacement = `<section id="weeknotes" class="section">
                <h1>Weeknotes</h1>
                <div id="weeknotes-container">${weeknotesHTML}
                </div>
            </section>`;
        
        htmlContent = htmlContent.replace(weeknotesSectionRegex, weeknotesSectionReplacement);

        // Write the updated file
        fs.writeFileSync(indexPath, htmlContent, 'utf8');
        console.log('✅ Updated index.html successfully');
        
    } catch (error) {
        console.error('❌ Error updating index.html:', error.message);
    }
}

// Main function to generate all content
function generateAllContent() {
    try {
        console.log('🚀 Starting content generation...');

        // Read data from localStorage (in a real implementation, this would come from a database or file)
        // For now, we'll create sample data or read from JSON files
        let newsItems = [];
        let weeknotesItems = [];

        // Try to read from data files if they exist
        const newsDataPath = path.join(__dirname, 'data', 'news.json');
        const weeknotesDataPath = path.join(__dirname, 'data', 'weeknotes.json');

        if (fs.existsSync(newsDataPath)) {
            newsItems = JSON.parse(fs.readFileSync(newsDataPath, 'utf8'));
            console.log(`📰 Loaded ${newsItems.length} news items`);
        }

        if (fs.existsSync(weeknotesDataPath)) {
            weeknotesItems = JSON.parse(fs.readFileSync(weeknotesDataPath, 'utf8'));
            console.log(`📅 Loaded ${weeknotesItems.length} weeknotes`);
        }

        // Sort items by date (newest first)
        newsItems.sort((a, b) => new Date(b.date) - new Date(a.date));
        weeknotesItems.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Generate RSS feeds
        const newsRSS = generateRSSFeed(newsItems, 'news');
        const weeknotesRSS = generateRSSFeed(weeknotesItems, 'weeknotes');

        // Write RSS files
        fs.writeFileSync(path.join(__dirname, 'rss.xml'), newsRSS, 'utf8');
        fs.writeFileSync(path.join(__dirname, 'weeknotes-rss.xml'), weeknotesRSS, 'utf8');
        
        console.log('✅ Generated RSS feeds successfully');

        // Update the main website
        updateIndexHTML(newsItems, weeknotesItems);

        console.log('🎉 Content generation completed successfully!');
        console.log(`📊 Summary:`);
        console.log(`   - News items: ${newsItems.length}`);
        console.log(`   - Weeknotes: ${weeknotesItems.length}`);
        console.log(`   - RSS feeds: Updated`);
        console.log(`   - Website: Updated`);

    } catch (error) {
        console.error('❌ Error during content generation:', error.message);
        process.exit(1);
    }
}

// Create data directory if it doesn't exist
function ensureDataDirectory() {
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
        console.log('📁 Created data directory');
    }
}

// Export functions for use in other modules
module.exports = {
    generateAllContent,
    generateRSSFeed,
    generateNewsHTML,
    generateWeeknotesHTML,
    updateIndexHTML,
    ensureDataDirectory
};

// Run if called directly
if (require.main === module) {
    ensureDataDirectory();
    generateAllContent();
} 