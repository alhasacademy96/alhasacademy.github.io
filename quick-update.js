const fs = require('fs');
const path = require('path');

// Simple script to quickly update RSS feeds after adding content via admin panel

function quickUpdate() {
    console.log('🚀 Quick RSS Update Tool');
    console.log('This will update your RSS feeds with any new content from the admin panel.');
    console.log('');

    // Check if data files exist
    const newsPath = path.join(__dirname, 'data', 'news.json');
    const weeknotesPath = path.join(__dirname, 'data', 'weeknotes.json');

    if (!fs.existsSync(newsPath) || !fs.existsSync(weeknotesPath)) {
        console.log('❌ Data files not found. Please run the admin panel first to add content.');
        return;
    }

    // Load current data
    const news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
    const weeknotes = JSON.parse(fs.readFileSync(weeknotesPath, 'utf8'));

    console.log(`📰 Found ${news.length} news items`);
    console.log(`📅 Found ${weeknotes.length} weeknotes`);
    console.log('');

    // Generate RSS feeds
    const newsRSS = generateRSSFeed(news, 'news');
    const weeknotesRSS = generateRSSFeed(weeknotes, 'weeknotes');

    // Write RSS files
    fs.writeFileSync(path.join(__dirname, 'rss.xml'), newsRSS, 'utf8');
    fs.writeFileSync(path.join(__dirname, 'weeknotes-rss.xml'), weeknotesRSS, 'utf8');

    console.log('✅ RSS feeds updated successfully!');
    console.log('');
    console.log('📝 Next steps:');
    console.log('1. Commit and push these changes:');
    console.log('   git add rss.xml weeknotes-rss.xml');
    console.log('   git commit -m "Update RSS feeds"');
    console.log('   git push origin main');
    console.log('');
    console.log('2. RSS readers will automatically pick up the new content within a few hours');
    console.log('');
    console.log('🔗 Your RSS feeds:');
    console.log(`   News: https://alhasacademy96.github.io/alhasacademy.github.io/rss.xml`);
    console.log(`   Weeknotes: https://alhasacademy96.github.io/alhasacademy.github.io/weeknotes-rss.xml`);
}

// RSS generation function (same as in update-website.js)
function generateRSSFeed(items, feedType) {
    const config = {
        siteUrl: 'https://alhasacademy96.github.io/alhasacademy.github.io',
        author: 'alhasacademy@gmail.com (Ibrahim Alhas)',
        copyright: 'Copyright © 2025 Ibrahim Alhas'
    };

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
        const pubDate = new Date(item.date).toUTCString();
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

// Run if called directly
if (require.main === module) {
    quickUpdate();
}

module.exports = { quickUpdate }; 