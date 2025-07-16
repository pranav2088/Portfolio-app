import React, { useState } from 'react';
import { Send, Sparkles, Loader2 } from 'lucide-react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export function PromptInput({ value, onChange, onGenerate, isGenerating }: PromptInputProps) {
  const [focused, setFocused] = useState(false);

  const examples = [
    "Create a modern restaurant website with menu and reservations",
    "Build a portfolio site for a graphic designer",
    "Generate a tech startup landing page with pricing",
    "Make a blog website for travel photography"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate();
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className={`relative transition-all duration-300 ${focused ? 'transform scale-[1.02]' : ''}`}>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Describe the website you want to create..."
            className="w-full h-32 p-4 pr-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none bg-white/50 backdrop-blur-sm transition-all duration-300"
            disabled={isGenerating}
          />
          <button
            type="submit"
            disabled={!value.trim() || isGenerating}
            className="absolute bottom-4 right-4 w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg flex items-center justify-center hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isGenerating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>

      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Sparkles className="w-4 h-4" />
          <span>Try these examples:</span>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => onChange(example)}
              className="text-left text-sm p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg hover:from-blue-100 hover:to-purple-100 transition-all duration-200 border border-blue-100"
              disabled={isGenerating}
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}