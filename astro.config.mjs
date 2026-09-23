// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.wixstudio.cn',
  integrations: [
    sitemap({
      serialize(item) {
        const url = item.url;
        if (url === 'https://www.wixstudio.cn/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        } else if (
          url === 'https://www.wixstudio.cn/tutorials/' ||
          url === 'https://www.wixstudio.cn/compare/' ||
          url === 'https://www.wixstudio.cn/blog/' ||
          url === 'https://www.wixstudio.cn/studio/' ||
          url === 'https://www.wixstudio.cn/pricing/' ||
          url === 'https://www.wixstudio.cn/contact/'
        ) {
          item.priority = 0.9;
          item.changefreq = 'daily';
        } else if (
          url.startsWith('https://www.wixstudio.cn/tutorials/') &&
          url.split('/').filter(Boolean).length <= 4
        ) {
          item.priority = 0.85;
          item.changefreq = 'weekly';
        } else {
          item.priority = 0.8;
          item.changefreq = 'weekly';
        }
        item.lastmod = new Date('2026-09-24T00:00:00.000Z');
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
});
