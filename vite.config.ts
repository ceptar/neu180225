import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { netlifyPlugin } from '@netlify/remix-adapter/plugin';
import tailwindcss from '@tailwindcss/vite'
import App from './app/root';

export default defineConfig({
    server: {
        port: 3000
    },
    plugins: [
        remix({
            future: {
                v3_fetcherPersist: true,
                v3_lazyRouteDiscovery: true,
                v3_relativeSplatPath: true,
                v3_singleFetch: true,
                v3_throwAbortReason: true,
                unstable_optimizeDeps: true,
            },
            ignoredRouteFiles: ['**/*.module.scss'],
        }),
        netlifyPlugin(),
        tsconfigPaths(),
    ],
    resolve: {
        alias: { 
            '~': __dirname,
            '~/utils': 'app/utils',
            '~/providers': 'app/providers',
            '~/graphqlWrapper': 'app/graphqlWrapper',
            '~/sessions':'app/sessions.ts',
        },
    },
    optimizeDeps: {
        include: ['@radix-ui/react-select', '@radix-ui/react-slider', '@remix-run/node'],
    },
    css: { preprocessorOptions: { scss: { api: 'modern' } } },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.endsWith('.css') || id.endsWith('.scss')) {
                        return 'styles';
                    }
                },
            },
        },
    },
});
