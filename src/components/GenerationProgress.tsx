import React, { useState, useEffect } from 'react';
import { Loader2, Brain, Code, Palette, Sparkles } from 'lucide-react';

export function GenerationProgress() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { icon: Brain, label: 'Analyzing your prompt', color: 'text-blue-600' },
    { icon: Palette, label: 'Selecting design elements', color: 'text-purple-600' },
    { icon: Code, label: 'Generating website structure', color: 'text-emerald-600' },
    { icon: Sparkles, label: 'Adding finishing touches', color: 'text-amber-600' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          return steps.length - 1;
        }
        return prev + 1;
      });
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Generating Your Website
        </h3>
        <p className="text-gray-600">
          Our AI is crafting a beautiful website just for you
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="text-center text-sm text-gray-600">
          {progress}% Complete
        </div>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          
          return (
            <div 
              key={index}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                isActive 
                  ? 'bg-blue-50 border-l-4 border-blue-500' 
                  : isCompleted 
                  ? 'bg-green-50 border-l-4 border-green-500' 
                  : 'bg-gray-50'
              }`}
            >
              <div className={`transition-all duration-300 ${
                isActive 
                  ? 'animate-pulse' 
                  : isCompleted 
                  ? 'text-green-600' 
                  : 'text-gray-400'
              }`}>
                {isActive ? (
                  <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                ) : (
                  <Icon className={`w-5 h-5 ${step.color}`} />
                )}
              </div>
              <span className={`font-medium ${
                isActive 
                  ? 'text-blue-800' 
                  : isCompleted 
                  ? 'text-green-800' 
                  : 'text-gray-600'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}