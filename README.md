# Zohaib Faisal - iOS Developer Portfolio

A modern, responsive portfolio website for Junior iOS Developer, ready to be hosted on GitHub Pages.

## 🚀 Features

- **Modern Design**: Clean and professional UI with smooth animations
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Fast Loading**: Optimized for performance
- **Easy to Customize**: Simple HTML, CSS, and JavaScript structure
- **GitHub Pages Ready**: No build process required

## 📋 Sections

- **Hero**: Eye-catching introduction with call-to-action buttons
- **About**: Personal information and statistics
- **Skills**: Showcase your technical skills
- **Projects**: Display your featured projects
- **Contact**: Contact information and social links

## 🛠️ Setup Instructions

### 1. Customize Your Content (Optional)

The portfolio is already customized for Zohaib Faisal - Junior iOS Developer. You can further customize:
- Update contact information (email, GitHub, LinkedIn) in `index.html`
- Add your actual iOS projects with real links
- Update the About section with your personal story
- Modify statistics in the About section
- Add more projects or skills as needed

### 2. Deploy to GitHub Pages

#### Option A: Using GitHub Repository

1. **Create a new repository on GitHub**
   - Go to [GitHub](https://github.com) and create a new repository
   - Name it `yourusername.github.io` (replace `yourusername` with your GitHub username)
   - OR name it `portfolio` if you want it at `yourusername.github.io/portfolio`
   - Make it public

2. **Push your code to GitHub**
   ```bash
   cd /Users/o9tech/portfolio
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/yourusername.github.io.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on "Settings"
   - Scroll down to "Pages" in the left sidebar
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

4. **Access your portfolio**
   - Your portfolio will be live at: `https://yourusername.github.io`
   - It may take a few minutes to go live

#### Option B: Using a Custom Repository Name

If you want to use a different repository name (e.g., `portfolio`):

1. Create a repository with your desired name
2. Push your code to the repository
3. Enable GitHub Pages (same as above)
4. Your portfolio will be at: `https://yourusername.github.io/repository-name`

### 3. Custom Domain (Optional)

If you want to use a custom domain:

1. Create a file named `CNAME` in the root directory
2. Add your domain name in the file (e.g., `www.yourdomain.com`)
3. Configure your DNS settings:
   - Add a CNAME record pointing to `yourusername.github.io`
4. Push the `CNAME` file to your repository

## 🎨 Customization

### Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1;    /* Main brand color */
    --secondary-color: #8b5cf6;  /* Secondary color */
    --text-primary: #1f2937;     /* Main text color */
    --text-secondary: #6b7280;    /* Secondary text color */
}
```

### Fonts

The portfolio uses Google Fonts (Inter). To change it:

1. Update the font link in `index.html`
2. Update the `font-family` in `styles.css`

### Adding Projects

To add more projects, copy the project card structure in the Projects section:

```html
<div class="project-card">
    <div class="project-image">
        <div class="project-placeholder">Project Image</div>
    </div>
    <div class="project-content">
        <h3>Project Name</h3>
        <p>Project description</p>
        <div class="project-tech">
            <span class="tech-tag">Technology</span>
        </div>
        <div class="project-links">
            <a href="#" class="project-link">Live Demo</a>
            <a href="#" class="project-link">GitHub</a>
        </div>
    </div>
</div>
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

Feel free to use this portfolio template for your personal website!

## 🤝 Contributing

This is a personal portfolio template. Feel free to fork and customize it for your needs!

---

**Need help?** Open an issue or check the [GitHub Pages documentation](https://docs.github.com/en/pages).
