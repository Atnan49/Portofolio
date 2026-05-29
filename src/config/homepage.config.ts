export interface SearchEngine {
  id: string;
  name: string;
  prefix: string;
  url: string;
  icon: string; // Emoji
}

export interface Shortcut {
  label: string;
  url: string;
  group: 'General' | 'Dev & Freelance';
}

export interface WeatherConfig {
  lat: number;
  lon: number;
  city: string;
}

export const SEARCH_ENGINES: SearchEngine[] = [
  { id: 'google', name: 'Google', prefix: 'g', url: 'https://google.com/search?q=', icon: '🔍' },
  { id: 'youtube', name: 'YouTube', prefix: 'yt', url: 'https://youtube.com/results?search_query=', icon: '🎥' },
  { id: 'github', name: 'GitHub', prefix: 'gh', url: 'https://github.com/search?q=', icon: '💻' },
  { id: 'chatgpt', name: 'ChatGPT', prefix: 'ai', url: 'https://chatgpt.com/?q=', icon: '🤖' },
  { id: 'claude', name: 'Claude', prefix: 'cl', url: 'https://claude.ai/new?q=', icon: '✉️' }
];

export const SHORTCUTS: Shortcut[] = [
  // Group "General"
  { label: 'Gmail', url: 'https://mail.google.com', group: 'General' },
  { label: 'GitHub', url: 'https://github.com', group: 'General' },
  { label: 'Adstera', url: 'https://adsterra.com', group: 'General' },
  { label: 'Monetag', url: 'https://monetag.com', group: 'General' },
  { label: 'CloudFlare', url: 'https://cloudflare.com', group: 'General' },
  { label: 'Vercel', url: 'https://vercel.com', group: 'General' },
  { label: 'Netlify', url: 'https://netlify.com', group: 'General' },
  { label: 'Railway', url: 'https://railway.app', group: 'General' },

];

export const WEATHER_CONFIG: WeatherConfig = {
  lat: -7.9797,
  lon: 112.6304,
  city: 'Malang'
};
