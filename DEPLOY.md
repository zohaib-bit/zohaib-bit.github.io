# 🚀 Quick Deployment Guide

## Your Portfolio Information
- **Name**: Zohaib Faisal
- **Role**: Junior iOS Developer
- **GitHub**: zohaib-bit
- **Email**: zohaibfaisalo9tech@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/zohaib-faisal-621752268/

## 📦 Method 1: Using GitHub Desktop (Easiest - Recommended)

1. **Download GitHub Desktop** (if you don't have it):
   - Go to: https://desktop.github.com/
   - Download and install

2. **Create Repository on GitHub**:
   - Go to: https://github.com/new
   - Repository name: `zohaib-bit.github.io`
   - Make it **PUBLIC**
   - **DO NOT** check any boxes (no README, no .gitignore, no license)
   - Click "Create repository"

3. **Open GitHub Desktop**:
   - Click "File" → "Add Local Repository"
   - Navigate to: `/Users/o9tech/portfolio`
   - Click "Add Repository"

4. **Commit and Push**:
   - In GitHub Desktop, you'll see all your files
   - Write commit message: "Initial portfolio commit"
   - Click "Commit to main"
   - Click "Publish repository"
   - Make sure it's set to "zohaib-bit/zohaib-bit.github.io"
   - Click "Publish repository"

5. **Enable GitHub Pages**:
   - Go to: https://github.com/zohaib-bit/zohaib-bit.github.io/settings/pages
   - Under "Source", select "Deploy from a branch"
   - Branch: `main`
   - Folder: `/ (root)`
   - Click "Save"

6. **Your portfolio is live!**
   - Visit: https://zohaib-bit.github.io
   - Wait 1-2 minutes if it doesn't load immediately

---

## 📦 Method 2: Using Terminal (Command Line)

### Step 1: Create Repository on GitHub
1. Go to: https://github.com/new
2. Repository name: `zohaib-bit.github.io`
3. Make it **PUBLIC**
4. **DO NOT** initialize with anything
5. Click "Create repository"

### Step 2: Run Setup Script
```bash
cd /Users/o9tech/portfolio
./setup.sh
```

### Step 3: Connect to GitHub and Push
```bash
git remote add origin https://github.com/zohaib-bit/zohaib-bit.github.io.git
git push -u origin main
```

**When prompted for authentication:**
- If you have GitHub CLI: It will open browser automatically
- If not: You'll need a Personal Access Token (see below)

### Step 4: Enable GitHub Pages
1. Go to: https://github.com/zohaib-bit/zohaib-bit.github.io/settings/pages
2. Source: "Deploy from a branch"
3. Branch: `main`, Folder: `/ (root)`
4. Click "Save"

---

## 🔐 Creating Personal Access Token (If needed)

If terminal asks for password:

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name it: "Portfolio Deployment"
4. Select scope: Check `repo` (this gives full repository access)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. When git asks for password, paste the token instead

---

## ✅ Verify Deployment

After 1-2 minutes, visit:
- **Your Portfolio**: https://zohaib-bit.github.io

---

## 🎨 Customizing Your Portfolio

### Update Projects
Edit `index.html` and replace the example projects with your real iOS apps:
- Update project names
- Add real descriptions
- Add GitHub links to your actual repositories
- Add App Store links if available

### Update About Section
Edit the About section in `index.html` to add your personal story.

### Update Statistics
Change the numbers in the About section stats to reflect your actual experience.

---

## 🆘 Troubleshooting

**Portfolio not loading?**
- Wait 2-3 minutes (GitHub Pages needs time to build)
- Check repository is public
- Verify GitHub Pages is enabled in Settings → Pages

**Git push fails?**
- Make sure repository exists on GitHub
- Check you're using correct repository name
- Try using GitHub Desktop instead

**Need help?**
- Check GitHub Pages docs: https://docs.github.com/en/pages
- Make sure your repository name matches: `zohaib-bit.github.io`

---

**Good luck! 🎉**
