import { WebsiteData } from '../types/website';

const themes = {
  business: {
    primary: '#1e40af',
    secondary: '#3b82f6',
    accent: '#10b981',
    background: '#f8fafc'
  },
  portfolio: {
    primary: '#7c3aed',
    secondary: '#a855f7',
    accent: '#f59e0b',
    background: '#faf5ff'
  },
  blog: {
    primary: '#059669',
    secondary: '#10b981',
    accent: '#f59e0b',
    background: '#f0fdf4'
  },
  landing: {
    primary: '#dc2626',
    secondary: '#ef4444',
    accent: '#f59e0b',
    background: '#fef2f2'
  },
  ecommerce: {
    primary: '#be185d',
    secondary: '#ec4899',
    accent: '#8b5cf6',
    background: '#fdf2f8'
  },
  photography: {
    primary: '#0f766e',
    secondary: '#14b8a6',
    accent: '#f59e0b',
    background: '#f0fdfa'
  }
};

const businessTypes = {
  restaurant: {
    features: [
      { title: 'Online Menu', description: 'Browse our delicious menu items with prices and descriptions' },
      { title: 'Table Reservations', description: 'Book your table online for a seamless dining experience' },
      { title: 'Location & Hours', description: 'Find us easily with our location details and opening hours' }
    ]
  },
  portfolio: {
    features: [
      { title: 'Project Gallery', description: 'Showcase your best work with beautiful image galleries' },
      { title: 'About Me', description: 'Share your story, skills, and professional background' },
      { title: 'Contact Form', description: 'Make it easy for clients to reach out and hire you' }
    ]
  },
  tech: {
    features: [
      { title: 'Product Features', description: 'Highlight what makes your product unique and valuable' },
      { title: 'Pricing Plans', description: 'Clear pricing tiers to help customers choose the right plan' },
      { title: 'Customer Support', description: '24/7 support to help your users succeed' }
    ]
  },
  blog: {
    features: [
      { title: 'Latest Posts', description: 'Stay updated with our newest articles and insights' },
      { title: 'Categories', description: 'Organize content by topics for easy navigation' },
      { title: 'Search & Filter', description: 'Find exactly what you\'re looking for quickly' }
    ]
  },
  default: {
    features: [
      { title: 'Professional Design', description: 'Clean, modern layout that looks great on all devices' },
      { title: 'Fast Loading', description: 'Optimized for speed and performance' },
      { title: 'SEO Ready', description: 'Built with search engine optimization in mind' }
    ]
  }
};

export async function generateWebsite(prompt: string, template: string): Promise<WebsiteData> {
  // Simulate AI processing
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const promptLower = prompt.toLowerCase();
  
  // Extract business type from prompt
  let businessType = 'default';
  if (promptLower.includes('restaurant') || promptLower.includes('food') || promptLower.includes('menu')) {
    businessType = 'restaurant';
  } else if (promptLower.includes('portfolio') || promptLower.includes('designer') || promptLower.includes('artist')) {
    businessType = 'portfolio';
  } else if (promptLower.includes('tech') || promptLower.includes('startup') || promptLower.includes('saas')) {
    businessType = 'tech';
  } else if (promptLower.includes('blog') || promptLower.includes('travel') || promptLower.includes('photography')) {
    businessType = 'blog';
  }
  
  // Generate title from prompt
  const title = extractTitleFromPrompt(prompt);
  
  // Generate hero content
  const heroContent = generateHeroContent(prompt, businessType);
  
  return {
    title,
    description: prompt,
    template,
    theme: themes[template as keyof typeof themes] || themes.business,
    sections: {
      hero: heroContent,
      features: businessTypes[businessType as keyof typeof businessTypes]?.features || businessTypes.default.features
    }
  };
}

function extractTitleFromPrompt(prompt: string): string {
  const promptLower = prompt.toLowerCase();
  
  // Common business name patterns
  if (promptLower.includes('restaurant')) return 'Bella Vista Restaurant';
  if (promptLower.includes('portfolio')) return 'Creative Portfolio';
  if (promptLower.includes('tech') || promptLower.includes('startup')) return 'TechFlow Solutions';
  if (promptLower.includes('blog')) return 'The Daily Blog';
  if (promptLower.includes('photography')) return 'Lens & Light Photography';
  if (promptLower.includes('fitness') || promptLower.includes('gym')) return 'FitLife Gym';
  if (promptLower.includes('coffee') || promptLower.includes('cafe')) return 'Brew & Beans Café';
  
  // Generic fallback
  return 'Your Business';
}

function generateHeroContent(prompt: string, businessType: string) {
  const heroTemplates = {
    restaurant: {
      title: 'Exceptional Dining Experience',
      subtitle: 'Discover our carefully crafted menu featuring fresh, locally-sourced ingredients prepared by world-class chefs.',
      cta: 'Make a Reservation'
    },
    portfolio: {
      title: 'Creative Excellence',
      subtitle: 'Bringing your vision to life through innovative design and compelling storytelling.',
      cta: 'View My Work'
    },
    tech: {
      title: 'Innovation That Matters',
      subtitle: 'Transform your business with cutting-edge technology solutions designed for the modern world.',
      cta: 'Get Started'
    },
    blog: {
      title: 'Stories Worth Sharing',
      subtitle: 'Explore insights, adventures, and discoveries from around the world.',
      cta: 'Read Latest Posts'
    },
    default: {
      title: 'Welcome to Excellence',
      subtitle: 'Discover what makes us different and why thousands of customers trust us.',
      cta: 'Learn More'
    }
  };
  
  return heroTemplates[businessType as keyof typeof heroTemplates] || heroTemplates.default;
}