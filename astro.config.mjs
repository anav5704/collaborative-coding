import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import sentry from "@sentry/astro";
import mdx from "@astrojs/mdx";
import auth from "auth-astro";

// https://astro.build/config
export default defineConfig({
    site: import.meta.env.PUBLIC_SITE_URL,
    output: "server",
    adapter: vercel({
        webAnalytics: true
    }),
    markdown: {
        shikiConfig: {
            theme: "github-dark-dimmed"
        }
    },
    prefetch: {
        prefetchAll: true,
        defaultStrategy: "viewport"
    },
    devToolbar: {
        enabled: false
    },
    integrations: [mdx(), tailwind(), react(), sitemap(), auth(),
    sentry({
        dsn: import.meta.env.SENTRY_DSN,
        sourceMapsUploadOptions: {
            project: import.meta.SENTRY_PROJECT,
            authToken: import.meta.env.SENTRY_AUTH_TOKEN,
        },
    })]
});