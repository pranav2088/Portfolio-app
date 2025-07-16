export interface WebsiteData {
  title: string;
  description: string;
  template: string;
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  sections: {
    hero: {
      title: string;
      subtitle: string;
      cta: string;
    };
    features: Array<{
      title: string;
      description: string;
    }>;
  };
}