# 🎮 Ultimate Tic Tac Toe Pro

A modern, responsive Tic Tac Toe game with **AI opponent**, **dark mode**, **real-time scoring**, and **smooth animations**.

## ✨ Features
- 🤖 **AI Opponent** - Three difficulty levels (Easy, Medium, Hard)
- 👥 **Player vs Player** - Classic two-player mode
- 🌙 **Dark/Light Mode** - Theme toggle with localStorage persistence
- 🎯 **Score Tracking** - Real-time scoreboard for wins and draws
- 🔊 **Sound Effects** - Move sounds and win celebrations
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile
- ✨ **Smooth Animations** - Pop-in effects and hover animations
- ⚡ **Fast & Lightweight** - Pure vanilla JavaScript, no dependencies

## 🎮 Game Features
- Intelligent AI with strategic move selection
- Real-time win/draw detection
- Animated winning line
- Celebration GIF on win
- Smooth turn transitions
- Responsive grid layout

## 🛠️ Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables and animations
- **JavaScript (Vanilla)** - No frameworks, pure game logic
- **Web Audio API** - Procedural sound generation

## 🎮 How to Play
1. **Select Game Mode**:
   - Player vs Player: Two players on same device
   - Player vs AI: Choose your difficulty level

2. **Gameplay**:
   - Click on empty grid cells to place your mark
   - Players alternate turns (X and O)
   - First to get 3 in a row/column/diagonal wins
   - If all 9 cells are filled with no winner, it's a draw

3. **Controls**:
   - 🔄 **New Game** - Start a fresh game
   - ⬅️ **Back** - Return to mode selection
   - 🌙 **Dark Mode** - Toggle theme (saved to browser)

## 🚀 Deployment on Vercel

### Option 1: Quick Deploy with Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Import Project"
4. Select your GitHub repository
5. Click "Deploy"

### Option 2: Deploy with Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
vercel

# For production deployment
vercel --prod
```

### Option 3: Automatic Deployment
- Connect your GitHub repo to Vercel
- Every push to main branch deploys automatically
- Get live preview URLs for pull requests

### ✅ Deployment Checklist
- ✅ `vercel.json` configured for static hosting
- ✅ `package.json` created for metadata
- ✅ `.vercelignore` set up to exclude unnecessary files
- ✅ HTML, CSS, JS optimized
- ✅ All assets included

## 📦 Project Structure
```
├── index.html          # Main HTML file
├── style.css           # Styling with CSS variables
├── script.js           # Game logic & AI
├── vercel.json         # Vercel configuration
├── package.json        # Project metadata
├── .vercelignore       # Files to ignore on deployment
└── assets/             # Images and sounds
    ├── excited.gif
    ├── music.mp3
    ├── ting.mp3
    └── gameover.mp3
```

## 🌐 Live Demo
Once deployed, your app will be live at: `https://your-project.vercel.app`

## 🔧 Development

### Local Testing
```bash
# Using Python
python -m http.server 8000

# Or using Node.js
npx http-server

# Open browser and visit
http://localhost:8000
```

## 📝 Configuration Files

### vercel.json
- Framework: Static hosting
- Clean URLs enabled
- Rewrites for SPA support
- Caching headers configured

### .vercelignore
- Excludes git, markdown, and node_modules

## 🎨 Customization

### Change Theme Colors
Edit CSS variables in `style.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #ec4899;
    /* ... more colors */
}
```

### Adjust AI Difficulty
Edit difficulty settings in `script.js`:
- Easy: Random moves
- Medium: Strategic with randomness
- Hard: Optimal play

## 📄 License
MIT License - Feel free to use and modify

## 🤝 Contributing
Contributions welcome! Fork and submit pull requests.

## 👨‍💻 Author
Created with ❤️ by Your Dev Team

---

**Happy Gaming! 🎮**