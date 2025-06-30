const fs = require('fs');
const path = require('path');

// Migration script to convert existing static content to the new dynamic system

function migrateExistingContent() {
    console.log('🔄 Starting content migration...');

    // Create data directory if it doesn't exist
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    // Migrate existing news items from the current index.html
    const existingNews = [
        {
            title: "Joined University of Cambridge's Department of Zoology",
            date: "2025-06-01",
            content: "Joined the Department of Zoology and Department of Computer Science teams at the University of Cambridge as Research Software Engineer.",
            categories: ["Career", "Research"]
        },
        {
            title: "Promoted to Lead Software Engineer at LCFI",
            date: "2025-01-01",
            content: "Promoted to Lead Software Engineer at the Leverhulme Centre for the Future of Intelligence Institution (LCFI), University of Cambridge.",
            categories: ["Career"]
        },
        {
            title: "Joined LCFI as Software Engineer",
            date: "2024-01-01",
            content: "Joined the Centre for the Future of Intelligence at the University of Cambridge as Software Engineer.",
            categories: ["Career"]
        },
        {
            title: "Joined startup as Intern Software Engineer",
            date: "2022-08-01",
            content: "Joined a startup building water detection hardware as an Intern Software Engineer.",
            categories: ["Career"]
        },
        {
            title: "Graduated with MSc in AI from King's College London",
            date: "2022-08-01",
            content: "Graduated with a Master's degree in Artificial Intelligence from King's College London (KCL).",
            categories: ["Education"]
        },
        {
            title: "Started Game Development Project 'ItLivesInTheWoods'",
            date: "2022-08-01",
            content: "Game development project 'ItLivesInTheWoods' started as a solo side project, later to be a Steam commercial release.",
            categories: ["Projects", "Games"]
        },
        {
            title: "Graduated with BSc in Computer Science",
            date: "2018-05-01",
            content: "Graduated with a Bachelor's degree in Computer Science from the University of Westminster.",
            categories: ["Education"]
        }
    ];

    // Migrate existing weeknotes from the current weeknotes-rss.xml
    const existingWeeknotes = [
        {
            title: "Week 24, 2025: State of the DOI Pipeline",
            date: "2025-06-30",
            content: `<p><strong>State of the DOI Pipeline</strong></p>
<p>This week I compiled the current status of our DOI pipeline, examining both fetching and TEI-conversion stages.</p>

<p><strong>Overall Database Numbers:</strong></p>
<ul>
  <li>PDF: 2.8 M raw → ~2.6 M TEI (91.96 %)</li>
  <li>XML: 5.7 M raw → ~84 K TEI (1.46 %)</li>
  <li>JSON: 1.4 M raw (∼2 M fetch logs)</li>
</ul>

<p><strong>DOI-to-Database:</strong> The "big four" publishers (Elsevier, Wiley, Taylor & Francis, Springer) account for ~90 % of fetches. About half fail—mostly 4xx errors (~700 K), access denials (~350 K), payload mismatches (HTML/JS wrappers), and unhandled redirects (~120 K).</p>
<p><strong>Actionable Fixes:</strong></p>
<ul>
  <li>Verify and refresh API access with the Library/publishers.</li>
  <li>Improve <code>curl</code> to target PDF files, follow redirects, and enrich logs.</li>
  <li>Build a live dashboard for real-time fetch monitoring.</li>
  <li>Ensure compliance with publishers' robots.txt and scraping policies.</li>
</ul>

<p><strong>DOI-to-TEI:</strong> PDF→TEI conversion is near-perfect, but XML→TEI lags (~84 K converted), especially for Elsevier's layered wrappers. PR #18 helps unwrap one layer, but we need comprehensive XSL tweaks.</p>
<p><strong>Actionable Fixes:</strong></p>
<ul>
  <li>Enhance <code>Elsevier.xsl</code> to handle multi-layer wrappers; validate all publisher stylesheets.</li>
  <li>Purge malformed/truncated XML from the DB and future fetches.</li>
  <li>Separate HTML from XML before conversion to avoid mix-ups.</li>
  <li>Merge/rebase PR #18 and test across JATS and SVAPI feeds.</li>
</ul>

<p>By confirming access and refining our conversion logic, we aim to hit ≥ 90 % fetch success and near-complete XML-to-TEI conversion—fulfilling the pipeline's core objective.</p>`,
            categories: ["Weeknotes", "Projects", "Research"]
        },
        {
            title: "Week 23, 2025: Research Software Engineering at Cambridge Zoology",
            date: "2025-06-07",
            content: `<p><strong>Research Software Engineering at Cambridge Zoology</strong></p>
<p>This week marked the beginning of my role as Research Software Engineer at the University of Cambridge's Department of Zoology. The transition from LCFI has been smooth, and I'm excited to work on new research projects that combine my software engineering expertise with biological research.</p>
<p>Key highlights:</p>
<ul>
    <li>Met with the core team in conjunction with Department of Computer Science to understand immediate project needs.</li>
    <li>Started familiarizing myself with existing data pipelines and analysis tools</li>
    <li>Began deep research into the current state of the pipeline.</li>
</ul>`,
            categories: ["Weeknotes", "Research", "Career"]
        },
        {
            title: "Week 22, 2025: Wrapping Up at LCFI",
            date: "2025-05-31",
            content: `<p><strong>Wrapping Up at LCFI</strong></p>
<p>My final week at the Leverhulme Centre for the Future of Intelligence was bittersweet. After two years of working on the Animal-AI environment, it's time to pass the torch to the next team.</p>
<p>Final tasks completed:</p>
<ul>
    <li>Documentation handover for the Animal-AI environment</li>
    <li>Final code reviews and bug fixes</li>
    <li>Knowledge transfer sessions with incoming team members</li>
</ul>
<p>The Animal-AI project has been published and is now being used by researchers worldwide, which is incredibly rewarding to see.</p>`,
            categories: ["Weeknotes", "Career", "Projects"]
        },
        {
            title: "Week 21, 2025: Game Development & Research Balance",
            date: "2025-05-24",
            content: `<p><strong>Game Development & Research Balance</strong></p>
<p>Balancing my research work with ongoing game development has been challenging but rewarding. "ItLivesInTheWoods" continues to receive positive feedback from the community.</p>
<p>This week's focus:</p>
<ul>
    <li>Bug fixes and performance optimizations for the game</li>
    <li>Planning for "ItLivesInTheWoods Pt.2" development timeline</li>
    <li>Research on new AI techniques that could enhance future game mechanics</li>
</ul>
<p>The intersection of AI research and game development continues to fascinate me, and I'm exploring ways to incorporate more sophisticated AI systems in future projects.</p>`,
            categories: ["Weeknotes", "Projects", "Games", "AI"]
        },
        {
            title: "Week 20, 2025: Preparing for the Transition",
            date: "2025-05-17",
            content: `<p><strong>Preparing for the Transition</strong></p>
<p>This week has been all about preparing for my upcoming move to the Department of Zoology. The transition period is always interesting - wrapping up current projects while mentally preparing for new challenges.</p>
<p>Key activities:</p>
<ul>
    <li>Finalizing documentation for ongoing Animal-AI research</li>
    <li>Meeting with the Zoology team to understand their computational needs</li>
    <li>Researching current tools and methodologies in computational biology</li>
    <li>Planning how to apply my AI/ML expertise to biological research questions</li>
</ul>
<p>I'm particularly excited about the opportunity to work at the intersection of computer science and biology, which feels like a natural evolution of my research interests.</p>`,
            categories: ["Weeknotes", "Career", "Research"]
        },
        {
            title: "Week 19, 2025: AI Research & Game Mechanics",
            date: "2025-05-10",
            content: `<p><strong>AI Research & Game Mechanics</strong></p>
<p>Spent this week exploring how my AI research can inform game development and vice versa. The Animal-AI environment has given me insights into how AI agents learn and adapt, which could be fascinating to apply to game NPCs.</p>
<p>Research focus:</p>
<ul>
    <li>Studying emergent behaviors in AI agents</li>
    <li>Exploring procedural content generation techniques</li>
    <li>Investigating adaptive difficulty systems based on player behavior</li>
    <li>Planning AI-driven narrative elements for future games</li>
</ul>
<p>The more I work in both fields, the more I see the potential for cross-pollination between AI research and game development.</p>`,
            categories: ["Weeknotes", "Research", "AI", "Games"]
        }
    ];

    // Add IDs to existing content
    const newsWithIds = existingNews.map((item, index) => ({
        ...item,
        id: Date.now() + index
    }));

    const weeknotesWithIds = existingWeeknotes.map((item, index) => ({
        ...item,
        id: Date.now() + 1000 + index
    }));

    // Write the migrated data to JSON files
    fs.writeFileSync(
        path.join(dataDir, 'news.json'),
        JSON.stringify(newsWithIds, null, 2),
        'utf8'
    );

    fs.writeFileSync(
        path.join(dataDir, 'weeknotes.json'),
        JSON.stringify(weeknotesWithIds, null, 2),
        'utf8'
    );

    console.log('✅ Migration completed successfully!');
    console.log(`📰 Migrated ${newsWithIds.length} news items`);
    console.log(`📅 Migrated ${weeknotesWithIds.length} weeknotes`);
    console.log('📁 Data saved to data/ directory');
    console.log('');
    console.log('🚀 Next steps:');
    console.log('1. Run: npm install');
    console.log('2. Run: npm run dev');
    console.log('3. Visit: http://localhost:3000/admin');
    console.log('4. Click "Generate Website & RSS Feeds" to update your site');
}

// Run migration if called directly
if (require.main === module) {
    migrateExistingContent();
}

module.exports = { migrateExistingContent }; 