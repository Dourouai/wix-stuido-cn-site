// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://wixstudio.cn',
  integrations: [
    sitemap({
      serialize(item) {
        const url = item.url;
        if (url === 'https://wixstudio.cn/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        } else if (
          url === 'https://wixstudio.cn/tutorials/' ||
          url === 'https://wixstudio.cn/compare/' ||
          url === 'https://wixstudio.cn/blog/' ||
          url === 'https://wixstudio.cn/studio/' ||
          url === 'https://wixstudio.cn/pricing/' ||
          url === 'https://wixstudio.cn/contact/'
        ) {
          item.priority = 0.9;
          item.changefreq = 'daily';
        } else if (
          url.startsWith('https://wixstudio.cn/tutorials/') &&
          url.split('/').filter(Boolean).length <= 4
        ) {
          item.priority = 0.85;
          item.changefreq = 'weekly';
        } else {
          item.priority = 0.8;
          item.changefreq = 'weekly';
        }
        item.lastmod = new Date('2026-09-20T10:00:00.000Z');
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
});
