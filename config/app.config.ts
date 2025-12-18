// Application Configuration

export const appConfig = {
  name: 'Lifestyle Goals Planner',
  version: '1.0.0',
  environment: process.env.NODE_ENV || 'development',
  
  // App Settings
  app: {
    title: 'Lifestyle Goals Planner',
    description: 'A personal life OS web app for planning and tracking lifestyle goals',
    author: 'Renovivo',
  },

  // Feature Flags
  features: {
    darkMode: true,
    notifications: true,
    offlineMode: true,
    pwm: true,
  },

  // API Configuration
  api: {
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001',
    timeout: 30000,
  },

  // Goal Settings
  goals: {
    maxGoalsPerCategory: 50,
    defaultCategory: 'General',
    categories: ['Health', 'Career', 'Finance', 'Learning', 'Relationships', 'General'],
  },
};

export default appConfig;
