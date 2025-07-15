import path from 'path';
import checker from 'vite-plugin-checker';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// ----------------------------------------------------------------------

const PORT = 3031;

export default defineConfig({
  plugins: [
    react(),
    checker({
      eslint: {
        useFlatConfig: true,
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
        dev: { logLevel: ['error'] },
      },
      overlay: {
        position: 'tl',
        initialIsOpen: false,
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: /^src(.+)/,
        replacement: path.resolve(process.cwd(), 'src/$1'),
      },
      {
        find: /^minimal-shared\/utils/,
        replacement: path.resolve(process.cwd(), 'node_modules/minimal-shared/dist/utils/index.js'),
      },
      {
        find: /^minimal-shared\/hooks/,
        replacement: path.resolve(process.cwd(), 'node_modules/minimal-shared/dist/hooks/index.js'),
      },
      {
        find: 'minimal-shared',
        replacement: path.resolve(process.cwd(), 'node_modules/minimal-shared/dist/index.js'),
      },
    ],
  },
  optimizeDeps: {
    include: [
      '@fullcalendar/core',
      '@fullcalendar/daygrid',
      '@fullcalendar/interaction',
      '@fullcalendar/list',
      '@fullcalendar/react',
      '@fullcalendar/timegrid',
    ],
  },
  server: { 
    port: PORT, 
    host: true,
    proxy: {
      '/api': {
        target: 'https://facilitatorbackend-ahoum-crm.onrender.com',
        changeOrigin: true,
        secure: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      }
    }
  },
  preview: {
    port: PORT,
    host: true,
    allowedHosts: ['ahoum-crm.onrender.com'],
  },
});
