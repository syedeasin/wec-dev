// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.austin-chiropractor.com',
  output: 'static', // every page is prerendered; only /api/lead runs on the Worker
  trailingSlash: 'ignore',
  adapter: cloudflare({
    imageService: 'compile', // optimise images with sharp at build time
    prerenderEnvironment: 'node',
  }),
  integrations: [
    sitemap({
      filter: (page) => !/\/(thank-you|404)/.test(page),
    }),
  ],
  image: {
    layout: 'constrained',
    responsiveStyles: true,
  },
});
