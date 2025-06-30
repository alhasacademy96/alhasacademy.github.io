# GitHub Actions - Automatic Content Updates

## 🤖 Automated Workflow

Your website now has **automatic content updates** using GitHub Actions! Here's how it works:

## 📅 Scheduled Updates (Every Thursday)

The GitHub Actions workflow runs **every Thursday at 9:00 AM UTC** and:

1. ✅ **Checks for new content** in your data files
2. ✅ **Updates RSS feeds** for Matrix bots
3. ✅ **Updates your website** with new content
4. ✅ **Deploys automatically** to GitHub Pages

## 🚀 Manual Triggers

You can also trigger updates manually:

### Option 1: Via GitHub Web Interface
1. Go to your repository on GitHub
2. Click **Actions** tab
3. Select **Content Update** workflow
4. Click **Run workflow** button

### Option 2: Via Content Changes
- When you update files in the `data/` folder
- When you modify `admin-static.html`
- The workflow automatically triggers

## 📁 Workflow Files

Two workflows are set up:

### 1. `content-update.yml`
- **Triggers**: Every Thursday + when content files change
- **Updates**: Website content + RSS feeds
- **Best for**: Complete content updates

### 2. `auto-update-rss.yml`
- **Triggers**: Every Thursday + manual
- **Updates**: RSS feeds only
- **Best for**: Matrix bot updates

## 🔧 How to Use

### For Weekly Updates:
1. **Add content** via admin panel: `admin-static.html`
2. **Export data** and save to `data/` folder
3. **Commit and push** the data files
4. **GitHub Actions** automatically updates everything

### For Immediate Updates:
1. **Add content** via admin panel
2. **Go to GitHub** → Actions tab
3. **Click "Run workflow"** on Content Update
4. **Wait for completion** (usually 1-2 minutes)

## ⚙️ Configuration

### Change Schedule:
Edit `.github/workflows/content-update.yml`:
```yaml
schedule:
  # Run every Thursday at 9:00 AM UTC
  - cron: '0 9 * * 4'
  
  # Other options:
  # Daily at 9 AM: '0 9 * * *'
  # Every Monday: '0 9 * * 1'
  # Every hour: '0 * * * *'
```

### Change Time Zone:
The cron schedule uses UTC. To convert to your timezone:
- **EST**: Subtract 5 hours (4 AM EST)
- **PST**: Subtract 8 hours (1 AM PST)
- **GMT**: Same as UTC

## 📊 Monitoring

### Check Workflow Status:
1. Go to **Actions** tab on GitHub
2. Click on **Content Update** workflow
3. View recent runs and their status

### View Logs:
- Click on any workflow run
- Expand steps to see detailed logs
- Check for any errors or issues

## 🎯 Benefits

✅ **Fully Automated**: No manual commands needed
✅ **Scheduled**: Runs every Thursday automatically
✅ **Matrix Compatible**: RSS feeds update for bots
✅ **Error Handling**: Won't break if no new content
✅ **Manual Override**: Can trigger anytime
✅ **Logging**: Full history of updates

## 🚨 Troubleshooting

### Workflow Fails:
1. Check **Actions** tab for error messages
2. Verify Node.js dependencies are correct
3. Check if data files are valid JSON
4. Ensure GitHub token has write permissions

### No Updates:
1. Verify content was added to `data/` folder
2. Check workflow ran successfully
3. Wait a few minutes for GitHub Pages to update
4. Check RSS feeds manually

## 💡 Tips

- **Test manually first**: Use "Run workflow" button to test
- **Monitor logs**: Check Actions tab for any issues
- **Backup data**: Keep copies of your content files
- **Schedule wisely**: Thursday morning works well for weekly updates

Your website is now **fully automated**! 🎉 