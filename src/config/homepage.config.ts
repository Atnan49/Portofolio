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
  { id: 'claude', name: 'Claude', prefix: 'cl', url: 'https://claude.ai/new?q=', icon: '✉️' },
  { id: 'gemini', name: 'Gemini', prefix: 'gem', url: 'https://gemini.google.com/app?q=', icon: '✨' },
  { id: 'shopee', name: 'Shopee', prefix: 'sp', url: 'https://shopee.co.id/search?keyword=', icon: '🛍️' },
  { id: 'tokopedia', name: 'Tokopedia', prefix: 'tk', url: 'https://www.tokopedia.com/search?st=product&q=', icon: '🟢' },
  { id: 'npm', name: 'npm', prefix: 'npm', url: 'https://www.npmjs.com/search?q=', icon: '📦' },
  { id: 'packagist', name: 'Packagist', prefix: 'pkg', url: 'https://packagist.org/?query=', icon: '🐘' },
  { id: 'mdn', name: 'MDN', prefix: 'mdn', url: 'https://developer.mozilla.org/en-US/search?q=', icon: '📖' },
  { id: 'laravel', name: 'Laravel', prefix: 'lv', url: 'https://laravel.com/docs/11.x?search=', icon: '🔥' }
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

  // Group "Dev & Freelance"
  { label: 'Freelancer.com', url: 'https://freelancer.com', group: 'Dev & Freelance' },
  { label: 'Google Search Console', url: 'https://search.google.com/search-console', group: 'Dev & Freelance' },
  { label: 'Tarifter', url: 'https://tarifter.com', group: 'Dev & Freelance' },
  { label: 'Laravel Docs', url: 'https://laravel.com/docs/11.x', group: 'Dev & Freelance' },
  { label: 'Tailwind Docs', url: 'https://tailwindcss.com/docs', group: 'Dev & Freelance' },
  { label: 'ChatGPT', url: 'https://chatgpt.com', group: 'Dev & Freelance' },
  { label: 'Claude', url: 'https://claude.ai', group: 'Dev & Freelance' },
  { label: 'Gemini', url: 'https://gemini.google.com', group: 'Dev & Freelance' },
  { label: 'Antigravity', url: 'https://deepmind.google', group: 'Dev & Freelance' }
];

export const WEATHER_CONFIG: WeatherConfig = {
  lat: -7.9797,
  lon: 112.6304,
  city: 'Malang'
};
