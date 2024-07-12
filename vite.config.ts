import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    base: './',
    plugins: [
        react(),
        mkcert(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src/'),
            '@theme': path.resolve(__dirname, 'src/theme'),
        },
    },
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: path.resolve(__dirname, 'index.html'),
        },
    },
    server: {
        port: Number(process.env.VITE_PORT)
    },
});
