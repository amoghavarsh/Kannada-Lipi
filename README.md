# ಕನ್ನಡ ಲಿಪಿ (Kannada Lipi)

<div align="center">

![Kannada Lipi Logo](public/images/favicon.svg)

### Karnataka's First Programming Language in Kannada

**ಕಲಿಯೋಕೆ ಕೋಟಿ ಭಾಷೆ, ಆಡೋಕೆ ಒಂದೇ ಭಾಷೆ**

*"Learn a million languages, but code in one - your mother tongue"*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

---

## 🎯 About

**Kannada Lipi** is an innovative programming language designed specifically for Kannada speakers. It allows users to write code entirely in Kannada script, making programming accessible to native Kannada speakers who may find English-based programming languages challenging.

### What is Kannada Lipi?

Kannada Lipi is an **Interpreter** - it reads your Kannada code, understands it, and executes it line by line directly in your browser. Unlike a compiler (which converts code to machine language first), an interpreter runs the code immediately, making it perfect for learning and experimentation.

### Why Kannada Lipi?

- 🇮🇳 **Native Language Support**: Write code in Kannada, your mother tongue
- 📚 **Educational**: Perfect for introducing programming concepts to Kannada-medium students
- 🎓 **Beginner Friendly**: Simple syntax inspired by natural Kannada language
- 🌐 **Web-Based**: No installation required, runs entirely in the browser
- 📱 **PWA Support**: Install as an app on your phone or desktop
- 🔒 **Privacy First**: All code runs locally, nothing sent to servers

---

## ✨ Features

### Language Features
- **Variables**: `ಅ = ೧೦` (Assign values to Kannada named variables)
- **Arithmetic**: `+`, `-`, `*`, `/` (All basic math operations)
- **Conditionals**: `ಆದರೆ...ಇಲ್ಲವಾದರೆ` (if...else statements)
- **Built-in Functions**: 15+ functions for common operations
- **Kannada Numbers**: Full support for ೦-೯ numerals
- **Comments**: `# ಟಿಪ್ಪಣಿ` (Add notes to your code)

### IDE Features
- 🎨 **Syntax Highlighting**: Color-coded keywords and values
- 📝 **Line Numbers**: Easy code navigation
- ⌨️ **Virtual Keyboard**: On-screen Kannada keyboard
- 🌙 **Dark/Light Theme**: Choose your preferred theme
- 💾 **Auto-Save**: Code saved automatically
- 📥 **Export**: Download your code as a file

---

## 🚀 Quick Start

### Hello World
```
ಮುದ್ರಿಸು("ನಮಸ್ಕಾರ, ಕರ್ನಾಟಕ!")
```

### Variables and Math
```
ಅ = ೧೦
ಆ = ೨೦
ಮೊತ್ತ = ಅ + ಆ
ಮುದ್ರಿಸು("ಮೊತ್ತ: " ಮೊತ್ತ)
```

### Conditionals
```
ವಯಸ್ಸು = ೧೮
ಆದರೆ ವಯಸ್ಸು > ೧೭ : ಮುದ್ರಿಸು("ವಯಸ್ಕ")
```

### Built-in Functions
```
# Maximum value
ಗರಿಷ್ಠ(೫, ೯, ೩, ೭)  # Output: ೯

# Sort ascending
ಏರಿಕೆ(೮, ೨, ೫, ೧)  # Output: [೧, ೨, ೫, ೮]

# String length
ಒಟ್ಟು("ಕರ್ನಾಟಕ")  # Output: ೮
```

---

## 📖 Language Reference

### Keywords

| Kannada | English | Description |
|---------|---------|-------------|
| ಮುದ್ರಿಸು | print | Output to console |
| ಆದರೆ | if | Conditional statement |
| ಇಲ್ಲವಾದರೆ | else | Else branch |
| ಪೂರ್ಣಾಂಕ | round | Round to integer |
| ಒಟ್ಟು | length | String length |
| ಗರಿಷ್ಠ | max | Maximum value |
| ಕನಿಷ್ಠ | min | Minimum value |
| ಏರಿಕೆ | sort_asc | Sort ascending |
| ಇಳಿಕೆ | sort_desc | Sort descending |
| ಹುಡುಕು | search | Linear search |
| ಸಂಗ್ರಹಿಸು | collect | Create list |
| ಎಣಿಕೆ | count | Word count |
| ವರ್ಣಮಾಲೆ | alphabet | Kannada alphabet |

### Kannada Numbers

| Kannada | Arabic | Kannada | Arabic |
|---------|--------|---------|--------|
| ೦ | 0 | ೫ | 5 |
| ೧ | 1 | ೬ | 6 |
| ೨ | 2 | ೭ | 7 |
| ೩ | 3 | ೮ | 8 |
| ೪ | 4 | ೯ | 9 |

---

## 🛠️ Development

### Project Structure

```
KannadaLipi/
├── public/
│   ├── index.html          # Main IDE
│   ├── learn.html          # Tutorials
│   ├── examples.html       # Code examples
│   ├── help.html           # Documentation
│   ├── about.html          # About page
│   ├── css/
│   │   ├── main.css        # Global styles
│   │   └── editor.css      # Editor styles
│   ├── js/
│   │   ├── interpreter/
│   │   │   ├── lexer.js    # Tokenizer
│   │   │   ├── parser.js   # AST builder
│   │   │   ├── runtime.js  # Executor
│   │   │   └── index.js    # Entry point
│   │   └── editor/
│   │       ├── editor.js   # Code editor
│   │       ├── highlighter.js
│   │       └── keyboard.js # Virtual keyboard
│   ├── images/
│   ├── manifest.json       # PWA manifest
│   ├── sw.js              # Service worker
│   └── sitemap.xml
├── vercel.json             # Vercel config
├── package.json
└── README.md
```

### Local Development

```bash
# Serve locally (any static server works)
npx serve public

# Or use Python
cd public
python -m http.server 8000
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

## 📜 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

Kannada Lipi is open source and welcomes contributions! See
[CONTRIBUTING.md](CONTRIBUTING.md) to get started.

---

## 🙏 Acknowledgements

- Karnataka Government for promoting Kannada
- All contributors and supporters
- The open-source community

---

<div align="center">

**ಜೈ ಕರ್ನಾಟಕ 🇮🇳**

Made with ❤️ for Karnataka

</div>
