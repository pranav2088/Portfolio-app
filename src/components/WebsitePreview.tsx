import React, { useState } from 'react';
import { Monitor, Smartphone, Tablet, ExternalLink } from 'lucide-react';
import { WebsiteData } from '../types/website';

interface WebsitePreviewProps {
  website: WebsiteData;
}

export function WebsitePreview({ website }: WebsitePreviewProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const getPreviewSize = () => {
    switch (viewMode) {
      case 'mobile':
        return 'w-80 h-96';
      case 'tablet':
        return 'w-96 h-80';
      default:
        return 'w-full h-96';
    }
  };

  const generateHTML = () => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${website.title}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: ${website.theme.background};
          }
          .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
          .header { 
            background: ${website.theme.primary};
            color: white;
            padding: 1rem 0;
            position: sticky;
            top: 0;
            z-index: 100;
          }
          .nav { display: flex; justify-content: space-between; align-items: center; }
          .logo { font-size: 1.5rem; font-weight: bold; }
          .nav-links { display: flex; gap: 2rem; list-style: none; }
          .nav-links a { color: white; text-decoration: none; }
          .hero { 
            background: linear-gradient(135deg, ${website.theme.primary}, ${website.theme.secondary});
            color: white;
            padding: 4rem 0;
            text-align: center;
          }
          .hero h1 { font-size: 3rem; margin-bottom: 1rem; }
          .hero p { font-size: 1.2rem; margin-bottom: 2rem; }
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
          }
          .section { padding: 4rem 0; }
          .section h2 { font-size: 2.5rem; margin-bottom: 2rem; text-align: center; }
          .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
          .feature { 
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            text-align: center;
          }
          .feature h3 { color: ${website.theme.primary}; margin-bottom: 1rem; }
          .footer { 
            background: #333;
            color: white;
            padding: 2rem 0;
            text-align: center;
          }
          @media (max-width: 768px) {
            .hero h1 { font-size: 2rem; }
            .nav-links { display: none; }
          }
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
      </html>
    `;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('desktop')}
            className={`p-2 rounded-lg transition-all duration-200 ${
              viewMode === 'desktop' 
                ? 'bg-blue-100 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Monitor className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('tablet')}
            className={`p-2 rounded-lg transition-all duration-200 ${
              viewMode === 'tablet' 
                ? 'bg-blue-100 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Tablet className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`p-2 rounded-lg transition-all duration-200 ${
              viewMode === 'mobile' 
                ? 'bg-blue-100 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Smartphone className="w-5 h-5" />
          </button>
        </div>
        
        <button
          onClick={() => {
            const blob = new Blob([generateHTML()], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Open in New Tab</span>
        </button>
      </div>

      <div className="flex justify-center">
        <div className={`${getPreviewSize()} border-2 border-gray-200 rounded-lg overflow-hidden bg-white shadow-lg transition-all duration-300`}>
          <iframe
            srcDoc={generateHTML()}
            className="w-full h-full"
            title="Website Preview"
          />
        </div>
      </div>
    </div>
  );
}