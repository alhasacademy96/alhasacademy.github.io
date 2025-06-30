const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Automated deployment script for content updates

function deployContent() {
    console.log('🚀 Automated Content Deployment');
    console.log('This will update RSS feeds and deploy to GitHub automatically.');
    console.log('');

    try {
        // Step 1: Update RSS feeds for Matrix
        console.log('📡 Step 1: Updating RSS feeds for Matrix bots...');
        const { updateMatrixRSS } = require('./matrix-rss-update.js');
        updateMatrixRSS();

        // Step 2: Check if there are changes to commit
        console.log('\n📝 Step 2: Checking for changes...');
        const status = execSync('git status --porcelain', { encoding: 'utf8' });
        
        if (!status.trim()) {
            console.log('ℹ️  No changes to deploy');
            return;
        }

        // Step 3: Add and commit changes
        console.log('💾 Step 3: Committing changes...');
        execSync('git add rss.xml weeknotes-rss.xml', { stdio: 'inherit' });
        
        const timestamp = new Date().toISOString().split('T')[0];
        execSync(`git commit -m "Update RSS feeds - ${timestamp}"`, { stdio: 'inherit' });

        // Step 4: Push to GitHub
        console.log('🚀 Step 4: Deploying to GitHub...');
        execSync('git push origin main', { stdio: 'inherit' });

        console.log('\n✅ Deployment completed successfully!');
        console.log('🤖 Matrix bots will pick up the new content automatically');
        console.log('');
        console.log('🔗 Your updated feeds:');
        console.log('   News: https://alhasacademy96.github.io/alhasacademy.github.io/rss.xml');
        console.log('   Weeknotes: https://alhasacademy96.github.io/alhasacademy.github.io/weeknotes-rss.xml');

    } catch (error) {
        console.error('❌ Deployment failed:', error.message);
        console.log('\n💡 Manual steps:');
        console.log('1. Run: npm run matrix');
        console.log('2. Run: git add rss.xml weeknotes-rss.xml');
        console.log('3. Run: git commit -m "Update RSS feeds"');
        console.log('4. Run: git push origin main');
    }
}

// Run if called directly
if (require.main === module) {
    deployContent();
}

module.exports = { deployContent }; 