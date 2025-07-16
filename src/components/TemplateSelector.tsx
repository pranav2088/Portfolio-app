import React from 'react';
import { Building, User, FileText, Zap, ShoppingCart, Camera } from 'lucide-react';

interface TemplateSelectorProps {
  selected: string;
  onSelect: (template: string) => void;
}

export function TemplateSelector({ selected, onSelect }: TemplateSelectorProps) {
  const templates = [
    {
      id: 'business',
      name: 'Business',
      icon: Building,
      description: 'Professional corporate websites',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'portfolio',
      name: 'Portfolio',
      icon: User,
      description: 'Creative showcases and personal sites',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'blog',
      name: 'Blog',
      icon: FileText,
      description: 'Content-focused websites',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 'landing',
      name: 'Landing Page',
      icon: Zap,
      description: 'High-converting single pages',
      color: 'from-amber-500 to-amber-600'
    },
    {
      id: 'ecommerce',
      name: 'E-commerce',
      icon: ShoppingCart,
      description: 'Online stores and marketplaces',
      color: 'from-rose-500 to-rose-600'
    },
    {
      id: 'photography',
      name: 'Photography',
      icon: Camera,
      description: 'Visual galleries and portfolios',
      color: 'from-teal-500 to-teal-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {templates.map((template) => {
        const Icon = template.icon;
        const isSelected = selected === template.id;
        
        return (
          <button
            key={template.id}
            onClick={() => onSelect(template.id)}
            className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left group ${
              isSelected 
                ? 'border-blue-500 bg-blue-50 shadow-lg' 
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${template.color} text-white`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className={`font-semibold ${isSelected ? 'text-blue-800' : 'text-gray-800'}`}>
                  {template.name}
                </h4>
                <p className={`text-sm mt-1 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`}>
                  {template.description}
                </p>
              </div>
            </div>
            
            {isSelected && (
              <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
            )}
          </button>
        );
      })}
    </div>
  );
}