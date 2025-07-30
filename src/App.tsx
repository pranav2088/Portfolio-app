import React, { useState } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { WebsitePreview } from './components/WebsitePreview';
import { GenerationProgress } from './components/GenerationProgress';
import { TemplateSelector } from './components/TemplateSelector';
import { ExportOptions } from './components/ExportOptions';
import { generateWebsite } from './services/websiteGenerator';
import { WebsiteData } from './types/website';

function App() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedWebsite, setGeneratedWebsite] = useState<WebsiteData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('business');
  const [showExportOptions, setShowExportOptions] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setGeneratedWebsite(null);
    
    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const website = await generateWebsite(prompt, selectedTemplate);
      setGeneratedWebsite(website);
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExport = () => {
    setShowExportOptions(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Describe Your Website
              </h2>
              <PromptInput
                value={prompt}
                onChange={setPrompt}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
              />
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Choose Template Style
              </h3>
              <TemplateSelector
                selected={selectedTemplate}
                onSelect={setSelectedTemplate}
              />
            </div>

            {generatedWebsite && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Export & Download
                </h3>
                <ExportOptions
                  website={generatedWebsite}
                  onExport={handleExport}
                />
              </div>
            )}
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-6">
            {isGenerating && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <GenerationProgress />
              </div>
            )}

            {generatedWebsite && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Generated Website Preview
                </h3>
                <WebsitePreview website={generatedWebsite} />
              </div>
            )}

            {!isGenerating && !generatedWebsite && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 text-center">
                <div className="text-gray-400 text-lg">
                  Enter a prompt to generate your website
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;