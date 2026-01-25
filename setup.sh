#!/bin/bash

# Portfolio Setup Script for GitHub Pages
# This script helps you deploy your portfolio to GitHub Pages

echo "🚀 Portfolio Setup Script"
echo "========================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

echo "✅ Git is installed"
echo ""

# Initialize git repository if not already initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git branch -M main
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

echo ""
echo "📝 Adding files to Git..."
git add .

echo ""
echo "💾 Creating initial commit..."
git commit -m "Initial portfolio commit - Zohaib Faisal iOS Developer Portfolio"

echo ""
echo "========================="
echo "✅ Local setup complete!"
echo ""
echo "📋 Next steps:"
echo ""
echo "1. Go to GitHub and create a new repository:"
echo "   - Repository name: zohaib-bit.github.io"
echo "   - Make it PUBLIC"
echo "   - DO NOT initialize with README, .gitignore, or license"
echo ""
echo "2. After creating the repository, run these commands:"
echo ""
echo "   git remote add origin https://github.com/zohaib-bit/zohaib-bit.github.io.git"
echo "   git push -u origin main"
echo ""
echo "3. Enable GitHub Pages:"
echo "   - Go to your repository on GitHub"
echo "   - Click 'Settings' → 'Pages'"
echo "   - Under 'Source', select 'Deploy from a branch'"
echo "   - Choose 'main' branch and '/ (root)' folder"
echo "   - Click 'Save'"
echo ""
echo "4. Your portfolio will be live at:"
echo "   https://zohaib-bit.github.io"
echo ""
echo "⏱️  It may take 1-2 minutes for the site to go live"
echo ""
echo "🔐 When you run 'git push', GitHub will ask for authentication."
echo "   You can use:"
echo "   - GitHub Desktop app (easiest)"
echo "   - Personal Access Token"
echo "   - GitHub CLI (gh auth login)"
echo ""
