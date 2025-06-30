const fs = require('fs');
const path = require('path');

// Script to update RSS feeds for Matrix bots while preserving exact format

function updateMatrixRSS() {
    console.log('🤖 Matrix RSS Update Tool');
    console.log('This will add new content to your existing RSS feeds without changing the format.');
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

    // Update RSS feeds while preserving format
    updateNewsRSS(news);
    updateWeeknotesRSS(weeknotes);

    console.log('✅ RSS feeds updated for Matrix bots!');
    console.log('');
    console.log('📝 Next steps:');
    console.log('1. Commit and push these changes:');
    console.log('   git add rss.xml weeknotes-rss.xml');
    console.log('   git commit -m "Update RSS feeds for Matrix"');
    console.log('   git push origin main');
    console.log('');
    console.log('2. Matrix bots will automatically pick up the new content');
    console.log('');
    console.log('🔗 Your RSS feeds:');
    console.log(`   News: https://alhasacademy96.github.io/alhasacademy.github.io/rss.xml`);
    console.log(`   Weeknotes: https://alhasacademy96.github.io/alhasacademy.github.io/weeknotes-rss.xml`);
}

function updateNewsRSS(newsItems) {
    const rssPath = path.join(__dirname, 'rss.xml');
    
    if (!fs.existsSync(rssPath)) {
        console.log('❌ rss.xml not found. Creating new file...');
        createNewNewsRSS(newsItems);
        return;
    }

    // Read existing RSS file
    let rssContent = fs.readFileSync(rssPath, 'utf8');
    
    // Find the position to insert new items (after the channel header, before closing channel tag)
    const insertPosition = rssContent.indexOf('        <atom:link href="https://alhasacademy96.github.io/alhasacademy.github.io/rss.xml" rel="self" type="application/rss+xml" />');
    const afterHeader = rssContent.indexOf('\n', insertPosition) + 1;
    
    // Get existing items to avoid duplicates
    const existingGuids = [];
    const guidRegex = /<guid isPermaLink="false">([^<]+)<\/guid>/g;
    let match;
    while ((match = guidRegex.exec(rssContent)) !== null) {
        existingGuids.push(match[1]);
    }

    // Generate new items that don't already exist
    let newItems = '';
    newsItems.forEach(item => {
        const guid = `https://alhasacademy96.github.io/alhasacademy.github.io/#news-${item.date.replace(/-/g, '-')}`;
        if (!existingGuids.includes(guid)) {
            newItems += generateNewsItem(item);
        }
    });

    if (newItems) {
        // Insert new items after the header
        rssContent = rssContent.slice(0, afterHeader) + newItems + rssContent.slice(afterHeader);
        
        // Update lastBuildDate
        const now = new Date();
        const lastBuildDate = now.toUTCString();
        rssContent = rssContent.replace(
            /<lastBuildDate>[^<]+<\/lastBuildDate>/,
            `<lastBuildDate>${lastBuildDate}</lastBuildDate>`
        );
        
        fs.writeFileSync(rssPath, rssContent, 'utf8');
        console.log('✅ Updated rss.xml with new items');
    } else {
        console.log('ℹ️  No new news items to add');
    }
}

function updateWeeknotesRSS(weeknotesItems) {
    const rssPath = path.join(__dirname, 'weeknotes-rss.xml');
    
    if (!fs.existsSync(rssPath)) {
        console.log('❌ weeknotes-rss.xml not found. Creating new file...');
        createNewWeeknotesRSS(weeknotesItems);
        return;
    }

    // Read existing RSS file
    let rssContent = fs.readFileSync(rssPath, 'utf8');
    
    // Find the position to insert new items
    const insertPosition = rssContent.indexOf('        <atom:link href="https://alhasacademy96.github.io/alhasacademy.github.io/weeknotes-rss.xml" rel="self" type="application/rss+xml" />');
    const afterHeader = rssContent.indexOf('\n', insertPosition) + 1;
    
    // Get existing items to avoid duplicates
    const existingGuids = [];
    const guidRegex = /<guid isPermaLink="false">([^<]+)<\/guid>/g;
    let match;
    while ((match = guidRegex.exec(rssContent)) !== null) {
        existingGuids.push(match[1]);
    }

    // Generate new items that don't already exist
    let newItems = '';
    weeknotesItems.forEach(item => {
        const guid = `https://alhasacademy96.github.io/alhasacademy.github.io/#weeknotes-${item.date.replace(/-/g, '-')}`;
        if (!existingGuids.includes(guid)) {
            newItems += generateWeeknoteItem(item);
        }
    });

    if (newItems) {
        // Insert new items after the header
        rssContent = rssContent.slice(0, afterHeader) + newItems + rssContent.slice(afterHeader);
        
        // Update lastBuildDate
        const now = new Date();
        const lastBuildDate = now.toUTCString();
        rssContent = rssContent.replace(
            /<lastBuildDate>[^<]+<\/lastBuildDate>/,
            `<lastBuildDate>${lastBuildDate}</lastBuildDate>`
        );
        
        fs.writeFileSync(rssPath, rssContent, 'utf8');
        console.log('✅ Updated weeknotes-rss.xml with new items');
    } else {
        console.log('ℹ️  No new weeknotes to add');
    }
}

function generateNewsItem(item) {
    const pubDate = new Date(item.date + 'T00:00:00Z').toUTCString();
    const guid = `https://alhasacademy96.github.io/alhasacademy.github.io/#news-${item.date.replace(/-/g, '-')}`;
    
    const categories = item.categories && item.categories.length > 0 
        ? item.categories.map(cat => `        <category>${cat}</category>`).join('\n')
        : '';

    return `
        <item>
            <title>${item.title}</title>
            <link>https://alhasacademy96.github.io/alhasacademy.github.io/#news</link>
            <description>${item.content}</description>
            <pubDate>${pubDate}</pubDate>
            <guid isPermaLink="false">${guid}</guid>
            <author>alhasacademy@gmail.com (Ibrahim Alhas)</author>
${categories}
        </item>`;
}

function generateWeeknoteItem(item) {
    const pubDate = new Date(item.date + 'T00:00:00Z').toUTCString();
    const guid = `https://alhasacademy96.github.io/alhasacademy.github.io/#weeknotes-${item.date.replace(/-/g, '-')}`;
    
    const categories = item.categories && item.categories.length > 0 
        ? item.categories.map(cat => `        <category>${cat}</category>`).join('\n')
        : '';

    return `
        <item>
            <title>${item.title}</title>
            <link>https://alhasacademy96.github.io/alhasacademy.github.io/#weeknotes</link>
            <description><![CDATA[
${item.content}
        ]]></description>
            <pubDate>${pubDate}</pubDate>
            <guid isPermaLink="false">${guid}</guid>
            <author>alhasacademy@gmail.com (Ibrahim Alhas)</author>
${categories}
        </item>`;
}

function createNewNewsRSS(newsItems) {
    const now = new Date();
    const lastBuildDate = now.toUTCString();
    
    let rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="https://alhasacademy96.github.io/alhasacademy.github.io/rss-style.xsl"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>Ibrahim Alhas - News &amp; Updates</title>
        <link>https://alhasacademy96.github.io/alhasacademy.github.io/</link>
        <description>Latest updates, news, and projects from Ibrahim Alhas</description>
        <language>en-us</language>
        <lastBuildDate>${lastBuildDate}</lastBuildDate>
        <copyright>Copyright © 2025 Ibrahim Alhas</copyright>
        <atom:link href="https://alhasacademy96.github.io/alhasacademy.github.io/rss.xml" rel="self" type="application/rss+xml" />
`;

    newsItems.forEach(item => {
        rssContent += generateNewsItem(item);
    });

    rssContent += `
    </channel>
</rss>`;

    fs.writeFileSync(path.join(__dirname, 'rss.xml'), rssContent, 'utf8');
    console.log('✅ Created new rss.xml file');
}

function createNewWeeknotesRSS(weeknotesItems) {
    const now = new Date();
    const lastBuildDate = now.toUTCString();
    
    let rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="https://alhasacademy96.github.io/alhasacademy.github.io/rss-style.xsl"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>Ibrahim Alhas - Weeknotes</title>
        <link>https://alhasacademy96.github.io/alhasacademy.github.io/#weeknotes</link>
        <description>Weekly reflections, updates, and thoughts from Ibrahim Alhas on research, projects, and life</description>
        <language>en-us</language>
        <lastBuildDate>${lastBuildDate}</lastBuildDate>
        <copyright>Copyright © 2025 Ibrahim Alhas</copyright>
        <atom:link href="https://alhasacademy96.github.io/alhasacademy.github.io/weeknotes-rss.xml" rel="self" type="application/rss+xml" />
`;

    weeknotesItems.forEach(item => {
        rssContent += generateWeeknoteItem(item);
    });

    rssContent += `
    </channel>
</rss>`;

    fs.writeFileSync(path.join(__dirname, 'weeknotes-rss.xml'), rssContent, 'utf8');
    console.log('✅ Created new weeknotes-rss.xml file');
}

// Run if called directly
if (require.main === module) {
    updateMatrixRSS();
}

module.exports = { updateMatrixRSS }; 