# Ibrahim Alhas - Personal Website

A modern, responsive personal website with dynamic content management for news and weeknotes.

## Features

- **Responsive Design**: Beautiful, mobile-friendly layout
- **Dynamic Content Management**: Easy-to-use admin panel for managing news and weeknotes
- **Automatic RSS Generation**: RSS feeds are automatically updated when content changes
- **Modern UI**: Clean, professional design with smooth animations
- **PDF Viewer**: Integrated CV viewer with fullscreen support

## Content Management System

The website now includes a powerful content management system that allows you to:

- Add, edit, and delete news items
- Create weekly notes with HTML support
- Automatically generate RSS feeds
- Update the website content dynamically

### Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Development Server**:
   ```bash
   npm run dev
   ```

3. **Access the Admin Panel**:
   - Open your browser and go to `http://localhost:3000/admin`
   - Use the admin panel to add news and weeknotes

4. **View Your Website**:
   - Your website is available at `http://localhost:3000`
   - RSS feeds are automatically generated at:
     - News: `http://localhost:3000/rss.xml`
     - Weeknotes: `http://localhost:3000/weeknotes-rss.xml`

### Using the Admin Panel

#### Adding News Items
1. Go to the "News" tab in the admin panel
2. Fill in the title, date, and content
3. Add categories (optional, comma-separated)
4. Click "Add News Item"

#### Adding Weeknotes
1. Go to the "Weeknotes" tab in the admin panel
2. Fill in the title, date, and content (HTML supported)
3. Add categories (optional, comma-separated)
4. Click "Add Weeknote"

#### Generating Content
1. After adding or editing content, click the "Generate Website & RSS Feeds" button
2. This will automatically update your website and RSS feeds

### File Structure

```
alhasacademy.github.io/
├── index.html              # Main website
├── admin.html              # Admin panel
├── server.js               # Express server
├── generate-content.js     # Content generation script
├── package.json            # Node.js dependencies
├── data/                   # Content storage
│   ├── news.json          # News items
│   └── weeknotes.json     # Weeknotes
├── rss.xml                # News RSS feed
├── weeknotes-rss.xml      # Weeknotes RSS feed
└── web/                   # PDF viewer files
```

### Deployment

For GitHub Pages deployment:

1. **Build the content**:
   ```bash
   npm run build
   ```

2. **Commit and push** your changes to GitHub

3. **Enable GitHub Pages** in your repository settings

The website will be available at `https://yourusername.github.io/repository-name/`

### Customization

#### Styling
- Main styles are in the `<style>` section of `index.html`
- Admin panel styles are in `admin.html`
- Colors and fonts can be easily customized

#### Content
- News and weeknotes are stored in JSON format in the `data/` directory
- RSS feeds are automatically generated from this data
- The website content is dynamically updated based on the JSON files

#### Configuration
- Update the `config` object in `generate-content.js` to change:
  - Site URL
  - Author information
  - Copyright notice

### Scripts

- `npm start`: Start the production server
- `npm run dev`: Start the development server with auto-reload
- `npm run generate`: Generate website content and RSS feeds
- `npm run build`: Build for production

### RSS Feeds

The system automatically generates two RSS feeds:

1. **News Feed** (`rss.xml`): Contains all news items
2. **Weeknotes Feed** (`weeknotes-rss.xml`): Contains all weekly notes

Both feeds include:
- Item titles and descriptions
- Publication dates
- Categories
- Proper RSS 2.0 formatting

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Progressive enhancement for older browsers

## License

MIT License - feel free to use this template for your own personal website!

## Contact

- **Email**: alhasacademy@gmail.com
- **LinkedIn**: [Ibrahim Alhas](https://www.linkedin.com/in/alhasacademy/)
- **GitHub**: [alhasacademy96](https://github.com/alhasacademy96)
