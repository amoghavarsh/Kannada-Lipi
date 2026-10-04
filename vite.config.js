import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Writes precache-manifest.json listing every built file, so the service
// worker can store the whole app for offline use in school computer labs.
function precacheManifest() {
    return {
        name: 'kl-precache-manifest',
        apply: 'build',
        generateBundle(_, bundle) {
            const files = Object.keys(bundle)
                .filter((f) => !f.endsWith('.map'))
                .map((f) => '/' + f);
            this.emitFile({
                type: 'asset',
                fileName: 'precache-manifest.json',
                source: JSON.stringify({ version: Date.now(), files }),
            });
        },
    };
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), precacheManifest()],
    root: './',
    build: {
        outDir: 'dist',
    },
});
