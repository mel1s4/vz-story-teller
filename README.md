# VZ Story Teller

> Write professional screenplays and create animatics directly on your WordPress website.

![License](https://img.shields.io/badge/license-GPL%20v2%2B-blue.svg)
![WordPress](https://img.shields.io/badge/WordPress-5.0%2B-blue.svg)
![PHP](https://img.shields.io/badge/PHP-7.4%2B-blue.svg)

## Overview

**VZ Story Teller** is an open-source WordPress plugin that brings professional screenwriting capabilities to your WordPress site. Write, format, and manage screenplays with industry-standard elements like sluglines, action lines, dialogue, and transitions—all within your familiar WordPress environment.

Perfect for filmmakers, screenwriters, content creators, and anyone who needs to write formatted scripts without leaving their WordPress workflow.

## ✨ Features

### Core Script Elements
- **Sluglines** - Scene headers with location, time, and setting
- **Action Lines** - Scene descriptions and character actions
- **Characters** - Character names with proper formatting
- **Dialogue** - Character speech with automatic formatting
- **Parentheticals** - Stage directions within dialogue
- **Transitions** - Scene transitions (FADE IN, CUT TO, etc.)
- **Shots** - Camera direction and shot types
- **Notes** - Inline notes and comments

### Key Capabilities
- 🎬 **Professional Formatting** - Industry-standard screenplay formatting
- 📝 **Interactive Editor** - Modern, intuitive React-based editor
- 🔒 **Security First** - Built-in security features and permission checks
- 💾 **Auto-Save** - Never lose your work with automatic saving
- 🖨️ **Print-Friendly** - Dedicated template for printing scripts
- 👥 **Multi-User** - Leverage WordPress user management for collaboration
- 🎨 **Customizable** - Choose from different display templates
- 📱 **Responsive** - Works on desktop, tablet, and mobile devices

### WordPress Integration
- Custom post type for scripts (`vz_script`)
- WordPress user permissions and roles
- REST API endpoints for script management
- Category and tag support
- Featured images for scripts
- Revision support

## 🚀 Installation

### Prerequisites
- WordPress 5.0 or higher
- PHP 7.4 or higher
- Modern web browser with JavaScript enabled

### Method 1: Manual Installation

1. Download the latest release from the [Releases page](https://github.com/yourusername/vz-story-teller/releases)
2. Upload the plugin folder to `/wp-content/plugins/` directory
3. Activate the plugin through the 'Plugins' menu in WordPress
4. Navigate to **Scripts** in your WordPress admin menu

### Method 2: Git Clone

```bash
cd wp-content/plugins/
git clone https://github.com/yourusername/vz-story-teller.git
cd vz-story-teller
```

### Building the Frontend (Development)

If you're contributing or need to modify the frontend:

```bash
cd frontend
npm install
npm run build
```

For development with hot reload:

```bash
npm run dev
```

## 📖 Usage

### Creating Your First Script

1. **Navigate to Scripts**
   - Go to **Scripts → Add New** in your WordPress admin panel

2. **Set Up Your Script**
   - Enter a title for your script
   - Optionally set a featured image (cover image)
   - Add categories or tags for organization

3. **Edit in Frontend**
   - Click the **"Edit in Frontend"** button in the publish box
   - This opens the interactive script editor

4. **Add Script Elements**
   - Use the element selector to add different script components
   - Click on any element to edit its content
   - Drag to reorder elements

5. **Save Your Work**
   - Changes are automatically saved as you type
   - Use the save button for manual saves

### Script Elements Guide

#### Slugline
Scene headers that indicate location and time:
```
INT. COFFEE SHOP - DAY
```

#### Action
Descriptive text that sets the scene and describes action:
```
John sits at a table, nervously tapping his fingers.
```

#### Character
Character names (automatically formatted in uppercase):
```
JOHN
```

#### Dialogue
What the character says:
```
This is the best coffee I've ever had!
```

#### Parenthetical
Stage directions within dialogue:
```
(whispering)
```

#### Transition
Scene transitions:
```
FADE IN
CUT TO
```

### Template Options

The plugin includes a print-friendly template for professional script printing:

1. Edit your script
2. In the right sidebar, select **"Print-Friendly Script"** template
3. Click **"View Print Version"** to see the formatted output

## 🛠️ Development

### Project Structure

```
vz-story-teller/
├── frontend/                 # React-based editor
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── styles/          # SCSS stylesheets
│   │   └── utils/           # Helper functions
│   ├── public/              # Static assets
│   └── dist/                # Built frontend (generated)
├── vz-story-teller.php      # Main plugin file
├── script-editor.php        # Editor template
├── template-print-script.php # Print template
└── ROADMAP.md               # Feature roadmap
```

### Tech Stack

**Backend:**
- PHP 7.4+
- WordPress REST API
- Custom Post Types

**Frontend:**
- React 18
- SCSS
- Vite (build tool)

### REST API Endpoints

The plugin exposes the following endpoints:

- `GET /wp-json/vz-story-teller/v1/script/{id}` - Retrieve script data
- `POST /wp-json/vz-story-teller/v1/script/{id}` - Save script data

All endpoints require authentication and proper permissions.

### Security Features

- Nonce verification for all requests
- User authentication checks
- Permission validation (edit_post capability)
- REST API disabled for script post type
- Input sanitization and validation
- CSRF protection

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute

1. **Report Bugs** - Found a bug? Open an issue with details
2. **Suggest Features** - Have an idea? Share it in discussions
3. **Submit Pull Requests** - Fix bugs or add features
4. **Improve Documentation** - Help make the docs better
5. **Test** - Try the plugin and provide feedback

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Standards

- Follow WordPress Coding Standards for PHP
- Use ESLint for JavaScript/React code
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed

## 📋 Roadmap

This plugin is in active development. Check out our [ROADMAP.md](ROADMAP.md) for planned features:

### Phase 1: Core Formatting (In Progress)
- [ ] PDF Export
- [ ] Title Page
- [ ] Page Breaks & Numbering
- [ ] Auto-Formatting

### Phase 2: Export & Import
- [ ] Final Draft (.fdx) support
- [ ] Fountain format support
- [ ] Microsoft Word export
- [ ] HTML/Web export

### Phase 3: Advanced Script Elements
- [ ] Dual Dialogue
- [ ] More/CONT'D markers
- [ ] Voice-Over (V.O.)
- [ ] Off-Screen (O.S.)
- [ ] Montages and Series of Shots

### Phase 4: Collaboration
- [ ] Comments & Notes
- [ ] Revision Tracking
- [ ] Real-Time Co-Editing
- [ ] User Roles & Permissions

See [ROADMAP.md](ROADMAP.md) for the complete feature list.

## 🆚 Competition

VZ Story Teller aims to compete with professional screenwriting software like Final Draft, Celtx, and WriterDuet. Our competitive advantages:

- **WordPress Integration** - Works within your existing WordPress workflow
- **Open Source** - Free and community-driven
- **Web-Based** - No installation required, access from anywhere
- **Customizable** - Extend and modify to fit your needs
- **Cost-Effective** - No expensive licenses or subscriptions

Read our [COMPETITION.md](COMPETITION.md) for detailed market analysis.

## 📝 License

This plugin is licensed under the **GPL v2 or later**.

```
Copyright (C) 2025 Melisa Viroz

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
```

## 👤 Author

**Melisa Viroz**

- Website: [melisaviroz.com](https://melisaviroz.com)
- GitHub: [@melisaviroz](https://github.com/melisaviroz)

## 🙏 Acknowledgments

- Inspired by industry-standard screenwriting software
- Built with WordPress and React
- Community-driven development

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/yourusername/vz-story-teller/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/vz-story-teller/discussions)
- **Email:** support@melisaviroz.com

## ⚠️ Disclaimer

This plugin is currently in **early development** (v0.0.1). While functional, it may have bugs and missing features. We recommend:

- Regular backups of your scripts
- Testing in a staging environment first
- Reporting any issues you encounter

## 🔗 Links

- [Plugin Repository](https://github.com/yourusername/vz-story-teller)
- [Documentation](https://github.com/yourusername/vz-story-teller/wiki)
- [Changelog](https://github.com/yourusername/vz-story-teller/releases)
- [WordPress Plugin Directory](https://wordpress.org/plugins/vz-story-teller) (Coming Soon)

---

**Made with ❤️ for the WordPress and screenwriting communities**

*Star this repo if you find it useful!*

