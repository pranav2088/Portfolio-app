import React from 'react';
import { Download, Code, FileText, Share2 } from 'lucide-react';
import { WebsiteData } from '../types/website';

interface ExportOptionsProps {
  website: WebsiteData;
  onExport: () => void;
}

export function ExportOptions({ website, onExport }: ExportOptionsProps) {
  const handleDownloadHTML = () => {
    const html = generateFullHTML(website);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${website.title.toLowerCase().replace(/\s+/g, '-')}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadCSS = () => {
    const css = generateCSS(website);
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'styles.css';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyCode = () => {
    const html = generateFullHTML(website);
    navigator.clipboard.writeText(html);
  };

  const generateFullHTML = (website: WebsiteData) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${website.title}</title>
  <style>
    ${generateCSS(website)}
  </style>
</head>
<body>
  <header class="header">
    <nav class="nav container">
      <div class="logo">${website.title}</div>
      <ul class="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <section class="hero">
    <div class="container">
      <h1>${website.sections.hero.title}</h1>
      <p>${website.sections.hero.subtitle}</p>
      <a href="#" class="btn">${website.sections.hero.cta}</a>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2>Features</h2>
      <div class="features">
        ${website.sections.features.map(feature => `
          <div class="feature">
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="container">
      <p>&copy; 2024 ${website.title}. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>`;
  };

  const generateCSS = (website: WebsiteData) => {
    return `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #333;
  background: ${website.theme.background};
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header {
  background: ${website.theme.primary};
  color: white;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-links a {
  color: white;
  text-decoration: none;
  transition: opacity 0.3s;
}

.nav-links a:hover {
  opacity: 0.8;
}

.hero {
  background: linear-gradient(135deg, ${website.theme.primary}, ${website.theme.secondary});
  color: white;
  padding: 4rem 0;
  text-align: center;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.btn {
  background: ${website.theme.accent};
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: none;
  display: inline-block;
  transition: opacity 0.3s;
}

.btn:hover {
  opacity: 0.9;
}

.section {
  padding: 4rem 0;
}

.section h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.3s;
}

.feature:hover {
  transform: translateY(-5px);
}

.feature h3 {
  color: ${website.theme.primary};
  margin-bottom: 1rem;
}

.footer {
  background: #333;
  color: white;
  padding: 2rem 0;
  text-align: center;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }
  
  .nav-links {
    display: none;
  }
}`;
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleDownloadHTML}
          className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
        >
          <Download className="w-4 h-4" />
          <span>HTML</span>
        </button>

        <button
          onClick={handleDownloadCSS}
          className="flex items-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200"
        >
          <FileText className="w-4 h-4" />
          <span>CSS</span>
        </button>

        <button
          onClick={handleCopyCode}
          className="flex items-center space-x-2 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200"
        >
          <Code className="w-4 h-4" />
          <span>Copy Code</span>
        </button>

        <button
          onClick={onExport}
          className="flex items-center space-x-2 px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all duration-200"
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>

      <div className="text-xs text-gray-500 text-center">
        Export your generated website as HTML, CSS, or share with others
      </div>
    </div>
  );
}